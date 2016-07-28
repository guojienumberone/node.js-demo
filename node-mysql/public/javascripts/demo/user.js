$(function () {
    $('button').button();

    $('#button_add').click(function () {
        $("input[name='id']").val(0);
        $("input[name='firstname']").val('');
        $("input[name='lastname']").val('');
        $("input[name='message']").val('');

        $('#dialog_user').dialog('open');
        return false;
    })

    var BindButtonEdit = function () {
        $('button[name=button_edit]').click(function () {
            $.ajax({
                type: 'get',
                url: "/demo/getuser",
                cache: false,
                data: {id: $(this).val()},
                success: function (data) {
                    if (data) {
                        $("input[name='id']").val(data.id);
                        $("input[name='firstname']").val(data.firstname);
                        $("input[name='lastname']").val(data.lastname);
                        $("input[name='message']").val(data.message);
                        $('#dialog_user').dialog('open');
                    } else {
                        alert('获取用户信息失败');
                    }
                },
            });
            return false;
        })
    }
    BindButtonEdit();

    $('#dialog_user').dialog({
        autoOpen: false,
        width: 250,
        buttons: {
            "提交": function () {
                var data = {};
                data.id = $("input[name='id']").val();
                data.firstname = $("input[name='firstname']").val();
                data.lastname = $("input[name='lastname']").val();
                data.message = $("input[name='message']").val();

                $.ajax({
                    type: 'get',
                    url: "/demo/setuser",
                    cache: false,
                    data: data,
                    success: function(data){
                        if(data && data.isok == true){
                            BindUser();//重新绑定用户信息
                            $('#dialog_user').dialog("close");
                        } else{
                            alert('保存用户信息失败');
                        }
                    },
                });
            },
            "取消": function () {
                $(this).dialog("close");
            }
        }
    });

    function BindUser() {
        $.ajax({
            type: 'get',
            url: "/demo/getuser",
            cache: false,
            success: function(data){
                if(data){
                    var html = "";
                    for (var i=0; i< data.Users.length; i++) {
                        var user = data.Users[i];
                        html += "<tr>";
                        html += "<td>"+user.id+"</td>";
                        html += "<td>"+user.firstname+"</td>";
                        html += "<td>"+user.lastname+"</td>";
                        html += "<td>"+user.message+"</td>";
                        html += "<td><button name='button_edit' class='ui-button-success' value='"+user.id+"'>编辑</button></td>";
                        html += "</tr>";
                    }
                    $("table tbody").html(html);
                    BindButtonEdit();
                    $('button').button();
                } else{
                    alert('获取用户信息失败');
                }
            },
        });
    }
});