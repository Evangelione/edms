import * as companyServices from '../services/company'
import {message} from 'antd'

export default {
  namespace: 'company',
  state: {
    list: [],
    page: 1,
    total: 0,
    find_str: '',
    companyDetail: {},
    imgUrl: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        // if (pathname === '/company') {
        //   dispatch({type: 'fetchCompanyList', payload: query})
        // }
      })
    }
  },
  effects: {
    * fetchCompanyList({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(companyServices.fetchCompanyList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            page: parseInt(page, 10),
            total: parseInt(data.data.count, 10),
            find_str,
          }
        })
      }
    },
    * fetchCompanyDetail({payload}, {call, put}) {
      const {data} = yield call(companyServices.fetchCompanyDetail)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            companyDetail: data.data.info,
          }
        })
      }
    },
    * postImg({payload: file}, {call, put, select}) {
      const {data} = yield call(companyServices.postImg, {file})
      if (data.code === -1) return false
      if (data.code === 1) {
        message.success(data.msg)
        const imgUrl = yield select(state => state.company.imgUrl)
        yield put({
          type: 'save',
          payload: {
            imgUrl: [...imgUrl, data.url]
          }
        })
      } else {
        message.error(data.msg)
      }
      file.onProgress({percent: 100})
      file.onSuccess()
    },
    * modifyCompany({payload: {form}}, {call, put}) {
      const {data} = yield call(companyServices.modifyCompany, {form})
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
    saveImg(state, action) {
      return {...state, ...{imgUrl: JSON.parse(action.payload.imgUrl)}}
    }
  }
}
