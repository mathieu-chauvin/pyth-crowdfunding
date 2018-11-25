var PythiContract = artifacts.require("./PythiContract.sol");


module.exports = function(deployer) {
     var ac = web3.eth.accounts[0];
     var ac1 = web3.eth.accounts[1];
    checkBalance(ac);
    checkBalance(ac1);
};

function checkBalance(ac) {
    PythiContract.deployed().then(function (tokenC) {
        var balance = tokenC.balanceOf(ac).then(function(bal) {
            console.log(bal);
        });
    });
}
