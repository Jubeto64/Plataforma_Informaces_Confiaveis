
const {Blockchain, Transaction} = require('/blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('ebbcd9ec6227194ef3e4e2442447ab2e749843382b59ff52ff32eea8f4351dd0')
const myWallet = myKey.getPublic('hex')


let coin = new Blockchain()

const transacao = new Transaction(myWallet, '045e6a75462842351c105e4024734aa464d99dea70ab9e1ff7c57c25a9c9afdcc801023ff23aff33383e76f0647f876b0443830a10cc12c51e927374d55c8ec788' , 10)
transacao.AssinarTransacao(myKey)
coin.AddTransactions(transacao)

console.log("Começando a minerar")
coin.minePedingTransctions(myWallet)

console.log('Balanço da carteira: ' , coin.getBalanco(myWallet))