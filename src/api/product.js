import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/api/product/list',
    method: 'post',
    data
  })
}


export function getProductTypeAll() {
  return request({
    url: '/api/product/alltypelist',
    method: 'post'
  })
}


export function getProduct(data) {
  return request({
    url: '/api/product/get',
    method: 'post',
    data
  })
}
