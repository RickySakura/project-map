import request from '@/utils/request'
// 网络请求函数命名规则： "api + 动词 + 宾语 + 副词" 如：apiGetUserInfoById
/**
 * 用户登录接口
 * @param {*} data 
 * @returns {Promise} 请求结果promise
 */
export function apiHandleUserLogin(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: data
  })
}

/**
 * 用户登出接口
 * @returns {Promise} 请求结果promise
 */
export function apiHandleUserLogout() {
  return request({
    url: '/sys/logout',
    method: 'get',
    headers: {
      'X-Access-Token': sessionStorage.getItem('token')
    }
  })
}

/**
 * 获取验证码
 * @param {string} key 
 * @returns {Promise} 请求结果promise
 */
export function apiGetRandomImage(key) {
  return request({
    url: `/sys/randomImage/${key}`,
    method: 'get',
  });
}