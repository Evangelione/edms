import * as customerServices from '../services/customer'
import {message} from 'antd'

export default {
  namespace: 'customer',
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
    customOption: [],
    company: {}
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {})
    }
  },
  effects: {
    * salesContractFetch({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(customerServices.salesContractFetch, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            contractList: data.data.list,
            contractPage: parseInt(page, 10),
            contractTotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * salesDetailFetch({payload: {page = 1, find_str = '', stime = '', etime = ''}}, {call, put}) {
      const {data} = yield call(customerServices.salesDetailFetch, {page, find_str, stime, etime})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            detailList: data.data.list,
            detailPage: parseInt(page, 10),
            detailTotal: parseInt(data.data.count, 10),
            find_str,
            stime,
            etime
          }
        })
      }
    },
    * fetchOptions({payload}, {call, put}) {
      const {data} = yield call(customerServices.fetchOptions)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            customOption: data.data.list,
          }
        })
      }
    },
    * addCustomerContract({payload: {id, stime, etime}}, {call, put}) {
      const {data} = yield call(customerServices.addCustomerContract, {id, stime, etime})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * fetchCompany({payload}, {call, put}) {
      const {data} = yield call(customerServices.fetchCompany)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            company: data.data.info,
          }
        })
      }
    }
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    }
  }
}
