var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var config = req.app.get('config');  
  var web3 = new Web3();
  web3.setProvider(config.provider);
  
  fs.readFile(process.env["TOP"], 'utf8', function(err, data) {
    if (err) {
      return next({name:"NoAccountsFound", message: "Chain contains no accounts."});
    }
    
    var accounts = JSON.parse(data);
    accounts = accounts.map(function(account) {
      account.balance = web3.utils.toBigNumber(account.balance);
      return account;
    });
    
    res.render("accounts", { accounts: accounts });
  });
});

module.exports = router;
