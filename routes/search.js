var express = require('express');
var router = express.Router();
var abi = require('../utils/abi');
var Web3 = require('web3');
var namehash = require('eth-ens-namehash');

router.post('/', function(req, res, next) {
  var searchString = req.body.search.trim().toLowerCase();

  if (searchString.endsWith(".ella")) {
    var config = req.app.get('config');
    var web3 = new Web3();
    web3.setProvider(config.provider);

    var publicContract = web3.eth.contract(abi.publicABI).at("0xFd570C3E2BEd90637375071634A12625406EC3c8");
    var domainNamehash = namehash.hash(searchString);
    publicContract.addr.call(domainNamehash, function(err, address) {
      if (err) {
        return next({ message: "Error: Unable to resolve ENS name." });
      }

      if (address.length == 42) {
        return res.redirect('/account/' + address);
      } else {
        return next({ message: "Error: ENS name not found." });
      }
    });
    return;
  }
	
  if (searchString.length > 22 && searchString.substr(0,2) != '0x') {
    searchString = '0x' + searchString;
  }
    
  if (searchString.length === 2) {
	return next({ message: "Error: Invalid search string!" });
  } else if (searchString.length < 22) {
	// Most likely a block number, forward to block id handler
	res.redirect('/block/' + searchString);
  } else if (searchString.length == 66) {
	res.redirect('/tx/' + searchString);
  } else if (searchString.length == 42) {
	res.redirect('/account/' + searchString);
  } else {
    return next({ message: "Error: Invalid search string!" });
  }
});

module.exports = router;
