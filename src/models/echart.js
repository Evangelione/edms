import * as echartService from '../services/echart'

export default {
  namespace: 'echart',
  state: {
    options: {},
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
      yield put({type: 'save', payload: {options: data}});
    },
  },

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
