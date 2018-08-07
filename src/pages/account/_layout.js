import { connect } from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import Balance from './balance'
import Analysis from './analysis'
import ClientDetail from './clientDetail'
import SupplierDetail from './supplierDetail'

export default connect()(({location}) => {
  return (
    <div>
      {location.pathname === '/account/balance' ?
        <div>
          <PageTitle>余额管理</PageTitle>
          <Balance></Balance>
        </div>
        :
        location.pathname === '/account/balance/clientDetail' ?
          <div>
            <PageTitle>客户余额</PageTitle>
            <ClientDetail></ClientDetail>
          </div>
          :
          location.pathname === '/account/balance/supplierDetail' ?
            <div>
              <PageTitle>供应商余额</PageTitle>
              <SupplierDetail></SupplierDetail>
            </div>
            :
            location.pathname === '/account/analysis' ?
              <div>
                <PageTitle>数据分析</PageTitle>
                <Analysis></Analysis>
              </div>
              : ''
      }
    </div>
  )
})

