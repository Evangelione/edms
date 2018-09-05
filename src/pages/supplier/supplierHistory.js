import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Table, Pagination } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import moment from 'moment'
import { PAGE_SIZE } from "../../constants"
import { routerRedux } from "dva/router"
import BalanceOfAccountModal from '../../components/BalanceOfAccountModal/BalanceOfAccountModal'

const TabPane = Tabs.TabPane

class supplierHistory extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'supplier/balanceHistoryFetch',
      payload: {page: 1, find_str: '', stime: '', etime: ''}
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'supplier/balanceHistoryFetch',
      payload: {
        find_str: value,
        stime: this.props.stime,
        etime: this.props.etime
      }
    })
  }

  rangeChange = (dates, dateString) => {
    this.props.dispatch({
      type: 'supplier/balanceHistoryFetch',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str
      }
    })
  }


  goBalance = (company, stime, etime, id) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/supplier/supplierBalance',
      query: {
        company,
        stime,
        etime,
        id
      }
    }))
  }

  goBack = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/supplier'
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'supplier/balanceHistoryFetch',
      payload: {
        page
      }
    })
  }

  render() {
    const {balanceHistoryList, balanceHistoryPage, balanceHistoryTotal, loading} = this.props
    const columns = [{
      title: '对账时间',
      dataIndex: 'log_time',
      key: 'log_time',
      align: 'center'
    }, {
      title: '供应商名称',
      dataIndex: 'supp_name',
      key: 'supp_name',
      align: 'center'
    }, {
      title: '对账总额(元)',
      dataIndex: 'total_account',
      key: 'total_account',
      align: 'center',
    }, {
      title: '订单周期',
      key: 'date',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            {record.account_cycle_start} - {record.account_cycle_end}
          </div>
        )
      }
    }, {
      title: '订单数量',
      dataIndex: 'purchase_count',
      key: 'purchase_count',
      align: 'center'
    }, {
      title: '对账状态',
      dataIndex: 'account_status',
      key: 'account_status',
      align: 'center',
      render: (text, record, index) => {
        return (
          text === '0' ? <div style={{color: '#EA7878'}}>未对帐</div> : <div style={{color: '#59C694'}}>已对账</div>
        )
      }
    }, {
      title: '操作',
      dataIndex: 'load_num',
      key: 'load_num',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            {
              record.account_status === '0' ?
                <div>
                  <BalanceOfAccountModal url='supplier/confirmAccount' refAction='supplier/balanceHistoryFetch'
                                         id={record.id} find_str={this.props.find_str} state='confirm'>
                    <Button type='primary' style={{marginRight: 10, height: 28}}>确认对账</Button>
                  </BalanceOfAccountModal>
                  <BalanceOfAccountModal url='supplier/deleteAccount' refAction='supplier/balanceHistoryFetch'
                                         id={record.id} find_str={this.props.find_str} state='delete'>
                    <Button type='primary'
                            style={{
                              marginRight: 10,
                              height: 28,
                              backgroundColor: '#EA7878',
                              border: 'none'
                            }}>删除</Button>
                  </BalanceOfAccountModal>
                  <Button style={{height: 28}}
                          onClick={this.goBalance.bind(null, record.supp_name, record.account_cycle_start, record.account_cycle_end, record.id)}>查看明细</Button>
                </div>
                :
                <div>
                  <Button className='grayButton' style={{marginRight: 10, height: 28, width: 'auto'}}>确认对账</Button>
                  <Button className='grayButton' style={{marginRight: 10, height: 28, width: 'auto'}}>删除</Button>
                  <Button style={{height: 28}}
                          onClick={this.goBalance.bind(null, record.supp_name, record.account_cycle_start, record.account_cycle_end, record.id)}>查看明细</Button>
                </div>
            }
          </div>
        )
      }
    }]
    return (
      <div>
        <PageTitle>
          <Button type='primary' onClick={this.goBack}>返回上一级</Button>
        </PageTitle>
        {/*<div className='searchBox'>*/}
        {/*<span>*/}
        {/*<RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>*/}
        {/*</span>*/}
        {/*<Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"*/}
        {/*onSearch={this.iptSearch}*/}
        {/*/>*/}
        {/*</div>*/}
        <Card>
          <Tabs onChange={this.callback}>
            <TabPane tab="对账历史" key='1'>
              <Table
                columns={columns}
                dataSource={balanceHistoryList}
                rowKey={record => record.id}
                pagination={false}
                loading={loading}
              ></Table>
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
  const {balanceHistoryList, balanceHistoryPage, balanceHistoryTotal, find_str, stime, etime} = state.supplier
  return {
    find_str,
    stime,
    etime,
    balanceHistoryList,
    balanceHistoryPage,
    balanceHistoryTotal,
    loading: state.loading.models.supplier
  }
}

export default connect(mapStateToProps)(supplierHistory)
