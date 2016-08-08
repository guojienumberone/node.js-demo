var formidable = require('formidable');
var fs = require('fs');
var Q = require('q');

// 页面加载
exports.OnLoad = function(req, callback) {
    console.log('Upload Start');

    actions = Q.all([
        SaveFile(req)
    ]);
    // 执行完成后回调函数
    actions.then(function() {
        console.log('Upload End');
        callback(null, { code:200 });
    })
}

// 保存文件
var SaveFile = function(req) {
    var deferred = Q.defer();

    // 创建上传表单
    var form = new formidable.IncomingForm();
    // 设置编码
    form.encoding = 'utf-8';
    // 设置上传目录
    form.uploadDir = 'public/upload/';
    // 文件大小
    form.maxFieldsSize = 10 * 1024 * 1024;
    // 保留文件扩展名
    //form.keepExtensions = true;
    // 接管文件流处理
    form.handlePart = function(part) {
        var buffers = [], bufferlength = 0;
        // 接收文件流
        part.on('data', function(buffer) {
            if (buffer.length == 0) return;
            buffers.push(buffer);
            bufferlength += buffer.length;
        });
        // 接收完毕写文件
        part.on('end', function() {
            var filepath = './public/upload/myfile';
            fs.open(filepath, 'a', function (err, fd) {
                if (err)  throw err;
                fs.write(fd, Buffer.concat(buffers, bufferlength), 0, bufferlength, 0, function () {
                    fs.closeSync(fd);
                });
            });
        });
    }
    // 文件上传
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        console.log('Uploading');
        deferred.resolve();
    });
    return deferred.promise;
}