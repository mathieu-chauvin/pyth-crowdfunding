var SafeMath = artifacts.require("./SafeMath.sol");

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
