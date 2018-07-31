import request from '../utils/request'
import { IP } from '../constants'

export function login({account, pwd}) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  return request(`${IP}/home/login/login`, {
    method: 'POST',
    body: formData
  })
}

export function logout() {
  let formData = new FormData()
  return request(`${IP}/home/login/logout`, {
    method: 'POST',
    body: formData
  })
}

export function backlogin({account, pwd}) {
  let formData = new FormData()
  formData.append('account', account)
  formData.append('pwd', pwd)
  return request(`${IP}/admin/login/login`, {
    method: 'POST',
    body: formData
  })
}

export function backlogout() {
  let formData = new FormData()
  return request(`${IP}/admin/login/logout`, {
    method: 'POST',
    body: formData
  })
}

