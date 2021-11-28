var express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const{BlockChain, Transaction} = require('../blockchain');
const{BlockchainService} = require('../bockchainService');

var router = express.Router();

var BlockchainServiceInstance = new BlockchainService;
var selectedBlock = BlockchainServiceInstance.getBlocks()[1];

let blocks = BlockchainServiceInstance.getBlocks();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { blocks, transactions: selectedBlock.transactions});
});

router.post('/', function(req, res, next){
  selectedBlock = JSON.parse(req.body.block);
  let transactions = [];
  let temp_transaction;
  selectedBlock.transactions.map((item)=>{
    temp_transaction = new Transaction(item.fromAddress, item.toAddress, item.amount)
    temp_transaction.timestamp = item.timestamp
    transactions.push(temp_transaction)
  })
  console.log(selectedBlock)
  res.render('index', { blocks, transactions});
})

module.exports = router;
