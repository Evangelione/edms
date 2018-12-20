import React from 'react'
import { connect } from 'dva'
import { Card, Tabs, DatePicker } from 'antd'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import SalesContract from './components/SalesContract'
import SalesDetail from './components/SalesDetail'
import BalanceOfAccount from './components/BalanceOfAccount'
import CustomerHistory from './customerHistory'
import CustomerBalance from './customerBalance'
import StatementHistory from './components/StatementHistory'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker

// const Search = Input.Search

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
      },
    })
    if (key === '3') {
      this.props.dispatch({
        type: 'home/fetchCustomer',
        payload: {},
      }).then(() => {
        this.props.dispatch({
          type: 'customer/balanceFetch',
          payload: {
            page: 1,
            find_str: '',
            stime: this.props.stime,
            etime: this.props.etime,
            customer_id: this.props.customer_id,
            account_status: this.props.account_status,
            site_id: this.props.site_id,
            goods_id: this.props.goods_id,
          },
        })
      })
      this.props.dispatch({
        type: 'home/fetchSite',
        payload: {},
      })
      this.props.dispatch({
        type: 'home/fetchGoods',
        payload: {},
      })
    }
    if (key === '4') {
      this.props.dispatch({
        type: 'home/fetchCustomer',
        payload: {},
      })
      this.props.dispatch({
        type: 'customer/fetchHistory',
        payload: {
          stime: this.props.stime,
          etime: this.props.etime,
          customer_id: this.props.customer_id,
          account_status: this.props.account_status - 0 > 3 ? '3' : this.props.account_status,
        },
      })
    }
  }

  rangeChange = (date, dateString) => {
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str,
      },
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str,
      },
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str,
      },
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
        find_str: value,
      },
    })
    this.props.dispatch({
      type: 'customer/salesDetailFetch',
      payload: {
        page: 1,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: value,
      },
    })
    this.props.dispatch({
      type: 'customer/balanceFetch',
      payload: {
        page: 1,
        stime: this.props.stime,
        etime: this.props.etime,
        find_str: value,
      },
    })
  }

  render() {
    return (
      <AnimatePage>
        {this.props.location.pathname === '/customer/customerHistory' ?
          <CustomerHistory/>
          :
          this.props.location.pathname === '/customer/customerBalance' ?
            <CustomerBalance/>
            :
            <div>
              <div className='searchBox'>
                {this.state.paneKey === '1' ? '' :
                  <span>
              <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
            </span>
                }
                {/*<Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"*/}
                {/*onSearch={this.iptSearch}/>*/}
              </div>
              <Tabs onChange={this.callback} activeKey={this.props.currentKey}>
                <TabPane tab="销售合同" key='1'>
                  <Card style={{paddingTop: 30}}>
                    <SalesContract/>
                  </Card>
                </TabPane>
                <TabPane tab="销售明细" key='2'>
                  <Card style={{paddingTop: 30}}>
                    <SalesDetail/>
                  </Card>
                </TabPane>
                <TabPane tab="客户对账" key='3'>
                  <Card style={{paddingTop: 30}}>
                    <BalanceOfAccount/>
                  </Card>
                </TabPane>
                <TabPane tab="对账历史" key='4'>
                  <Card style={{paddingTop: 30}}>
                    <StatementHistory/>
                  </Card>
                </TabPane>
              </Tabs>
            </div>
        }
      </AnimatePage>
    )
  }
}

function mapStateToProps(state) {
  const {find_str, stime, etime, currentKey, customer_id, site_id, goods_id, account_status} = state.customer
  return {
    find_str,
    stime,
    etime,
    customer_id,
    currentKey,
    site_id,
    goods_id,
    account_status,
    loading: state.loading.models.customer,
  }
}

export default connect(mapStateToProps)(Client)
