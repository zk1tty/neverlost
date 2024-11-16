"use client";

let signer: any = null;

if (typeof window !== 'undefined') {
  // Dynamically import and initialize the signer
  import("@account-kit/signer").then(({ AlchemyWebSigner }) => {
    signer = new AlchemyWebSigner({
      client: {
        connection: {
          apiKey: "6T7baoAXg8g7fSAuA9RPQQLAP4e9Y7Lm",
        },
        iframeConfig: {
          iframeContainerId: "alchemy-signer-iframe-container",
        },
      },
    });
  });
}

export default signer;