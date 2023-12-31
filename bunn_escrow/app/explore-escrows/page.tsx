"use client";
import React, { useState } from "react";
import Web3 from "web3";
import ABI from "./jsonAbi.json";
import { useContractRead } from "wagmi";
import { useRouter } from "next/navigation";

export type TransactionType = {
  amount: number;
  description: string;
  paidStatus: boolean;
  paymentWindow: number;
  receiver: string;
  sender: string;
  _id: number;
};

export default function Explore() {
  const infuraUrl =
    "https://sepolia.infura.io/v3/97787e63918c4febb1a8e82b16f66f66"; // Replace with your Infura URL
  const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const { data, error }: any = useContractRead({
    address: "0x82D9a99Bf84de667245A09152a03Dc8225Db6eC6",
    abi: ABI,
    functionName: "listTransactions",
  });

  return (
    <div className="">
      <div>
        <input
          name="search"
          className="px-4 py-2 text-[0.875rem] rounded-3xl w-[17rem] my-2 bg-transparent border"
          value={search}
          onChange={(event) => setSearch(event?.target.value)}
          placeholder="Search Address or Description..."
        />
      </div>
      {data ? (
        <table className="grid-flow-row auto-rows-max grid my-6 overflow-x-auto h-[25rem]">
          <thead>
            <tr className="grid grid-flow-col grid-col-10">
              <th className="mx-auto py-3">Id</th>
              <th className="mx-auto py-3">Description</th>
              <th className="mx-auto py-3">Sender</th>
              <th className="mx-auto py-3">Reciever</th>
              <th className="mx-auto py-3">Amount (eth)</th>
              <th className="mx-auto py-3">Claimed</th>
              <th className="mx-auto py-3">Time Left</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                (transaction: TransactionType) =>
                  transaction?.description
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  transaction?.receiver?.includes(search) ||
                  transaction?.sender.includes(search)
              )
              .map((transaction: TransactionType, index: number) => {
                return (
                  <tr
                    onClick={() =>
                      router.push(
                        "/explore-escrows/" + Number(transaction?._id)
                      )
                    }
                    className="grid grid-flow-col grid-col-10 hover:bg-white/10 cursor-pointer"
                    key={index}
                  >
                    <td className="mx-auto py-3">{Number(transaction._id)}</td>
                    <td className="mx-auto py-3">{transaction.description}</td>
                    <td className="mx-auto py-3">
                      <FormatString text={transaction.sender} />
                    </td>
                    <td className="mx-auto py-3">
                      <FormatString text={transaction.receiver} />
                    </td>
                    <td className="mx-auto py-3">
                      {web3.utils.fromWei(transaction.amount, "ether")}
                    </td>
                    <td className="mx-auto py-3">
                      {transaction.paidStatus.toString()}
                    </td>
                    <td className="mx-auto py-3">
                      {Number(transaction.paymentWindow)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const FormatString = ({ text }: { text: string }) => {
  return (
    <span>
      {text.slice(0, 5)}...{text.slice(text.length - 5, text.length)}
    </span>
  );
};
