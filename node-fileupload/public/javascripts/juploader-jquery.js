var juploader = function (action, callback) {
	// 请求Action
	var requestAction = action;
	// 文件分割上传的间隙大小 1M
	var fileSplitSize = 1024 * 1024;

	// 开始上传
	var StartUpload = function (start, length, file, callback) {
		// 构建文件信息
		var data = new FormData();
		// 分断文件信息
		data.append("file", file.slice(start, start + length));
		// 传递参数
		var param = "?filename=" + encodeURIComponent(file.name)
			+ "&length=" + length
			+ "&start=" + start;
		// Ajax调用
		$.ajax({
			url: requestAction + param,
			type: 'POST',
			data: data,
			async: true, //很重要的设置^_^
			cache: false,
			contentType: false,
			processData: false,
			success: function (data) {
				if (200 === data.code) {
					var progress = data.uploaded / file.size * 100;
					console.log("文件上传:"+data.uploaded + " - " + progress.toFixed(0));
					callback(progress.toFixed(0));
				} else {
					console.log("上传出错");
				}
			}
		});
	}
	// 单文件上传
	this.Upload = function (file, callback) {
		var start = 0, size = file.size;
		for (; start < size;) {
			var length = fileSplitSize;
			if (start + fileSplitSize > size) {
				length = size - start;
			}
			// 分断上传
			StartUpload(start, length, file, callback);
			start += length;
		}
	};
}