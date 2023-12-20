// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Escrow {
    address admin;

    struct Transaction {
        uint id;
        bool paidStatus;
    	address receiver;
        address sender;
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

    function createTransaction (address toAddress, uint amount, uint deliveryTime) public  {}

    function transactionDetails (uint id) public {}

    function refundFunds (uint id) public onlyAdmin {}

    function payReciever(uint id) public onlyAdmin {}

    function listTransactions() public {}

    function viewAdmin() public {}
}