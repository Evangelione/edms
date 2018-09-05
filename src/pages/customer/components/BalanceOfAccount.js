import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination } from 'antd'
import { PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
import ExportModal from './ExportModal'

class BalanceOfAccount extends PureComponent {
  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {page: 1, find_str: '', stime: '', etime: ''}
    })
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page,
        find_str: this.props.find_str
      }
    })
  }

  balanceHistory = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/customer/customerHistory',
    }))
  }

  render() {
    const {balanceList, balancePage, balanceTotal, loading} = this.props
    const columns = [{
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center'
    }, {
      title: '装车日期',
      dataIndex: 'load_time',
      key: 'load_time',
      align: 'center'
    }, {
      title: '客户名称',
      dataIndex: 'customer_name',
      key: 'customer_name',
      align: 'center',
    }, {
      title: '站点简称',
      dataIndex: 'site_name',
      key: 'site_name',
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
      title: '销售单价(元)',
      dataIndex: 'saler_price',
      key: 'saler_price',
      align: 'center',
    }, {
      title: '销售额(元)',
      dataIndex: 'sale_money',
      key: 'sale_money',
      align: 'center',
    }, {
      title: '客户余额(元)',
      dataIndex: 'balance',
      key: 'balance',
      align: 'center',
    }, {
      title: '信用余额(元)',
      dataIndex: 'credit_balance',
      key: 'credit_balance',
      align: 'center',
    }]
    return (
      <div>
        <div className='toolBar'>
          <ExportModal>
            <Button type='primary' icon='export' style={{height: 28}}>批量导出</Button>
          </ExportModal>
          <Button className='blueBorder' style={{width: 110}}
                  onClick={this.balanceHistory.bind(null, this.props.find_str)}>对账历史</Button>
        </div>
        <Table
          columns={columns}
          dataSource={balanceList}
          rowKey={record => record.order_code}
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
  const {balanceList, balancePage, balanceTotal, find_str} = state.customer
  return {
    balanceList,
    balancePage,
    balanceTotal,
    find_str,
    loading: state.loading.models.customer
  }
}

export default connect(mapStateToProps)(BalanceOfAccount)
