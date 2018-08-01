import {Card, Tabs, Button, Input} from 'antd'
// import styles from './order.css'
import {connect} from 'dva'
import PageTitle from '../../components/PageTitle/PageTitle'
import DoOrder from './doOrder'
import OrderDetail from './orderDetail'
import OrderTable from './components/OrderTable'
import {routerRedux} from "dva/router"

const TabPane = Tabs.TabPane
const Search = Input.Search

function mapStateToProps(state) {
  const {currentTab, find_str, order_status} = state.order
  return {
    currentTab,
    find_str,
    order_status,
    loading: state.loading.models.backstage
  }
}

export default connect(mapStateToProps)(({dispatch, location, loading, order_status, currentTab, find_str}) => {
  function changeClass(type, state) {
    if (loading) return false
    dispatch({
      type: 'order/save',
      payload: {currentTab: type}
    })
    dispatch({
      type: 'order/fetch',
      payload: {find_str: find_str, order_status: state}
    })
  }

  function doOrder() {
    dispatch(routerRedux.push({
      pathname: '/order/doOrder',
    }))
  }

  function iptSearch(value) {
    dispatch({
      type: 'order/fetch',
      payload: {
        find_str: value,
        order_status
      }
    })
  }

  return (
    <div>
      {location.pathname === '/order/orderDetail' ?
        <OrderDetail></OrderDetail>
        :
        location.pathname === '/order/doOrder' ?
          <DoOrder></DoOrder>
          :
          <div>
            <PageTitle>我的订单</PageTitle>
            <div className={'searchBox'}>
              <Search style={{width: 200, marginLeft: 10}} placeholder="输入关键字进行查询"
                      onSearch={iptSearch}
              />
            </div>
            <Card>
              <Tabs>
                <TabPane tab="我的订单" key="1">
                  <div className={'toolBar'}>
                    <Button className={'blueBorder'} icon="select">批量导入</Button>
                    <Button type='primary' icon="plus" onClick={doOrder}>我要下单</Button>
                  </div>
                  <div className={'changeList'}>
                    <div onClick={changeClass.bind(null, 'quanbu', '')}
                         className={currentTab === 'quanbu' ? 'blueBG ' : 'grayBG'}>
                      <span className={currentTab === 'quanbu' ? 'quanbuBlue ' : 'quanbuGray'}></span>
                      <span>全部</span>
                      <span></span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daizhifu', '1')}
                         className={currentTab === 'daizhifu' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daizhifu' ? 'daizhifuBlue ' : 'daizhifuGray'}></span>
                      <span>待支付</span>
                      <span></span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daifahuo', '2')}
                         className={currentTab === 'daifahuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daifahuo' ? 'daifahuoBlue ' : 'daifahuoGray'}></span>
                      <span>待发货</span>
                      <span></span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daishouhuo', '3')}
                         className={currentTab === 'daishouhuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daishouhuo' ? 'daishouhuoBlue ' : 'daishouhuoGray'}></span>
                      <span>待收货</span>
                      <span></span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daijiesuan', '4')}
                         className={currentTab === 'daijiesuan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daijiesuan' ? 'daijiesuanBlue ' : 'daijiesuanGray'}></span>
                      <span>待结算</span>
                      <span></span>
                    </div>
                    <div onClick={changeClass.bind(null, 'yijiesuan', '5')}
                         className={currentTab === 'yijiesuan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'yijiesuan' ? 'yijiesuanBlue ' : 'yijiesuanGray'}></span>
                      <span>已结算</span>
                      <span></span>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
            <Card style={{marginTop: 5}}>
              <OrderTable></OrderTable>
            </Card>
          </div>
      }
    </div>
  )
})
