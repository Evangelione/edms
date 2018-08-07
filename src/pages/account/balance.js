import {Card, Tabs, Input} from 'antd'
import {connect} from 'dva'
import ClientTable from './components/ClientTable'
import SupplierTable from './components/SupplierTable'

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {accountKey} = state.balance
  return {
    accountKey,
    loading: state.loading.models.balance
  }
}

export default connect(mapStateToProps)(({dispatch, accountKey}) => {

  function iptSearch(value) {
    dispatch({
      type: 'balance/clientFetch',
      payload: {page: 1, find_str: value}
    })
    dispatch({
      type: 'balance/supplierFetch',
      payload: {page: 1, find_str: value}
    })
  }

  function tabChange(val) {
    dispatch({
      type: 'balance/save',
      payload: {
        accountKey: val
      }
    })
  }

  return (
    <div>
      <div className={'searchBox'}>
        <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                onSearch={iptSearch}/>
      </div>
      <Card>
        <Tabs onChange={tabChange} activeKey={accountKey}>
          <TabPane tab="客户余额" key='1'>
            <ClientTable></ClientTable>
          </TabPane>
          <TabPane tab="供应商余额" key='2'>
            <SupplierTable></SupplierTable>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
})
