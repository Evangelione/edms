import * as orderService from '../services/order'
import { message } from 'antd'

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
    goodsOption: [],
    statusNum: {},
    currentOrder: {},
    currentIndex: 0,
    find_str: '',
    order_type: '1'
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order') {
          dispatch({type: 'fetch', payload: query})
          dispatch({
            type: 'save', payload: {
              currentTab: 'quanbu',
              currentIndex: 0,
              order_type: '1'
            }
          })
        }
        if (pathname === '/order/doOrder') {
          dispatch({type: 'fetchSelect', payload: query})
        }
      })
    }
  },
  effects: {
    * fetch({payload: {page = 1, order_status = '', find_str = '', order_type = '1'}}, {call, put, select}) {
      const {data} = yield call(orderService.getOrderList, {page, order_status, find_str, order_type})
      const currentIndex = yield select(state => state.order.currentIndex)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            total: parseInt(data.data.count, 10),
            page: parseInt(page, 10),
            order_status,
            find_str,
            statusNum: data.data.status_num,
            currentOrder: data.data.list[currentIndex],
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
      if (data.code === 1) {
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
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            goodsOption: data.data.list,
          }
        })
      }
    },
    * addOrder({payload: {values}}, {call, put}) {
      const {data} = yield call(orderService.addOrder, {values})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
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
