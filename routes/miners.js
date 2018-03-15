var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var fs = require('fs');

function formatMinersTotal(miner) {
  if (miner.stats) {
    return miner.stats.minersTotal || "";
  } else {
    return "";
  }
}

function formatMinersHashrate(miner) {
  if (miner.stats && miner.stats.hashrate) {
    var hashrate = miner.stats.hashrate;
    return (hashrate / 1000000000).toFixed(2) + " GH/s";
  } else {
    return "";
  }
}

function formatBlocks(n, total) {
  return n + " (" + (n / total * 100).toFixed(2) + "%)";
}

router.get('/', function(req, res, next) {
  var config = req.app.get('config');
  var web3 = new Web3();
  web3.setProvider(config.provider);

  fs.readFile(process.env["MINER"], 'utf8', function(err, data) {
    if (err) {
      return callback({name:"NoMinersFound", message: "Chain contains no miners."});
    }

    var data = JSON.parse(data);

    var miners = [];
    Object.keys(data.miners).forEach(function(minerKey) {
      data.miners[minerKey].address = minerKey;

      miners.push(data.miners[minerKey]);
    });

    miners.sort(function(a, b) {
      return (b.minedWeek > a.minedWeek) ? 1 : ((a.minedWeek > b.minedWeek) ? -1 : 0);
    });

    res.render("miners", { miners: miners,
                           formatMinersTotal: formatMinersTotal,
                           formatMinersHashrate: formatMinersHashrate,
                           formatBlocks: formatBlocks });
  });
});

module.exports = router;
