import * as balanceServices from '../services/balance'
import { message } from 'antd'

export default {
  namespace: 'balance',
  state: {
    clientList: [],
    clientPage: 1,
    clientTotal: 0,
    clientDetailList: [],
    clientDetailPage: 1,
    clientDetailTotal: 0,
    clientReceiptList: [],
    clientReceiptPage: 1,
    clientReceiptTotal: 0,
    supplierList: [],
    supplierPage: 1,
    supplierTotal: 0,
    supplierDetailList: [],
    supplierDetailPage: 1,
    supplierDetailTotal: 0,
    supplierReceiptList: [],
    supplierReceiptPage: 1,
    supplierReceiptTotal: 0,
    find_str: '',
    stime: '',
    etime: '',
    currentTab: '1',
    currentTab2: '1',
    accountKey: '1'
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
      })
    }
  },
  effects: {
    * clientFetch({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(balanceServices.getClientData, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            clientList: data.data.list,
            clientPage: parseInt(page, 10),
            clientTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * clientDetailFetch({payload: {page = 1, stime = '', etime = '', id}}, {call, put}) {
      const {data} = yield call(balanceServices.getClientDetail, {page, stime, etime, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            clientDetailList: data.data.list,
            clientDetailPage: parseInt(page, 10),
            clientDetailTotal: parseInt(data.data.count, 10),
            stime,
            etime
          }
        })
      }
    },
    * clientReceiptFetch({payload: {page = 1, stime = '', etime = '', id}}, {call, put}) {
      const {data} = yield call(balanceServices.clientReceiptFetch, {page, stime, etime, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            clientReceiptList: data.data.list,
            clientReceiptPage: parseInt(page, 10),
            clientReceiptTotal: parseInt(data.data.count, 10),
            stime,
            etime
          }
        })
      }
    },
    * supplierFetch({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(balanceServices.getSupplierData, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierList: data.data.list,
            supplierPage: parseInt(page, 10),
            supplierTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * supplierDetailFetch({payload: {page = 1, stime = '', etime = '', id}}, {call, put}) {
      const {data} = yield call(balanceServices.getSupplierDetail, {page, stime, etime, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierDetailList: data.data.list,
            supplierDetailPage: parseInt(page, 10),
            supplierDetailTotal: parseInt(data.data.count, 10),
            stime,
            etime
          }
        })
      }
    },
    * supplierReceiptFetch({payload: {page = 1, stime = '', etime = '', id}}, {call, put}) {
      const {data} = yield call(balanceServices.supplierReceiptFetch, {page, stime, etime, id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierReceiptList: data.data.list,
            supplierReceiptPage: parseInt(page, 10),
            supplierReceiptTotal: parseInt(data.data.count, 10),
            stime,
            etime
          }
        })
      }
    },
    * clientRegistration({payload: {file, time, sum, id}}, {call, put}) {
      const {data} = yield call(balanceServices.clientRegistration, {file, time, sum, id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * supplierRegistration({payload: {file, time, sum, id}}, {call, put}) {
      const {data} = yield call(balanceServices.supplierRegistration, {file, time, sum, id})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * setCredit({payload: {id, credit, notice, phones}}, {call, put}) {
      const {data} = yield call(balanceServices.setCredit, {id, credit, notice, phones})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    }
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }
}
