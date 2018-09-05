import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Input, DatePicker, Table, Pagination } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import { PAGE_SIZE } from "../../constants"
import { routerRedux } from "dva/router"
import withRouter from 'umi/withRouter'

const TabPane = Tabs.TabPane
const Search = Input.Search
const {RangePicker} = DatePicker;

class supplierBalance extends React.Component {

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'supplier/balanceDetailedFetch',
      payload: {
        page: 1,
        find_str: this.props.find_str,
        stime: this.props.location.query.stime,
        etime: this.props.location.query.etime,
        conversion: true,
        id: this.props.location.query.id
      }
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'supplier/balanceDetailedFetch',
      payload: {
        find_str: value,
        stime: this.props.stime,
        etime: this.props.etime,
        id: this.props.location.query.id
      }
    })
  }

  rangeChange = (dates, dateString) => {
    this.props.dispatch({
      type: 'supplier/balanceDetailedFetch',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str,
        id: this.props.location.query.id
      }
    })
  }

  goBack = () => {
    this.props.dispatch(routerRedux.push({
      pathname: '/supplier/supplierHistory',
    }))
  }

  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'supplier/balanceDetailedFetch',
      payload: {
        id: this.props.location.query.id,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: this.props.find_str,
        page
      }
    })
  }

  render() {
    const {balanceDetailedList, balanceDetailedPage, balanceDetailedTotal, loading} = this.props
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
  const {columns, balanceDetailedList, balanceDetailedPage, balanceDetailedTotal, find_str, stime, etime} = state.supplier
  return {
    find_str,
    stime,
    etime,
    columns,
    balanceDetailedList,
    balanceDetailedPage,
    balanceDetailedTotal,
    loading: state.loading.models.supplier
  }
}

export default connect(mapStateToProps)(withRouter(supplierBalance))
