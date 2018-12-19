import request from '../../../utils/request'
import { IP, PAGE_SIZE } from '../../../constants'

export function getDeliverList({page, deliver_status, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('deliver_status', deliver_status)
  formData.append('find_str', find_str)
  return request(`${IP}/home/logistics/deliver-list`, {
    method: 'POST',
    body: formData,
  })
}

export function getDeliverFee({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime ? stime.format('YYYY-MM-DD') : '')
  formData.append('etime', etime ? etime.format('YYYY-MM-DD') : '')
  return request(`${IP}/home/logistics/deliver-fee`, {
    method: 'POST',
    body: formData,
  })
}

export function getDetail({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/deliver-info`, {
    method: 'POST',
    body: formData,
  })
}

export function cancelDispatch({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/cancel-dispatch`, {
    method: 'POST',
    body: formData,
  })
}


export function acceptOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/recv`, {
    method: 'POST',
    body: formData,
  })
}

export function refuseOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/refuse`, {
    method: 'POST',
    body: formData,
  })
}

export function getCompanyOption() {
  return request(`${IP}/home/select/logistics-company`, {
    method: 'POST',
  })
}

export function getCarOption({logistic_company}) {
  let formData = new FormData()
  formData.append('logistic_company', logistic_company)
  return request(`${IP}/home/select/car`, {
    method: 'POST',
    body: formData,
  })
}

export function doDispatch({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/home/logistics/dispatch`, {
    method: 'POST',
    body: formData,
  })
}

export function uploadPound({file, id, load_type, num, load_time}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  formData.append('id', id)
  formData.append('load_type', load_type)
  formData.append('load_time', load_time)
  formData.append('num', num)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}


export function uploadUnPound({file, id, load_type, num, unload_time}) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  formData.append('id', id)
  formData.append('load_type', load_type)
  formData.append('unload_time', unload_time)
  formData.append('num', num)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function confirmBill({id, load_num, unload_num, load_time, unload_time, load_bill, unload_bill}) {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('load_num', load_num)
  formData.append('unload_num', unload_num)
  formData.append('load_time', load_time)
  formData.append('unload_time', unload_time)
  formData.append('load_bill', load_bill)
  formData.append('unload_bill', unload_bill)
  return request(`${IP}/home/logistics/confirm-bill`, {
    method: 'POST',
    body: formData,
  })
}

export function getBalanceData({page, find_str, stime, etime, logistics_company, account_status, site_id, goods_id, conversion}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('logistics_company', logistics_company)
  formData.append('account_status', account_status)
  formData.append('site_id', site_id)
  formData.append('goods_id', goods_id)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/logistics/deliver-account`, {
    method: 'POST',
    body: formData,
  })
}

export function balanceDetailedFetch({page, find_str, stime, etime, conversion, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('id', id)
  if (conversion) {
    formData.append('stime', stime)
    formData.append('etime', etime)
  } else {
    formData.append('stime', stime ? stime.format('YYYY-MM-DD') : '')
    formData.append('etime', etime ? etime.format('YYYY-MM-DD') : '')
  }
  return request(`${IP}/home/logistics/deliver-account-detailed`, {
    method: 'POST',
    body: formData,
  })
}


export function getBalanceHistoryData({page, find_str, id}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('id', id)
  return request(`${IP}/home/logistics/details`, {
    method: 'POST',
    body: formData,
  })
}

export function confirmAccount({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/confirm-deliver-account`, {
    method: 'POST',
    body: formData,
  })
}

export function deleteAccount({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/delete-deliver-account`, {
    method: 'POST',
    body: formData,
  })
}

export function getLogisticsCompany() {
  return request(`${IP}/home/select/logistics-company`, {
    method: 'POST',
  })
}

export function accountNum({find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('find_str', find_str)
  formData.append('stime', stime ? stime.format('YYYY-MM-DD') : '')
  formData.append('etime', etime ? etime.format('YYYY-MM-DD') : '')
  return request(`${IP}/home/logistics/deliver-account-num`, {
    method: 'POST',
    body: formData,
  })
}

export function UpLoadBill(file) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}

export function UpUnLoadBill(file) {
  let formData = new FormData()
  formData.append(file.filename, file.file)
  return request(file.action, {
    method: 'POST',
    body: formData,
  })
}


export function fetchHistory({page, stime, etime, logistics_company, account_status}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('logistics_company', logistics_company)
  formData.append('account_status', account_status)
  return request(`${IP}/home/logistics/account-log`, {
    method: 'POST',
    body: formData,
  })
}

export function reconciliationConfirm({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/confirm`, {
    method: 'POST',
    body: formData,
  })
}


export function kaipiao({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/kaipiao`, {
    method: 'POST',
    body: formData,
  })
}


export function deleteduizhang({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/delete`, {
    method: 'POST',
    body: formData,
  })
}


export function Reconciliation({ids}) {
  let formData = new FormData()
  formData.append('ids', ids)
  return request(`${IP}/home/logistics/set-account1`, {
    method: 'POST',
    body: formData,
  })
}

export function Reconciliation2({stime, etime, logistics_company, account_status, site_id, goods_id}) {
  let formData = new FormData()
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('logistics_company', logistics_company)
  formData.append('account_status', account_status)
  formData.append('site_id', site_id)
  formData.append('goods_id', goods_id)
  return request(`${IP}/home/logistics/set-account2`, {
    method: 'POST',
    body: formData,
  })
}
