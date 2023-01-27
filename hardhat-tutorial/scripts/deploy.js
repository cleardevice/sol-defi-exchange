const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS } = require("../constants");

const WAIT_BLOCK_CONFIRMATIONS = 6;

async function waitToConfirmations(contract) {
  console.log(`Waiting for ${WAIT_BLOCK_CONFIRMATIONS} confirmations...`);

  await contract.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
}

async function main() {
  const cryptoDevTokenAddress = CRYPTO_DEV_TOKEN_CONTRACT_ADDRESS;
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so exchangeContract here is a factory for instances of our Exchange contract.
  */
  const exchangeContract = await ethers.getContractFactory("Exchange");

  // here we deploy the contract
  const deployedExchangeContract = await exchangeContract.deploy(
    cryptoDevTokenAddress
  );
  console.log(
    `Contract deployed to ${deployedExchangeContract.address} on ${network.name}`
  );
  await waitToConfirmations(deployedExchangeContract);
  await run(`verify:verify`, {
    address: deployedExchangeContract.address,
    constructorArguments: [cryptoDevTokenAddress],
  });
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
