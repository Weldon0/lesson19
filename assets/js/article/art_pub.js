$(function () {
  const layer = layui.layer;
  const form = layui.form;

  initCate();
  // 初始化富文本编辑器
  initEditor();
  // 定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('初始化文章分类失败！');
        }
        // 调用模板引擎，渲染分类的下拉菜单
        const htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 一定要记得调用 form.render() 方法
        form.render();
      },
    });
  }

  // 1. 初始化图片裁剪器
  var $image = $('#image');

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  $('.btnChooseImg').on('click', function () {
    $('#coverFile').click();
  });

  $('#coverFile').on('change', function () {
    const fileList = this.files;
    console.log(fileList);

    if (!fileList.length) {
      return;
    }

    const imgUrl = URL.createObjectURL(fileList[0]);

    // 插件的方法
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let art_state = '已发布';

  $('#btnSave2').on('click', function () {
    art_state = '草稿';
  });

  $('#form_pub').on('submit', function (e) {
    // 阻止默认提交
    e.preventDefault();

    // 构建formdata
    const fd = new FormData(this);

    // 添加发布状态数据
    fd.append('state', art_state);

    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob);
        // 6. 发起 ajax 数据请求

        publish(fd);
      });
  });

  function publish(fd) {
    $.ajax({
      type: 'POST',
      url: '/my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        location.href = '/article/art_list.html';
      },
    });
  }
});

// 18 - 20 ==> 30 ==>
