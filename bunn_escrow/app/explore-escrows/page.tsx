"use client";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ABI from "./jsonAbi.json";
import { useContractRead } from "wagmi";
import { useRouter } from "next/navigation";
import { FormatString, FormatTimeLeft } from "./utils";

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
  const infuraUrl = process.env.NEXT_PUBLIC_INFURA_LINK as string; // Replace with your Infura URL
  const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const { data, error }: any = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
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
              <th className="mx-auto py-3 w-[3rem]">Id</th>
              <th className="mx-auto py-3 w-[20rem]">Description</th>
              <th className="mx-auto py-3 w-[7rem]">Sender</th>
              <th className="mx-auto py-3 w-[7rem]">Reciever</th>
              <th className="mx-auto py-3 w-[10rem]">Amount (eth)</th>
              <th className="mx-auto py-3 w-[5rem]">Claimed</th>
              <th className="mx-auto py-3 w-[6.5rem]">Time Left</th>
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
                    <td className="flex justify-center mx-auto py-3 w-[3rem]">
                      {Number(transaction._id)}
                    </td>
                    <td className="mx-auto py-3 w-[20rem]">
                      {transaction.description}
                    </td>
                    <td className="flex justify-center mx-auto py-3 w-[7rem]">
                      <FormatString text={transaction.sender} />
                    </td>
                    <td className="flex justify-center mx-auto py-3 w-[7rem]">
                      <FormatString text={transaction.receiver} />
                    </td>
                    <td className="flex justify-center mx-auto py-3 w-[10rem]">
                      {web3.utils.fromWei(transaction.amount, "ether")}
                    </td>
                    <td className="flex justify-center mx-auto py-3 w-[5rem]">
                      {transaction.paidStatus.toString()}
                    </td>
                    <td className="flex justify-center mx-auto py-3 w-[6.5rem]">
                      <FormatTimeLeft
                        className={"mx-auto"}
                        timeInSeconds={Number(transaction.paymentWindow)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div>No Escrows Yet</div>
      )}
    </div>
  );
}
