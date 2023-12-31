"use client";

import { ethers } from "ethers";
import { useState } from "react";
import { ABI, contractAddress } from "@/contractDetails/contractVar";
import toast, { Toaster } from "react-hot-toast";

export default function Create() {
  const [manager, setManager] = useState<string>("");
  const [contract, setContract] = useState<any>();
  const [signer, setSigner] = useState<ethers.JsonRpcSigner>();
  const [network, setNetwork] = useState<string>("");
  const [connectButtonText, setConnectButtonText] =
    useState<string>("Connect wallet");
  const [createEscrowButtonText, setCreateEscrowButtonText] =
    useState<string>("Create Ecrow");
  const [formData, setFormData] = useState<{
    address: string;
    time: number;
    description: string;
    amount: string;
  }>({
    address: "",
    time: 7,
    description: "",
    amount: "",
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

  const handleOnChange = (e: React.SyntheticEvent) => {
    const { name, value }: any = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCreateEscrowButtonText("Creating escrow.......");
    try {
      const options = { value: ethers.parseEther(formData.amount) };
      const tx = await contract.createTransaction(
        formData.address,
        formData.time * 24 * 60 * 60,
        formData.description,
        options
      );
      await tx.wait();
      console.log(tx);
      toast.success("Successfully created escrow!");
    } catch (error) {
      console.error("Error:", error);
    }
    setCreateEscrowButtonText("Create escrow");
  };

  return (
    <main className="h-screen flex flex-col gap-3 items-center justify-center">
      <h1 className="text-3xl">Create your escrow</h1>
      <Toaster position="top-center" />
      {contract && (
        <div className="flex flex-col gap-6 text-center">
          <h2>Contract Address: {contract.target}</h2>
          <h2>Escrow Manager/Admin: {manager}</h2>
          <p>Connected to network: {network}</p>
          {signer && <h1>Account connected: {signer.address}</h1>}
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
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="address">Receiver&apos;s address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleOnChange}
              required
              placeholder="Receiver's address"
              className="border border-gray-300 w-full p-3 bg-gray-500 focus:outline-none rounded-md"
            />
          </div>
          <div>
            <label htmlFor="text">Deposit time in number of days</label>
            <input
              type="text"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleOnChange}
              required
              placeholder="Deposit time in number of days"
              className="border border-gray-300 w-full p-3 bg-gray-500 focus:outline-none rounded-md"
            />
          </div>
          <div>
            <label htmlFor="text">Amount in ethers</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleOnChange}
              required
              placeholder="Deposit time in number of days"
              className="border border-gray-300 w-full p-3 bg-gray-500 focus:outline-none rounded-md"
            />
          </div>
          <div>
            <label htmlFor="description">Escrow Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleOnChange}
              required
              placeholder="Escrow Description"
              className="border border-gray-300 w-full p-3 bg-gray-500 focus:outline-none rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-customColors-secondary text-white font-bold lg:text-2xl px-6 py-3 lg:px-16 lg:py-6 rounded-lg hover:text-[#1BA9B5]"
          >
            {createEscrowButtonText}
          </button>
        </form>
      )}
    </main>
  );
}
