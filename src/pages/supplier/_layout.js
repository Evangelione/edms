import React from 'react'
import { Card, Tabs, DatePicker, Input } from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import PurchaseContract from './components/PurchaseContract'
import PurchaseDetail from './components/PurchaseDetail'
import BalanceOfAccount from './components/BalanceOfAccount'
import SupplierHistory from './supplierHistory'
import SupplierBalance from './supplierBalance'
import { connect } from 'dva'
import moment from 'moment'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker
const Search = Input.Search

class Supplier extends React.Component {
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
      type: 'supplier/save',
      payload: {
        currentKey: key,
      },
    })
  }

  rangeChange = (date, dateString) => {
    this.props.dispatch({
      type: 'supplier/purchaseDetailFetch',
      payload: {
        page: 1,
        stime: date[0],
        etime: date[1],
        find_str: this.props.find_str,
      },
    })
    this.props.dispatch({
      type: 'supplier/balanceFetch',
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
      type: 'supplier/purchaseContractFetch',
      payload: {
        page: 1,
        find_str: value,
      },
    })
    this.props.dispatch({
      type: 'supplier/purchaseDetailFetch',
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
        {this.props.location.pathname === '/supplier/supplierHistory' ?
          <SupplierHistory/>
          :
          this.props.location.pathname === '/supplier/supplierBalance' ?
            <SupplierBalance/>
            :
            <div>
              <div className={'searchBox'}>
                {this.state.paneKey === '1' ? '' :
                  <span>
              <RangePicker locale={locale} onChange={this.rangeChange} disabledDate={this.disabledDate}/>
            </span>}
                <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                        onSearch={this.iptSearch}/>
              </div>
              <Tabs onChange={this.callback} activeKey={this.props.currentKey}>
                <TabPane tab="采购合同" key='1'>
                  <Card style={{paddingTop: 30}}>
                    <PurchaseContract/>
                  </Card>
                </TabPane>
                <TabPane tab="采购明细" key='2'>
                  <Card style={{paddingTop: 30}}>
                    <PurchaseDetail/>
                  </Card>
                </TabPane>
                <TabPane tab='采购对账' key='3'>
                  <Card style={{paddingTop: 30}}>
                    <BalanceOfAccount/>
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
  const {find_str, stime, etime, currentKey} = state.supplier
  return {
    find_str,
    stime,
    etime,
    currentKey,
    loading: state.loading.models.supplier,
  }
}

export default connect(mapStateToProps)(Supplier)
