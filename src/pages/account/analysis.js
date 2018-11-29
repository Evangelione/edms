import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, DatePicker, Table, Input, Pagination, notification } from 'antd'
import ExportModal from '../../components/ExportModal/ExportModal'
import withRouter from 'umi/withRouter'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import { PAGE_SIZE } from '../../constants'
import { routerRedux } from 'dva/router'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const Search = Input.Search
const {RangePicker} = DatePicker

class Analysis extends React.Component {
  componentDidMount() {
    const args = {
      message: '温馨提示',
      description: '数据分析是加强版的进销差统计，导出的excel文件中数据字段更全更详细',
      duration: 6,
    }
    notification.info(args)
  }

  pageChangeHandler = (page) => {
    this.props.dispatch(routerRedux.push({
      pathname: '/account/analysis',
      query: {
        page,
        find_str: this.props.find_str,
      },
    }))
  }

  rangeChange = (date, dateString) => {
    this.props.dispatch({
      type: 'analysis/fetch',
      payload: {
        page: 1,
        stime: dateString[0],
        etime: dateString[1],
        find_str: this.props.find_str,
      },
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day')
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'analysis/fetch',
      payload: {
        find_str: value,
        stime: this.props.stime,
        etime: this.props.etime,
      },
    })
  }


  render() {
    const {list, page, total, loading} = this.props
    const columns = [{
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      align: 'center',
    }, {
      title: '生成日期',
      dataIndex: 'order_date',
      key: 'order_date',
      align: 'center',
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
      title: '订单状态',
      dataIndex: 'status_name',
      key: 'status_name',
      align: 'center',
    }, {
      title: '采购成本（元）',
      dataIndex: 'caigou_cost',
      key: 'caigou_cost',
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
      title: '物流成本（元）',
      dataIndex: 'final_deliver_fee',
      key: 'final_deliver_fee',
      align: 'center',
    }, {
      title: '结算量（吨）',
      dataIndex: 'xs_final_num',
      key: 'xs_final_num',
      align: 'center',
    }, {
      title: '销售额（元）',
      dataIndex: 'final_money',
      key: 'final_money',
      align: 'center',
    }, {
      title: '进销差（元/吨）',
      dataIndex: 'profit',
      key: 'profit',
      align: 'center',
    }]
    return (
      <AnimatePage>
        <div className='searchBox'>
          <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
          <Search style={{width: 260, marginLeft: 10}} placeholder='输入关键字进行查询'
                  onSearch={this.iptSearch}/>
        </div>
        <Tabs>
          <TabPane tab="数据分析" key='1'>
            <Card style={{paddingTop: 30}}>
              <div className='toolBar'>
                <ExportModal title='批量导出' type='accountAnalysis'>
                  <Button type='primary' icon='export' style={{height: 28}}>批量导出</Button>
                </ExportModal>
              </div>
              <Table
                columns={columns}
                dataSource={list}
                rowKey={record => record.order_code}
                pagination={false}
                loading={loading}
              ></Table>
              <Pagination
                className='ant-table-pagination'
                current={page}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={this.pageChangeHandler}
              />
            </Card>
          </TabPane>
        </Tabs>
      </AnimatePage>
    )
  }
}

function mapStateToProps(state) {
  const {list, page, total, stime, etime, find_str} = state.analysis
  return {
    list,
    page,
    total,
    find_str,
    stime,
    etime,
    loading: state.loading.models.analysis,
  }
}

export default connect(mapStateToProps)(withRouter(Analysis))
