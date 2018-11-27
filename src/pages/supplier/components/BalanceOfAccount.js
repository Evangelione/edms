import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination, message } from 'antd'
import { IP, PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
import ExportModal from './ExportModal'
import * as dateUtils from '../../../utils/getTime'

class BalanceOfAccount extends PureComponent {
  constructor(props) {
    super(props)
    this.state={
      selectedRowKeys: []
    }
  }

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'supplier/balanceFetch',
      payload: {page: 1, find_str: '', stime: '', etime: ''}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'supplier/balanceFetch',
      payload: {
        page,
        find_str: this.props.find_str
      }
    })
  }

  balanceHistory = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/supplier/supplierHistory',
    }))
  }

  selectRow = (record) => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    if (selectedRowKeys.indexOf(record.id) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1)
    } else {
      selectedRowKeys.push(record.id)
    }
    console.log(selectedRowKeys)
    this.setState({selectedRowKeys})
  }

  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys})
  }

  export = () => {
    if (this.state.selectedRowKeys.length) {
      let ids = this.state.selectedRowKeys.join(',')
      window.location.href = `${IP}/home/supplier/excel-supplier-account?ids=${ids}`
    } else {
      message.error('请勾选需要导出的信息')
    }
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
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center'
    }, {
      title: '装车日期',
      dataIndex: 'load_time',
      key: 'load_time',
      align: 'center',
      render: (text, record, index) => {
        if (text) {
          let time = dateUtils.getTime(text)
          let date = dateUtils.getYear(text)
          return (
            <div>
              <div>{date}</div>
              <div style={{fontSize: 14, color: '#ccc'}}>{time}</div>
            </div>
          )
        }  else {
          return (
            <div>--</div>
          )
        }
      }
    }, {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center',
    }, {
      title: '气源名称',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
    }, {
      title: '车牌照',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center'
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
      title: '结算量(吨)',
      dataIndex: 'final_num',
      key: 'final_num',
      align: 'center',
    }, {
      title: '采购单价(元)',
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      align: 'center',
    }, {
      title: '采购额(元)',
      dataIndex: 'purchase_money',
      key: 'purchase_money',
      align: 'center',
    }, {
      title: '采购预付款余额(元)',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
    }]
    return (
      <div>
        <div className='toolBar'>
          <Button type='primary' style={{width: 110,height: 28, marginRight: 6}} onClick={this.export}>导出</Button>
          <ExportModal>
            <Button type='primary' icon='export' style={{height: 28}}>批量对账</Button>
          </ExportModal>
          <Button className='blueBorder' style={{width: 110}}
                  onClick={this.balanceHistory.bind(null, this.props.find_str)}>对账历史</Button>
        </div>
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={balanceList}
          rowKey={record => record.id}
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
  const {balanceList, balancePage, balanceTotal, find_str} = state.supplier
  return {
    balanceList,
    balancePage,
    balanceTotal,
    find_str,
    loading: state.loading.models.supplier
  }
}

export default connect(mapStateToProps)(BalanceOfAccount)
