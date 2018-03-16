var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var fs = require('fs');

router.get('/cmc/total', function(req, res, next) {
  fs.readFile(process.env["TOTAL"], 'utf8', function(err, data) {
    if (err) {
      return res.status(500).send('Error when reading total supply.')
    }
    
    res.send(data);
  });
});

module.exports = router;
