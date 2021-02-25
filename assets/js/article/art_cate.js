$(function () {
  const form = layui.form;
  initCateInfo();

  function initCateInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success(res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        const htmlStr = template('tpl-table', res);
        console.log(htmlStr);

        $('tbody').html(htmlStr);
      },
    });
  }
  let addIndex = null;
  $('#btnAddCate').on('click', function () {
    addIndex = layer.open({
      // 弹出层类型
      type: 1,

      // 弹出层宽高
      area: ['500px', '300px'],

      // 弹出层标题
      title: '添加类别',

      // 弹出层里面的内容
      content: $('#dialog-add').html(),
    });
  });

  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    // 发起ajax请求
    $.ajax({
      type: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message);
        }

        layer.msg('添加分类成功');
        initCateInfo();
        layer.close(addIndex);
      },
    });
  });

  let editIndex = null;
  // 编辑按钮的点击事件
  $('tbody').on('click', '.btn-edit', function () {
    editIndex = layer.open({
      // 弹出层类型
      type: 1,

      // 弹出层宽高
      area: ['500px', '300px'],

      // 弹出层标题
      title: '编辑类别',

      // 弹出层里面的内容
      content: $('#dialog-edit').html(),
    });

    const id = $(this).data('id');
    console.log(id);

    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data);
      },
    });
  });

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！');
        }
        layer.msg('更新分类数据成功！');
        layer.close(editIndex);
        initCateInfo();
      },
    });
  });

  $('tbody').on('click', '.btn-delete', function () {
    // 删除按钮绑定自定义属性 data-id 以及类名 btn-delete
    var id = $(this).attr('data-id');
    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除分类失败！');
          }
          layer.msg('删除分类成功！');
          layer.close(index);
          initCateInfo();
        },
      });
    });
  });
});
