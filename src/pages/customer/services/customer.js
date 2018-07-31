import request from '../../../utils/request'
import {IP, PAGE_SIZE} from "../../../constants";

export function salesContractFetch({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/home/customer/sales-contract-list`, {
    method: 'POST',
    body: formData
  })
}

export function salesDetailFetch({page, find_str, stime, etime}) {
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
  return request(`${IP}/home/select/customer`, {
    method: 'POST'
  })
}

export function addCustomerContract({id, stime, etime}) {
  let formData = new FormData()
  formData.append('customer_id', id)
  formData.append('start_date', stime)
  formData.append('end_date', etime)
  return request(`${IP}/home/customer/add-contract`, {
    method: 'POST',
    body: formData
  })
}

export function fetchCompany() {
  return request(`${IP}/home/company/company-info`, {
    method: 'POST'
  })
}
