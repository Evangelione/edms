import { connect } from 'dva'
import { Card, Tabs, Input } from 'antd'
import PageTitle from '../../components/PageTitle/PageTitle'
import UserTable from './components/UserTable'
import SupplierTable from './components/SupplierTable'
import VehicleTable from './components/VehicleTable'
import OperateUser from './operateUser'
import OperateSupplier from './operateSupplier'
import OperateVehicle from './operateVehicle'
import UserChecking from './UserChecking'
import SupplierChecking from './SupplierChecking'
import VehicleChecking from './VehicleChecking'

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {currentTab} = state.maintain
  return {
    currentTab,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(({location, dispatch, currentTab}) => {
  function iptSearch(value) {
    dispatch({
      type: 'maintain/fetchCustomer',
      payload: {
        find_str: value,
      }
    })
    dispatch({
      type: 'maintain/fetchSupplier',
      payload: {
        find_str: value,
      }
    })
    dispatch({
      type: 'maintain/fetchCar',
      payload: {
        find_str: value,
      }
    })
  }

  function callback(key) {
    dispatch({
      type: 'maintain/save',
      payload: {
        currentTab: key
      }
    })
  }

  return (
    <div>
      {location.pathname === '/maintain' ?
        <div>
          <PageTitle>数据维护</PageTitle>
          <div className='searchBox'>
            <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={iptSearch}/>
          </div>
          <Card>
            <Tabs activeKey={currentTab} onChange={callback}>
              <TabPane tab="我的客户" key="1">
                <UserTable></UserTable>
              </TabPane>
              <TabPane tab="我的供应商" key="2">
                <SupplierTable></SupplierTable>
              </TabPane>
              <TabPane tab="我的物流" key="3">
                <VehicleTable></VehicleTable>
              </TabPane>
            </Tabs>
          </Card>
        </div>
        :
        location.pathname === '/maintain/operateUser' ?
          <OperateUser/> :
          location.pathname === '/maintain/operateSupplier' ?
            <OperateSupplier/> :
            location.pathname === '/maintain/operateVehicle' ?
              <OperateVehicle/> :
              location.pathname === '/maintain/UserChecking' ?
                <UserChecking/> :
                location.pathname === '/maintain/SupplierChecking' ?
                  <SupplierChecking/> :
                  location.pathname === '/maintain/VehicleChecking' ?
                    <VehicleChecking/> : ''
      }
    </div>
  )
})
