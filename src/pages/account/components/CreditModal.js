import React from 'react'
import { connect } from 'dva'
import { Modal, Button, Row, Col, Form, Input } from 'antd'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

const FormItem = Form.Item

class CreditModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  showModal = () => this.setState({visible: true})

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      uploading: false
    })
  }

  customRequest = (id) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          uploading: true
        })
        this.props.dispatch({
          type: 'balance/setCredit',
          payload: {
            id: this.props.id,
            credit: values.credit,
            notice: values.notice,
            phones: values.phones
          }
        }).then(() => {
          this.props.dispatch({
            type: 'balance/clientFetch',
            payload: {
              page: 1,
              find_str: this.props.find_str
            }
          })
          this.setState({
            uploading: false,
            visible: false
          })
        })
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {children, title, id} = this.props
    const formItemLayout = {
      labelCol: {
        xs: {span: 4, offset: 1},
        sm: {span: 4, offset: 1},
      },
      wrapperCol: {
        xs: {span: 12},
        sm: {span: 12},
      },
    }
    return (
      <div onClick={this.showModal}>
        {children}
        <Modal
          title={title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={null}
        >
          <Form style={{margin: '10px 0 50px'}}>
            <FormItem
              {...formItemLayout}
              label="公司名称"
            >
              {getFieldDecorator('name', {
                initialValue: this.props.name,
              })(
                <Input placeholder='请输入公司名称' disabled/>
              )}
            </FormItem>
            <Row style={{marginBottom: 28}}>
              <Col span={4} offset={1} style={{paddingLeft: 8, paddingTop: 4}}>当前额度：</Col>
              <Col span={12} style={{paddingTop: 4}}>{this.props.credit}元</Col>
            </Row>
            <FormItem
              {...formItemLayout}
              label="设置额度"
            >
              {getFieldDecorator('credit', {
                rules: [{required: true, message: '请填写数字！', pattern: '^[0-9.]*$'}],
              })(
                <Input placeholder='请输入新的额度'/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="预警额度"
            >
              {getFieldDecorator('notice', {
                initialValue: this.props.credit_notice === '0.00' ? '' : this.props.credit_notice,
                rules: [{message: '请填写数字！', pattern: '^[0-9.]*$'}],
              })(
                <Input placeholder='低于该额度将收到短信提醒'/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="短信提醒"
            >
              {getFieldDecorator('phones', {
                initialValue: this.props.phones,
                rules: [{
                  message: '请填写正确联系电话！',
                  max: 11,
                  pattern: '^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$'
                }],
                validateTrigger: 'onBlur',
              })(
                <Input placeholder='请输入接收短信的手机号码'/>
              )}
            </FormItem>
          </Form>
          <Row type='flex' justify='space-between' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col>
              <Button type='primary' style={{width: 120}}
                      onClick={this.customRequest.bind(null, id)} loading={this.state.uploading}>保存</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {find_str} = state.balance
  return {
    find_str,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(Form.create()(CreditModal))
