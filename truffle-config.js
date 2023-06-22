module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "ec2-35-91-48-182.us-west-2.compute.amazonaws.com",

      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  }





}

