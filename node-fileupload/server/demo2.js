// 定义页面模板
var template = 'demo2';

var data = {};
// 页面标题
data.title = "呆萌二:自定义文件流处理";

// 页面加载
exports.OnLoad = function(req, callback) {
    callback(template, data);
}