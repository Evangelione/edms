import * as logisticsService from '../services/logistics'
import { message } from 'antd'

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
    statusNum: {},
    balanceList: [],
    balancePage: 1,
    balanceTotal: 0,
    balanceDetailedList: [],
    balanceDetailedPage: 1,
    balanceDetailedTotal: 0,
    balanceHistoryList: [],
    balanceHistoryPage: 1,
    balanceHistoryTotal: 0,
    companyOption: [],
    companyDetail: {}
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
      if (data.code === 1) {
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
    * getDeliverFee({payload: {page = 1, find_str = '', stime = '', etime = ''}}, {call, put}) {
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
    * balanceFetch({payload: {page = 1, find_str = '', stime, etime, conversion}}, {call, put}) {
      const {data} = yield call(logisticsService.getBalanceData, {page, find_str, stime, etime, conversion})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            balanceList: data.data.list,
            balancePage: parseInt(page, 10),
            balanceTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * balanceDetailedFetch({payload: {page = 1, find_str = '', stime, etime, conversion, id}}, {call, put}) {
      const {data} = yield call(logisticsService.balanceDetailedFetch, {page, find_str, stime, etime, conversion, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            balanceDetailedList: data.data.list,
            balanceDetailedPage: parseInt(page, 10),
            balanceDetailedTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * balanceHistoryFetch({payload: {page = 1, find_str = '', stime, etime}}, {call, put}) {
      const {data} = yield call(logisticsService.getBalanceHistoryData, {page, find_str, stime, etime})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            balanceHistoryList: data.data.list,
            balanceHistoryPage: parseInt(page, 10),
            balanceHistoryTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * confirmAccount({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.confirmAccount, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * deleteAccount({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.deleteAccount, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * getLogisticsCompany({payload}, {call, put}) {
      const {data} = yield call(logisticsService.getLogisticsCompany)
      if (data.code === -1) return false
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            companyOption: data.data.list
          }
        })
      }
    },
    * accountNum({payload: {find_str = '', stime, etime}}, {call, put}) {
      const {data} = yield call(logisticsService.accountNum, {find_str, stime, etime})
      if (data.code === -1) return false
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            companyDetail: data.data.list
          }
        })
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }
}
