var express = require('express');
var router = express.Router();

var Run = function(req, res) {
  var url = req.originalUrl;
  if (url == "/") {
    url = "/index";
  }
  var m = url.match(/[^\/][\/a-zA-Z0-9]*/g);
  if (m.length > 0) {
    var name = m[0];
    var module = require('../server/' + name);
    module.OnLoad(req, function(template, data){
      if (template==null) {
        res.send(data);
      } else {
        res.render(template, data);
      }
    })
  }
}

router.get('/*', function(req, res, next) {
  Run(req, res);
});

router.post('/*', function(req, res, next) {
  Run(req, res);
});

module.exports = router;
