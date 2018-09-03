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
    body: formData
  })
}

export function getDeliverFee({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/logistics/deliver-fee`, {
    method: 'POST',
    body: formData
  })
}

export function getDetail({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/deliver-info`, {
    method: 'POST',
    body: formData
  })
}

export function cancelDispatch({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/cancel-dispatch`, {
    method: 'POST',
    body: formData
  })
}


export function acceptOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/recv`, {
    method: 'POST',
    body: formData
  })
}

export function refuseOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/refuse`, {
    method: 'POST',
    body: formData
  })
}

export function getCompanyOption() {
  return request(`${IP}/home/select/logistics-company`, {
    method: 'POST'
  })
}

export function getCarOption({logistic_company}) {
  let formData = new FormData()
  formData.append('logistic_company', logistic_company)
  return request(`${IP}/home/select/car`, {
    method: 'POST',
    body: formData
  })
}

export function doDispatch({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/home/logistics/dispatch`, {
    method: 'POST',
    body: formData
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
    body: formData
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
    body: formData
  })
}

export function confirmBill({id, load_num, unload_num}) {
  let formData = new FormData()
  formData.append('id', id)
  formData.append('load_num', load_num)
  formData.append('unload_num', unload_num)
  return request(`${IP}/home/logistics/confirm-bill`, {
    method: 'POST',
    body: formData
  })
}

export function getBalanceData({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/logistics/deliver-account`, {
    method: 'POST',
    body: formData
  })
}

export function getBalanceDetailData({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/logistics/deliver-account-log`, {
    method: 'POST',
    body: formData
  })
}

export function getBalanceHistoryData({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/logistics/deliver-account-log`, {
    method: 'POST',
    body: formData
  })
}

export function confirmAccount({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/confirm-deliver-account`, {
    method: 'POST',
    body: formData
  })
}

export function deleteAccount({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/delete-deliver-account`, {
    method: 'POST',
    body: formData
  })
}
