import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Row, Col, Alert } from 'antd';

const LoginPage = ({ form, dispatch, error }) => {
  const FormItem = Form.Item;
  const { getFieldDecorator, validateFields } = form;
  const submitSave = (e) => {
    e.preventDefault(); // 阻止表单的默认行为
    dispatch({ type: 'member/clearError' }); // 清除错误提示
    // 验证表单项 err 错误信息,values 表单项的数据
    validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'member/login', payload: values }); // 保存
      } else {
        // console.log('验证失败');
        // console.dir(err);
      }
    });
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
          <Button htmlType="submit" type="primary" style={{ width: '100%' }}>登陆</Button>
        </Form>
        <Alert style={{ display: (error ? '' : 'none') }} message={error} type="error" showIcon />
        <a href="#/reg">没有账号,我要注册</a>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return state.member;
};

export default connect(mapStateToProps)(Form.create()(LoginPage));
