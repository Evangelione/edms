import * as orderService from '../services/order'
import { message, notification } from 'antd'

export default {
  namespace: 'orderDetail',
  state: {
    editable: false,
    isSuccess: 'success',
    step: 0,
    detailForm: '',
    modifyForm: '',
    modifyId: ''
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/order/orderDetail') {
          dispatch({
            type: 'save',
            payload: {
              editable: false,
              // isSuccess: false
            }
          })
        }
      })
    }
  },
  effects: {
    * orderInfo({payload: id}, {call, put}) {
      const {data} = yield call(orderService.orderInfo, id)
      if (data.code === 1) {
        yield put({
          type: 'order/fetchSelect'
        })
        yield put({
          type: 'order/fetchSite',
          payload: {
            customer_id: data.data.order.cust_id
          }
        })
        yield put({
          type: 'order/fetchGoods',
          payload: {
            supplier_id: data.data.order.supp_id
          }
        })
        yield put({
          type: 'save',
          payload: {
            detailForm: data.data.order,
            step: data.data.order.order_status
          }
        })
      }
    },
    * modifyForm({payload}, {call, put, select}) {
      const form = yield select(state => state.orderDetail.modifyForm)
      const id = yield select(state => state.orderDetail.modifyId)
      let result = null
      let isErr = false
      form.validateFields((err, values) => {
        if (!err) {
          delete values.cust_id2
          delete values.cust_id3
          delete values.delivery
          delete values.goods_adress
          delete values.goods_contact
          delete values.goods_delivery
          delete values.goods_source
          delete values.adress
          delete values.goods_mobile
          delete values.lianxidianhua
          delete values.qiyuanchandi
          delete values.shuliang
          delete values.site_id2
          delete values.site_id3
          delete values.supp_id2
          delete values.supp_id3
          delete values.xiaoshouyuan
          values.recv_time = values.recv_time.format('YYYY-MM-DD hh:00:00')
          values.id = id
          result = values
        } else {
          isErr = true
        }
      })
      if (isErr) {
        message.warning('验证不通过！请检查字段是否符合要求！')
        return false
      }
      const {data} = yield call(orderService.modifyOrder, result)
      if (data.code === -1) return false
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            editable: false
          }
        })
        notification.success({
          message: '温馨提示',
          description: '订单已修改，请确认支付',
          duration: 6,
        })
      } else {
        message.error(data.msg)
      }
    },
    * doPay({payload: id}, {call, put}) {
      const {data} = yield call(orderService.doPay, id)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'save',
          payload: {
            isSuccess: 'success'
          }
        })
      } else {
        message.error(data.msg)
        yield put({
          type: 'save',
          payload: {
            isSuccess: 'error'
          }
        })
      }
    },
    * cancelOrder({payload: id}, {call, put, select}) {
      const {data} = yield call(orderService.cancelOrder, id)
      const find_str = yield select(state => state.order.find_str)
      const order_status = yield select(state => state.order.order_status)
      const page = yield select(state => state.order.page)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status,
            page
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * doResult({payload: form}, {call, put, select}) {
      const {data} = yield call(orderService.doResult, form)
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '5',
            order_type
          }
        })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'yijiesuan', currentIndex: 0}
        })
      } else {
        message.error(data.msg)
      }
    },
    * modifySave({payload: {form}}, {call}) {
      const {data} = yield call(orderService.modifyOrder, {form})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * confirmOrder({payload: {form}}, {call}) {
      const {data} = yield call(orderService.confirmOrder, {form})
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
