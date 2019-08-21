import { Form, Icon, Input, Button, Checkbox, Tooltip } from 'antd';
import React from 'react'
import axios from 'axios'
import api from '../../api/index'
let storage = window.localStorage
class Login extends React.Component {
  constructor (props) {
    super(props)
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    const { getFieldsValue } = this.props.form;
    console.log(getFieldsValue().username, getFieldsValue().password)
    const account = getFieldsValue().username;
    const password = getFieldsValue().password;
    // window.sessionStorage['account'] = account;
    //判断输入的内容是否正确
    // const reg = /^1([0-9][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
    const reg = /^1\d{10}/
    if (reg.test(account)) {
      console.log ('发送成功')
      // 向后端请求数据进行验证
      let params = {
        loginName:account,
        password
      }
      // axios.post ( 'http://192.168.0.108:8060/user/login', params)
      api.login(params)
      .then ( res => {
        console.log ( 'res',res.data )
        if (res.data.code === 200) {
          storage.setItem('id',res.data.data.id)
          storage.setItem('loginName',res.data.data.loginName)
          // storage.setItem("roleName",res.data.data.)
          this.props.history.push('/index')
        }
        else {
          alert ('用户名或者密码错误！！！')
        }   
      })
      .catch (console.log('err'))
      // console.log(account)
      // storage.setItem('account',account)
      // console.log(this.props)
      // this.props.history.push('/index')
    }
  };
  //判断用户名输入是否正确
  handleJudge(value) {
    const reg = /\D/g
    if (reg.test(value)) {
      //如果输入错误就弹出警告
      alert('只能输入数字')
    }
  }
  //给父组件传递account
  componentDidMount () {
    console.log(this)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={e => this.handleSubmit(e)} className="login-form" style={{ display: 'block', width: '300px', margin: '200px auto' }}>
        <Form.Item>
          <Tooltip placement="topLeft" title="请输入11位手机号">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                onChange={(e) => { this.handleJudge(e.target.value) }}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Tooltip>

        </Form.Item>
        <Form.Item>
          <Tooltip placement="topLeft" title="请输入正确密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Tooltip>

        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedLogin = Form.create({ name: 'normal_login' })(Login);
export default WrappedLogin;