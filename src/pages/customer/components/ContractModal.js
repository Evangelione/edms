import React from 'react'
import {Modal, Form, Select, DatePicker, Input, Row, Col, Button} from 'antd'
import {connect} from 'dva'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const FormItem = Form.Item
const Option = Select.Option
const {RangePicker} = DatePicker

class ContractModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      customerOptions: []
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'customer/fetchOptions',
    }).then(() => {
      const customerOptions = this.props.customOption.map((option, index) =>
        <Option key={index} value={option.id} contact={option.customer_contact} mobile={option.customer_mobile}
                type={option.customer_type}>{option.customer_name}</Option>
      )
      this.setState({
        customerOptions
      })
    })
    this.props.dispatch({
      type: 'customer/fetchCompany',
    })
  }

  customerChange = (value, item) => {
    let type = ''
    if (item.props.type === '1') {
      type = '终端用户'
    } else if (item.props.type === '2') {
      type = '贸易商'
    } else {
      type = item.props.type
    }
    this.props.form.setFieldsValue({
      customer_type: type,
      customer_contact: item.props.contact,
      customer_mobile: item.props.mobile
    })
  }

  showModal = () => this.setState({visible: true})

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'customer/addCustomerContract',
          payload: {
            id: values.customer_id,
            stime: values.sendData[0].format('YYYY-MM-DD hh:00:00'),
            etime: values.sendData[1].format('YYYY-MM-DD hh:00:00'),
          }
        }).then(() => {
          this.setState({
            visible: false,
          })
          this.props.dispatch({
            type: 'customer/salesContractFetch',
            payload: {page: 1}
          })
        })
      }
    })
  }

  render() {

    const {getFieldDecorator} = this.props.form
    const {children, title} = this.props
    const formItemLayout = {
      labelCol: {
        xs: {span: 4, offset: 1},
        sm: {span: 4, offset: 1},
      },
      wrapperCol: {
        xs: {span: 12, offset: 1},
        sm: {span: 12, offset: 1},
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
          footer={null}>
          <Form style={{margin: '10px 0 50px'}}>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="甲方"
            >
              {getFieldDecorator('customer_id', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <Select placeholder='请选择甲方名称...' onChange={this.customerChange}>
                  {this.state.customerOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="甲方类型"
            >
              {getFieldDecorator('customer_type')(
                <Input placeholder='请输入甲方类型...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('customer_contact')(
                <Input placeholder='请输入联系人...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('customer_mobile')(
                <Input placeholder='请输入联系电话...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15, marginTop: 30}}
              {...formItemLayout}
              label="乙方"
            >
              {getFieldDecorator('g13s', {
                initialValue: this.props.company.full_name
              })(
                <Input placeholder='请输入乙方名称...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="乙方类型"
            >
              {getFieldDecorator('qd5', {
                initialValue: this.props.company.company_type
              })(
                <Select placeholder="请选择乙方类型..." disabled>
                  <Option value="1">贸易商</Option>
                  <Option value="2">运贸商</Option>
                  <Option value="3">液厂</Option>
                  <Option value="4">接收站</Option>
                  <Option value="5">其它</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('da51ta', {
                initialValue: this.props.company.contact
              })(
                <Input placeholder='请输入联系人...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('j4e', {
                initialValue: this.props.company.contact_mobile
              })(
                <Input placeholder='请输入联系电话...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15, marginTop: 30}}
              {...formItemLayout}
              label="合同有效期"
            >
              {getFieldDecorator('sendData', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <RangePicker locale={locale}></RangePicker>
              )}
            </FormItem>
          </Form>
          <Row type='flex' justify='space-between' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col>
              <Button type='primary' style={{width: 120}} onClick={this.submit}>提交 </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {customOption, company} = state.customer
  return {
    customOption,
    company,
    loading: state.loading.models.customer
  }
}


export default connect(mapStateToProps)(Form.create()(ContractModal))
