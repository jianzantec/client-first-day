import React from 'react';
import { Form, Input, Button, Radio, message, Icon, Upload } from 'antd';
import styles from './CreateStudent.css';
import { server } from '../utils/config';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class CreateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      avatars: '',
    };
  }
  getFilePath(e) {
    if (e.file.response) {
      // refs[imgCtrl].src = server + e.file.response.info;
      return e.file.response.info;
    } else {
      return '';
    }
  }
  handleChange(info) { // 上传成功之后处理
    // console.log(info);
    if (info.file.status === 'done') {
      // console.log(info);
      const str = server + info.file.response.info; // 获取服务器端返回的数据
      // console.log(str);
      this.setState({
        avatars: str,
      });
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }
  submitSave(e) {
    // console.log(this.props);
    e.preventDefault(); // 阻止表单的默认行为
    // 验证表单项 err 错误信息,values 表单项的数据
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        // 把路由中传递的数据保存到提交服务器的内容中
        values = Object.assign(values, this.props.position, this.props.isAdmin);
        // console.log(values);
        this.props.dispatch({ type: 'student/add', payload: values }); // 保存
        // message.success('学生信息注册成功');
        this.props.closePopWin(); // 关闭弹出层
      } else {
        // console.log('验证失败');
        // console.dir(err);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const imgCtrl = 'imgCtrl';
    return (
      <div>
        <Form onSubmit={this.submitSave.bind(this)}>
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
          <FormItem label="性别">
            {getFieldDecorator('gender', {
              rules: [],
              initialValue: '男',
            })(<RadioGroup>
              <Radio value={'男'}>男</Radio>
              <Radio value={'女'}>女</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem label="头像">
            {getFieldDecorator('avatars', {
              rules: [],
              getValueFromEvent: this.getFilePath,
            })(<Upload
              className={styles['avatar-uploader']}
              name="file"
              showUploadList={false}
              action={`${server}/common/upload`}
              beforeUpload={beforeUpload}
              onChange={this.handleChange.bind(this)}
            >
              {
                this.state.avatars ?
                  <img src={this.state.avatars} ref={imgCtrl} alt="" className={styles.avatar} /> :
                  <Icon type="plus" className={styles['avatar-uploader-trigger']} />
              }
            </Upload>)}
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
      </div>);
  }
}
export default Form.create()(CreateStudent);
