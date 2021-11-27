var express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const{BlockChain, Transaction} = require('../blockchain');
const{BlockchainService} = require('../bockchainService');

var router = express.Router();

var BlockchainServiceInstance = new BlockchainService;
var selectedBlock = BlockchainServiceInstance.getBlocks()[1];


function showTransaction(block){
  selectedBlock = block;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  let blocks = BlockchainServiceInstance.getBlocks();
  res.render('index', { blocks, transactions: selectedBlock.transactions});
});

module.exports = router;
