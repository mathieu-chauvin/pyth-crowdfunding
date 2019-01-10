/*var SafeMath = artifacts.require("./SafeMath.sol");

module.exports = function(deployer) {
      deployer.deploy(SafeMath);
};

var IERC20 = artifacts.require("./IERC20.sol");

module.exports = function(deployer) {
      deployer.deploy(IERC20);
};

var Pythicontract = artifacts.require("./PythiContract.sol");

module.exports = function(deployer) {
      deployer.deploy(Pythicontract);
};
*/
var Stockcontract = artifacts.require("./StockContract.sol");

module.exports = function(deployer) {
      deployer.deploy(Stockcontract, "0x044788B6B14928a3355bCC1dc8e77C2A16D846E0");
};
