import * as logisticsService from '../services/logistics'
import { message, notification } from 'antd'
import * as routerRedux from "react-router-redux";

export default {
  namespace: 'logisticsDetail',
  state: {
    step: 0,
    detailForm: '',
    companyOption: [],
    carOption: {
      car_head: [],
      car_body: [],
      driver: [],
      supercargo: [],
    },
    billLoading: false
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/logistics/logisticsDetail') {
          dispatch({type: 'getDetail', payload: query})
        }
      })
    }
  },
  effects: {
    * getDetail({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.getDetail, id)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            detailForm: data.data.order,
            step: data.data.order.deliver_status
          }
        })
      }
    },
    * getCompanyOption({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.getCompanyOption, id)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            companyOption: data.data.list
          }
        })
      }
    },
    * getCarOption({payload: logistic_company}, {call, put}) {
      const {data} = yield call(logisticsService.getCarOption, logistic_company)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            carOption: data.data,
          }
        })
      }
    },
    * doDispatch({payload: form}, {call, put}) {
      const {data} = yield call(logisticsService.doDispatch, form)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'logistics/getDeliverList',
          payload: {
            page: 1,
            deliver_status: '2'
          }
        })
        yield put({
          type: 'logistics/save',
          payload: {
            currentTab: 'daijiedan',
            currentIndex: 0
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * uploadPound({payload: {file, id, load_type, num, load_time}}, {call, put}) {
      const {data} = yield call(logisticsService.uploadPound, {file, id, load_type, num, load_time})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'logistics/getDeliverList',
          payload: {
            page: 1,
            deliver_status: '4'
          }
        })
        yield put({
          type: 'logistics/save',
          payload: {
            currentTab: 'yunshuzhong',
            currentIndex: 0
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * uploadUnPound({payload: {file, id, load_type, num, unload_time}}, {call, put}) {
      const {data} = yield call(logisticsService.uploadUnPound, {file, id, load_type, num, unload_time})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'logistics/getDeliverList',
          payload: {
            page: 1,
            deliver_status: '5'
          }
        })
        yield put({
          type: 'logistics/save',
          payload: {
            currentTab: 'yixieche',
            currentIndex: 0
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * confirmBill({payload: {id, load_num, unload_num}}, {call, put}) {
      yield put({
        type: 'save',
        payload: {
          billLoading: true,
        }
      })
      const {data} = yield call(logisticsService.confirmBill, {id, load_num, unload_num})
      if (data.code === -1) return false
      if (data.code === 1) {
        yield put(routerRedux.push({
          pathname: '/order',
        }))
        yield put({
          type: 'order/fetch',
          payload: {
            order_status: '4',
            order_type: '1'
          }
        })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'daijiesuan', currentIndex: 0}
        })
        notification.success({
          message: '温馨提示',
          description: '调度已完成，请前往 我的订单 确认结算',
          duration: 6,
        })
      } else {
        notification.error({
          message: '温馨提示',
          description: data.msg,
          duration: 6,
        })
      }
      yield put({
        type: 'save',
        payload: {
          billLoading: false,
        }
      })
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }
}
