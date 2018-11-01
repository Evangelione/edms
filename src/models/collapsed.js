export default {
  namespace: 'collapsed',
  state: {
    currentKey: ['administrator'],
    currentPageName: '',
    openKeys: [],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/') {
          dispatch({type: 'save', payload: {currentKey: ['home'], currentPageName: '首页'}})
        } else if (pathname.indexOf('/backstage') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['administrator'], currentPageName: '企业管理'}})
        } else if (pathname.indexOf('/permission') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['permission'], currentPageName: '用户权限设置'}})
        } else if (pathname.indexOf('/maintain') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['maintain'], currentPageName: '数据维护'}})
        } else if (pathname.indexOf('/order') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['order'], currentPageName: '我的订单'}})
          dispatch({type: 'orderDetail/save', payload: {showMap: false}})
        } else if (pathname.indexOf('/logistics') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['logistics'], currentPageName: '我的物流'}})
          dispatch({type: 'logisticsDetail/save', payload: {showMap: false}})
        } else if (pathname.indexOf('/account/balance') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['balance'], currentPageName: '余额管理', openKeys: ['sub1']}})
        } else if (pathname.indexOf('/account/analysis') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['analysis'], currentPageName: '数据分析'}})
        } else if (pathname.indexOf('/customer') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['customer'], currentPageName: '我的客户'}})
        } else if (pathname.indexOf('/supplier') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['supplier'], currentPageName: '我的供应商'}})
        } else if (pathname.indexOf('/company') === 0) {
          dispatch({type: 'save', payload: {currentKey: ['company'], currentPageName: '我的公司'}})
        } else {
          dispatch({type: 'save', payload: {currentKey: ['administrator'], currentPageName: ''}})
        }
      })
    },
  },

  effects: {},

  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },

}
