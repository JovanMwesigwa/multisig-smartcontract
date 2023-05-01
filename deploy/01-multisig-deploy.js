const { ethers, network } = require('hardhat')
const { verifyContract } = require('../utils/verifyContract')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts()

  const account1 = '0x5CBDf5f9E468dF3888e04155668CcAfC6F6C4dcf'
  const account2 = '0xD2c2591162162Fc57a40bc8a3C9cff0E6dFc9824'
  const chainId = network.config.chainId
  const amount = ethers.utils.parseEther('0.5')

  const { deploy, log } = deployments

  const args = [[account1, account2]]
  const waitConfirmations = 1

  // Only verify the contract when we are deploying on celo test net
  const tx = await deploy('MultisigWallet', {
    from: deployer,
    args: args,
    waitConfirmations: waitConfirmations,
    log: true,
    value: amount,
  })
  log('MultisigWallet contract deployed --------------')

  if (chainId != 31337) {
    log('Verifying the contract on celoscan...')
    await verifyContract(tx.address, args)
  }
}

module.exports.tags = ['all', 'deploy']
