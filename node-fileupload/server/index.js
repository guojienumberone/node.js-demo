// 定义页面模板
var template = 'index';

var data = {};
// 页面标题
data.title = "三步实现分断文件上传";

// 页面加载
exports.OnLoad = function(req, callback) {
    callback(template, data);
}