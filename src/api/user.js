import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    emulateJSON: true,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}


export function getUserList(token) {
  return request({
    url: '/user/list',
    method: 'get',
    params: { token }
  })
}
