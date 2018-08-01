import request from '../../../utils/request'
import {IP, PAGE_SIZE} from "../../../constants";

export function purchaseContractFetch({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/home/customer/sales-contract-list`, {
    method: 'POST',
    body: formData
  })
}

export function purchaseDetailFetch({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('start_date', stime)
  formData.append('end_date', etime)
  return request(`${IP}/home/customer/sales-performance`, {
    method: 'POST',
    body: formData
  })
}

export function fetchOptions() {
  return request(`${IP}/home/select/supplier`, {
    method: 'POST'
  })
}

export function addSupplierContract({id, stime, etime}) {
  let formData = new FormData()
  formData.append('suppliers_id', id)
  formData.append('start_date', stime)
  formData.append('end_date', etime)
  return request(`${IP}/home/supplier/add-contract`, {
    method: 'POST',
    body: formData
  })
}

export function fetchCompany() {
  return request(`${IP}/home/company/company-info`, {
    method: 'POST'
  })
}
