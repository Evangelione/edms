import request from '../../../utils/request'
import {IP, PAGE_SIZE} from '../../../constants'

export function fetchCompanyList({page, find_str}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  return request(`${IP}/home/company/sales-performance`, {
    method: 'POST',
    body: formData
  })
}

export function fetchCompanyDetail() {
  return request(`${IP}/home/company/company-info`, {
    method: 'POST'
  })
}

export function postImg({file}) {
  let formData = new FormData()
  formData.append(file.filename, file.file);
  return request(file.action, {
    method: 'POST',
    body: formData
  })
}

export function modifyCompany({form}) {
  let formData = new FormData()
  Object.keys(form).forEach((key, i) => {
    formData.append(key, form[key]);
  })
  return request(`${IP}/home/company/modify-company`, {
    method: 'POST',
    body: formData
  })
}
