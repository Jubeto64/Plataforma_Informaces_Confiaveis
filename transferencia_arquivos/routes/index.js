var express = require('express');
var SHA256 = require('crypto-js/sha256');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload' });
});

router.post('/', function(req, res) {
  var binaryData = req.files.file;
  var base64String = Buffer.from(JSON.stringify(binaryData)).toString('base64');
  var hash = SHA256(base64String).toString();
  console.log('Hash feita com sucesso, hash: ' + hash);
});

module.exports = router;
