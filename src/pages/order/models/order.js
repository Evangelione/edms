import * as orderService from '../services/order'
import {message} from 'antd'
import {routerRedux} from "dva/router"

export default {
  namespace: 'order',
  state: {
    list: [],
    page: 1,
    total: 0,
    order_status: 0,
    currentTab: 'quanbu',
    customOption: [],
    siteOption: [],
    supplierOption: [],
    goodsOption: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order') {
          dispatch({type: 'fetch', payload: query})
        }
        if (pathname === '/order/doOrder') {
          dispatch({type: 'fetchSelect', payload: query})
        }
      })
    }
  },
  effects: {
    * fetch({payload: {page = 1, order_status = '', find_str = ''}}, {call, put}) {
      const {data} = yield call(orderService.getOrderList, {page, order_status, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            total: parseInt(data.data.count, 10),
            page: parseInt(page, 10),
            order_status,
            find_str
          }
        })
      }
    },
    * fetchSelect({payload}, {call, put}) {
      const custom = yield call(orderService.fetchCustom)
      const supplier = yield call(orderService.fetchSupplier)
      if (custom.data.code === 1 && supplier.data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            customOption: custom.data.data.list,
            supplierOption: supplier.data.data.list,
          }
        })
      }
    },
    * fetchSite({payload: {customer_id}}, {call, put}) {
      const {data} = yield call(orderService.fetchSite, {customer_id})
      if (data.code === 1){
        yield put({
          type: 'save',
          payload: {
            siteOption: data.data.list,
          }
        })
      }
    },
    * fetchGoods({payload: {supplier_id}}, {call, put}) {
      const {data} = yield call(orderService.fetchGoods, {supplier_id})
      if (data.code === 1){
        yield put({
          type: 'save',
          payload: {
            goodsOption: data.data.list,
          }
        })
      }
    },
    * addOrder({payload: {values, id}}, {call, put}) {
      const {data} = yield call(orderService.addOrder, {values})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/order/orderDetail',
          query:{
            id
          }
        }))
      } else {
        message.error(data.msg)
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }
}
