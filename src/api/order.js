import request from '@/utils/request'


export function getOrderList(data) {
  return request({
    url: '/api/order/list',
    method: 'post',
    data
  })
}
