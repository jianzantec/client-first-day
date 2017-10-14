import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button } from 'antd';

const StudentRegPage = ({ form, dispatch, location }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator, validateFields } = form;
  const submitSave = (e) => {
    e.preventDefault(); // 阻止表单的默认行为
    // 验证表单项 err 错误信息,values 表单项的数据
    validateFields((err, values) => {
      if (!err) {
        values = Object.assign(values, location.state);     // 把路由中传递的数据保存到提交服务器的内容中
        dispatch({ type: 'student/add', payload: values }); // 保存
      } else {
        // console.log('验证失败');
        // console.dir(err);
      }
    });
  };

  return (
    <div>
      <Form onSubmit={submitSave}>
        <FormItem label="名字">
          {getFieldDecorator('name', {
            rules: [{
              required: 'true',
              message: '名字不能为空',
            }, {
              min: 2,
              message: '名字最小长度为2',
            }],
          })(<Input placeholder="请输入名字" />)}
        </FormItem>
        <FormItem label="qq">
          {getFieldDecorator('qq', {
            rules: [],
          })(<Input placeholder="请输入qq" />)}
        </FormItem>
        <FormItem label="手机号">
          {getFieldDecorator('mobile', {
            rules: [],
          })(<Input placeholder="请输入描述" />)}
        </FormItem>
        <FormItem label="描述">
          {getFieldDecorator('description', {
            rules: [{
              required: 'true',
              message: '描述信息不能为空',
            }, {
              min: 2,
              message: '最小长度为2',
            }],
          })(<Input type="textarea" placeholder="请输入描述" />)}
        </FormItem>
        <Button htmlType="submit" type="primary">保存</Button>
      </Form>
    </div>
  );
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Form.create()(StudentRegPage));
