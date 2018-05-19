function process_data(response){
        console.log(response);
        console.log(response[0]);
        var priceUSD = response[0]["price_usd"];
        //var priceJPY = response[0]["price_jpy"];
        var priceBTC = response[0]["price_btc"];
        document.getElementById("price-usd").innerHTML = parseFloat(priceUSD).toFixed(2);
       // document.getElementById("price-jpy").innerHTML = parseFloat(priceJPY).toFixed(2);
        document.getElementById("price-btc").innerHTML = priceBTC;
    };

var $j = jQuery.noConflict();
    $j(document).ready(function() {
        const http = new XMLHttpRequest()
        http.open("GET", "https://api.coinmarketcap.com/v1/ticker/ellaism/?convert=eur");
        http.send();
        http.onload = () => process_data(JSON.parse(http.responseText));
    });
