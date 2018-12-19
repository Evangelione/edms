import * as supplierServices from '../services/supplier'
import { message } from 'antd'

export default {
  namespace: 'supplier',
  state: {
    contractList: [],
    contractPage: 1,
    contractTotal: 0,
    detailList: [],
    detailPage: 1,
    detailTotal: 0,
    find_str: '',
    stime: '',
    etime: '',
    company: {},
    supplierOption: [],
    balanceList: [],
    balancePage: 1,
    balanceTotal: 0,
    balanceDetailedList: [],
    balanceDetailedPage: 1,
    balanceDetailedTotal: 0,
    companyOption: [],
    goodsOption: [],
    companyDetail: {},
    currentKey: '1',
    supp_id: '',
    site_id: '',
    goods_id: '',
    account_status: '',
    historylist: [],
    historypage: 1,
    historytotal: 0,
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        // if (pathname === '/account/balance/') {
        // clientDetail
        // }
      })
    },
  },
  effects: {
    * purchaseContractFetch({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(supplierServices.purchaseContractFetch, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            contractList: data.data.list,
            contractPage: parseInt(page, 10),
            contractTotal: parseInt(data.data.count, 10),
            find_str,
          },
        })
      }
    },
    * purchaseDetailFetch({payload: {page = 1, find_str = '', stime = '', etime = ''}}, {call, put}) {
      const {data} = yield call(supplierServices.purchaseDetailFetch, {page, find_str, stime, etime})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            detailList: data.data.list,
            detailPage: parseInt(page, 10),
            detailTotal: parseInt(data.data.count, 10),
            find_str,
            stime,
            etime,
          },
        })
      }
    },
    * fetchOptions({payload}, {call, put}) {
      const {data} = yield call(supplierServices.fetchOptions)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierOption: data.data.list,
          },
        })
      }
    },
    * fetchGoods({payload}, {call, put}) {
      const {data} = yield call(supplierServices.fetchGoods)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            goodsOption: data.data.list,
          },
        })
      }
    },
    * addSupplierContract({payload: {id, stime, etime}}, {call, put}) {
      const {data} = yield call(supplierServices.addSupplierContract, {id, stime, etime})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * fetchCompany({payload}, {call, put}) {
      const {data} = yield call(supplierServices.fetchCompany)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            company: data.data.info,
          },
        })
      }
    },
    * balanceFetch({payload: {page = 1, find_str = '', stime, etime, supp_id, account_status, site_id, goods_id, conversion}}, {call, put}) {
      const {data} = yield call(supplierServices.getBalanceData, {
        page,
        find_str,
        stime,
        etime,
        supp_id,
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
      const {data} = yield call(supplierServices.balanceDetailedFetch, {page, find_str, stime, etime, conversion, id})
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
    * getSupplierCompany({payload}, {call, put}) {
      const {data} = yield call(supplierServices.getCustomerCompany)
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
    * accountNum({payload: {find_str = '', stime, etime, gas_id = ''}}, {call, put}) {
      const {data} = yield call(supplierServices.accountNum, {find_str, stime, etime, gas_id})
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
    * balanceHistoryFetch({payload: {page = 1, id}}, {call, put}) {
      const {data} = yield call(supplierServices.getBalanceHistoryData, {page, id})
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
      const {data} = yield call(supplierServices.confirmAccount, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * deleteAccount({payload: {id}}, {call, put}) {
      const {data} = yield call(supplierServices.deleteAccount, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * saveChange({payload: {supp_id, site_id, goods_id, account_status}}, {call, put}) {
      let filed = supp_id !== undefined ? 'supp_id' : '' || site_id !== undefined ? 'site_id' : '' || goods_id !== undefined ? 'goods_id' : '' || account_status !== undefined ? 'account_status' : ''
      let val = supp_id || site_id || goods_id || account_status || ''
      console.log(filed)
      console.log(val)
      yield put({
        type: 'save',
        payload: {
          [filed]: val,
        },
      })
    },
    * Reconciliation({payload: {ids}}, {call, put}) {
      const {data} = yield call(supplierServices.Reconciliation, {ids})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * Reconciliation2({payload: {stime, etime, supp_id, account_status, site_id, goods_id}}, {call, put}) {
      const {data} = yield call(supplierServices.Reconciliation2, {
        stime,
        etime,
        supp_id,
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
    * fetchHistory({payload: {page = 1, stime, etime, supp_id, account_status}}, {call, put}) {
      const {data} = yield call(supplierServices.fetchHistory, {page, stime, etime, supp_id, account_status})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            historylist: data.data.list,
            historypage: parseInt(page, 10),
            historytotal: parseInt(data.data.count, 10),
            stime,
            etime,
            supp_id,
            account_status,
          },
        })
      }
    },
    * reconciliationConfirm({payload: {id}}, {call, put}) {
      const {data} = yield call(supplierServices.reconciliationConfirm, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * kaipiao({payload: {id}}, {call, put}) {
      const {data} = yield call(supplierServices.kaipiao, {id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * deleteduizhang({payload: {id}}, {call, put}) {
      const {data} = yield call(supplierServices.deleteduizhang, {id})
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
    },
  },
}
