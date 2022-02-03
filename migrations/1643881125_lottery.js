var fs = require("fs");
var Lottery = artifacts.require("Lottery");

module.exports = function (deployer, network) {
  var duration = 5; // seconds
  var contractInstance;
  var ticketPrice = 1e18;

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

        // send ether and request ticket purchase
        contractInstance.buyTicket.sendTransaction(address, {
          to: contractInstance.address,
          from: address,
          value: ticketPrice,
        });
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

  // Lottery.deployed().then(instance => lot = instance)
};
