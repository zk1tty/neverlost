import { LocalAccountSigner } from "@aa-sdk/core";
import { alchemy, sepolia, arbitrumSepolia } from "@account-kit/infra";
import { createModularAccountAlchemyClient } from "@account-kit/smart-contracts";

const MNEMONIC = "abandon ability able about above absent absorb abstract absurd abuse access accident";
// TODO: change the chain to Arbitrum Sepolia.
export const chain = arbitrumSepolia;

async function initializeClient() {
  const modularAccountClient = await createModularAccountAlchemyClient({
    signer: LocalAccountSigner.mnemonicToAccountSigner(MNEMONIC),
    chain,
    transport: alchemy({ apiKey: "6T7baoAXg8g7fSAuA9RPQQLAP4e9Y7Lm" }),
  });
  return modularAccountClient;
}

export default initializeClient;