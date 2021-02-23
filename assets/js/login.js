$(function () {
  $('#link_reg').on('click', function () {
    $('.reg-box').show();
    $('.login-box').hide();
  });
  $('#link_login').on('click', function () {
    $('.reg-box').hide();
    $('.login-box').show();
  });

  // form.verify();
  const form = layui.form;

  // 定义校验规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
    repwd: function (value) {
      const password = $('.reg-box [name=password]').val();
      if (password !== value) {
        return '两次输入不一致';
      }
    },
  });
  // 注册功能
  $('#reg-form').on('submit', function (e) {
    // debugger;
    e.preventDefault();
    $.ajax({
      url: '/api/reguser',
      type: 'POST',
      data: {
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
          // return console.log(res.message);
        }
        layer.msg('注册成功');

        $('#link_login').click();
        // console.log('success');
      },
    });
  });

  $('#form_login').on('submit', function (e) {
    e.preventDefault();

    // 发起请求
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success(res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        // res.token
        localStorage.setItem('token', res.token);

        location.href = '/index.html';
      },
    });
  });
});
