pragma solidity ^0.4.24;

import "./PythiContract.sol";
import "./PosContract.sol";
import "./SafeMath.sol";

/**
 * @title Proof of stake 
 *
 */
contract StockContract {
    using SafeMath for uint256;

    PythiContract pyC;
    PosContract posC;

    //  idOfObject => pythHolderAddress => value
    mapping (uint256 => mapping(address => uint256)) public _stakes;


    //  idOfObject => pythHolderAddress => value
    mapping (uint256 => uint256) public _totalStakes;

    constructor(address addr) public {
        pyC = PythiContract(addr);
        posC = new PosContract(addr);
    }

    function addStake(uint256 idProject, uint256 amount) public returns (bool) {
        pyC.transferFrom(msg.sender, this, amount);
        // to test : value > allowed
        _stakes[idProject][msg.sender] += amount;
        _totalStakes[idProject] +=amount;
    }

    function removeStake(uint256 idProject, uint256 amount) public returns (bool) {
        require(_totalStakes[idProject] >= amount);
        require(_stakes[idProject][msg.sender] >= amount);
        // to test : value > allowed
        _stakes[idProject][msg.sender] -= amount;
        _totalStakes[idProject] -=amount;

        pyC.transfer(msg.sender, amount);
    }

    function getReward(uint256 idProject) public returns bool{
        require(posC.isValidated(idProject, msg.sender))
        uint256 amount = _totalStakes[idProject];
        _totalStakes[idProject] = 0;
        pyC.transfer(msg.sender, amount);
    }

    function () public payable {
        revert();
    }

}
