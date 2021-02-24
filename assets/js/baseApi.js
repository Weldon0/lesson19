$.ajaxPrefilter(function (option) {
  option.url = 'http://ajax.frontend.itheima.net' + option.url;

  // /my开头的接口添加统一的请求头
  if (option.url.includes('/my')) {
    option.headers = {
      Authorization: localStorage.token || '',
    };

    const successFunction = option.success.bind(this);
    option.success = function (res) {
      // 面向切片编程
      // option.success(res);
      successFunction(res);
      const { message, status } = res;
      if (message === '身份认证失败！' && status === 1) {
        localStorage.removeItem('token');
        location.href = '/login.html';
      }
    };

    // option.complete = function (response) {
    //   console.log(response);
    //   const { message, status } = response.responseJSON;
    //   if (message === '身份认证失败！' && status === 1) {
    //     localStorage.removeItem('token');
    //     location.href = '/login.html';
    //   }
    // };
  }
});

// 提交login到github

// git add .
// git commit -m '提交信息'
// git push -u origin login
// git checkout main
// git merge login
// 解决冲突
// git add .
// git commit -m '解决冲突'
// git push

// 面向切片

// 防抖
// 你了解防抖和节流吗？
// 请说一下防抖是如何实现的？
// 请写一下代码？

// const arrayMethods = Object.create(Array.prototype);

// const arr = [1, 2, 3]
