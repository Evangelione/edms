import React from 'react'
import {Modal, DatePicker, Button, Row, Col, message} from 'antd'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import {IP} from "../../constants"

const {RangePicker} = DatePicker

class ExportModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = (e) => {
    e.stopPropagation()
    this.setState({
      visible: false,
    })
  }

  rangeChange = (date, dateString) => {
    this.setState({
      stime: dateString[0],
      etime: dateString[1],
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  export = () => {
    if (!(this.state.stime && this.state.etime)) {
      message.error('请选择要导出时间段！')
      return false
    }
    if (this.props.type === 'accountClient') {
      window.location.href = `${IP}/home/account/excel-cust-balance-list?find_str=${this.props.str}`
    } else if (this.props.type === 'accountSupplier') {
      window.location.href = `${IP}/home/account/excel-supp-balance-list?find_str=${this.props.str}`
    } else if (this.props.type === 'logistics') {
      window.location.href = `${IP}/home/logistics/export?etime=${this.state.etime}&stime=${this.state.stime}`
    } else if (this.props.type === 'customerSalesDetail') {
      window.location.href = `${IP}/home/customer/excel-sales-performance?end_date=${this.state.etime}&start_date=${this.state.stime}&find_str=${this.props.str}`
    } else if (this.props.type === 'accountRecipt') {
      window.location.href = `${IP}/home/account/excel-cust-record-list?cust_id=${this.props.id}&record_type=1&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'accountBill') {
      window.location.href = `${IP}/home/account/excel-cust-record-list?cust_id=${this.props.id}&record_type=''&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'supplierRecipt') {
      window.location.href = `${IP}/home/account/excel-supp-record-list?supp_id=${this.props.id}&record_type=1&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'supplierBill') {
      window.location.href = `${IP}/home/account/excel-supp-record-list?supp_id=${this.props.id}&record_type=''&stime=${this.state.stime}&etime=${this.state.etime}`
    }
  }

  render() {
    const {children, title} = this.props
    return (
      <div onClick={this.showModal}>
        {children}
        <Modal
          title={title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={null}
        >
          <Row type='flex' justify='center' style={{margin: '80px 0'}}>
            <Col>
              <RangePicker locale={locale} onChange={this.rangeChange} format={'YYYY-MM-DD'}
                           disabledDate={this.disabledDate}/>
            </Col>
          </Row>
          <Row type='flex' justify='space-around' style={{margin: '20px 10px 10px 10px'}}>
            <Col>
              <Button className='grayButton' onClick={this.handleCancel}>取消</Button>
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

export default ExportModal
