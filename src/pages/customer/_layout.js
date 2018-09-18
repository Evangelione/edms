import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, DatePicker, Input } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import SalesContract from './components/SalesContract'
import SalesDetail from './components/SalesDetail'
import BalanceOfAccount from './components/BalanceOfAccount'
import CustomerHistory from './customerHistory'
import CustomerBalance from './customerBalance'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker
const Search = Input.Search

class Client extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paneKey: '1',
    }
  }

  callback = (key) => {
    // this.setState({
    //   paneKey: key
    // })
    this.props.dispatch({
      type: 'customer/save',
      payload: {
        currentKey: key,
      }
    })
  }

  rangeChange = (date, dateString) => {
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str
      }
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str
      }
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str
      }
    })
  }

  disabledDate = (current) => {
    return current && current > moment().endOf('day')
  }

  iptSearch = (value) => {
    this.props.dispatch({
      type: 'customer/salesContractFetch',
      payload: {
        page: 1,
        find_str: value
      }
    })
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {
        page: 1,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: value
      }
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: value
      }
    })
  }

  render() {
    return (
      <div>
        {this.props.location.pathname === '/customer/customerHistory' ?
          <CustomerHistory/>
          :
          this.props.location.pathname === '/customer/customerBalance' ?
            <CustomerBalance/>
            :
            <div>
              <PageTitle>我的客户</PageTitle>
              <div className='searchBox'>
                {this.state.paneKey === '1' ? '' :
                  <span>
              <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
            </span>
                }
                <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                        onSearch={this.iptSearch}/>
              </div>
              <Card>
                <Tabs onChange={this.callback} activeKey={this.props.currentKey}>
                  <TabPane tab="销售合同" key='1'>
                    <SalesContract/>
                  </TabPane>
                  <TabPane tab="销售明细" key='2'>
                    <SalesDetail/>
                  </TabPane>
                  <TabPane tab="客户对账" key='3'>
                    <BalanceOfAccount/>
                  </TabPane>
                </Tabs>
              </Card>
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {find_str, stime, etime, currentKey} = state.customer
  return {
    find_str,
    stime,
    etime,
    currentKey,
    loading: state.loading.models.customer
  }
}

export default connect(mapStateToProps)(Client)
