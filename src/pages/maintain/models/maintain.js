import * as maintainService from '../services/maintain'
import { message } from 'antd'
// import { routerRedux } from 'dva/router'

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
    CascaderOptions: [],
    userChecking: {},
    supplierChecking: {},
    vehicleChecking: {},
    sitelist: [],
    sitepage: 1,
    sitetotal: 0,
    carbodylist: [],
    carbodypage: 1,
    carbodytotal: 0,
    carheadlist: [],
    carheadpage: 1,
    carheadtotal: 0,
    dirverlist: [],
    dirverpage: 1,
    dirvertotal: 0,
    gaslist: [],
    gaspage: 1,
    gastotal: 0,
    vehiclelist: [],
    vehiclepage: 1,
    vehicletotal: 0,
    customerHead: '',
    supplierHead: '',
  },
  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/maintain') {
          dispatch({type: 'fetchCustomer', payload: query})
          dispatch({type: 'fetchSite', payload: query})
          dispatch({type: 'fetchSupplier', payload: query})
          dispatch({type: 'fetchCar', payload: {car_type: '1'}})
          dispatch({type: 'fetchCar', payload: {car_type: '2'}})
          dispatch({type: 'fetchGas', payload: query})
          dispatch({type: 'fetchVehicleList', payload: query})
          dispatch({type: 'fetchDirverList', payload: query})
        }
      })
    },
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
        const page = yield select(state => state.maintain.gaspage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchGas', payload: {page, find_str}})
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
            find_str,
          },
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
            find_str,
          },
        })
      }
    },
    * fetchSite({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getSiteList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            sitelist: data.data.list,
            sitepage: parseInt(page, 10),
            sitetotal: parseInt(data.data.count, 10),
            find_str,
          },
        })
      }
    },
    * fetchCar({payload: {page = 1, find_str = '', car_type = '1'}}, {call, put}) {
      const {data} = yield call(maintainService.getCarList, {page, find_str, car_type})
      if (data.code === 1) {
        if (car_type === '1') {
          yield put({
            type: 'save', payload: {
              carheadlist: data.data.list,
              carheadpage: parseInt(page, 10),
              carheadtotal: parseInt(data.data.count, 10),
              find_str,
            },
          })
        } else {
          yield put({
            type: 'save', payload: {
              carbodylist: data.data.list,
              carbodypage: parseInt(page, 10),
              carbodytotal: parseInt(data.data.count, 10),
              find_str,
            },
          })
        }

      }
    },
    * fetchGas({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getGasList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            gaslist: data.data.list,
            gaspage: parseInt(page, 10),
            gastotal: parseInt(data.data.count, 10),
            find_str,
          },
        })
      }
    },
    * fetchVehicleList({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.getLogisticsList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            vehiclelist: data.data.list,
            vehiclepage: parseInt(page, 10),
            vehicletotal: parseInt(data.data.count, 10),
            find_str,
          },
        })
      }
    },
    * fetchDirverList({payload: {page = 1, find_str = ''}}, {call, put}) {
      const {data} = yield call(maintainService.fetchDirverList, {page, find_str})
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            dirverlist: data.data.list,
            dirverpage: parseInt(page, 10),
            dirvertotal: parseInt(data.data.count, 10),
            find_str,
          },
        })
      }
    },
    * insertCustomer({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertCustomer, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchCustomer', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifyCustomer({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifyCustomer, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchCustomer', payload: {find_str}})
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
    * insertSupplier({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertSupplier, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchSupplier', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifySupplier({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifySupplier, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchSupplier', payload: {find_str}})
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
    * insertCar({payload: {form, car_type}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertCar, {form, car_type})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchCar', payload: {find_str, car_type}})
      } else {
        message.error(data.msg)
      }
    },
    * modifyCar({payload: {form, car_type}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifyCar, {form, car_type})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchCar', payload: {find_str, car_type}})
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
    * insertSite({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertSite, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({type: 'fetchSite', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifySite({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifySite, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({type: 'fetchSite', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * deleteSite({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteSite, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchSite', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * insertGas({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertGas, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({type: 'fetchGas', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifyGas({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifyGas, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        yield put({type: 'fetchGas', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * deleteGas({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteGas, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchGas', payload: {page, find_str}})
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
              CascaderOptions: [...CascaderOptions],
            },
          })
        }
      } else {
        const {data} = yield call(maintainService.fetchOptions, {name})
        if (data.code === -2) return false
        if (data.code === 1) {
          yield put({
            type: 'save', payload: {
              CascaderOptions: data.data.list,
            },
          })
        }
      }
    },
    * userImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.userImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.warning('请修改数据后重新导入')
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCustomer', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
        yield put({
          type: 'save', payload: {
            userChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.error('全部导入成功')
      }

    },
    * suppImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.suppImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.warning('请修改数据后重新导入')
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchSupplier', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
        yield put({
          type: 'save', payload: {
            supplierChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.error('全部导入成功')
      }
    },
    * vehicleImport({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.vehicleImport, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.warning('请修改数据后重新导入')
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchCar', payload: {page, find_str}})
        file.onProgress({percent: 100})
        file.onSuccess()
        yield put({
          type: 'save', payload: {
            vehicleChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.success('全部导入成功')
      }
    },
    * batchCustomer({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.batchCustomer, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        if (data.num.err_num === 0 && data.num.repeat_num === 0) {
          message.success('全部导入成功')
        } else {
          message.warning('请修改数据后重新导入')
        }
        yield put({
          type: 'save', payload: {
            userChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.success('全部导入成功')
        yield put({
          type: 'save', payload: {
            userChecking: data,
          },
        })
      }
    },
    * batchSupplier({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.batchSupplier, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        if (data.num.err_num === 0 && data.num.repeat_num === 0) {
          message.success('全部导入成功')
        } else {
          message.warning('请修改数据后重新导入')
        }
        yield put({
          type: 'save', payload: {
            supplierChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.success('全部导入成功')
        yield put({
          type: 'save', payload: {
            supplierChecking: data,
          },
        })
      }
    },
    * batchVehicle({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.batchVehicle, {form})
      if (data.code === -2) return false
      if (data.code === 1) {
        if (data.num.err_num === 0 && data.num.repeat_num === 0) {
          message.success('全部导入成功')
        } else {
          message.warning('请修改数据后重新导入')
        }
        yield put({
          type: 'save', payload: {
            vehicleChecking: data,
          },
        })
      } else if (data.code === 2) {
        message.success('全部导入成功')
        yield put({
          type: 'save', payload: {
            vehicleChecking: data,
          },
        })
      }
    },

    * exportUser({payload: {json}}, {call, put, select}) {
      const {data} = yield call(maintainService.exportUser, {json})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success('正在导出文件...')
        // window.location.href = `${IP}/admin/customer/batch-down-customer-get`
        // window.open(`${IP}/admin/customer/batch-down-customer-get`)
      }
    },

    * exportSupp({payload: {json}}, {call, put, select}) {
      const {data} = yield call(maintainService.exportSupp, {json})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success('正在导出文件...')
        // window.location.href = `${IP}/admin/supplier/batch-down-supplier-get`
      }
    },
    * exportVehicle({payload: {json}}, {call, put, select}) {
      const {data} = yield call(maintainService.exportVehicle, {json})
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success('正在导出文件...')
        // window.location.href = `${IP}/admin/car/batch-down-car-get`
      }
    },
    * postCustomerHead({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.postmMintainHead, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            customerHead: data.data.img,
          },
        })
      }
    },
    * postSupplierHead({payload: file}, {call, put, select}) {
      const {data} = yield call(maintainService.postmMintainHead, {file})
      if (data.code === -2) return false
      if (data.code === 1) {
        yield put({
          type: 'save', payload: {
            supplierHead: data.data.img,
          },
        })
      }
    },
    * insertVehicle({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertVehicle, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchVehicleList', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifyVehicle({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifyVehicle, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchVehicleList', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * deleteVehicle({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteCustomer, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchVehicleList', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * insertDirver({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.insertDirver, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchDirverList', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * modifyDirver({payload: {form}}, {call, put, select}) {
      const {data} = yield call(maintainService.modifyDirver, {form})
      const find_str = yield select(state => state.maintain.find_str)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        // yield put(routerRedux.push({
        //   pathname: '/maintain',
        // }))
        yield put({type: 'fetchDirverList', payload: {find_str}})
      } else {
        message.error(data.msg)
      }
    },
    * deleteDirver({payload: id}, {call, put, select}) {
      const {data} = yield call(maintainService.deleteDirver, id)
      if (data.code === -2) return false
      if (data.code === 1) {
        message.success(data.msg)
        const page = yield select(state => state.maintain.customerpage)
        const find_str = yield select(state => state.maintain.find_str)
        yield put({type: 'fetchDirverList', payload: {page, find_str}})
      } else {
        message.error(data.msg)
      }
    },
  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  },
}
