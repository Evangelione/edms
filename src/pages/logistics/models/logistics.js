import * as logisticsService from '../services/logistics'
import {message} from 'antd'

export default {
  namespace: 'logistics',
  state: {
    list: [],
    page: 1,
    total: 0,
    list2: [],
    page2: 1,
    total2: 0,
    deliver_status: '',
    find_str: '',
    currentTab: 'quanbu',
    stime: '',
    etime: '',
    statusNum: {}
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/logistics') {
          dispatch({type: 'getDeliverList', payload: query})
          dispatch({type: 'getDeliverFee', payload: query})
        }
      })
    }
  },
  effects: {
    * getDeliverList({payload: {page = 1, deliver_status = '', find_str = ''}}, {call, put}) {
      const {data} = yield call(logisticsService.getDeliverList, {page, deliver_status, find_str})
      if (data.code === 1){
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            page: parseInt(page, 10),
            total: parseInt(data.data.count, 10),
            deliver_status,
            find_str,
            statusNum: data.data.status_num
          }
        })
      }
    },
    * getDeliverFee({payload: {page = 1, find_str = '', stime, etime}}, {call, put}) {
      const {data} = yield call(logisticsService.getDeliverFee, {page, find_str, stime, etime})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list2: data.data.list,
            page2: parseInt(page, 10),
            total2: parseInt(data.data.count, 10),
            stime,
            etime,
            find_str
          }
        })
      }
    },
    * cancelDispatch({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.cancelDispatch, id)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'getDeliverList',
          payload: {
            page: 1
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * acceptOrder({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.acceptOrder, id)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'getDeliverList',
          payload: {
            page: 1
          }
        })
      } else {
        message.error(data.msg)
      }
    },
    * refuseOrder({payload: id}, {call, put}) {
      const {data} = yield call(logisticsService.refuseOrder, id)
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'getDeliverList',
          payload: {
            page: 1
          }
        })
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
