import {Card, Tabs, Button, DatePicker, Table, Input, Pagination} from 'antd'
import {connect} from 'dva'
import ExportModal from '../../components/ExportModal/ExportModal'
import withRouter from 'umi/withRouter'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import {PAGE_SIZE} from "../../constants"
import {routerRedux} from "dva/router"
import moment from 'moment'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker
const Search = Input.Search

function mapStateToProps(state) {
  const {list, page, total, stime, etime, find_str} = state.analysis
  return {
    list,
    page,
    total,
    find_str,
    stime,
    etime,
    loading: state.loading.models.analysis
  }
}

export default connect(mapStateToProps)(withRouter((({dispatch, list, page, total, find_str, stime, etime, loading}) => {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/account/analysis',
      query: {
        page,
        find_str: find_str
      }
    }))
  }

  function rangeChange(date, dateString) {
    dispatch({
      type: 'analysis/fetch',
      payload: {
        page: 1,
        stime: dateString[0],
        etime: dateString[1],
        find_str
      }
    })
  }

  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }

  function iptSearch(value) {
    dispatch({
      type: 'analysis/fetch',
      payload: {
        find_str: value,
        stime,
        etime
      }
    })
  }

  const columns = [{
    title: '订单编号',
    dataIndex: 'order_code',
    key: 'order_code',
    align: 'center'
  }, {
    title: '生成日期',
    dataIndex: 'order_date',
    key: 'order_date',
    align: 'center'
  }, {
    title: '客户名称',
    dataIndex: 'customer_name',
    key: 'customer_name',
    align: 'center'
  }, {
    title: '站点简称',
    dataIndex: 'site_name',
    key: 'site_name',
    align: 'center'
  }, {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center'
  }, {
    title: '采购成本（元）',
    dataIndex: 'caigou_cost',
    key: 'caigou_cost',
    align: 'center'
  }, {
    title: '运费（元）',
    dataIndex: 'deliver_fee',
    key: 'deliver_fee',
    align: 'center'
  }, {
    title: '结算量（吨）',
    dataIndex: 'xs_final_num',
    key: 'xs_final_num',
    align: 'center'
  }, {
    title: '结算金额（元）',
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
    <div>
      <div className={'searchBox'}>
        <RangePicker locale={locale} onChange={rangeChange} disabledDate={disabledDate}/>
        <Search style={{width: 200, marginLeft: 10}} placeholder="输入关键字进行查询"
                onSearch={iptSearch}/>
      </div>
      <Card>
        <Tabs onChange={this.callback}>
          <TabPane tab="数据分析" key='1'>
            <div className='toolBar'>
              <ExportModal title='批量导出' type='accountAnalysis'>
                <Button className={'blueBorder'} icon='export'>批量导出</Button>
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
              className="ant-table-pagination"
              current={page}
              total={total}
              pageSize={PAGE_SIZE}
              onChange={pageChangeHandler}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
})))
