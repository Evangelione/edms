import React from 'react'
import {Modal, Button, Row, Col, message, Input} from 'antd'
import moment from 'moment'
import {IP} from "../../constants"
import DateRangePicker from 'react-bootstrap-daterangepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

class ExportModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
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

  handleApply = (event, picker) => {
    this.setState({
      stime: picker.startDate,
      etime: picker.endDate,
    })
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
    } else if (this.props.type === 'supplierSalesDetail') {
      window.location.href = `${IP}/home/supplier/excel-purchase-performance?end_date=${this.state.etime}&start_date=${this.state.stime}&find_str=${this.props.str}`
    } else if (this.props.type === 'accountRecipt') {
      window.location.href = `${IP}/home/account/excel-cust-record-list?cust_id=${this.props.id}&record_type=1&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'accountBill') {
      window.location.href = `${IP}/home/account/excel-cust-record-list?cust_id=${this.props.id}&record_type=''&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'supplierRecipt') {
      window.location.href = `${IP}/home/account/excel-supp-record-list?supp_id=${this.props.id}&record_type=1&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'supplierBill') {
      window.location.href = `${IP}/home/account/excel-supp-record-list?supp_id=${this.props.id}&record_type=''&stime=${this.state.stime}&etime=${this.state.etime}`
    } else if (this.props.type === 'accountAnalysis') {
      window.location.href = `${IP}/home/account/excel-analysis?stime=${this.state.stime}&etime=${this.state.etime}`
    }
  }

  render() {
    const {children, title} = this.props
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
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          destroyOnClose={true}
          footer={null}
        >
          <Row type='flex' justify='center' style={{margin: '80px 0'}}>
            <Col>
              <DateRangePicker
                containerStyles={{width: 182}}
                startDate={this.state.stime}
                endDate={this.state.etime}
                maxDate={moment()}
                locale={locale}
                onApply={this.handleApply}>
                <Input type="text" value={label} readOnly/>
              </DateRangePicker>
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
