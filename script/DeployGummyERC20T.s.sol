// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {GummyERC20T} from "../src/protocol/GummyERC20T.sol";

contract DeployGummyERC20T is Script {
    function run() public {
        vm.startBroadcast();
        GummyERC20T gummyT = new GummyERC20T();
        vm.stopBroadcast();
    }
}
