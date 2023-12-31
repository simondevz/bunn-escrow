// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Escrow {
    address admin;

    uint256[] public transactionIds;
    uint256 public transactionCount;
    uint256 public transactionId;

    struct Transaction {
        uint _id;
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
        transactionId = 1001;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function createTransaction (address payable  toAddress, uint deliveryTime, string memory description) public payable  {
        uint amount = msg.value;
        require(amount > 0, "Amount must be more than 0");
        require(msg.sender != admin, "Admin cannot create an escrow");
        Transaction memory _transaction = Transaction(transactionId, false, toAddress, payable (msg.sender), amount, description, block.timestamp + deliveryTime);
        transactions[transactionId] = _transaction;
        transactionIds.push(transactionId);
        transactionCount++; 
        transactionId++;
    }

    function transactionDetails (uint id) view public returns (Transaction memory){
        return transactions[id];
    }

    function refundFunds (uint id) public onlyAdmin {
        require(!transactions[id].paidStatus, "Payment already made");
        transactions[id].sender.transfer(transactions[id].amount);
        transactions[id].paidStatus = true;
    }

    function Claim(uint id) public {
        require(transactions[id].receiver == msg.sender, "Unauthorized receiver");
        require(!transactions[id].paidStatus, "Payment already made");
        require(block.timestamp >= transactions[id].paymentWindow, "Payment window not expired yet");

        // Perform payment
        address payable receiver = payable(transactions[id].receiver);
        uint256 amountToSend = transactions[id].amount;

        require(address(this).balance >= amountToSend, "Insufficient contract balance");

        transactions[id].paidStatus = true; // Mark transaction as paid
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