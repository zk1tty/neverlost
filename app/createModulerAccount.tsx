import { createModularAccountAlchemyClient } from "@account-kit/smart-contracts";
import { sepolia, arbitrumSepolia, alchemy } from "@account-kit/infra";
import { LocalAccountSigner } from "@aa-sdk/core";
import { generatePrivateKey } from "viem/accounts";
 
export default async function alchemyAccountClient(){
    const accountClinet = await createModularAccountAlchemyClient({
        transport: alchemy({ apiKey: "6T7baoAXg8g7fSAuA9RPQQLAP4e9Y7Lm" }),
        chain: arbitrumSepolia,
        signer: LocalAccountSigner.privateKeyToAccountSigner(generatePrivateKey()),
      });
    console.log("accountClinet:", accountClinet);
    console.log("address:", accountClinet.getAddress());
    return accountClinet.getAddress();
}