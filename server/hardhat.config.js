require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      // url: process.env.ROPSTEN_HTTP_ADDRESS,
      // accounts: [process.env.METAMASK_KEY]
      url: 'https://eth-ropsten.alchemyapi.io/v2/Daa7b8-xK__EMjXyQwYq8sKolpaFTP3d',
      accounts: ['c9ef828e608519578aa7d4c51209a03e198de5b659fe859c43861b5457858675']
    }
  }
}