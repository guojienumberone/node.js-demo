var db = require('../db');
var Q = require('q');

// 页面加载
exports.OnLoad = function(req, callback) {
    var data = {};
    data.id = req.param('id');
    data.firstname = req.param('firstname');
    data.lastname = req.param('lastname');
    data.message = req.param('message');

    // 执行一组业务逻辑
    var actions = Q.all([
        SetUser(data)
    ]);
    // 执行完成后回调函数
    actions.then(function() {
        callback(null, { isok : true });
    })
}

// 查询全部用户信息
var SetUser = function(data) {
    var deferred = Q.defer();

    var sql = '';
    var values = [];
    if (data.id>0) {
        sql = 'UPDATE User SET firstname = ?, lastname = ?, message = ? WHERE id = ?';
        values = [data.firstname, data.lastname, data.message, data.id];
    } else {
        sql = 'INSERT INTO User Set firstname = ?, lastname = ?, message = ?';
        values = [data.firstname, data.lastname, data.message];
    }

    db.Run(sql, values, function(err, results) {
        if (err) throw err;
        deferred.resolve();
    });

    return deferred.promise;
}