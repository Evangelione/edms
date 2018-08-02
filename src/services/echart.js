import request from '../utils/request';

export function queryEchart() {
  return request('/echartOption');
}
