var express = require('express');
var router = express.Router();
var Web3 = require('web3');
router.get('/', function(req, res) {
  var message = `<p> get balance (return balance in Ella): http://ellaism.network/api/getbalance?address=0x..... </p>`;
  message = message + `<p> example : <a href ="http://ellaism.network/api/getbalance?address=0xe6be7841a6e6b98edd7b38f884a9e32b4170d6b5">http://ellaism.network/api/getbalance?address=0xe6be7841a6e6b98edd7b38f884a9e32b4170d6b5</a> </p>`;
  
  res.send(message);
});

router.get('/getbalance', function (req, res) {
  var config = req.app.get('config');
  var web3 = new Web3();
  web3.setProvider(config.provider);

	//var id = parseInt(req.params.address);
	//dirty trick here, use increasing nonce to prevent network/ http caching.
	console.log(req.query);
	if(!(req.query.address)) {
		res.send('error');
	}
	else{
		var address = req.query.address;

    web3.eth.getBalance(address, function(err, balance) {
      if(err){
        var result = {"status":"0","message":"error","error":err};
        res.send(result);
      }else{
          var normalized_balance = web3.fromWei(balance, "ether")
			     var result = {"status":"1","message":"ok","result":normalized_balance};
			     res.send(result);

      }

    });
		//console.log(address);
                //res.send('test: '+address);
		//curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
	/*	var curl_data = '{"jsonrpc":"2.0","method":"eth_getBalance","params":["'+ address + '", "latest"],"id":1}';
		curl.request({ url: curl_address, method:'POST', data: curl_data  }, function (err, data) {
		    console.log(data);
			var temp = JSON.parse(data.toString());
			//console.log(temp["result"]);
      if(err){
        var result = {"status":"0","message":"Error","Error":err};
        res.send(result);
      }else{
			     var result = {"status":"1","message":"OK","result":temp["result"]};
			     res.send(result);
      }
		 });
*/

	}

});


module.exports = router;
