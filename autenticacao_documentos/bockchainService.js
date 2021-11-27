const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const{BlockChain, Transaction} = require('./blockchain');


class BlockchainService {
    blockchainInstance = new BlockChain();
    walletKeys = [];
  
    constructor() {
      this.blockchainInstance.difficulty = 1;
      this.blockchainInstance.minePendingTransactions('my-wallet-address');
  
      this.generateWalletKeys();
    }
  
    getBlocks(){
      return this.blockchainInstance.chain;
    }
  
    generateWalletKeys(){
      const ec = new EC('secp256k1');
      const key = ec.genKeyPair();
  
      this.walletKeys.push({
        keyObj: key,
        publicKey: key.getPublic('hex'),
        privateKey: key.getPrivate('hex')
      })
    }
}

module.exports.BlockchainService = BlockchainService;