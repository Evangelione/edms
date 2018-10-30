import { connect } from 'dva'
import Balance from './balance'
import Analysis from './analysis'
import ClientDetail from './clientDetail'
import SupplierDetail from './supplierDetail'

export default connect()(({location}) => {
  return (
    <div>
      {location.pathname === '/account/balance' ?
        <Balance></Balance>
        :
        location.pathname === '/account/balance/clientDetail' ?
          <ClientDetail></ClientDetail>
          :
          location.pathname === '/account/balance/supplierDetail' ?
            <SupplierDetail></SupplierDetail>
            :
            location.pathname === '/account/analysis' ?
              <Analysis></Analysis>
              : ''
      }
    </div>
  )
})

