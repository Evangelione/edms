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
  const {currentTab, find_str, order_status, statusNum} = state.order
  return {
    currentTab,
    find_str,
    order_status,
    statusNum,
    loading: state.loading.models.order
  }
}

export default connect(mapStateToProps)(({dispatch, location, loading, order_status, currentTab, find_str, statusNum}) => {
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
              <Search style={{width: 260, marginLeft: 10}} placeholder="输入关键字进行查询"
                      onSearch={iptSearch}
              />
            </div>
            <Card>
              <Tabs>
                <TabPane tab="我的订单" key="1">
                  <div className={'toolBar'}>
                    <Button type='primary' icon="plus" onClick={doOrder}
                            style={{boxShadow: '0px 1px 10px #1890ff'}}>我要下单</Button>
                    <Button className={'blueBorder'} icon="select">批量导入</Button>
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
                      <span style={{color: 'red'}}>({statusNum.dzf})</span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daifahuo', '2')}
                         className={currentTab === 'daifahuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daifahuo' ? 'daifahuoBlue ' : 'daifahuoGray'}></span>
                      <span>待发货</span>
                      <span style={{color: 'red'}}>({statusNum.dfh})</span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daishouhuo', '3')}
                         className={currentTab === 'daishouhuo' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daishouhuo' ? 'daishouhuoBlue ' : 'daishouhuoGray'}></span>
                      <span>待收货</span>
                      <span style={{color: 'red'}}>({statusNum.dsh})</span>
                    </div>
                    <div onClick={changeClass.bind(null, 'daijiesuan', '4')}
                         className={currentTab === 'daijiesuan' ? 'blueBG ' : 'grayBG'}>
                        <span
                          className={currentTab === 'daijiesuan' ? 'daijiesuanBlue ' : 'daijiesuanGray'}></span>
                      <span>待结算</span>
                      <span style={{color: 'red'}}>({statusNum.djs})</span>
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
