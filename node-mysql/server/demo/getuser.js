var db = require('../db');
var Q = require('q');

var data = {};

// 页面加载
exports.OnLoad = function(req, callback) {
    var id = req.param('id');

    // 执行一组业务逻辑
    var actions;
    if (typeof(id)!="undefined" && id>0) {
        actions = Q.all([
            QueryUser(id)
        ]);
    } else {
        actions = Q.all([
            QueryUserAll()
        ]);
    }
    // 执行完成后回调函数
    actions.then(function() {
        callback(null, data);
    })
}

// 查询单个用户信息
var QueryUser = function(id) {
    var deferred = Q.defer();

    var query = 'SELECT * FROM User WHERE id = ?';
    db.Run(query, [ id ], function(err, rows, fields) {
        if (err) throw err;
        // 用户信息
        if (rows.length > 0) {
            data = rows[0];
        }
        deferred.resolve();
    });

    return deferred.promise;
}

// 查询全部用户信息
var QueryUserAll = function() {
    var deferred = Q.defer();

    var query = 'SELECT * FROM User';
    console.log(query)
    db.Run(query, [], function(err, rows, fields) {
        if (err) throw err;
        data.Users = [];
        // 用户信息
        for (var i = 0; i < rows.length; i++) {
            data.Users[i] = rows[i];
        }
        deferred.resolve();
    });

    return deferred.promise;
}