import * as logisticsService from "../services/logistics";
import {message} from 'antd'

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
      billLoading: false
    }
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
            step: data.data.order.order_status
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
            page: 1
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * uploadPound({payload: {file, id, load_type, num}}, {call, put}) {
      const {data} = yield call(logisticsService.uploadPound, {file, id, load_type, num})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'logistics/getDeliverList',
          payload: {
            page: 1
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
        message.success(data.msg)
        yield put({
          type: 'logistics/getDeliverList',
          payload: {
            page: 1
          }
        })
      } else {
        message.error(data.msg)
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
