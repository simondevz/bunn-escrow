// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Escrow {
    address admin;

    uint256[] public transactionIds;
    uint256 public transactionCount;
    struct Transaction {
        bool paidStatus;
    	address payable  receiver;
        address payable  sender;
        uint amount;
        string description;
        uint paymentWindow;
    }

     mapping(uint256 => Transaction) public transactions;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function createTransaction (address payable  toAddress, uint amount, uint deliveryTime, string memory description) public  {
        require(msg.sender != admin, "Admin cannot create escrow");
        Transaction memory _transaction = Transaction(false, toAddress, payable (msg.sender), amount, description, deliveryTime);
        transactions[transactionCount] = _transaction;
        transactionCount++; // increment transaction count tracker
    }

    function transactionDetails (uint id) view public returns (Transaction memory){
        return transactions[id];
    }

    function refundFunds (uint id) public onlyAdmin {
        require(!transactions[id].paidStatus, "Payment already made");
        transactions[id].sender.transfer(transactions[id].amount);
        transactions[id].paidStatus = true;
    }

    function payReciever(uint transactionId) public onlyAdmin {
        require(transactions[transactionId].receiver == msg.sender, "Unauthorized receiver");
        require(!transactions[transactionId].paidStatus, "Payment already made");
        require(block.timestamp >= transactions[transactionId].paymentWindow, "Payment window not expired yet");

        // Perform payment
        address payable receiver = payable(transactions[transactionId].receiver);
        uint256 amountToSend = transactions[transactionId].amount;

        require(address(this).balance >= amountToSend, "Insufficient contract balance");

        transactions[transactionId].paidStatus = true; // Mark transaction as paid
        receiver.transfer(amountToSend); // Send the amount to the receiver
    }

    function listTransactions() public view returns (Transaction[] memory) {
       Transaction[] memory result = new Transaction[](transactionIds.length);

        for (uint256 i = 0; i < transactionIds.length; i++) {
            uint256 id = transactionIds[i];
            result[i] = transactions[id];
        }

        return result;
    }

    function viewAdmin() view public returns (address) {
        return (admin);
    }
}