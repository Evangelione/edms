import request from '../../../utils/request'
import { IP } from '../../../constants'

export function getOrderList({page, order_status, find_str, order_type, stime, etime, time_type}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', 8)
  formData.append('order_status', order_status)
  formData.append('find_str', find_str)
  formData.append('order_type', order_type)
  formData.append('stime', stime)
  formData.append('etime', etime)
  formData.append('time_type', time_type)
  return request(`${IP}/home/order/order-list`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchCustom() {
  return request(`${IP}/home/select/customer`, {
    method: 'POST',
  })
}

export function fetchSite({customer_id}) {
  let formData = new FormData()
  formData.append('customer_id', customer_id)
  return request(`${IP}/home/select/site`, {
    method: 'POST',
    body: formData,
  })
}

export function fetchSupplier() {
  return request(`${IP}/home/select/supplier`, {
    method: 'POST',
  })
}

export function fetchGoods({supplier_id}) {
  let formData = new FormData()
  formData.append('supplier_id', supplier_id)
  return request(`${IP}/home/select/goods`, {
    method: 'POST',
    body: formData,
  })
}

export function addOrder({values}) {
  let formData = new FormData()
  Object.keys(values).forEach((key, i) => {
    formData.append(key, values[key])
  })
  return request(`${IP}/home/order/add-order`, {
    method: 'POST',
    body: formData,
  })
}

export function orderInfo({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/order/order-info`, {
    method: 'POST',
    body: formData,
  })
}


export function modifyOrder({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/home/order/modify-order`, {
    method: 'POST',
    body: formData,
  })
}

export function confirmOrder({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/home/order/confirm-order`, {
    method: 'POST',
    body: formData,
  })
}

export function doPay({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/order/pay`, {
    method: 'POST',
    body: formData,
  })
}

export function cancelOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/order/cancel-order`, {
    method: 'POST',
    body: formData,
  })
}

export function doResult(form) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key])
  })
  return request(`${IP}/home/order/settled`, {
    method: 'POST',
    body: formData,
  })
}

export function delOrder({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/order/delete-order`, {
    method: 'POST',
    body: formData,
  })
}

export function getModalPrice({purchase_price, deliver_price, price, distance, saler_num}) {
  let formData = new FormData()
  formData.append('purchase_price', purchase_price)
  formData.append('deliver_price', deliver_price)
  formData.append('saler_price', price)
  formData.append('distance', distance)
  formData.append('saler_num', saler_num)
  return request(`${IP}/home/order/saler-model`, {
    method: 'POST',
    body: formData,
  })
}
