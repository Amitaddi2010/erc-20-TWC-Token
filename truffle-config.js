require("babel-register");
require("babel-polyfill");

const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const mnemonic = fs
  .readFileSync(".secret")
  .toString()
  .trim();

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*", // Match any network id
    // },

    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `wss://ropsten.infura.io/ws/v3/d3f0a01d31834977a08cdb69828ae79a`
        ),
      network_id: 3, // Ropsten id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_directory: "./src/contracts/",
  contracts_build_directory: "./src/abis/",
  compilers: {
    solc: {
      version: "0.8.11", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
