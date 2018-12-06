import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Table, Button, Pagination } from 'antd'
import { PAGE_SIZE } from '../../../constants'
import { routerRedux } from 'dva/router'
import ExportModal from './ExportModal'

class BalanceOfAccount extends PureComponent {
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

  render() {
    const {balanceList, balancePage, balanceTotal, loading} = this.props
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
    return (
      <div>
        <div className='toolBar'>
          <ExportModal str={this.props.find_str}>
            <Button type='primary' icon='export' style={{height: 28}}>批量对账</Button>
          </ExportModal>
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
