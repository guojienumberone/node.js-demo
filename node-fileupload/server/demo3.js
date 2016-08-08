// 定义页面模板
var template = 'demo3';

var data = {};
// 页面标题
data.title = "呆萌三:Ajax分断上传文件";

// 页面加载
exports.OnLoad = function(req, callback) {
    callback(template, data);
}