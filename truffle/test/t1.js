var PythiContract = artifacts.require("./PythiContract.sol");

var ac = web3.eth.accounts[0];
var ac1 = web3.eth.accounts[1];
    
module.exports = function(deployer) {
    checkBalance(ac);
    checkBalance(ac1);
  }.then(function(){
    sendPyth(ac, ac1, 1000000);
 }).then(function(){
      checkBalance(ac);
      checkBalance(ac1);


 });

function checkBalance(ac) {
    PythiContract.deployed().then(function (tokenC) {
        var balance = tokenC.balanceOf(ac).then(function(bal) {
            console.log(bal);
        });
    });
}

function sendPyth(src, desti, val) {
    PythiContract.deployed().then(function (tokenC) {
        var balance = tokenC.transfer(desti, val, {from:src}).then(function() {
            console.log("success");
        });
    });
}
