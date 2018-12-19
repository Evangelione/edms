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
    companyDetail: {},
    currentLogistics: {},
    currentIndex: 0,
    logistics_company: '',
    account_status: '',
    site_id: '',
    goods_id: '',
    logisticsOption: [],
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/logistics') {
          // dispatch({type: 'balanceFetch', payload: query})
          dispatch({type: 'getDeliverFee', payload: query})
          dispatch({
            type: 'save', payload: {
              currentTab: 'quanbu',
              currentIndex: 0,
            },
          })
        }
      })
    },
  },
  effects: {
    * getDeliverList({payload: {page = 1, deliver_status = '', find_str = ''}}, {call, put, select}) {
      const {data} = yield call(logisticsService.getDeliverList, {page, deliver_status, find_str})
      const currentIndex = yield select(state => state.logistics.currentIndex)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            page: parseInt(page, 10),
            total: parseInt(data.data.count, 10),
            deliver_status,
            find_str,
            statusNum: data.data.status_num,
            currentLogistics: data.data.list[currentIndex],
          },
        })
        yield put({
          type: 'home/save',
          payload: {
            currentLogistics: data.data.list[currentIndex],
          },
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
            find_str,
          },
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
            page: 1,
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
          },
        })
      } else {
        message.error(data.msg)
      }
    },
    * balanceFetch({payload: {page = 1, find_str = '', stime, etime, logistics_company, account_status, site_id, goods_id, conversion}}, {call, put}) {
      const {data} = yield call(logisticsService.getBalanceData, {
        page,
        find_str,
        stime,
        etime,
        logistics_company,
        account_status,
        site_id,
        goods_id,
        conversion,
      })
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            balanceList: data.data.list,
            balancePage: parseInt(page, 10),
            balanceTotal: parseInt(data.data.count, 10),
            find_str,
          },
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
            find_str,
          },
        })
      }
    },
    * balanceHistoryFetch({payload: {page = 1, id}}, {call, put}) {
      const {data} = yield call(logisticsService.getBalanceHistoryData, {page, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            balanceHistoryList: data.data.list,
            balanceHistoryPage: parseInt(page, 10),
            balanceHistoryTotal: parseInt(data.data.count, 10),
          },
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
            companyOption: data.data.list,
          },
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
            companyDetail: data.data.list,
          },
        })
      }
    },
    * saveChange({payload: {logistics_company, site_id, goods_id, account_status}}, {call, put}) {
      let filed = logistics_company !== undefined ? 'logistics_company' : '' || site_id !== undefined ? 'site_id' : '' || goods_id !== undefined ? 'goods_id' : '' || account_status !== undefined ? 'account_status' : ''
      let val = logistics_company || site_id || goods_id || account_status || ''
      console.log(filed)
      console.log(val)
      yield put({
        type: 'save',
        payload: {
          [filed]: val,
        },
      })
    },
    * fetchHistory({payload: {page = 1, stime, etime, logistics_company, account_status}}, {call, put}) {
      const {data} = yield call(logisticsService.fetchHistory, {page, stime, etime, logistics_company, account_status})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            historylist: data.data.list,
            historypage: parseInt(page, 10),
            historytotal: parseInt(data.data.count, 10),
            stime,
            etime,
            logistics_company,
            account_status,
          },
        })
      }
    },
    * reconciliationConfirm({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.reconciliationConfirm, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * kaipiao({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.kaipiao, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * deleteduizhang({payload: {id}}, {call, put}) {
      const {data} = yield call(logisticsService.deleteduizhang, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * Reconciliation({payload: {ids}}, {call, put}) {
      const {data} = yield call(logisticsService.Reconciliation, {ids})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * Reconciliation2({payload: {stime, etime, logistics_company, account_status, site_id, goods_id}}, {call, put}) {
      const {data} = yield call(logisticsService.Reconciliation2, {
        stime,
        etime,
        logistics_company,
        account_status,
        site_id,
        goods_id,
      })
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({
          type: 'save',
          payload: {
            account_status: '',
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
