const { ethers, network } = require('hardhat')
const verifyContract = require('../utils/verifyContract')

async function main() {
  // Variables
  const signers = await ethers.getSigners()
  const account1 = await signers[0].getAddress()
  const account2 = await signers[1].getAddress()

  const chainId = network.config.chainId

  const amount = ethers.utils.parseEther('0.5')

  // Contract instance
  const Contract = await ethers.getContractFactory('MultisigWallet')
  const multisigContract = await Contract.deploy([account1, account2], {
    value: amount,
  })

  // deploy
  await multisigContract.deployed()

  console.log('====================================')
  console.log('Deployed at: ', multisigContract.address)
  console.log('====================================')

  if (chainId != 31337) {
    console.log('Verifying the contract on celoscan...')
    await verifyContract(multisigContract.address)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
