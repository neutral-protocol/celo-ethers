require("hardhat-deploy");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.info(account.address);
  }
});

const fallbackPK =
  "0xb4cd0a0ee132bd9be0327e428662da060f10a0e8bebc91f45638187dcea04de2";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      deploy: ["./deploy"],
    },
    ganache: {
      allowUnlimitedContractSize: true,
      deploy: ["./deploy"],
      tags: ["local"],
      url: "http://localhost:8545",
    },
    alfajores: {
      url: "https://celo-alfajores-rpc.allthatnode.com",
      deploy: ["./deploy"],
      accounts: [
        `${process.env.PK || fallbackPK}`,
        `${process.env.USER0 || fallbackPK}`,
        `${process.env.KEEPER || fallbackPK}`,
      ],
      chainId: 44787,
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  namedAccounts: {
    deployer: 0,
    user0: 1,
    keeper: 2,
  },
  etherscan: {
    apiKey: {
      alfajores: "<CELOSCAN_API_KEY>",
      celo: "<CELOSCAN_API_KEY>",
    },
  },
};
