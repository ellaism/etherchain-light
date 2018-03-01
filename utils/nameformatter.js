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
  
  this.format = function(address) {
    if (this.conf.names[address]) {
      return this.conf.names[address];
    } else {
      return address;
    }
  }
  
  this.getName = function(address, callback) {
    var web3 = new Web3();
    web3.setProvider(this.conf.provider);
    
    var reverseContract = new web3.eth.Contract(reverseABI, "0x268e3C120a46d9fF7e27D05eDC570fE82d8c318D");
    var resolverContract = new web3.eth.Contract(resolverABI, "0x632dc20Bd49e96CD9ad525e4FfC70Be6368119f1");
    
    reverseContract.methods.node(address).call().then(function(namehash) {
      resolverContract.methods.name(namehash).call().then(function(domain) {
        callback(domain);
      });
    });
  }
}
module.exports = nameFormatter;
