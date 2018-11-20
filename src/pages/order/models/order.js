import * as orderService from '../services/order'
import { message } from 'antd'

export default {
  namespace: 'order',
  state: {
    list: [],
    page: 1,
    total: 0,
    order_type: '3',
    order_status: '',
    currentTab: 'icon-icon-test3',
    find_str: '',
    statusNum: {},
    currentOrder: {},
    currentIndex: 0,
    customOption: [],
    siteOption: [],
    supplierOption: [],
    goodsOption: [],
    modal_price: 0,
    stime: '',
    etime: ''
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {

      })
    },
  },
  effects: {
    * fetch({payload: {page = '1', order_type = '3', order_status = '', find_str = '', stime='', etime=''}}, {call, put, select}) {
      const {data} = yield call(orderService.getOrderList, {page, order_type, order_status, find_str,stime,etime})
      const currentIndex = yield select(state => state.order.currentIndex)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            page: parseInt(page, 10),
            order_type,
            order_status,
            find_str,
            list: data.data.list,
            total: parseInt(data.data.count, 10),
            currentOrder: data.data.list[currentIndex] ? data.data.list[currentIndex] : {},
            statusNum: data.data.status_num,
          },
        })
        yield put({
          type: 'home/save',
          payload: {
            currentOrder: data.data.list[currentIndex] ? data.data.list[currentIndex] : {},
            order_type,
            find_str,
          },
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
          },
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
          },
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
          },
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
    * delOrder({payload: {id}}, {call, put, select}) {
      const {data} = yield call(orderService.delOrder, {id})
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const order_status = yield select(state => state.order.order_status)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status,
            order_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * getModalPrice({payload: {purchase_price, deliver_price, price, distance, saler_num}}, {call, put, select}) {
      const {data} = yield call(orderService.getModalPrice, {purchase_price, deliver_price, price, distance, saler_num})
      if (data.code === -1) return false
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            modal_price: data.model_price,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
