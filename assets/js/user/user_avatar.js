// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
};

// 1.3 创建裁剪区域
$image.cropper(options);

$('#chooseImg').on('click', function () {
  // 让input框做点击
  $('#file').click();
});

$('#file').on('change', function (e) {
  const fileList = this.files;
  // console.log(fileList);
  if (fileList.length === 0) {
    return layer.msg('请选择文件');
  }

  const file = fileList[0];

  // 转换成url地址
  const imgUrl = URL.createObjectURL(file);

  // 调用插件方法提换图片
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', imgUrl) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

$('#upload').on('click', function () {
  // 获取到用户选择好的图片
  const dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png');
  // 图片上传到服务器

  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL,
    },
    success(res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg('更换头像失败');
      }

      // 刷新父页面头像
      window.parent.getUserInfo();
    },
  });
});
