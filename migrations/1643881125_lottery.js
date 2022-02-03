var fs = require("fs");
var Lottery = artifacts.require("Lottery");

module.exports = function (deployer, network) {
  var duration = 12; // seconds
  var contractInstance;

  deployer.deploy(Lottery, duration);
  Lottery.deployed().then((instance) => (contractInstance = instance));

  web3.eth
    .getAccounts()
    .then((addresses) => {
      console.log(addresses);
      return addresses;
    })
    .then((addresses) =>
      // unlock account for geth
      addresses.forEach((address) => {
        if (network == "rinkeby" || network == "mainnet") {
          var password = fs.readFileSync("password", "utf8").split("\n")[i];
          web3.personal.unlockAccount(address, password);
        }
        // buy lottery ticket
        contractInstance.methods.buyTicket(address);
      })
    );

  /* .then(() => {
      setTimeout(() => {
        console.log("let's wait for 5 seconds...");
      }, 5000);
    })
    .then(() => {
      contractInstance.methods.drawWinner();
    }); */
};
