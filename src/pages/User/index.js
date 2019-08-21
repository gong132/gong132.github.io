import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from  './index.less'

class Login extends React.Component {

  handleSubmit(e) {
    const { form, history } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log(values)
        console.log(this.props)
        history.push("/main")
      }
    });
  }

  render() {

    const {form:{ getFieldDecorator} } = this.props;
    return (
      <React.Fragment>
        <div className={styles.bgc_img}>
          <Form onSubmit={(e) => this.handleSubmit(e)} className={styles.login_form}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <a className={styles.login_form_forgot} href="#">
                Forgot password
              </a>
              <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                Log in
              </Button>
              Or <a href="#">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}
export default Form.create()(Login)