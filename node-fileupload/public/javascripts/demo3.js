$(function () {
    $('button').button();

    $("div[name='slider']").slider({
        //orientation: "vertical",
        range: "min",
        min: 0,
        max: 100,
        value: 0,
        slide: function(event, ui) {
            return false;
        }
    });

    $('#upload').click(function () {
        var j = new juploader('/upload3', function () {
            // 上传完毕回调函数
            //alert('上传完毕');
        });
        $("input[type='file']").each(function(){
            // 分断上传成功回调函数
            var file = $(this);
            if (file.val()!='') {
                j.Upload(file[0].files[0], function (progress) {
                    var slider = file.parent().nextAll("div[name='slider']")[0];
                    $(slider).slider('value', progress);
                });
            }
        });
    });
})