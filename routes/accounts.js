var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var fs = require('fs');

router.get('/', function(req, res, next) {
  var config = req.app.get('config');  
  var web3 = new Web3();
  web3.setProvider(config.provider);
  
  async.waterfall([
    function(callback) {
      fs.readFile(process.env["TOP"], 'utf8', function(err, data) {
        if (err) {
          return callback({name:"NoAccountsFound", message: "Chain contains no accounts."});
        }
    
        var accounts = JSON.parse(data);
        callback(null, accounts);
      });
    }, function(accounts, callback) {
      async.mapSeries(accounts, function(account, eachCallback) {
        web3.eth.getBalance(account.address, function(err, balance) {
          if (err) {
            return eachCallback(err);
          }
          
          account.balance = balance;
          eachCallback(err, account);
        });
      }, function(err, accounts) {
        callback(err, accounts); 
      });
    }
  ], function(err, accounts) {
    if (err) {
      return next(err);
    }
    
    accounts.sort(function(a, b) {
      return b.balance.cmp(a.balance);
    });
    
    for (var i = 0; i < accounts.length; i++) {
      accounts[i].rank = i+1; 
    }
      
    res.render("accounts", { accounts: accounts });
  });
});

module.exports = router;
