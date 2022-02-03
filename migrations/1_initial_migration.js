var fs = require("fs");
var Lottery = artifacts.require("Lottery");

module.exports = function (deployer, network) {
  var duration = 3600 * 1 * 1; // seconds * hour * day
  var contractInstance;

  deployer.deploy(Lottery, duration);
  Lottery.deployed().then((instance) => (contractInstance = instance));

  web3.eth.accounts[i].forEach((address) => {
    // unlock account for geth
    if (network == "rinkeby" || network == "mainnet") {
      var password = fs.readFileSync("password", "utf8").split("\n")[i];
      web3.personal.unlockAccount(web3.eth.accounts[i], password);
    }
  });
};
