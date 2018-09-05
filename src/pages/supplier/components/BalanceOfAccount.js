import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination } from 'antd'
import { PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
import ExportModal from './ExportModal'

class BalanceOfAccount extends PureComponent {
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
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center',
    }, {
      title: '气源产地',
      dataIndex: 'origin_gas_source',
      key: 'origin_gas_source',
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
