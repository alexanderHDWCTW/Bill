var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var data = [];
var date = [];
var lastgrabbed;

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

router.get('/*', function(req, res, next) {
  var hash = req.url.hashCode()
  var urlBase = 'http://millerlister.com/';
  var mydata = '';

  if(!data[hash] && date[hash] != Date.now ){

     //data.date[hash].date = Date.now;
     //data.date[hash].data = data;

    request(urlBase+req.url, function (error, response, html) {
      if (!error && response.statusCode == 200) {
        data[hash] = html;
        date[hash] = Date.now;
        res.send(html)
      }
    });
  }else{
    console.log('send local')
    res.send(data[hash])
  }
});




module.exports = router;




