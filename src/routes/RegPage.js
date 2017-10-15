import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, Alert } from 'antd';

const RegPage = ({ form, dispatch, error }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator, validateFields } = form;
  const submitSave = (e) => {
    e.preventDefault(); // 阻止表单的默认行为
    dispatch({ type: 'member/clearError' }); // 清除错误提示
    // 验证表单项 err 错误信息,values 表单项的数据
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'member/reg', payload: values }); // 保存
      } else {
        // console.log('验证失败');
        // console.dir(err);
      }
    });
  };

  // 确认密码验证
  const checkPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('pwd')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };

  return (
    <Row>
      <Col span={20} offset={2}>
        <Form onSubmit={submitSave}>
          <FormItem label="用户名">
            {getFieldDecorator('user_name', {
              rules: [{
                required: 'true',
                message: '用户名不能为空',
              }, {
                min: 2,
                message: '用户名最小长度为2',
              }],
            })(<Input placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator('pwd', {
              rules: [{
                required: 'true',
                message: '密码不能为空',
              }],
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>
          <FormItem label="确认密码">
            {getFieldDecorator('repwd', {
              rules: [{
                validator: checkPassword,
              }],
            })(<Input type="password" placeholder="请再次输入密码" />)}
          </FormItem>
          <FormItem label="姓名">
            {getFieldDecorator('name', {
              rules: [{
                required: 'true',
                message: '姓名不能为空',
              }],
            })(<Input placeholder="请输入姓名" />)}
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
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>注册</Button>
        </Form>
        <Alert style={{ display: (error ? '' : 'none') }} message={error} type="error" showIcon />
        <a href="#/login">已有账号,我要登陆</a>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return state.member;
}

export default connect(mapStateToProps)(Form.create()(RegPage));
