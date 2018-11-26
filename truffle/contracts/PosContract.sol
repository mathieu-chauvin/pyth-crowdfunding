pragma solidity ^0.4.24;

import "./IERC20.sol";
import "./SafeMath.sol";

/**
 * @title Proof of stake 
 *
 */
contract PosContract {
    using SafeMath for uint256;

    PythiContract pyC;

    //  idOfObject => pythHolderAddress => isValidated
    mapping (uint256 => mapping(address => bool)) private _stakeHolders;
    mapping (uint256 => uint256) private _stakeValue;


    constructor(address addr) public {
        pyC = PythiContract(addr);
    } 

    function validate(uint256 id) public returns bool {
        require (_stakeHolders[id][msg.sender.address] == false)
        _stakeHolders[id][msg.sender.address] = true;
        _stakeValue[id] = _stakeValue[id].add(PythiContract.balanceOf(msg.sender.address));
        return true;

    }

    function unvalidate(uint256 id) public returns bool {
        require (_stakeHolders[id][msg.sender.address] == true)
        _stakeHolders[id][msg.sender.address] = false;
        _stakeValue[id] = _stakeValue[id].sub(PythiContract.balanceOf(msg.sender.address));
        return true;
    }


    function isValidated(uint256 id) public view returns bool {
        if (_stakeValue(id) > PythiContract.totalSupply.div(2))
            return true;
        else
            return false;
    }

    function () public payable {
        revert();
    }


