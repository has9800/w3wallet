const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transacitons = await Transactions.deploy();

  await transacitons.deployed();

  console.log("Transactions deployed to: ", transacitons.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain(); 