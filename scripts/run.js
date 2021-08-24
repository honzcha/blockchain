async function main() {
  const [owner, randoPerson] = await ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("1"),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);

  console.log("Contract deployed by", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log("Balance", hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  let waveTxn = await waveContract.wave("A message");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Balance", hre.ethers.utils.formatEther(contractBalance));

  // txn = transaction
  waveTxn = await waveContract.wave("Another message");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Balance", hre.ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log("All Waves:", allWaves);

  waveCount = await waveContract.getTotalWaves();

  waveTxn = await waveContract.connect(randoPerson).wave("message");
  await waveTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Balance", hre.ethers.utils.formatEther(contractBalance));

  waveCount = await waveContract.getTotalWaves();
  console.log("Total waves", waveCount);
  console.log("Balance", hre.ethers.utils.formatEther(contractBalance));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
