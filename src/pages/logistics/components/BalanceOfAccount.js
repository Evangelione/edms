import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination, message, Menu, DatePicker, AutoComplete, Dropdown, Select } from 'antd'
import { IP, PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
import ExportModal from './ExportModal'
import locale from 'antd/lib/date-picker/locale/zh_CN'

const {RangePicker} = DatePicker
const {Option} = Select

class BalanceOfAccount extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {page: 1, find_str: '', stime: '', etime: ''},
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {
        page,
        find_str: this.props.find_str,
      },
    })
  }

  balanceHistory = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/logistics/logisticsHistory',
    }))
  }

  export = () => {
    if (this.state.selectedRowKeys.length) {
      let ids = this.state.selectedRowKeys.join(',')
      window.location.href = `${IP}/home/logistics/excel-logistics-account?ids=${ids}`
    } else {
      message.error('请勾选需要导出的对账信息')
    }
  }
  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
    } else {
      selectedRowKeys.push(record.id)
    }
    this.setState({selectedRowKeys})
  }

  render() {
    const {balanceList, balancePage, balanceTotal, loading} = this.props
    const {selectedRowKeys} = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    }
    const columns = [{
      title: '订单编号',
      dataIndex: 'deliver_code',
      key: 'deliver_code',
      align: 'center',
    }, {
      title: '装车日期',
      dataIndex: 'load_time',
      key: 'load_time',
      align: 'center',
    }, {
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
      align: 'center',
    }, {
      title: '气源产地',
      dataIndex: 'balance',
      key: 'cargo',
      align: 'center',
      render: (text, record, index) => {
        return <div>
          {record.cargo_province + record.cargo_city + record.cargo_area}
        </div>
      },
    }, {
      title: '车牌照',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center',
    }, {
      title: '物流公司',
      dataIndex: 'logistics_company',
      key: 'logistics_company',
      align: 'center',
    }, {
      title: '装车量(吨)',
      dataIndex: 'load_num',
      key: 'load_num',
      align: 'center',
    }, {
      title: '卸车量(吨)',
      dataIndex: 'unload_num',
      key: 'unload_num',
      align: 'center',
    }, {
      title: '配送方式',
      dataIndex: 'deliver_type',
      key: 'deliver_type2',
      width: 100,
      align: 'center',
      render: (text) => {
        if (text === '1' || text === '3') {
          return <div>配送</div>
        } else {
          return <div>自提</div>
        }
      },
    }, {
      title: '运费总计(元)',
      key: 'final_deliver_fee',
      dataIndex: 'final_deliver_fee',
      align: 'center',
    }]
    const menu = (
      <Menu>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div style={{position: 'absolute', top: 10, left: 32, fontSize: '1rem'}}>
          <RangePicker locale={locale} style={{width: 200, marginRight: 10}}/>
          <span>选择客户</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账客户名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择气源</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账气源名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择站点</span>
          <AutoComplete className='widthReSize' style={{verticalAlign: 'bottom', fontSize: '1rem', marginLeft: 10}}
                        placeholder='请输入对账站点名称'/>
          <Dropdown overlay={menu} trigger={['click']} style={{fontSize: '1rem'}}>
            <Button style={{marginRight: 10}}>...</Button>
          </Dropdown>
          <span>选择订单</span>
          <Select defaultValue="1" style={{fontSize: '1rem', marginLeft: 10}}>
            <Option value="1" style={{color: '#4A4A4A'}}>全部</Option>
            <Option value="2" style={{color: '#8897BD'}}>待对账</Option>
            <Option value="3" style={{color: '#3477ED'}}>对账中</Option>
            <Option value="4" style={{color: '#60C899'}}>已对账</Option>
            <Option value="5" style={{color: '#F7772A'}}>已开票</Option>
          </Select>
        </div>
        <div className='toolBar'>
          <Button type='primary' style={{minWidth: 64, height: 28, marginRight: 6}} onClick={this.export}>对账</Button>
          <ExportModal str={this.props.find_str}>
            <Button type='primary' style={{minWidth: 64, height: 28}}>全部对账</Button>
          </ExportModal>
        </div>
        <div style={{backgroundColor: '#D8DDE6', width: '100%', height: 2, marginTop: 6}}/>
        <Table
          columns={columns}
          dataSource={balanceList}
          rowSelection={rowSelection}
          rowKey={record => record.deliver_code}
          pagination={false}
          loading={loading}
          onRow={(record) => ({
            onClick: () => {
              this.selectRow(record)
            },
          })}
        />
        <Pagination
          className='ant-table-pagination'
          current={balancePage}
          total={balanceTotal}
          pageSize={PAGE_SIZE}
          onChange={this.pageChangeHandler}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {balanceList, balancePage, balanceTotal, find_str, stime, etime} = state.logistics
  return {
    balanceList,
    balancePage,
    balanceTotal,
    find_str,
    stime,
    etime,
    loading: state.loading.models.logistics,
  }
}

export default connect(mapStateToProps)(BalanceOfAccount)
