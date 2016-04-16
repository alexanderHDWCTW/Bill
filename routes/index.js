var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:test', function(req, res, next){
  var page = req.params.test.split('.')[0];
  res.render(page);
});

router.get('/', function(req, res, next) {
  res.render('index')
});

module.exports = router;
