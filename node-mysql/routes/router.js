var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function(req, res, next) {
    var url = req.originalUrl;
    console.log(url);
    if (url == "/") {
        url = "/index";
    }
    var m = url.match(/[^\/][\/a-zA-Z0-9]*/g);
    if (m.length > 0) {
        var name = m[0];
        //res.render(name, { title: 'Express' });

        var module = require('../server/' + name);
        module.OnLoad(req, function(template, data){
            if (template==null) {
                res.send(data);
            } else {
                res.render(template, data);
            }
        })

    }
});

module.exports = router;
