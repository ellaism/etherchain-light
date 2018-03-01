var reverseABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "resolver",
        "type": "address"
      }
    ],
    "name": "claimWithResolver",
    "outputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "claim",
    "outputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ens",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "defaultResolver",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "addr",
        "type": "address"
      }
    ],
    "name": "node",
    "outputs": [
      {
        "name": "ret",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [
      {
        "name": "node",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "ensAddr",
        "type": "address"
      },
      {
        "name": "resolverAddr",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "constructor"
  }
];

var resolverABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "ens",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "node",
        "type": "bytes32"
      },
      {
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "setName",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "ensAddr",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "constructor"
  }
];

var Web3 = require('web3');

function nameFormatter(config) {  
  this.conf = config;
  
  this.web3 = new Web3();
  this.web3.setProvider(new Web3.providers.HttpProvider("https://jsonrpc.ellaism.org"));

  this.reverseContract = this.web3.eth.contract(reverseABI).at("0x268e3C120a46d9fF7e27D05eDC570fE82d8c318D");
  this.resolverContract = this.web3.eth.contract(resolverABI).at("0x632dc20Bd49e96CD9ad525e4FfC70Be6368119f1");
  
  this.resolved = {};
  this.names = {};
  
  this.clear = function() {
    this.resolved = {};
    this.names = {};
  }
  
  this.startClear = function() {
    var self = this;
    
    setTimeout(function() {
      self.clear();
      self.startClear();
    }, 3600 * 1000);
  }
  
  this.startClear();
  
  this.format = function(address) {
    if (this.resolved[address]) {
      if (this.names[address]) {
        return this.names[address];
      } else {
        return address;
      }
    }
    
    var cwd = process.cwd();
    process.chdir("/tmp");
    var namehash = this.reverseContract.node.call(address);
    var domain = this.resolverContract.name.call(namehash);
    process.chdir(cwd);
    
    this.resolved[address] = true;
    this.names[address] = domain;

    if (domain) {
      return domain;
    } else {
      return address;
    }
  }
}
module.exports = nameFormatter;
