module.exports = async ({ getNamedAccounts, deployments, network, ethers }) => {
  const { deploy, execute } = deployments;
  const { deployer, user0 } = await getNamedAccounts();
  const defaultArgs = {
    from: deployer,
    log: true,
  };

  const celo = await deploy("ERC20", defaultArgs);
};
