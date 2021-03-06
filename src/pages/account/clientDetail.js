import {connect} from 'dva'
import {Card, Tabs, DatePicker, Button} from 'antd'
import ReceiptTable from './components/ReceiptTable'
import BillTable from './components/BillTable'
import withRouter from 'umi/withRouter'
import moment from 'moment'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import {routerRedux} from 'dva/router'

const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker


function mapStateToProps(state) {
  const {currentTab} = state.balance
  return {
    currentTab,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(withRouter((({dispatch, location, currentTab}) => {

  function rangeChange(date, dateString) {
    dispatch({
      type: 'balance/clientDetailFetch',
      payload: {
        page: 1,
        stime: dateString[0],
        etime: dateString[1],
        id: location.query.id
      }
    })
    dispatch({
      type: 'balance/clientReceiptFetch',
      payload: {
        page: 1,
        stime: dateString[0],
        etime: dateString[1],
        id: location.query.id
      }
    })
  }

  function tabChange(val) {
    dispatch({
      type: 'balance/save',
      payload: {
        currentTab: val
      }
    })
  }

  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }

  function goCustomerList() {
    dispatch(routerRedux.push({
      pathname: '/account/balance',
    }))
  }

  return (
    <div>
      <div className='searchBox'>
        <RangePicker locale={locale} onChange={rangeChange} disabledDate={disabledDate}/>
      </div>
      <Card>
        <Tabs onChange={tabChange} activeKey={currentTab}>
          <TabPane tab="收款登记" key='1'>
            <ReceiptTable></ReceiptTable>
          </TabPane>
          <TabPane tab="收支明细" key='2'>
            <BillTable></BillTable>
          </TabPane>
        </Tabs>
      </Card>
      <div style={{textAlign: 'center'}}>
        <Button size='large' type='primary' onClick={goCustomerList} style={{marginTop: 30}}>返回客户余额</Button>
      </div>
    </div>
  )
})))
