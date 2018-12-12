import React, { Component } from 'react'
import { connect } from 'dva'
import { Card, Form, Icon, Input, Button } from 'antd'
import styles from './login.css'
import { LOGO } from '../../constants'
import NProgress from 'nprogress'

const FormItem = Form.Item

function mapStateToProps(state) {
  return {
    loading: state.loading.models.login,
  }
}

class Login extends Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'login/checkLogin',
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    NProgress.start()
    NProgress.set(0.2)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/login',
          payload: {
            form: values,
          },
        })
      }
    })
  }


  render() {
    const form = this.props.form
    return (
      <Card className={styles.card} bodyStyle={{padding: 0}}>
        <div className={styles.title}>{LOGO[window.location.hostname.match(/[A-Za-z]+/g)[0]].name}平台登录界面</div>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']} id='special'>
          <FormItem>
            {form.getFieldDecorator('account', {
              rules: [{
                required: true,
                message: <div><Icon type="exclamation-circle"/> 账号不能为空</div>,
              }],
              validateTrigger: 'onBlur',
            })(
              <Input prefix={<Icon type="user" style={{color: '#898F97', fontSize: 23, marginLeft: 6}}/>}
                     placeholder="Username"
                     className={styles['login-form-input']}/>,
            )}
          </FormItem>
          <FormItem>
            {form.getFieldDecorator('pwd', {
              rules: [{
                required: true,
                message: <div><Icon type="exclamation-circle"/> 密码错误，请重新输入</div>,
              }],
            })(
              <Input prefix={<Icon type="lock" style={{color: '#898F97', fontSize: 23, marginLeft: 6}}/>}
                     type="password"
                     placeholder="Password" className={styles['login-form-input']}/>,
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']} loading={this.props.loading}>
            登录
          </Button>
        </Form>
      </Card>
    )
  }
}

export default connect(mapStateToProps)(Form.create()(Login))
