// 定义页面模板
var template = 'index';

var data = {};
// 页面标题
data.title = "Weclome";

// 页面加载
exports.OnLoad = function(req, callback) {
    callback(template, data);
}