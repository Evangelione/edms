import * as echartService from '../services/echart'

export default {
  namespace: 'echart',
  state: {
    options: {},
    count: {}
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const {data} = yield call(echartService.queryEchart)
      const count = yield call(echartService.queryCount)
      yield put({type: 'save', payload: {options: data, count: count.data}});
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
