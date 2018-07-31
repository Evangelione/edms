import {Card, Tabs, DatePicker} from 'antd'
import SuppReceiptTable from './components/SuppReceiptTable'
import SuppBillTable from './components/SuppBillTable'
import withRouter from "umi/withRouter"
import {connect} from "dva/index"

import locale from 'antd/lib/date-picker/locale/zh_CN'


const TabPane = Tabs.TabPane
const {RangePicker} = DatePicker

function mapStateToProps(state) {
  const {currentTab2} = state.balance
  return {
    currentTab2,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(withRouter((({dispatch, location, currentTab2}) => {
  function rangeChange(date, dateString) {
    dispatch({
      type: 'balance/supplierDetailFetch',
      payload: {
        page: 1,
        stime: dateString[0],
        etime: dateString[1],
        id: location.query.id
      }
    })
    dispatch({
      type: 'balance/supplierReceiptFetch',
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
        currentTab2: val
      }
    })
  }

  return (
    <div>
      <div className={'searchBox'}>
        <RangePicker locale={locale} onChange={rangeChange}/>
      </div>
      <Card>
        <Tabs onChange={tabChange} activeKey={currentTab2}>
          <TabPane tab="付款登记" key='1'>
            <SuppReceiptTable></SuppReceiptTable>
          </TabPane>
          <TabPane tab="收支明细" key='2'>
            <SuppBillTable></SuppBillTable>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
})))
