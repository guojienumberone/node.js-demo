// 定义页面模板
var template = 'demo1';

var data = {};
// 页面标题
data.title = "呆萌一:Ajax上传文件";

// 页面加载
exports.OnLoad = function(req, callback) {
    callback(template, data);
}