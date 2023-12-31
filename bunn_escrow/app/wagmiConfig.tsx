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
      alchemyProvider({ apiKey: "IbnnqwmcUGXHPGAGVPN03_-DxOACzp" }), // TODO: Get production keys and move to a dot env file
      infuraProvider({ apiKey: "97787e63918c4febb1a8e82b16f66f66" }),
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
