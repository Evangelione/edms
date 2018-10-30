import { connect } from 'dva'
import { Card, Tabs, Input } from 'antd'
import ClientTable from './components/ClientTable'
import SupplierTable from './components/SupplierTable'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {accountKey} = state.balance
  return {
    accountKey,
  }
}

export default connect(mapStateToProps)(({dispatch, accountKey}) => {

  function iptSearch(value) {
    dispatch({
      type: 'balance/clientFetch',
      payload: {page: 1, find_str: value},
    })
    dispatch({
      type: 'balance/supplierFetch',
      payload: {page: 1, find_str: value},
    })
  }

  function tabChange(val) {
    dispatch({
      type: 'balance/save',
      payload: {
        accountKey: val,
      },
    })
  }

  return (
    <AnimatePage>
      <div className='searchBox'>
        <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                onSearch={iptSearch}/>
      </div>
      <Tabs onChange={tabChange} activeKey={accountKey}>
        <TabPane tab='客户余额' key='1'>
          <Card style={{paddingTop: 30}}>
            <ClientTable></ClientTable>
          </Card>
        </TabPane>
        <TabPane tab='供应商预付款' key='2'>
          <Card style={{paddingTop: 30}}>
            <SupplierTable></SupplierTable>
          </Card>
        </TabPane>
      </Tabs>
    </AnimatePage>
  )
})
