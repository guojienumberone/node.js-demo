var mysql = require('mysql');
var Run = function(sql, values, callback) {
    var connection = mysql.createConnection({
        host   : 'localhost',
        user   : 'root',
        password : 'adzfY889_o0q',
        database : 'node-demo'
    });
    // 连接数据库
    connection.connect();
    var data = null;
    // 查询
    connection.query(sql, values, callback);
    // 关闭连接
    connection.end();
    return data;
}
exports.Run = Run;