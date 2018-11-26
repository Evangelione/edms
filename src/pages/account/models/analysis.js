import * as analysisServices from '../services/analysis'

export default {
  namespace: 'analysis',
  state: {
    list: [],
    page: 1,
    total: 0
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/account/analysis') {
          dispatch({type: 'fetch', payload: query})
        }
      })
    }
  },
  effects: {
    * fetch({payload: {page = 1, find_str = '', stime = '', etime = ''}}, {call, put}) {
      const {data} = yield call(analysisServices.getAnalysisData, {page, find_str, stime, etime})
      if (data.code === 1) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            page: parseInt(page, 10),
            total: parseInt(data.data.count, 10),
            find_str,
            stime,
            etime
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
