"use client";
import { configureChains, sepolia, createConfig, WagmiConfig } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

export default function CustomWagmiConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [sepolia],
    [
      publicProvider(),
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_APIKEY as string,
      }), // TODO: Get production keys and move to a dot env file
      infuraProvider({
        apiKey: process.env.NEXT_PUBLIC_INFURA_APIKEY as string,
      }),
    ]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [new MetaMaskConnector()],
  });
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
