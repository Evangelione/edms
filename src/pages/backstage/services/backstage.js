import request from '../../../utils/request'
import { PAGE_SIZE, IP } from "../../../constants"

export function getAdminList({page, find_auth, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  // formData.append('find_auth', find_auth)
  formData.append('find_str', find_str)
  // return request(`${IP}/admin/admin/admin-list`, {
  //   method: 'POST',
  //   body: formData
  // })
  return request(`${IP}/admin/company/company-list`, {
    method: 'POST',
    body: formData
  })
}

export function postAvatar({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function insertAdmin({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/company/add-company`, {
    method: 'POST',
    body: formData
  })
}

export function modifyAdmin({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/company/modify-company`, {
    method: 'POST',
    body: formData
  })
}

export function forbiddenControl({id}) {
  let formData = new FormData()
  formData.append('id', id.id);
  return request(`${IP}/admin/company/forbidden`, {
    method: 'POST',
    body: formData
  })
}
