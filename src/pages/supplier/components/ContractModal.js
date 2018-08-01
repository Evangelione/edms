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
      supplierOptions: []
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'supplier/fetchOptions',
    }).then(() => {
      const supplierOptions = this.props.supplierOption.map((option, index) =>
        <Option key={index} value={option.id} contact={option.supp_contact} mobile={option.supp_mobile}
                type={option.supp_type}>{option.supp_name}</Option>
      )
      this.setState({
        supplierOptions
      })
    })
    this.props.dispatch({
      type: 'supplier/fetchCompany',
    })
  }

  showModal = () => this.setState({visible: true})

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  supplierChange = (value, item) => {
    let type = ''
    if (item.props.type === '1') {
      type = '终端用户'
    } else if (item.props.type === '2') {
      type = '贸易商'
    } else {
      type = item.props.type
    }
    this.props.form.setFieldsValue({
      supplier_type: type,
      supplier_contact: item.props.contact,
      supplier_mobile: item.props.mobile
    })
  }

  submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'supplier/addSupplierContract',
          payload: {
            id: values.suppliers_id,
            stime: values.sendData[0].format('YYYY-MM-DD hh:00:00'),
            etime: values.sendData[1].format('YYYY-MM-DD hh:00:00'),
          }
        }).then(() => {
          this.setState({
            visible: false,
          })
          this.props.dispatch({
            type: 'supplier/purchaseContractFetch',
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
              {getFieldDecorator('gs', {
                initialValue: this.props.company.full_name
              })(
                <Input placeholder='请输入甲方名称...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="甲方类型"
            >
              {getFieldDecorator('qd56', {
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
              {getFieldDecorator('dat15a', {
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
              {getFieldDecorator('j1e', {
                initialValue: this.props.company.contact_mobile
              })(
                <Input placeholder='请输入联系电话...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15, marginTop: 30}}
              {...formItemLayout}
              label="乙方"
            >
              {getFieldDecorator('suppliers_id', {
                rules: [{required: true, message: '此项为必选项！'}],
              })(
                <Select placeholder='请选择乙方名称...' onChange={this.supplierChange}>
                  {this.state.supplierOptions}
                </Select>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="乙方类型"
            >
              {getFieldDecorator('supplier_type')(
                <Input placeholder='请输入乙方类型...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系人"
            >
              {getFieldDecorator('supplier_contact')(
                <Input placeholder='请输入联系人...' disabled/>
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 15}}
              {...formItemLayout}
              label="联系电话"
            >
              {getFieldDecorator('supplier_mobile')(
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
  const {supplierOption, company} = state.supplier
  return {
    supplierOption,
    company,
    loading: state.loading.models.supplier
  }
}


export default connect(mapStateToProps)(Form.create()(ContractModal))
