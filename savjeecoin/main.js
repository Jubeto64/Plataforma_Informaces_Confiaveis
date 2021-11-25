const{BlockChain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('998fa92ccbbecb0cd3fab1f3c4b8b4d5790ee7474cdcac5570c099a2a4b3c750');
const myWalletAddress = myKey.getPublic('hex');

let savjeeCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);

console.log('\n Starting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is', savjeeCoin.getBalanceOfAddress(myWalletAddress));

savjeeCoin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', savjeeCoin.isChainValid());