import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Modal, Row, Col, Button, Form, AutoComplete, DatePicker, message } from 'antd'
import { IP } from "../../../constants"

const FormItem = Form.Item
const Option = AutoComplete.Option

class ExportModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      visible2: false,
      startValue: null,
      endValue: null,
      endOpen: false,
      modalLoading: false,
      companyName: '',
      goodName: ''
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'supplier/getSupplierCompany'
    })
    this.props.dispatch({
      type: 'supplier/fetchGoods'
    })
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  showModal2 = () => {
    if (this.props.form.getFieldValue('stime') && this.props.form.getFieldValue('etime')) {
      this.setState({
        modalLoading: true
      })
      this.props.dispatch({
        type: 'supplier/accountNum',
        payload: {
          gas_id: this.props.form.getFieldValue('gas_id'),
          find_str: this.props.form.getFieldValue('company'),
          stime: this.props.form.getFieldValue('stime'),
          etime: this.props.form.getFieldValue('etime')
        }
      }).then(() => {
        this.setState({
          modalLoading: false,
          visible2: true
        })
      })
    } else {
      message.error('请填写完整信息')
    }

  }

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
      visible2: false,
      startValue: null,
      endValue: null,
      goodName: ''
    })
  }

  handleCancel2 = (e) => {
    e.stopPropagation()
    this.setState({
      visible2: false,
    })
  }

  export = () => {
    if (this.props.form.getFieldValue('stime') && this.props.form.getFieldValue('etime')) {
      let stime = this.props.form.getFieldValue('stime').format('YYYY-MM-DD')
      let etime = this.props.form.getFieldValue('etime').format('YYYY-MM-DD')
      window.location.href = `${IP}/home/supplier/excel-supplier-account?id=${this.props.form.getFieldValue('company')}&start_date=${stime}&end_date=${etime}`
      this.setState({
        visible2: false,
      }, () => {
        this.setState({
          visible: false,
        })
      })
    } else {
      message.error('请填写完整信息')
    }
  }

  companyChange = (val, item) => {
    this.setState({
      companyName: item.props.children
    })
  }

  goodsChange = (val, item )=> {
    this.setState({
      goodName: item.props.children
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {children, companyOption, goodsOption,stime, etime, companyDetail} = this.props
    const {startValue, endValue} = this.state;
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
    const companyOptions = companyOption.map((option, index) =>
      <Option key={option.id} value={option.id}>
        {option.supp_name}
      </Option>)
    const goodsOptions = goodsOption.map((option, index) =>{
    return <Option key={option.id} source={option.origin_gas_source}
                   contact={option.cargo_contact}
                   mobile={option.cargo_mobile}
                   province={option.cargo_province}
                   city={option.cargo_city}
                   area={option.cargo_area}
                   address={option.detailed_address}
                   report={option.temperament_report}
                   value={option.id}>{option.name_gas_source}</Option>})
    return (
      <div onClick={this.showModal} style={{display: 'inline-block'}}>
        {children}
        <Modal
          title="导出对账单"
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <Form>
            <FormItem
              style={{marginBottom: 10}}
              {...formItemLayout}
              label="供应商名称"
            >
              {getFieldDecorator('company', {
                rules: [{require: false, message: '此项必填'}],
              })(
                <AutoComplete
                  onChange={this.companyChange}
                  dataSource={companyOptions}
                  placeholder="请选择需要导出的供应商名称"
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                />
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 10}}
              {...formItemLayout}
              label="气源名称"
            >
              {getFieldDecorator('gas_id', {
                rules: [{require: false, message: '此项必填'}],
              })(
                <AutoComplete
                  onChange={this.goodsChange}
                  dataSource={goodsOptions}
                  placeholder="请选择需要导出的气源名称"
                  filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                />
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 10}}
              {...formItemLayout}
              label="开始时间"
            >
              {getFieldDecorator('stime', {
                initialValue: stime ? stime : startValue,
              })(
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  format="YYYY-MM-DD"
                  placeholder="请选择开始时间"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              )}
            </FormItem>
            <FormItem
              style={{marginBottom: 10}}
              {...formItemLayout}
              label="结束时间"
            >
              {getFieldDecorator('etime', {
                initialValue: etime ? etime : endValue,
              })(
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  format="YYYY-MM-DD"
                  placeholder="请选择结束时间"
                  onChange={this.onEndChange}
                  onOpenChange={this.handleEndOpenChange}
                />
              )}
            </FormItem>
          </Form>
          <Row type='flex' justify='space-around' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel}>取消</Button>
            </Col>
            <Col>
              <Button type='primary' style={{width: 120}} onClick={this.showModal2}
                      loading={this.state.modalLoading}>导出</Button>
            </Col>
          </Row>
        </Modal>
        <Modal
          title="导出对账单"
          visible={this.state.visible2}
          footer={null}
          onCancel={this.handleCancel2}
          destroyOnClose={true}
          bodyStyle={{padding: 1}}
        >
          <div style={{color: '#EA7878', fontSize: 18, paddingLeft: 34, paddingTop: 25}}>
            请确认您将导出的对账单信息：
          </div>
          <div style={{backgroundColor: '#F7F8FA', padding: '20px 40px', marginTop: 15}}>
            <div style={{margin: '5px 0'}}>
              <span>供应商名称：</span>
              <span>{this.state.companyName}</span>
            </div>
            <div style={{margin: '5px 0'}}>
              <span>气源名称：</span>
              <span>{this.state.goodName}</span>
            </div>
            <div style={{margin: '5px 0'}}>
              <span>订单周期：</span>
              <span>{this.state.startValue ? this.state.startValue.format('YYYY/MM/DD') : this.props.stime ? this.props.stime.format('YYYY/MM/DD') : ''} - {this.state.endValue ? this.state.endValue.format('YYYY/MM/DD') : this.props.etime ? this.props.etime.format('YYYY/MM/DD') : ''}</span>
            </div>
            <div style={{margin: '5px 0'}}>
              <span>订单数量：</span>
              <span>{companyDetail.purchase_count}</span>
            </div>
            <div style={{margin: '5px 0'}}>
              <span>订单总额：</span>
              <span>{companyDetail.total_cost} 元</span>
            </div>
          </div>

          <Row type='flex' justify='space-around' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel2}>取消</Button>
            </Col>
            <Col>
              <Button type='primary' style={{width: 120}} onClick={this.export}>导出</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {stime, etime, companyOption, companyDetail,goodsOption} = state.supplier
  return {
    stime,
    etime,
    companyOption,
    goodsOption,
    companyDetail,
    loading: state.loading.models.supplier
  }
}

export default connect(mapStateToProps)(Form.create()(ExportModal))
