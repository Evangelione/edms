import * as loginServices from '../services/home'

export default {
  namespace: 'home',
  state: {
    count: {},
    customerPer: [],
    supplierPer: [],
    logistics: [],
    trend: {},
    countLoading: false,
    customerLoading: false,
    supplierLoading: false,
    currentOrder: {},
    currentLogistics: {},
    logMapData: {},
    orderMapData: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'count', payload: query})
          dispatch({type: 'customerPer', payload: query})
          dispatch({type: 'supplierPer', payload: query})
          dispatch({type: 'logistics', payload: query})
          dispatch({type: 'trend', payload: query})
          dispatch({type: 'order/fetch', payload: query})
          dispatch({type: 'logistics/getDeliverList', payload: query})
        }
      })
    },
  },

  effects: {
    * count({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {countLoading: true}})
      const {data} = yield call(loginServices.count, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            count: data.data.count
          }
        })
      }
      yield put({type: 'save', payload: {countLoading: false}})
    },
    * customerPer({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {customerLoading: true}})
      const {data} = yield call(loginServices.customerPer, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            customerPer: data.data.list
          }
        })
      }
      yield put({type: 'save', payload: {customerLoading: false}})
    },
    * supplierPer({payload: {flag = '4'}}, {call, put}) {
      yield put({type: 'save', payload: {supplierLoading: true}})
      const {data} = yield call(loginServices.supplierPer, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            supplierPer: data.data.list
          }
        })
      }
      yield put({type: 'save', payload: {supplierLoading: false}})
    },
    * logistics({payload}, {call, put}) {
      const {data} = yield call(loginServices.logistics)
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            logistics: data.data.list
          }
        })
      }
    },
    * trend({payload: {flag = '1'}}, {call, put}) {
      const {data} = yield call(loginServices.trend, {flag})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            trend: data.data.list
          }
        })
      }
    },
    * getLogMapData({payload: {id}}, {call, put}) {
      const {data} = yield call(loginServices.getLogMapData, {id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            logMapData: data.data.list
          }
        })
      } else if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            logMapData: 0
          }
        })
      }
    },
    * getOrderMapData({payload: {id}}, {call, put}) {
      const {data} = yield call(loginServices.getOrderMapData, {id})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            orderMapData: data.data.list
          }
        })
      } else if (data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            orderMapData: 0
          }
        })
      }
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },
}
