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
    struct Stake {
        address staker;
        address
    }
    //  pythHolderAddress => idOfProject => candidateAddress
    mapping (address => mapping(uint256) => address)) private _stakeHolders;
    // ifOfProject => candidateAddress => idValue
    mapping (uint256 => mapping(address => uint256)) private _stakeValue;

    constructor(address addr) public {
        pyC = PythiContract(addr);
    } 

    function validate(uint256 idProject, address user) public returns (bool) {
        require (_stakeHolders[id][user][msg.sender] == false);
        _stakeHolders[id][msg.sender] = true;
        _stakeValue[id] = _stakeValue[id].add(pyC.balanceOf(msg.sender));
        return true;
    }

    function unvalidate(uint256 idProject, address user) public returns (bool) {
        require (_stakeHolders[id][msg.sender] == true);
        _stakeHolders[id][msg.sender] = false;
        _stakeValue[id] = _stakeValue[id].sub(pyC.balanceOf(msg.sender));
        return true;
    }


    function isValidated(uint256 id, address user) public view returns (bool) {
        if (_stakeValue[id] > pyC.totalSupply().div(2))
            return true;
        else
            return false;
    }

    function () public payable {
        revert();
    }

}

