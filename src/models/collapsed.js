export default {
  namespace: 'collapsed',
  state: {
    currentKey: ['administrator'],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'save', payload: {currentKey: ['home']}})
        } else if (pathname.indexOf('/backstage') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['administrator']}})
        } else if (pathname.indexOf('/permission') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['permission']}})
        } else if (pathname.indexOf('/maintain') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['maintain']}})
        } else if (pathname.indexOf('/order') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['order']}})
        } else if (pathname.indexOf('/logistics') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['logistics']}})
        } else if (pathname.indexOf('/account/balance') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['balance']}})
        } else if (pathname.indexOf('/account/analysis') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['analysis']}})
        } else if (pathname.indexOf('/customer') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['customer']}})
        } else if (pathname.indexOf('/supplier') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['supplier']}})
        } else if (pathname.indexOf('/company') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['company']}})
        } else {
          dispatch({type: 'save', payload: {currentKey: ['administrator']}})
        }
      })
    },
  },

  effects: {},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload};
    },
  },

};
