import request from '../../../utils/request'
import {IP, PAGE_SIZE} from "../../../constants";

export function getAnalysisData({page, find_str, stime, etime}) {
  let formData = new FormData()
  formData.append('page', page)
  formData.append('limit', PAGE_SIZE)
  formData.append('find_str', find_str)
  formData.append('stime', stime)
  formData.append('etime', etime)
  return request(`${IP}/home/account/analysis`, {
    method: 'POST',
    body: formData
  })
}
