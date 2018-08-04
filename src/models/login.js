import * as loginServices from '../services/login'
import {message} from 'antd'
import {routerRedux} from "dva/router";

export default {
  namespace: 'login',
  state: {},

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    * login({payload: {form}}, {call, put}) {
      const {data} = yield call(loginServices.login, form)
      if (data.code === 1) {
        message.success(data.msg)
        sessionStorage.setItem('loginAuth', data.user.auth)
        sessionStorage.setItem('userData', JSON.stringify(data.user))
        yield put(routerRedux.push({
          pathname: '/',
        }))
      } else {
        message.error(data.msg)
      }

    },
    * logout({payload}, {call, put}) {
      const {data} = yield call(loginServices.logout)
      if (data.code === 1) {
        message.success(data.msg)
        sessionStorage.removeItem('loginAuth')
        sessionStorage.removeItem('userData')
        yield put(routerRedux.push({
          pathname: '/login',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * backlogin({payload: {form}}, {call, put}) {
      const {data} = yield call(loginServices.backlogin, form)
      if (data.code === 1) {
        message.success(data.msg)
        sessionStorage.setItem('backAuth', data.admin.auth)
        sessionStorage.setItem('adminData', JSON.stringify(data.admin))
        if ((data.admin.auth - 0) === 6) {
          yield put(routerRedux.push({
            pathname: '/permission',
          }))
        } else {
          yield put(routerRedux.push({
            pathname: '/backstage',
          }))
        }
      } else {
        message.error(data.msg)
      }

    },
    * backlogout({payload}, {call, put}) {
      const {data} = yield call(loginServices.backlogout)
      if (data.code === 1) {
        sessionStorage.removeItem('backAuth')
        sessionStorage.removeItem('adminData')
        // message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/admin',
        }))
      }
    },
  },

  reducers: {
    done(state, action) {
      return {...state, ...action.payload};
    },
  },

};
