import * as maintainService from '../services/maintain'
import {message} from 'antd'
import {routerRedux} from "dva/router"

export default {
  namespace: 'maintain',
  state: {
    customerlist: [],
    customerpage: 1,
    customertotal: 0,
    supplierlist: [],
    supplierpage: 1,
    suppliertotal: 0,
    carlist: [],
    carpage: 1,
    cartotal: 0,
    editForm: '',
    imgUrl: '',
    find_str: '',
    currentTab: '1',
    CascaderOptions: []
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/maintain') {
          dispatch({type: 'fetchCustomer', payload: query})
          dispatch({type: 'fetchSupplier', payload: query})
          dispatch({type: 'fetchCar', payload: query})
        }
      })
    }
  },
  effects: {
    * postReport({payload: file}, {call, put}) {
      const {data} = yield call(maintainService.postReport, {file})
      if (data.code === 1) {
        yield put({type: 'save', payload: {imgUrl: data.url}})
        file.onProgress({percent: 100})
        file.onSuccess()
      }
    },
    * uploadSingle({payload: {file, id}}, {call, put, select}) {
      const {data} = yield call(maintainService.uploadSingle, {file, id})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.supplierpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchSupplier', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
      file.onProgress({percent: 100})
      file.onSuccess()
    },
    * fetchCustomer({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getCustomerList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            customerlist: data.data.list,
            customerpage: parseInt(page, 10),
            customertotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * fetchSupplier({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getSupplierList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            supplierlist: data.data.list,
            supplierpage: parseInt(page, 10),
            suppliertotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * fetchCar({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getCarList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            carlist: data.data.list,
            carpage: parseInt(page, 10),
            cartotal: parseInt(data.data.count, 10),
            find_str
          }
        })
      }
    },
    * insertCustomer({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.insertCustomer, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * modifyCustomer({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.modifyCustomer, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * deleteCustomer({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteCustomer, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCustomer', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * insertSupplier({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.insertSupplier, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * modifySupplier({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.modifySupplier, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * deleteSupplier({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteSupplier, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.supplierpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchSupplier', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * insertCar({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.insertCar, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * modifyCar({payload: form}, {call, put}) {
      const {data} = yield call(maintainService.modifyCar, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put(routerRedux.push({
          pathname: '/maintain',
        }))
      } else {
        message.error(data.msg)
      }
    },
    * deleteCar({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteCar, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.carpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCar', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * fetchOptions({payload: {name = '', targetOption}}, {call, put, select}) {
      if (targetOption) {
        const {data} = yield call(maintainService.fetchOptions, {name})
        if (data.code === -2) return false
        if (data.code === 1) {
          targetOption.loading = false
          targetOption.children = data.data.list
          const CascaderOptions = yield select(state => state.maintain.CascaderOptions)
          yield put({
            type: 'save', payload: {
              CascaderOptions: [...CascaderOptions]
            }
          })
        }
      } else {
        const {data} = yield call(maintainService.fetchOptions, {name})
        if (data.code === -2) return false
        if (data.code === 1) {
          yield put({
            type: 'save', payload: {
              CascaderOptions: data.data.list
            }
          })
        }
      }
    },
    * userImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.userImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCustomer', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
      } else {
        message.error(data.msg)
      }

    },
    * suppImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.suppImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchSupplier', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
      } else {
        message.error(data.msg)
      }
    },
    * vehicleImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.vehicleImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCar', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
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
