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

export function saveProduct(data) {
  return request({
    url: '/api/product/save',
    method: 'post',
    data
  })
}

export function delProduct(data) {
  return request({
    url: '/api/product/del',
    method: 'post',
    data
  })
}


export function getProductTypeList(data) {
  return request({
    url: '/api/product/typelist',
    method: 'post',
    data
  })
}

export function getProductType(data) {
  return request({
    url: '/api/product/typeget',
    method: 'post',
    data
  })
}

export function saveProductType(data) {
  return request({
    url: '/api/product/typesave',
    method: 'post',
    data
  })
}
