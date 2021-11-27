var express = require('express');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const{BlockChain, Transaction} = require('../blockchain');
const{BlockchainService} = require('../bockchainService');

var router = express.Router();

var BlockchainServiceInstance = new BlockchainService

/* GET home page. */
router.get('/', function(req, res, next) {
  let blocks = BlockchainServiceInstance.getBlocks()
  res.render('index', { blocks });
});

module.exports = router;
