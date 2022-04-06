// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    // create counter to track num. of txs
    uint256 transactionCount;

    // emitter transfer event
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // define structure and data-types of transfers
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // store txs in an array type data struct?
    TransferStruct[] transactions;

    // <<<-----------METHODS---------->>>

    // adds to blockchain as name suggests
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        // update tx count
        transactionCount += 1;

        // push transaction data onto `transactions` array
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // emit transfer event with tx data
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // returns array of txs frm memory
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    // returns updated txs count `transactionCount` variable | returns uint (tx count)
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
