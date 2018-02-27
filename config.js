var web3 = require('web3');
var net = require('net');

var config = function () {
  
  this.logFormat = "combined";
  this.ipcPath = process.env["HOME"] + "/.local/share/io.parity.ethereum/jsonrpc.ipc";
  this.provider = new web3.providers.IpcProvider(this.ipcPath, net);
  
  this.bootstrapUrl = "https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css";
  
  this.names = {
    "0xe9c2d958e6234c862b4afbd75b2fd241e9556303": "Dev Fund",
    "0xa2c7779077edc618c926ab5ba7510877c187cd92": "Community Fund",
    "0xe3ecbf9ad12bf63b94fd4f7bc3dc7fcfc56e66ce": "Contributor Fund",
    "0x65767ec6d4d3d18a200842352485cdc37cbf3a21": "pool.ellaism.org",
    "0x395231b5f396fd5b9c6833feea540a3506121ec3": "ella.pool.sexy",
    "0xb170c70143b543cd61e7bcadcb9a2f799becda90": "ella.cryptobitpool.eu",
    "0xd4f3670058cde2fc5548293ada3d0a1d34af9ddc": "ella.cryptopools.info",
    "0xe6be7841a6e6b98edd7b38f884a9e32b4170d6b5": "ella.minerpool.net",
    "0x70a55acb5eec85a7823be72b9c41d73f4411fb85": "pool.ellaism.io",
    "0x4a44ef8b619e27f707bf0b0284c6ecf3e40cefd0": "ella.epool.io",
    "0xf9fdd1d78f106b4e7ede5a0613077fd69d835f88": "DegenPool",
    "0x852936b16e86a831c9653f48489bbc815390795e": "ellaismpool.com",
    "0x6131051b5840da6e4a7916cdaa3c34b5568391a3": "Coins.Farm",
    "0x00a86233f4d65f4018ca7f8626b96ce72af05a7c": "ella.2miners.com",
    "0xc934884be6338925ed2ef41ce567a14abfcf8763": "Melny3",
    "0x119e4cc05bf44f9cd0b34453b204b7c7089814e2": "ell.baikalmine.com",
    "0x706e91ff1a586094855cb2408d54657df6b83258": "Megapool.io"
  }
  
}

module.exports = config;
