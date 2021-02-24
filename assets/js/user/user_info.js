$(function () {
  // console.log(layui);
  // {
  //   form: '',
  //   layer: ''，
  // }
  const { form, layer } = layui;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称不能大于6位';
      }
    },
  });
  initUserInfo();
  function initUserInfo() {
    // 获取用户基本信息
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败');
        }
        form.val('userInfo', res.data);
      },
    });
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  });

  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      // 快速获取表单数据
      data: $(this).serialize(),
      success(res) {
        // 判断响应结果
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        // 调用父页面渲染头像跟用户名的方法
        window.parent.getUserInfo();
      },
    });
  });
});

// 创建表单区域 引入layui.all.js jquery user/user_info.js
//
