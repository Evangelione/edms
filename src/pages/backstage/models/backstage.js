import * as backStageService from '../services/backstage'
import {message} from 'antd'
import {routerRedux} from "dva/router"

export default {
  namespace: 'backstage',
  state: {
    list: [],
    page: 1,
    total: 0,
    imgUrl: '',
    editForm: {},
    find_auth: '',
    find_str: '',
    currentTab: 'quanbu'
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/backstage') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    }
  },
  effects: {
    * fetch({payload: {page = 1, find_auth = '', find_str = ''}}, {call, put}) {
      const {data} = yield call(backStageService.getAdminList, {page, find_auth, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            list: data.data.list,
            total: parseInt(data.data.count, 10),
            page: parseInt(page, 10),
            find_auth,
            find_str
          }
        })
      }
    },
    * postAvatar({payload: file}, {call, put}) {
      const {data} = yield call(backStageService.postAvatar, {file})
      if (data.code === 1) {
        yield put({type: 'save', payload: {imgUrl: data.url}})
        file.onProgress({percent: 100})
        file.onSuccess()
      }
    },
    * insertAdmin({payload: form}, {call, put}) {
      const {data} = yield call(backStageService.insertAdmin, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({type: 'save', payload: {currentTab: 'quanbu'}})
        yield put(routerRedux.push({
          pathname: '/backstage',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * modifyAdmin({payload: form}, {call, put}) {
      const {data} = yield call(backStageService.modifyAdmin, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        yield put({type: 'save', payload: {currentTab: 'quanbu'}})
        yield put(routerRedux.push({
          pathname: '/backstage',
        }))
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    },
    * forbiddenControl({payload: id}, {call, put, select}) {
      const {data} = yield call(backStageService.forbiddenControl, {id})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.backstage.page)
        const find_auth = yield select(state => state.backstage.find_auth)
        const find_str = yield select(state => state.backstage.find_str)
        yield put({type: 'fetch', payload: {page, find_auth, find_str}})
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
