"use client";
import { useState, useEffect } from 'react';
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";
import { UserCard } from "@/components/UserCard";
 

// Point
// 1. How to add additional signers to your generated Modular Account?
// 2. Use signer as owner on Smart Account

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const [generatedAddress, setGeneratedAddress] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we're on the client side and if there's a URL to handle
        if (typeof window !== 'undefined' && window.location.href.includes('aa-is-signup')) {
          const authResult = await signer.handleEmailRedirect();
          
          if (authResult.success) {
            console.log("Successfully authenticated:", authResult);
            // You can add additional logic here, like:
            // - Showing a success message
            // - Redirecting to a dashboard
            // - Triggering a state update
          } else {
            console.warn("Authentication was not successful");
          }
        }
      } catch (error) {
        console.error("Email redirect handling error:", error);
        // You might want to show an error message to the user here
      }
    };

    handleAuthCallback();
  }, []);

  const handleModulerGenerateAccount = async () => {
    try {
      const alchemyAccountClient = await createAlchemyClient();
      const _generatedAddress = alchemyAccountClient.account.address;
      setGeneratedAddress(_generatedAddress);
    } catch (error) {
      console.error("Error generating account:", error);
    }
  };

  const getAuthEmail = async (email: string) => {
    setIsAuthenticating(true);
    try {
      const result = await signer.authenticate({
        type: "email",
        email: email,
        options: {
          callbackUrl: `${window.location.origin}/?aa-is-signup=true`
        }
      });
      return result;
    } catch (err) {
      console.error("Error in getAuthEmail:", err);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
        {signerStatus.isInitializing ? (
          <>Loading...</>
        ) : user ? (
          <UserCard />
        ) : (
          <>
            <button className="btn btn-primary mt-6 text-[4rem]" onClick={handleModulerGenerateAccount}>
              <strong>NeverLost Wallet</strong>
              {generatedAddress ?? ""}
            </button>
            <button className="btn btn-primary" onClick={openAuthModal}>
              [Login]
            </button>
          </>

        )}
      </main>
  );
}
