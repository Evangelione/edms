import React from 'react'
import { connect } from 'dva'
import { Modal, Form, Select, Input, Row, Col, Button } from 'antd'
import moment from 'moment'
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

const FormItem = Form.Item
const Option = Select.Option

class ContractModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      customerOptions: [],
      stime: moment().subtract(29, 'days'),
      etime: moment(),
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'customer/fetchOptions',
    }).then(() => {
      const customerOptions = this.props.customOption.map((option, index) =>
        <Option key={index} value={option.id} contact={option.customer_contact} mobile={option.customer_mobile}
                type={option.customer_type}>{option.customer_name}</Option>,
      )
      this.setState({
        customerOptions,
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
      customer_mobile: item.props.mobile,
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
            stime: values.sendData.split(' - ')[0],
            etime: values.sendData.split(' - ')[1],
          },
        }).then(() => {
          this.setState({
            visible: false,
          })
          this.props.dispatch({
            type: 'customer/salesContractFetch',
            payload: {page: 1},
          })
        })
      }
    })
  }

  handleApply = (event, picker) => {
    this.setState({
      stime: picker.startDate,
      etime: picker.endDate,
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
    let start = this.state.stime.format('YYYY-MM-DD')
    let end = this.state.etime.format('YYYY-MM-DD')
    let label = start + ' - ' + end
    if (start === end) {
      label = start
    }
    let locale = {
      'format': 'YYYY-MM-DD',
      'separator': ' - ',
      'applyLabel': '确定',
      'cancelLabel': '取消',
      'fromLabel': '起始时间',
      'toLabel': '结束时间\'',
      'customRangeLabel': '自定义',
      'weekLabel': 'W',
      'daysOfWeek': ['日', '一', '二', '三', '四', '五', '六'],
      'monthNames': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      'firstDay': 1,
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
              label="买方"
            >
              {getFieldDecorator('customer_id', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <Select placeholder='请选择买方名称' onChange={this.customerChange}>
                  {this.state.customerOptions}
                </Select>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="买方类型"
            >
              {getFieldDecorator('customer_type')(
                <Input placeholder='请输入买方类型' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('customer_contact')(
                <Input placeholder='请输入联系人' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('customer_mobile')(
                <Input placeholder='请输入联系电话' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15, marginTop: 30}}
              {...formItemLayout}
              label="卖方"
            >
              {getFieldDecorator('yifang', {
                initialValue: this.props.company.full_name,
              })(
                <Input placeholder='请输入卖方名称' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="卖方类型"
            >
              {getFieldDecorator('yifangleixing', {
                initialValue: this.props.company.company_type,
              })(
                <Select placeholder="请选择卖方类型" disabled>
                  <Option value="0">暂无类型</Option>
                  <Option value="1">贸易商</Option>
                  <Option value="2">运贸商</Option>
                  <Option value="3">液厂</Option>
                  <Option value="4">接收站</Option>
                  <Option value="5">其它</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('lianxiren', {
                initialValue: this.props.company.contact,
              })(
                <Input placeholder='请输入联系人' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('lianxidianhua', {
                initialValue: this.props.company.contact_mobile,
              })(
                <Input placeholder='请输入联系电话' disabled/>,
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15, marginTop: 30}}
              {...formItemLayout}
              label="合同有效期"
            >
              {getFieldDecorator('sendData', {
                initialValue: label,
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <DateRangePicker
                  containerStyles={{width: 182}}
                  startDate={this.state.stime}
                  endDate={this.state.etime}
                  locale={locale}
                  drops={'up'}
                  onApply={this.handleApply}>
                  <Input type="text" value={label} readOnly/>
                </DateRangePicker>,
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
    loading: state.loading.models.customer,
  }
}


export default connect(mapStateToProps)(Form.create()(ContractModal))
