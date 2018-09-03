import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination } from 'antd'
import { IP, PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'

class BalanceOfAccount extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {page: 1, find_str: '', stime: '', etime: ''}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {
        page,
        find_str: this.props.find_str
      }
    })
  }

  exportExcel = (str) => {
    window.location.href = `${IP}/home/account/excel-cust-balance-list?find_str=${str}`
  }

  balanceHistory = () => {
    console.log('goHistory')
  }

  render() {
    const {balanceList, balancePage, balanceTotal, loading} = this.props
    const columns = [{
      title: '订单编号',
      dataIndex: 'deliver_code',
      key: 'deliver_code',
      align: 'center'
    }, {
      title: '装车日期',
      dataIndex: 'load_time',
      key: 'load_time',
      align: 'center'
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
      }
    }, {
      title: '车牌照',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center'
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
      title: '结算量(吨)',
      dataIndex: 'wl_final_num',
      key: 'wl_final_num',
      align: 'center',
    }, {
      title: '公里数',
      dataIndex: 'wl_distance',
      key: 'wl_distance',
      align: 'center',
    }, {
      title: '吨公里(元)',
      dataIndex: 'wl_deliver_price',
      key: 'wl_deliver_price',
      align: 'center',
    }, {
      title: '额外费用(元)',
      dataIndex: 'wl_extra_fee',
      key: 'wl_extra_fee',
      align: 'center',
    }, {
      title: '运费总计(元)',
      key: 'zj',
      align: 'center',
      render: (text, record, index) => {
        let num = (record.wl_final_num - 0) * (record.wl_distance - 0) * (record.wl_deliver_price - 0) + (record.wl_extra_fee - 0)
        return <div>
          {num.toFixed(2)}
        </div>
      }
    }]
    return (
      <div>
        <div className='toolBar'>
          <Button type='primary' icon='export' style={{height: 28}}
                  onClick={this.exportExcel.bind(null, this.props.find_str)}>批量导出</Button>
          <Button className='blueBorder' style={{width: 110}}
                  onClick={this.balanceHistory.bind(null, this.props.find_str)}>对账历史</Button>
        </div>
        <Table
          columns={columns}
          dataSource={balanceList}
          rowKey={record => record.deliver_code}
          pagination={false}
          loading={loading}
        ></Table>
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
  const {balanceList, balancePage, balanceTotal, find_str} = state.logistics
  return {
    balanceList,
    balancePage,
    balanceTotal,
    find_str,
    loading: state.loading.models.logistics
  }
}

export default connect(mapStateToProps)(BalanceOfAccount)
