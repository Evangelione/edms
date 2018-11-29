import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Input, DatePicker, Table, Pagination } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router'
import withRouter from 'umi/withRouter'

const TabPane = Tabs.TabPane
const Search = Input.Search
const {RangePicker} = DatePicker

class logisticsBalance extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'logistics/balanceDetailedFetch',
      payload: {
        page: 1,
        find_str: this.props.find_str,
        stime: this.props.location.query.stime,
        etime: this.props.location.query.etime,
        conversion: true,
        id: this.props.location.query.id,
      },
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day')
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'logistics/balanceDetailedFetch',
      payload: {
        find_str: value,
        stime: this.props.stime,
        etime: this.props.etime,
        id: this.props.location.query.id,
      },
    })
  }

  rangeChange = (dates, dateString) => {
    this.props.dispatch({
      type: 'logistics/balanceDetailedFetch',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str,
        id: this.props.location.query.id,
      },
    })
  }

  goBack = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/logistics/logisticsHistory',
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'logistics/balanceDetailedFetch',
      payload: {
        id: this.props.location.query.id,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: this.props.find_str,
        page,
      },
    })
  }

  render() {
    const {balanceDetailedList, balanceDetailedPage, balanceDetailedTotal, loading} = this.props
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
      title: '结算量(吨)',
      dataIndex: 'wl_final_num',
      key: 'wl_final_num',
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
        <PageTitle>
          <Button type='primary' onClick={this.goBack}>返回上一级</Button>
        </PageTitle>
        <div className='searchBox'>
          <span>
            <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
          </span>
          <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                  onSearch={this.iptSearch}
          />
        </div>
        <Card>
          <Tabs onChange={this.callback}>
            <TabPane tab="运单明细" key='1'>
              <Table
                columns={columns}
                dataSource={balanceDetailedList}
                rowKey={record => record.deliver_code}
                pagination={false}
                loading={loading}
              ></Table>
              <Pagination
                className='ant-table-pagination'
                current={balanceDetailedPage}
                total={balanceDetailedTotal}
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
  const {columns, balanceDetailedList, balanceDetailedPage, balanceDetailedTotal, find_str, stime, etime} = state.logistics
  return {
    find_str,
    stime,
    etime,
    columns,
    balanceDetailedList,
    balanceDetailedPage,
    balanceDetailedTotal,
    loading: state.loading.models.logistics,
  }
}

export default connect(mapStateToProps)(withRouter(logisticsBalance))
