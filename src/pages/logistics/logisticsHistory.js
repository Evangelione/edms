import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Table, Pagination } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import { IP, PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router'
import withRouter from 'umi/withRouter'
import * as dateUtils from '../../utils/getTime'

const TabPane = Tabs.TabPane

class logisticsHistory extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'logistics/balanceHistoryFetch',
      payload: {
        page: 1,
        id: this.props.location.query.id,
      },
    })
  }

  goBack = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/logistics',
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'logistics/balanceHistoryFetch',
      payload: {
        page,
        id: this.props.location.query.id,
      },
    })
  }

  export = () => {
    let id = this.props.location.query.id
    window.location.href = `${IP}/home/logistics/excel?id=${id}`
  }

  render() {
    console.log(this.props)
    const {balanceHistoryList, balanceHistoryPage, balanceHistoryTotal, loading} = this.props
    const columns = [{
      title: '订单编号',
      dataIndex: 'deliver_code',
      key: 'deliver_code',
      align: 'center',
    }, {
      title: '物流',
      dataIndex: 'logistics_company',
      key: 'logistics_company',
      align: 'center',
    }, {
      title: '车牌',
      dataIndex: 'car_head',
      key: 'car_head',
      align: 'center',
    }, {
      title: '装车时间',
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
        } else {
          return (
            <div>--</div>
          )
        }
      },
    }, {
      title: '气源',
      dataIndex: 'name_gas_source',
      key: 'name_gas_source',
      align: 'center',
    }, {
      title: '站点',
      dataIndex: 'site_name',
      key: 'site_name',
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
      title: '运输费(元)',
      dataIndex: 'final_deliver_fee',
      key: 'final_deliver_fee',
      align: 'center',
    }, {
      title: '订单状态',
      dataIndex: 'account_status',
      key: 'account_status',
      align: 'center',
      render: (text) => {
        if (text === '1') {
          return <div style={{color: '#8897BD'}}>待对账</div>
        } else if (text === '2') {
          return <div style={{color: '#3477ED'}}>对账中</div>
        } else if (text === '3') {
          return <div style={{color: '#60C899'}}>已对账</div>
        } else {
          return <div style={{color: '#F7772A'}}>已开票</div>
        }
      },
    }]
    return (
      <div>
        <PageTitle>
          <Button type='primary' onClick={this.goBack}>返回上一级</Button>
        </PageTitle>
        <Card>
          <Tabs onChange={this.callback}>
            <TabPane tab="对账明细" key='1'>
              <Button type='primary' style={{height: 28, marginLeft: 5, position: 'absolute', top: 12, right: 10}}
                      onClick={this.export}>导出</Button>
              <Table
                columns={columns}
                dataSource={balanceHistoryList}
                rowKey={record => record.id}
                pagination={false}
                loading={loading}
              />
              <Pagination
                className='ant-table-pagination'
                current={balanceHistoryPage}
                total={balanceHistoryTotal}
                pageSize={PAGE_SIZE}
                onChange={this.pageChangeHandler}
              />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {balanceHistoryList, balanceHistoryPage, balanceHistoryTotal, find_str, stime, etime} = state.logistics
  return {
    find_str,
    stime,
    etime,
    balanceHistoryList,
    balanceHistoryPage,
    balanceHistoryTotal,
    loading: state.loading.models.logistics,
  }
}

export default connect(mapStateToProps)(withRouter(logisticsHistory))
