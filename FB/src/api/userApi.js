import request from '@/plugin/axios'

export function getUserList (data) {
  return request({
    url: '/user',
    method: 'get',
    data
  })
}
export function getProductList (data) {
  return request({
    url: '/product',
    method: 'get',
    data
  })
}
