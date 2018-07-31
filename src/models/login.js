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
        yield put(routerRedux.push({
          pathname: '/backstage',
        }))
      } else {
        message.error(data.msg)
      }

    },
    * backlogout({payload}, {call, put}) {
      const {data} = yield call(loginServices.backlogout)
      if (data.code === 1) {
        sessionStorage.removeItem('backAuth')
        // message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/backstagelogin',
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
