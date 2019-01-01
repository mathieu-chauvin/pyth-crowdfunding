pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./PythiContract.sol";

/**
 * @title Proof of stake 
 *
 */
contract PosContract {
    using SafeMath for uint256;

    PythiContract pyC;

    //  idOfObject => rewardAdress => pythHolderAddress => isValidated
    mapping (uint256 => mapping(address => mapping(address => bool))) public _stakeHolders;
    // idOfObject => rewardAdress => stakeValue
    mapping (uint256 => mapping(address => uint256)) public _stakeValue;


    constructor(address addr) public {
        pyC = PythiContract(addr);
    }

    function validate(uint256 idProject, address user) public returns (bool) {
        require (_stakeHolders[idProject][user][msg.sender] == false);
        _stakeHolders[idProject][user][msg.sender] = true;
        _stakeValue[idProject][user] = _stakeValue[idProject][user].add(pyC.balanceOf(msg.sender));
        return true;

    }

    function unvalidate(uint256 idProject, address user) public returns (bool) {
        require (_stakeHolders[idProject][user][msg.sender] == true);
        _stakeHolders[idProject][user][msg.sender] = false;
        _stakeValue[idProject][user] = _stakeValue[idProject][user].sub(pyC.balanceOf(msg.sender));
        return true;
    }


    function isValidated(uint256 id, address user) public view returns (bool) {
        if (_stakeValue[id][user] > pyC.totalSupply().div(2))
            return true;
        else
            return false;
    }

    function () public payable {
        revert();
    }

}


