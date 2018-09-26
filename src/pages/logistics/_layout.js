import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, Button, Input, DatePicker, Row, Col } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import LogisticsDetail from './logisticsDetail'
import LogisticsBalance from './logisticsBalance'
import LogisticsHistory from './logisticsHistory'
import LogisticsTable from './components/LogisticsTable'
import ExportModal from '../../components/ExportModal/ExportModal'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import BalanceOfAccount from './components/BalanceOfAccount'
import LogisticsDetailV2 from './components/LogisticsDetailV2'

const TabPane = Tabs.TabPane
const Search = Input.Search
const {RangePicker} = DatePicker;

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableKey: '1',
      currentTab: 'quanbu'
    }
  }

  changeClass = (type, state) => {
    if (this.props.loading) return false
    this.props.dispatch({
      type: 'logistics/save',
      payload: {
        currentTab: type,
        currentIndex: 0
      }
    })
    this.props.dispatch({
      type: 'logistics/getDeliverList',
      payload: {
        find_str: this.props.find_str,
        deliver_status: state
      }
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day');
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
          deliver_status: this.props.deliver_status
        }
      })
    } else {
      this.props.dispatch({
        type: 'logistics/getDeliverFee',
        payload: {
          find_str: value,
          stime: this.props.stime,
          etime: this.props.etime
        }
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
        find_str: this.props.find_str
      }
    })

    this.props.dispatch({
      type: 'logistics/balanceFetch',
      payload: {
        page: 1,
        stime: dates[0],
        etime: dates[1],
        find_str: this.props.find_str
      }
    })
  }

  render() {
    const {currentTab, statusNum, currentLogistics} = this.props
    return (
      <div>
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
                <PageTitle>我的物流</PageTitle>
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
                <Card>
                  <Tabs onChange={this.callback} activeKey={this.state.tableKey}>
                    <TabPane tab="我的物流" key='1'>
                      <div className='changeList'>
                        <div onClick={this.changeClass.bind(null, 'quanbu', '')}
                             className={currentTab === 'quanbu' ? 'blueBG ' : 'grayBG'}>
                          <span className={currentTab === 'quanbu' ? 'quanbuBlue ' : 'quanbuGray'}></span>
                          <span>全部</span>
                          <span></span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'daidiaodu', '1')}
                             className={currentTab === 'daidiaodu' ? 'blueBG ' : 'grayBG'}>
                      <span
                        className={currentTab === 'daidiaodu' ? 'daidiaoduBlue ' : 'daidiaoduGray'}></span>
                          <span>待调度</span>
                          <span style={{color: 'red'}}>({statusNum.ddd})</span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'daijiedan', '2')}
                             className={currentTab === 'daijiedan' ? 'blueBG ' : 'grayBG'}>
                      <span
                        className={currentTab === 'daijiedan' ? 'daijiedanBlue ' : 'daijiedanGray'}></span>
                          <span>待接单</span>
                          <span style={{color: 'red'}}>({statusNum.djd})</span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'yijiedan', '3')}
                             className={currentTab === 'yijiedan' ? 'blueBG ' : 'grayBG'}>
                          <span className={currentTab === 'yijiedan' ? 'yijiedanBlue ' : 'yijiedanGray'}></span>
                          <span>已接单</span>
                          <span style={{color: 'red'}}>({statusNum.yjd})</span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'yunshuzhong', '4')}
                             className={currentTab === 'yunshuzhong' ? 'blueBG ' : 'grayBG'}>
                      <span
                        className={currentTab === 'yunshuzhong' ? 'yunshuzhongBlue ' : 'yunshuzhongGray'}></span>
                          <span>运输中</span>
                          <span style={{color: 'red'}}>({statusNum.ysz})</span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'yixieche', '5')}
                             className={currentTab === 'yixieche' ? 'blueBG ' : 'grayBG'}>
                          <span className={currentTab === 'yixieche' ? 'yixiecheBlue ' : 'yixiecheGray'}></span>
                          <span>已卸车</span>
                          <span style={{color: 'red'}}>({statusNum.yxc})</span>
                        </div>
                        <div onClick={this.changeClass.bind(null, 'yiwancheng', '6')}
                             className={currentTab === 'yiwancheng' ? 'blueBG ' : 'grayBG'}>
                      <span
                        className={currentTab === 'yiwancheng' ? 'yiwanchengBlue ' : 'yiwanchengGray'}></span>
                          <span>已完成</span>
                          <span></span>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="运费明细" key='2'>
                      <LogisticsTable tableKey={this.state.tableKey}></LogisticsTable>
                      <div className='toolBar'>
                        <ExportModal title='批量导出' type='logistics'>
                          <Button className='blueBorder' icon="export">批量导出</Button>
                        </ExportModal>
                      </div>
                    </TabPane>
                    <TabPane tab='物流对账' key='3'>
                      <BalanceOfAccount/>
                    </TabPane>
                  </Tabs>
                </Card>
                {/*{this.state.tableKey === '1' ?*/}
                {/*<Card style={{marginTop: 5}}>*/}
                {/*<LogisticsTable tableKey={this.state.tableKey}></LogisticsTable>*/}
                {/*</Card> : ''}*/}
                {this.state.tableKey === '1' ?
                  <Row gutter={10} style={{marginTop: 10}}>
                    <Col span={9}>
                      <LogisticsTable tableKey={this.state.tableKey}></LogisticsTable>
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
      </div>
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
    loading: state.loading.models.logistics
  }
}

export default connect(mapStateToProps)(Order)
