import * as loginServices from '../services/home'
import * as logisticsService from '../pages/logistics/services/logistics'
import { message, notification } from 'antd'

export default {
  namespace: 'home',
  state: {
    count: {},
    customerPer: [],
    supplierPer: [],
    logistics: [],
    trend: {},
    countLoading: false,
    customerLoading: false,
    supplierLoading: false,
    currentOrder: {},
    currentLogistics: {},
    logMapData: {},
    orderMapData: {},
    homeMapData: [],
    detailForm: '',
    carOption: {
      car_head: [],
      car_body: [],
      driver: [],
      supercargo: [],
    },
    companyOption: [],
    find_str: '',
    order_type: '3',
    stime: '',
    etime: '',
    time_type: '1',
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'count', payload: query})
          dispatch({type: 'customerPer', payload: query})
          dispatch({type: 'supplierPer', payload: query})
          dispatch({type: 'logistics', payload: query})
          dispatch({type: 'trend', payload: query})
        }
        dispatch({
          type: `${pathname.substr(1)}/fetch`,
          payload: {},
        })
      })
    },
  },

  effects: {
    * count({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {countLoading: true}})
      const {data} = yield call(loginServices.count, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            count: data.data.count,
          },
        })
      }
      yield put({type: 'save', payload: {countLoading: false}})
    },
    * customerPer({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {customerLoading: true}})
      const {data} = yield call(loginServices.customerPer, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            customerPer: data.data.list,
          },
        })
      }
      yield put({type: 'save', payload: {customerLoading: false}})
    },
    * supplierPer({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {supplierLoading: true}})
      const {data} = yield call(loginServices.supplierPer, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierPer: data.data.list,
          },
        })
      }
      yield put({type: 'save', payload: {supplierLoading: false}})
    },
    * logistics({payload}, {call, put}) {
      const {data} = yield call(loginServices.logistics)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            logistics: data.data.list,
          },
        })
      }
    },
    * trend({payload: {flag = '1'}}, {call, put}) {
      const {data} = yield call(loginServices.trend, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            trend: data.data.list,
          },
        })
      }
    },
    * getLogMapData({payload: {id}}, {call, put}) {
      const {data} = yield call(loginServices.getLogMapData, {id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            logMapData: data.data.list,
          },
        })
      } else if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            logMapData: 0,
          },
        })
      }
    },
    * getOrderMapData({payload: {id}}, {call, put}) {
      const {data} = yield call(loginServices.getOrderMapData, {id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            orderMapData: data.data.list,
          },
        })
      } else if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            orderMapData: 0,
          },
        })
      }
    },
    * getHomeMapData({payload}, {call, put}) {
      const {data} = yield call(loginServices.getHomeMapData)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            homeMapData: data.data.list,
          },
        })
      } else if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            homeMapData: [],
          },
        })
      }
    },
    * getDetail({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.getDetail, id)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            detailForm: data.data.order,
            step: data.data.order.deliver_status,
          },
        })
        yield put({
          type: 'logisticsDetail/save',
          payload: {
            detailForm: data.data.order,
            step: data.data.order.deliver_status,
          },
        })
      }
    },
    * getCompanyOption({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.getCompanyOption, id)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            companyOption: data.data.list,
          },
        })
        yield put({
          type: 'logisticsDetail/save',
          payload: {
            companyOption: data.data.list,
          },
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
          },
        })
        yield put({
          type: 'logisticsDetail/save',
          payload: {
            carOption: data.data,
          },
        })
      }
    },
    * doDispatch({payload: form}, {call, put, select}) {
      const {data} = yield call(logisticsService.doDispatch, form)
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '3',
            order_type,
            stime,
            etime,
            time_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * acceptOrder({payload: id}, {call, put, select}) {
      const {data} = yield call(logisticsService.acceptOrder, id)
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put({
        //   type: 'getDeliverList',
        //   payload: {
        //     page: 1,
        //     deliver_status: '3'
        //   }
        // })
        // yield put({
        //   type: 'logistics/save',
        //   payload: {
        //     currentTab: 'yijiedan',
        //     currentIndex: 0
        //   }
        // })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '3',
            order_type,
            stime,
            etime,
            time_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * refuseOrder({payload: id}, {call, put, select}) {
      const {data} = yield call(logisticsService.refuseOrder, id)
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put({
        //   type: 'getDeliverList',
        //   payload: {
        //     page: 1
        //   }
        // })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '3',
            order_type,
            stime,
            etime,
            time_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * uploadPound({payload: {file, id, load_type, num, load_time}}, {call, put, select}) {
      const {data} = yield call(logisticsService.uploadPound, {file, id, load_type, num, load_time})
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put({
        //   type: 'logistics/getDeliverList',
        //   payload: {
        //     page: 1,
        //     deliver_status: '4'
        //   }
        // })
        // yield put({
        //   type: 'logistics/save',
        //   payload: {
        //     currentTab: 'yunshuzhong',
        //     currentIndex: 0
        //   }
        // })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '3',
            order_type,
            stime,
            etime,
            time_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * uploadUnPound({payload: {file, id, load_type, num, unload_time}}, {call, put, select}) {
      const {data} = yield call(logisticsService.uploadUnPound, {file, id, load_type, num, unload_time})
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put({
        //   type: 'logistics/getDeliverList',
        //   payload: {
        //     page: 1,
        //     deliver_status: '5'
        //   }
        // })
        // yield put({
        //   type: 'logistics/save',
        //   payload: {
        //     currentTab: 'yixieche',
        //     currentIndex: 0
        //   }
        // })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '3',
            order_type,
            stime,
            etime,
            time_type,
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * confirmBill({payload: {id, load_num, unload_num}}, {call, put, select}) {
      const {data} = yield call(logisticsService.confirmBill, {id, load_num, unload_num})
      const find_str = yield select(state => state.order.find_str)
      const order_type = yield select(state => state.order.order_type)
      const stime = yield select(state => state.order.stime)
      const etime = yield select(state => state.order.etime)
      const time_type = yield select(state => state.order.time_type)
      if (data.code === -1) return false
      if (data.code === 1) {
        // yield put(routerRedux.push({
        //   pathname: '/order',
        // }))
        // yield put({
        //   type: 'order/fetch',
        //   payload: {
        //     order_status: '4',
        //     order_type: '1'
        //   }
        // })
        yield put({
          type: 'order/save',
          payload: {currentTab: 'icon-icon-test2', currentIndex: 0},
        })
        yield put({
          type: 'order/fetch',
          payload: {
            find_str,
            order_status: '4',
            order_type,
            stime,
            etime,
            time_type,
          },
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
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
