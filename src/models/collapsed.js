export default {
  namespace: 'collapsed',
  state: {
    collapsed: false,
  },

  subscriptions: {
    setup({dispatch, history}) {
    },
  },

  effects: {
    * change({payload}, {call, put}) {
      console.log(payload)
      yield put({
        type: 'done',
        payload: payload
      })
    },
  },

  reducers: {
    done(state, action) {
      return {...state, ...action.payload};
    },
  },

};
