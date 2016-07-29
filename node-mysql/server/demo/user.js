var db = require('../db');
var Q = require('q');

// 定义页面模板
var template = 'demo/user';

var data = {};
// 页面标题
data.title = "用户管理";

// 页面加载
exports.OnLoad = function(req, callback) {

    // 执行一组业务逻辑
    var actions = Q.all([
        QueryUserAll()
    ]);
    
    // 执行完成后回调函数
    actions.then(function() {
        callback(template, data);
    })

    //QueryUserAll(callback);
    //callback(template, data);
}

// 查询全部用户信息
var QueryUserAll = function() {
    var deferred = Q.defer();

    var query = 'SELECT * FROM User';
    db.Run(query, [], function(err, rows, fields) {
        if (err) throw err;
        data.Users = [];
        // 用户信息
        for (var i = 0; i < rows.length; i++) {
            data.Users[i] = rows[i]
        }
        deferred.resolve();
    });

    return deferred.promise;
}

