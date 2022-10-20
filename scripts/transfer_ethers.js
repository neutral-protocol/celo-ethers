const { providers, Wallet, utils, Contract } = require("ethers");

const abi = [
  "function transfer(address recipient, uint256 amount) external returns (bool)",
];

(async function () {
  // const provider = new providers.JsonRpcProvider(process.env.WEB3_PROVIDER);
  const providerUrl = process.env.WEB3_PROVIDER || "http://localhost:8545";
  const provider = new providers.JsonRpcProvider(providerUrl);
  const signer = new Wallet(process.env.PK, provider);

  console.log(`Connected to ${providerUrl}`);

  const token = new Contract(process.env.CONTRACT, abi, signer);

  const receiver = Wallet.createRandom();

  const response = await token.transfer(
    receiver.address,
    utils.parseUnits("0.1")
  );

  await response.wait();
})();
