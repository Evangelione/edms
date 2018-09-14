import request from '../../../utils/request'
import { IP, PAGE_SIZE } from '../../../constants'

export function postReport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function uploadSingle({file, id}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  formData.append('id', id);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function getCustomerList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/customer/customer-list`, {
    method: 'POST',
    body: formData
  })
}

export function getSupplierList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/supplier/supp-list`, {
    method: 'POST',
    body: formData
  })
}

export function getCarList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/car/car-list`, {
    method: 'POST',
    body: formData
  })
}


export function insertCustomer({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/customer/add-customer`, {
    method: 'POST',
    body: formData
  })
}

export function modifyCustomer({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/customer/modify-customer`, {
    method: 'POST',
    body: formData
  })
}


export function deleteCustomer({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/customer/del-customer`, {
    method: 'POST',
    body: formData
  })
}


export function insertSupplier({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/supplier/add-supp`, {
    method: 'POST',
    body: formData
  })
}

export function modifySupplier({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/supplier/modify-supp`, {
    method: 'POST',
    body: formData
  })
}


export function deleteSupplier({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/supplier/del-supp`, {
    method: 'POST',
    body: formData
  })
}

export function insertCar({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/car/add-car`, {
    method: 'POST',
    body: formData
  })
}

export function modifyCar({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/car/modify-car`, {
    method: 'POST',
    body: formData
  })
}

export function deleteCar({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/admin/car/del-car`, {
    method: 'POST',
    body: formData
  })
}

export function fetchOptions({name}) {
  let formData = new FormData()
  formData.append('district_name', name)
  return request(`${IP}/admin/base/district`, {
    method: 'POST',
    body: formData
  })
}

export function userImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function suppImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function vehicleImport({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function batchCustomer({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/customer/batch-add-customer`, {
    method: 'POST',
    body: formData
  })
}

export function batchSupplier({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/supplier/batch-add-supplier`, {
    method: 'POST',
    body: formData
  })
}

export function batchVehicle({form}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(form))
  return request(`${IP}/admin/car/batch-add-car`, {
    method: 'POST',
    body: formData
  })
}

export function exportUser({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/customer/batch-down-customer`, {
    method: 'POST',
    body: formData
  })
}

export function exportSupp({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/supplier/batch-down-supplier`, {
    method: 'POST',
    body: formData
  })
}

export function exportVehicle({json}) {
  let formData = new FormData()
  formData.append('json_list', JSON.stringify(json))
  return request(`${IP}/admin/car/batch-down-car`, {
    method: 'POST',
    body: formData
  })
}
