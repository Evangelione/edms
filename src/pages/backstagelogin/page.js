import {Card, Form, Icon, Input, Button} from 'antd'
import {connect} from 'dva'
import styles from './login.css'

const FormItem = Form.Item

function mapStateToProps(state) {
  return {
    loading: state.loading.models.login
  }
}

export default connect(mapStateToProps)(Form.create()(({dispatch, loading, form}) => {
  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/backlogin',
          payload: {
            form: values
          }
        })
      }
    })
  }

  return (
    <Card className={styles.card} bodyStyle={{padding: 0}}>
      <div className={styles.title}>蓝采和后台登录界面</div>
      <Form onSubmit={handleSubmit} className={styles["login-form"]} id='special'>
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
                   className={styles['login-form-input']}/>
          )}
        </FormItem>
        <FormItem>
          {form.getFieldDecorator('pwd', {
            rules: [{
              required: true,
              message: <div><Icon type="exclamation-circle"/> 密码错误，请重新输入</div>,
            }],
          })(
            <Input prefix={<Icon type="lock" style={{color: '#898F97', fontSize: 23, marginLeft: 6}}/>} type="password"
                   placeholder="Password" className={styles['login-form-input']}/>
          )}
        </FormItem>
        <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={loading}>
          登录
        </Button>
      </Form>
    </Card>
  )
}))
