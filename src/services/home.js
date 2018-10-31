import request from '../utils/request'
import { IP } from '../constants'

export function count({flag}) {
  let formData = new FormData()
  formData.append('flag', flag)
  return request(`${IP}/home/home/count`, {
    method: 'POST',
    body: formData
  })
}

export function customerPer({flag}) {
  let formData = new FormData()
  formData.append('flag', flag)
  return request(`${IP}/home/home/customer`, {
    method: 'POST',
    body: formData
  })
}

export function supplierPer({flag}) {
  let formData = new FormData()
  formData.append('flag', flag)
  return request(`${IP}/home/home/supplier`, {
    method: 'POST',
    body: formData
  })
}

export function logistics() {
  return request(`${IP}/home/home/logistics`, {
    method: 'POST',
  })
}

export function trend({flag}) {
  let formData = new FormData()
  formData.append('flag', flag)
  return request(`${IP}/home/home/trend`, {
    method: 'POST',
    body: formData
  })
}

export function getLogMapData({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/logistics/map`, {
    method: 'POST',
    body: formData
  })
}

export function getOrderMapData({id}) {
  let formData = new FormData()
  formData.append('id', id)
  return request(`${IP}/home/order/map`, {
    method: 'POST',
    body: formData
  })
}

export function getHomeMapData() {
  return request(`${IP}/home/home/gps`)
}

export function getOrderList({page, order_status, find_str, order_type}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', 8)
  formData.append('order_status', order_status)
  formData.append('find_str', find_str)
  formData.append('order_type', order_type)
  return request(`${IP}/home/order/order-list`, {
    method: 'POST',
    body: formData
  })
}
