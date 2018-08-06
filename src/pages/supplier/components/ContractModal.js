import React from 'react'
import {Modal, Form, Select, Input, Row, Col, Button} from 'antd'
import {connect} from 'dva'
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
      supplierOptions: [],
      stime: moment().subtract(29, 'days'),
      etime: moment(),
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
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
            stime: this.state.stime.format('YYYY-MM-DD'),
            etime: this.state.etime.format('YYYY-MM-DD'),
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
    let start = this.state.stime.format('YYYY-MM-DD');
    let end = this.state.etime.format('YYYY-MM-DD');
    let label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }
    let locale = {
      "format": 'YYYY-MM-DD',
      "separator": " - ",
      "applyLabel": "确定",
      "cancelLabel": "取消",
      "fromLabel": "起始时间",
      "toLabel": "结束时间'",
      "customRangeLabel": "自定义",
      "weekLabel": "W",
      "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
      "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      "firstDay": 1
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
                </DateRangePicker>
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
