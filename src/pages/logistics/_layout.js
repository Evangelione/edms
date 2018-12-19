import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Input, DatePicker, Row, Col } from 'antd'
import LogisticsDetail from './logisticsDetail'
import LogisticsBalance from './logisticsBalance'
import LogisticsHistory from './logisticsHistory'
import LogisticsTable from './components/LogisticsTable'
import StatementHistory from './components/StatementHistory'
import ExportModal from '../../components/ExportModal/ExportModal'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import BalanceOfAccount from './components/BalanceOfAccount'
import LogisticsDetailV2 from './components/LogisticsDetailV2'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const Search = Input.Search
const {RangePicker} = DatePicker

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableKey: '2',
      currentTab: 'quanbu',
    }
  }

  changeClass = (type, state) => {
    if (this.props.loading) return false
    this.props.dispatch({
      type: 'logistics/save',
      payload: {
        currentTab: type,
        currentIndex: 0,
      },
    })
    this.props.dispatch({
      type: 'logistics/getDeliverList',
      payload: {
        find_str: this.props.find_str,
        deliver_status: state,
      },
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day')
  }

  callback = (key) => {
    this.setState({tableKey: key})
  }

  iptSearch = (value) => {
    if (this.state.tableKey === '1') {
      this.props.dispatch({
        type: 'logistics/getDeliverList',
        payload: {
          find_str: value,
          deliver_status: this.props.deliver_status,
        },
      })
    } else {
      this.props.dispatch({
        type: 'logistics/getDeliverFee',
        payload: {
          find_str: value,
          stime: this.props.stime,
          etime: this.props.etime,
        },
      })
    }
  }

  rangeChange = (dates, dateString) => {
    this.props.dispatch({
      type: 'logistics/getDeliverFee',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str,
      },
    })

    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str,
      },
    })
  }

  render() {
    const {currentLogistics} = this.props
    return (
      <AnimatePage>
        {this.props.location.pathname === '/logistics/logisticsDetail' ?
          <LogisticsDetail/>
          :
          this.props.location.pathname === '/logistics/logisticsHistory' ?
            <LogisticsHistory/>
            :
            this.props.location.pathname === '/logistics/logisticsBalance' ?
              <LogisticsBalance/>
              :
              <div>
                <div className='searchBox'>
                  {this.state.tableKey === '1' ? '' :
                    <span>
                    <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
                  </span>

                  }
                  <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                          onSearch={this.iptSearch}
                  />
                </div>
                <Tabs onChange={this.callback} activeKey={this.state.tableKey}>
                  <TabPane tab="运费明细" key='2'>
                    <Card style={{paddingTop: 30}}>
                      <LogisticsTable tableKey={this.state.tableKey}/>
                      <div className='toolBar'>
                        <ExportModal title='批量导出' type='logistics'>
                          <Button className='blueBorder' icon="export">批量导出</Button>
                        </ExportModal>
                      </div>
                    </Card>
                  </TabPane>
                  <TabPane tab='物流对账' key='3'>
                    <Card style={{paddingTop: 30}}>
                      <BalanceOfAccount/>
                    </Card>
                  </TabPane>
                  <TabPane tab='对账历史' key='4'>
                    <Card style={{paddingTop: 30}}>
                      <StatementHistory/>
                    </Card>
                  </TabPane>
                </Tabs>
                {/*{this.state.tableKey === '1' ?*/}
                {/*<Card style={{marginTop: 5}}>*/}
                {/*<LogisticsTable tableKey={this.state.tableKey}></LogisticsTable>*/}
                {/*</Card> : ''}*/}
                {this.state.tableKey === '1' ?
                  <Row gutter={10} style={{marginTop: 10}}>
                    <Col span={9}>
                      <LogisticsTable tableKey={this.state.tableKey}/>
                    </Col>
                    <Col span={15}>
                      {currentLogistics ?
                        <LogisticsDetailV2/> :
                        <div style={{
                          backgroundColor: '#fff',
                          border: '1px solid #e8e8e8',
                          padding: 22,
                          textAlign: 'center',
                        }}>暂无物流信息</div>}
                    </Col>
                  </Row> : ''}

              </div>
        }
      </AnimatePage>
    )
  }
}

function mapStateToProps(state) {
  const {currentTab, find_str, deliver_status, statusNum, stime, etime, currentLogistics} = state.logistics
  return {
    currentTab,
    find_str,
    deliver_status,
    statusNum,
    stime,
    etime,
    currentLogistics,
    loading: state.loading.models.logistics,
  }
}

export default connect(mapStateToProps)(Order)
