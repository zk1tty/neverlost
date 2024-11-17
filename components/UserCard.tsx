"use client";
import { useAddPasskey, useBundlerClient, useExportAccount, useLogout, useSignMessage, useSmartAccountClient, useUser } from "@account-kit/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import React, { useState, useEffect } from "react";
import { isHex } from "viem";
import { z } from "zod";
import initializeClient from './modularClientInit';
// import { createWalletClient, http } from "viem";
import { AlchemyWebSigner } from "@account-kit/signer";
import { ethers } from 'ethers';

// How to Use signer as owner on Smart Account


const TurnkeyExportWalletContainerId = "turnkey-export-wallet-container-id";
const TurnkeyExportWalletElementId = "turnkey-export-wallet-element-id";

const iframeCss: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  height: "120px",
  borderRadius: "8px",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "rgba(216, 219, 227, 1)",
  padding: "20px",
};

// add and remove the owners of modulerAccount
const ownersToAdd: string[] = []; // the addresses of owners to be added
const ownersToRemove: string[] = []; // the addresses of owners to be removed


const addOwners = async (newOwner: `0x${string}`, modularAccountClient: any) => {
  try {
    const result = await modularAccountClient.updateOwners({
      args: [[newOwner], []],
    });
    console.log("Transaction Sent!");
    
    const txHash = await modularAccountClient.waitForUserOperationTransaction(result);
    console.log("Transaction Hash:", txHash);
  } catch (error) {
    console.error("Error updating owners:", error);
  }
};

const removeOwners = async (revertedOwner: `0x${string}`, modularAccountClient: any) => {
    try {
      const result = await modularAccountClient.updateOwners({
        args: [[], [revertedOwner]],
      });
      console.log("Transaction sent!");

      const txHash = await modularAccountClient.waitForUserOperationTransaction(result);
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Error updating owners:", error);
    }
  };

const sendTx = async(modularAccountClient, _to) => {
    if(!_to){
        alert("Please enter a recipient address.");
        return;
      }
    console.log("modularAccountClient:", modularAccountClient);
    const amountInEth = 0.0001;
    const amountInWei = ethers.parseEther(amountInEth.toString());
    try {
        const result = await modularAccountClient.sendTransactions({
            requests: [{
                to: _to,
                data: "0x", // or "0x",
                value: amountInWei, // optional
            }]
        });
        console.log("result:", result );
        const txHash = await client.waitForUserOperationTransaction(result);
        console.log("Transaction Hash:", txHash);
    }catch(err){
        console.error("Error updating owners:", err);
    }
}



export const UserCard = () => {
  // SmartAccountClient
  const [modularClient, setmodularClient] = useState<any>(null);
  const bundlerClient = useBundlerClient();
  // clinet: modulerAccountClinet
  const { client, isLoadingClient } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
  });
  const user = useUser();
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [owners, setOwners] = useState<string[]>([]);
  const [newOwnerAddress, setNewOwnerAddress] = useState<string>("");
  const [revertOwnerAddress, setRevertOwnerAddress] = useState<string>("");
  const [recipientAddress, setRecipientAddress] = useState('');
  const [txMessage, setTxMessage] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
        try {
          const _modularClient = await initializeClient();
          console.log("modularClient:", _modularClient);
          setmodularClient(_modularClient); // Set the modular client
        } catch (err) {
          console.error("Error initializing modularClient:", err);
        }
      };
      initialize();
  }, []);
    
  useEffect(() => {
    const fetchOwners = async () => {
        console.log("modularClient.address:", modularClient?.getAddress());
          try {
            const owners = await modularClient.readOwners(); // Await the promise
            console.log("owners:", owners);
            setOwners([...owners]); // Set the owners
          } catch (error) {
            console.error("Error reading owners:", error); // Handle any errors
          }
    }
    if (modularClient) {
        fetchOwners();
    }
  }, [modularClient]);

//   useEffect(() => {
//     const signer = new AlchemyWebSigner({
//         client: {
//             connection: {
//             apiKey: "API_KEY",
//             },
//             iframeConfig: {
//             iframeContainerId: "alchemy-signer-iframe-container",
//             },
//         },
//     });
//   // additional logic to use Signer;
//     return () => {
//         // Cleanup if necessary (e.g., remove iframe if needed)
//         const iframe = document.getElementById('turnkey-iframe');
//         if (iframe) {
//         iframe.remove(); // Remove the iframe if it exists
//         }
//     };
//   });

  const { signMessage, signedMessage } = useSignMessage({
    client,
    onSuccess: async (signature, msg) => {
      setIsValid(
        await bundlerClient
          .verifyMessage({
            address: client ? client.getAddress() : user!.address,
            message: msg.message,
            signature,
          })
          .catch((e: any) => {
            console.log("error verifying signature, ", e);
            return false;
          })
      );
    },
  });

  const { ExportAccountComponent, exportAccount, isExporting, isExported } =
    useExportAccount({
      params: {
        iframeContainerId: TurnkeyExportWalletContainerId,
        iframeElementId: TurnkeyExportWalletElementId,
      },
    });

  const { addPasskey } = useAddPasskey({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { logout } = useLogout();

  const form = useForm({
    defaultValues: {
      message: "Send message to your friends",
    },
    validatorAdapter: zodValidator,
    onSubmit: ({ value }) =>
      signMessage({
        message: isHex(value.message) ? { raw: value.message } : value.message,
      }),
  });

  return (
    <div className="daisy-card bg-base-100 shadow-xl w-[500px] max-w-[500px]">
      <div className="daisy-card-body gap-5">
        <div className="flex flex-row justify-between mb-6">
          <h1 className="daisy-card-title">
            <strong>Your account is ready!!</strong>
          </h1>
        </div>
        <div className="flex flex-row gap-2">
            <strong>Account Type</strong>
            <code className="break-words">{user?.type.toUpperCase()}</code>
        </div>
        {user?.type === "sca" && (
          <div className="flex flex-row justify-between mb-6">
            <div className="flex flex-col justify-left">
              <div className="flex flex-row gap-2">
                <strong>Email</strong>
                <code className="break-words">{user!.email}</code>
              </div>
              <div className="flex flex-row gap-2">
                <button onClick={() => addPasskey()}>[Add Passkey]</button>
              </div>
              <div className="flex flex-row gap-2">
                <strong>SignerAddress</strong>
                <code className="break-words">{user!.address}</code>
              </div>
            </div>
          </div>
        )}
        
        {/* <div className="flex flex-col">
            <strong>SmartAccount Address</strong>
            <code className="break-words">{client?.account.address}</code>
        </div> */}
        <div className = "flex flex-col justify-between mb-8">
            <div className="flex flex-col">
              <strong>ModularAccount Address</strong>
              <code className="break-words">{modularClient?.getAddress()}</code>
            </div>
            <div className="flex flex-col">
                <strong>CurrentOwnersList of ModularAccount</strong>
                {owners.map((owner, index) => (
                  <code key={index} className="break-words">{owner}</code>
                ))}
            </div>
        </div>
        <div className = "flex flex-col justify-between mb-8">
            <div className="flex flex-col gap-2">
                {/* <button onClick={() => addOwners( user?.address as `0x${string}`, modularClient)}> */}
                <button onClick={() => addOwners(newOwnerAddress as `0x${string}`, modularClient)}>
                    <strong>[Add SCA to ModularAccount]</strong>
                </button>
                <input
                  type="text"
                  placeholder="Enter SCA Address to Merge"
                  value={newOwnerAddress} // State variable for the input value
                  onChange={(e) => setNewOwnerAddress(e.target.value)} // Update state on change
                  className="daisy-input text-black" // Add any desired styling
                />
            </div>
            <div className="flex flex-col gap-2">
                <button onClick={() => removeOwners(revertOwnerAddress as `0x${string}`, modularClient)}>
                    <strong>[Remove SCA to ModularAccount]</strong>
                </button>
                <input
                  type="text"
                  placeholder="Enter SCA Address to Merge"
                  value={revertOwnerAddress} // State variable for the input value
                  onChange={(e) => setRevertOwnerAddress(e.target.value)} // Update state on change
                  className="daisy-input text-black" // Add any desired styling
                />
            </div>
        </div>
        
        <div className="flex flex-col gap-2">
            <strong>Emergency Trnasfer</strong>
            <input
            type="text"
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="daisy-input text-black"
            />
            <button onClick={() => sendTx(modularClient, recipientAddress)} className="daisy-button">
                [Transfer 0.0001 ETH]
            </button>
            <strong>⚡️CHECK THE RESULT⚡️</strong>
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
      <div id="alchemy-signer-iframe-container"></div>
    </div>
  );
};