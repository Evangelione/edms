import request from '../../../utils/request'
import {IP, PAGE_SIZE} from "../../../constants";

export function getClientData({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/home/account/cust-balance-list`, {
    method: 'POST',
    body: formData
  })
}

export function getClientDetail({page, stime, etime, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('record_type', '1')
  formData.append('cust_id', id)
  return request(`${IP}/home/account/cust-record-list`, {
    method: 'POST',
    body: formData
  })
}

export function clientReceiptFetch({page, stime, etime, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('record_type', '')
  formData.append('cust_id', id)
  return request(`${IP}/home/account/cust-record-list`, {
    method: 'POST',
    body: formData
  })
}

export function getSupplierData({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/home/account/supp-balance-list`, {
    method: 'POST',
    body: formData
  })
}

export function getSupplierDetail({page, stime, etime, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('record_type', '1')
  formData.append('supp_id', id)
  return request(`${IP}/home/account/supp-record-list`, {
    method: 'POST',
    body: formData
  })
}

export function supplierReceiptFetch({page, stime, etime, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('record_type', '')
  formData.append('supp_id', id)
  return request(`${IP}/home/account/supp-record-list`, {
    method: 'POST',
    body: formData
  })
}

export function clientRegistration({id, time, sum, file}) {
  let formData = new FormData()
  formData.append('cust_id', id)
  formData.append('recv_time', time)
  formData.append('record_sum', sum)
  formData.append(file.filename, file.file)
  return request(`${IP}/home/account/recv-money`, {
    method: 'POST',
    body: formData
  })
}

export function supplierRegistration({id, time, sum, file}) {
  let formData = new FormData()
  formData.append('supp_id', id)
  formData.append('send_time', time)
  formData.append('record_sum', sum)
  formData.append(file.filename, file.file)
  return request(`${IP}/home/account/send-money`, {
    method: 'POST',
    body: formData
  })
}
