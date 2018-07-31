import request from '../../../utils/request'
import { IP, PAGE_SIZE } from "../../../constants";

export function getPermissionList({page, find_auth, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_auth', find_auth)
  formData.append('find_str', find_str)
  return request(`${IP}/admin/user/user-list`, {
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

export function insertUser({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/user/add-user`, {
    method: 'POST',
    body: formData
  })
}

export function modifyUser({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/admin/user/modify-user`, {
    method: 'POST',
    body: formData
  })
}

export function forbiddenControl({id}) {
  let formData = new FormData()
  formData.append('id', id.id);
  return request(`${IP}/admin/user/forbidden`, {
    method: 'POST',
    body: formData
  })
}
