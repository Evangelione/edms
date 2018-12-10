import { connect } from 'dva'
import { Card, Tabs, Input } from 'antd'
// import UserTable from './components/UserTable'
// import SupplierTable from './components/SupplierTable'
// import VehicleTable from './components/VehicleTable'
import SiteTable from './components/Site'
import Customer from './components/Customer'
import Supplier from './components/Supplier'
import Vehicle from './components/Vehicle'
import GasSource from './components/GasSource'
import CarHead from './components/CarHead'
import CarBody from './components/CarBody'
import Dirver from './components/Dirver'
import OperateUser from './operateUser'
import OperateSupplier from './operateSupplier'
import OperateVehicle from './operateVehicle'
import UserChecking from './UserChecking'
import SupplierChecking from './SupplierChecking'
import VehicleChecking from './VehicleChecking'
import AnimatePage from '../../components/AnimatePage/AnimatePage'

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {currentTab} = state.maintain
  return {
    currentTab,
    loading: state.loading.models.order,
  }
}

export default connect(mapStateToProps)(({location, dispatch, currentTab}) => {
  function iptSearch(value) {
    dispatch({
      type: 'maintain/fetchCustomer',
      payload: {
        find_str: value,
      },
    })
    dispatch({
      type: 'maintain/fetchSupplier',
      payload: {
        find_str: value,
      },
    })
    dispatch({
      type: 'maintain/fetchCar',
      payload: {
        find_str: value,
      },
    })
  }

  function callback(key) {
    dispatch({
      type: 'maintain/save',
      payload: {
        currentTab: key,
      },
    })
  }

  return (
    <AnimatePage>
      {location.pathname === '/maintain' ?
        <div>
          <div className='searchBox'>
            <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                    onSearch={iptSearch}/>
          </div>
          <Tabs activeKey={currentTab} onChange={callback}>
            <TabPane tab="客户" key="1">
              <Card style={{paddingTop: 30}}>
                <Customer/>
              </Card>
            </TabPane>
            <TabPane tab="站点" key="2">
              <Card style={{paddingTop: 30}}>
                <SiteTable/>
              </Card>
            </TabPane>
            <TabPane tab="供应商" key="3">
              <Card style={{paddingTop: 30}}>
                <Supplier/>
              </Card>
            </TabPane>
            <TabPane tab="气源" key="4">
              <Card style={{paddingTop: 30}}>
                <GasSource/>
              </Card>
            </TabPane>
            <TabPane tab="物流" key="5">
              <Card style={{paddingTop: 30}}>
                <Vehicle/>
              </Card>
            </TabPane>
            <TabPane tab="司机" key="6">
              <Card style={{paddingTop: 30}}>
                <Dirver/>
              </Card>
            </TabPane>
            <TabPane tab="车头" key="7">
              <Card style={{paddingTop: 30}}>
                <CarHead/>
              </Card>
            </TabPane>
            <TabPane tab="车挂" key="8">
              <Card style={{paddingTop: 30}}>
                <CarBody/>
              </Card>
            </TabPane>
          </Tabs>
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
    </AnimatePage>
  )
})
