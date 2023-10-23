// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;  

contract Sunshine {
    bool sunshine;

    function letTheSunShine() public returns (bool) {
        if (sunshine == false) {
            sunshine = true;
        }
        return true;
    }
}
