var fs = require("fs");
var Lottery = artifacts.require("Lottery");

module.exports = function (deployer, network) {
  var duration = 5; // seconds
  var contractInstance;

  deployer.deploy(Lottery, duration);
  Lottery.deployed().then((instance) => (contractInstance = instance));

  web3.eth
    .getAccounts()
    .then((accounts) => {
      console.log(accounts);
      return accounts;
    })
    .then((accounts) =>
      // unlock account for geth
      accounts.forEach((address) => {
        if (network == "rinkeby" || network == "mainnet") {
          var password = fs.readFileSync("password", "utf8").split("\n")[i];
          web3.personal.unlockAccount(address, password);
        }
        // buy lottery ticket
        contractInstance.methods.buyTicket(address);
      })
    );
};
