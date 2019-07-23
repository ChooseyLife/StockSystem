import request from '@/plugin/axios'

export function getUserList (data) {
  return request({
    url: '/user',
    method: 'get',
    data
  })
}
