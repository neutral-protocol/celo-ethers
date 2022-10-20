const { utils, Contract } = require("ethers");
const { CeloWallet, CeloProvider } = require("@celo-tools/celo-ethers-wrapper");

const abi = [
  "function transfer(address recipient, uint256 amount) external returns (bool)",
];

(async function () {
  // const provider = new providers.JsonRpcProvider(process.env.WEB3_PROVIDER);
  const providerUrl = process.env.WEB3_PROVIDER || "http://localhost:8545";
  const provider = new CeloProvider(providerUrl);
  const signer = new CeloWallet(process.env.PK, provider);

  console.log(`Connected to ${providerUrl}`);

  const token = new Contract(process.env.CONTRACT, abi, signer);

  const receiver = CeloWallet.createRandom();

  const response = await token.transfer(
    receiver.address,
    utils.parseUnits("0.1")
  );

  await response.wait();
})();
