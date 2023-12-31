"use client";
import { contractAddress, ABI } from "@/contractDetails/contractVar";
import { ethers } from "ethers";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useContractRead } from "wagmi";
import { FormatTimeLeft, TransactionType } from "../page";
import Web3 from "web3";
import { useRouter } from "next/navigation";

export default function TransactionDetailsPage({
  params,
}: {
  params: { _id: number };
}) {
  const [manager, setManager] = useState<string>("");
  const [contract, setContract] = useState<any>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const router = useRouter();

  const [network, setNetwork] = useState<string>("");
  const [connectButtonText, setConnectButtonText] =
    useState<string>("Connect wallet");
  const [claimButtonText, setClaimButtonText] = useState<string>("Claim");

  const infuraUrl =
    "https://sepolia.infura.io/v3/97787e63918c4febb1a8e82b16f66f66"; // Replace with your Infura URL
  const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const { data, error }: { data: TransactionType | undefined; error: any } =
    useContractRead({
      address: "0x82D9a99Bf84de667245A09152a03Dc8225Db6eC6",
      abi: ABI,
      functionName: "transactionDetails",
      args: [params?._id],
    });

  const connectWallet = async () => {
    setConnectButtonText("Connecting..........");
    const win: any = window;
    if (win.ethereum) {
      const provider = new ethers.BrowserProvider(win.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log(contract);
      setContract(contract);
      setNetwork(network.name.toUpperCase());
      const owner = await contract.viewAdmin();
      setManager(owner);
      setSigner(signer);
    } else {
      alert("Please install a crypto wallet");
    }
  };

  const handleClaim = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setClaimButtonText("Claiming.......");
    try {
      const tx = await contract.Claim(params._id);
      await tx.wait();
      console.log(tx);
      toast.success("Successfully claimed payment!!!");
      setTimeout(() => {
        router.refresh();
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
    setClaimButtonText("Claimed");
  };

  return (
    <main className="h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-3xl">View Escrow Details</h1>
      <Toaster position="top-center" />
      {contract && (
        <div className="flex flex-col gap-6 text-center">
          <div className="border flex flex-col p-4 gap-2">
            <h2>
              <span className="font-semibold">Contract Address:</span>{" "}
              {contract.target}
            </h2>
            <h2>
              <span className="font-semibold">Escrow Manager/Admin:</span>{" "}
              {manager}
            </h2>
            <p>
              <span className="font-semibold">Connected to network:</span>{" "}
              {network}
            </p>
          </div>
          <div className="border flex flex-col p-4 gap-2">
            {signer && (
              <h1>
                <span className="font-semibold">Account connected:</span>{" "}
                {signer.address}
              </h1>
            )}
            {data && (
              <h1>
                <span className="font-semibold">Sender Account:</span>{" "}
                {data?.sender}
              </h1>
            )}
            {data && (
              <h1>
                <span className="font-semibold">Reciever Account:</span>{" "}
                {data?.receiver}
              </h1>
            )}
          </div>
          <div className="border flex flex-col p-4 gap-2">
            {data && (
              <h1>
                <span className="font-semibold">Amount in Escrow:</span>{" "}
                {web3.utils.fromWei(data.amount, "ether")} ether
              </h1>
            )}
            {data && (
              <h1>
                <span className="font-semibold">Delivery Date:</span>{" "}
                {new Date(Number(data?.paymentWindow) * 1000).toDateString()}
              </h1>
            )}
            {data && (
              <h1>
                <span className="font-semibold">Claimed Status:</span>{" "}
                {data.paidStatus.toString()}
              </h1>
            )}
          </div>
        </div>
      )}
      {!signer && (
        <button
          className="bg-gray-300 px-4 py-1 rounded-lg"
          onClick={connectWallet}
        >
          {connectButtonText}
        </button>
      )}
      {signer && (
        <button
          type="submit"
          onClick={handleClaim}
          disabled={
            data?.paidStatus ||
            signer.address !== data?.receiver ||
            (() => {
              const currentTime = Math.floor(Date.now() / 1000);
              const timeDiff = Number(data.paymentWindow) - currentTime;
              if (timeDiff > 0) return true;
              return false;
            })() ||
            claimButtonText === "Claimed"
          }
          className="bg-customColors-secondary disabled:bg-slate-400 text-white font-bold lg:text-2xl px-6 py-3 lg:px-16 lg:py-6 rounded-lg hover:text-[#1BA9B5]"
        >
          {data?.paidStatus ? (
            "Claimed"
          ) : signer.address !== data?.receiver ? (
            "Not Authorized to claim"
          ) : (() => {
              const currentTime = Math.floor(Date.now() / 1000);
              const timeDiff = Number(data.paymentWindow) - currentTime;
              if (timeDiff > 0) return true;
              return false;
            })() ? (
            <>
              <span>Time left: </span>
              <FormatTimeLeft timeInSeconds={Number(data.paymentWindow)} />
            </>
          ) : (
            claimButtonText
          )}
        </button>
      )}
    </main>
  );
}
