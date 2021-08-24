// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    // mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("We have been constructred");
    }

    function wave(string memory _message) public {
        // require(
        //     lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
        //     "You gotta wait 15 min!"
        // );

        totalWaves += 1;
        console.log("%s waved!", msg.sender);
        console.log("Got message: %s", _message);

        //add data to array
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("WINNER WINNER CHICKEN DINNER");
            uint256 prizeAmount = 0.001 ether;
            // check contract balance is more than prizeamount
            require(
                prizeAmount <= address(this).balance,
                "Trying to withraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to send money");
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %s total waves", totalWaves);
        return totalWaves;
    }
}
