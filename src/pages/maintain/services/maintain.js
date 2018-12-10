import request from '../../../utils/request'
import { IP, PAGE_SIZE } from '../../../constants'

export function postReport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function uploadSingle({file, id}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  formData.append('id', id)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function getCustomerList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/customer/customer-list`, {
    method: 'POST',
    body: formData,
  })
}

export function getSupplierList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/supplier/supp-list`, {
    method: 'POST',
    body: formData,
  })
}

export function getSiteList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/site/site-list`, {
    method: 'POST',
    body: formData,
  })
}

export function getCarList({page, find_str, car_type}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('car_type', car_type)
  return request(`${IP}/admin/car/car-list`, {
    method: 'POST',
    body: formData,
  })
}

export function getGasList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/goods/goods-list`, {
    method: 'POST',
    body: formData,
  })
}

export function insertCustomer({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/customer/add-customer`, {
    method: 'POST',
    body: formData,
  })
}

export function modifyCustomer({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/customer/modify-customer`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteCustomer({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/customer/del-customer`, {
    method: 'POST',
    body: formData,
  })
}


export function insertSupplier({form}) {
  console.log(2)
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/supplier/add-supp`, {
    method: 'POST',
    body: formData,
  })
}

export function modifySupplier({form}) {
  console.log(1)
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/supplier/modify-supp`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteSupplier({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/supplier/del-supp`, {
    method: 'POST',
    body: formData,
  })
}

export function insertCar({form, car_type}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  formData.append('car_type', car_type)
  return request(`${IP}/admin/car/add-car`, {
    method: 'POST',
    body: formData,
  })
}

export function modifyCar({form, car_type}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  formData.append('car_type', car_type)
  return request(`${IP}/admin/car/modify-car`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteCar({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/car/del-car`, {
    method: 'POST',
    body: formData,
  })
}

export function insertSite({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/site/add-site`, {
    method: 'POST',
    body: formData,
  })
}

export function modifySite({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/site/modify-site`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteSite({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/site/del-site`, {
    method: 'POST',
    body: formData,
  })
}

export function insertGas({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/goods/add-goods`, {
    method: 'POST',
    body: formData,
  })
}

export function modifyGas({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/goods/modify-goods`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteGas({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/goods/del-goods`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchOptions({name}) {
  let formData = new FormData()
  formData.append('district_name', name)
  return request(`${IP}/admin/base/district`, {
    method: 'POST',
    body: formData,
  })
}

export function userImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function suppImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function vehicleImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function batchCustomer({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/customer/batch-add-cust`, {
    method: 'POST',
    body: formData,
  })
}

export function batchSupplier({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/supplier/batch-add-supplier`, {
    method: 'POST',
    body: formData,
  })
}

export function batchVehicle({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/car/batch-add-car`, {
    method: 'POST',
    body: formData,
  })
}

export function exportUser({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/customer/batch-down-cust`, {
    method: 'POST',
    body: formData,
  })
}

export function exportSupp({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/supplier/batch-down-supplier`, {
    method: 'POST',
    body: formData,
  })
}

export function exportVehicle({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/car/batch-down-car`, {
    method: 'POST',
    body: formData,
  })
}

export function postmMintainHead({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function getLogisticsList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/logistics/logistics-list`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchDirverList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/driver/driver-list`, {
    method: 'POST',
    body: formData,
  })
}


export function insertVehicle({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/logistics/add-logistics`, {
    method: 'POST',
    body: formData,
  })
}

export function modifyVehicle({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/logistics/modify-logistics`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteVehicle({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/customer/del-customer`, {
    method: 'POST',
    body: formData,
  })
}

export function insertDirver({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/driver/add-driver`, {
    method: 'POST',
    body: formData,
  })
}

export function modifyDirver({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/admin/driver/modify-driver`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteDirver({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/customer/del-customer`, {
    method: 'POST',
    body: formData,
  })
}
