var Web3 = require('web3');
var namehash = require('eth-ens-namehash');
var abi = require('./abi');

function nameFormatter(config) {  
  this.conf = config;
  
  this.web3 = new Web3();
  this.web3.setProvider(config.provider);

  this.reverseContract = this.web3.eth.contract(abi.reverseABI).at("0x268e3C120a46d9fF7e27D05eDC570fE82d8c318D");
  this.resolverContract = this.web3.eth.contract(abi.resolverABI).at("0x632dc20Bd49e96CD9ad525e4FfC70Be6368119f1");
  this.ensContract = this.web3.eth.contract(abi.ensABI).at("0x518232dd973C321107D28Cb11483b857b9A1E158");
  this.publicContract = this.web3.eth.contract(abi.publicABI).at("0xFd570C3E2BEd90637375071634A12625406EC3c8");
  
  this.resolved = {};
  this.names = {};
  
  this.clear = function() {
    this.resolved = {};
    this.names = {};

    var self = this;
    this.ensContract.NewOwner(null, {
      fromBlock: "0x0"
    }, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }

      self.lookup(result.args.owner);
    });
    this.ensContract.Transfer(null, {
      fromBlock: "0x0"
    }, function(err, result) {
      if (err) {
        console.log(err);
        return;
      }

      self.lookup(result.args.owner);
    });
  }
  
  this.startClear = function() {
    this.clear();

    var self = this;
    setTimeout(function() {
      self.clear();
      self.startClear();
    }, 3600 * 1000);
  }
  
  this.startClear();

  this.lookup = function(address) {
    if (this.resolved[address]) {
      return;
    }

    this.resolved[address] = true;

    var self = this;
    self.reverseContract.node.call(address, function(err, addrNamehash) {
      if (err) {
        console.log(err);
        return;
      }
      self.resolverContract.name.call(addrNamehash, function(err, domain) {
        if (err) {
          console.log(err);
          return;
        }
        if (domain) {
          var domainNamehash = namehash.hash(domain);
          self.publicContract.addr.call(domainNamehash, function(err, resolvedAddress) {
            if (err) {
              console.log(err);
              return;
            }
            if (resolvedAddress == address) {
              self.names[address] = domain;
            }
          });
        }
      });
    });
  }
  
  this.format = function(address) {
    if (this.names[address]) {
      return this.names[address];
    } else {
      return address;
    }
  }
}
module.exports = nameFormatter;
