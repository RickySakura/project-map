/*
 * @Author: 熊浩翔
 * @Date: 2022-11-29 15:17:30 
 * @Last Modified by: XHX.熊浩翔.RickySakura
 * @Last Modified time: 2022-12-28 16:13:25
 * @Description: 对 Axios 请求进行封装
 */
import axios from 'axios'
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus'
import errorCode from '@/utils/errorCode'


// 创建axios实例
const service = axios.create({
  // 配置请求URL公共部分
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60 * 60 * 1000,  // 超时时间。单位 ms
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})


// 请求拦截器，请求发送前触发
service.interceptors.request.use(config => {
  // config 接口请求的配置信息
  return config
}, error => {
  // 报错时抛出一个错误信息
  return Promise.reject(error)
})


// 响应拦截器，确保能正确接收接口返回的值
service.interceptors.response.use(res => {
  const code = res.data.code || 200
  const message = res.data.message || errorCode[code] || errorCode['default']
  if (code === 401) {
    ElMessage({
      showClose: true,
      message: message,
      type: 'error'
    })
  } else if (code === 500) {
    ElMessage({
      showClose: true,
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  } else if (code !== 200) {
    ElNotification.error({
      title: message
    })
    return Promise.reject('error: ' + message)
  } else {
    if (res.data.result) {
      return res.data
    } else {
      return Promise.reject('error: res.data.result为空')
    }
  }
},
  error => {
    console.error("❌ ~ file: request.js:65 ~ error", error)
    const status = error?.response?.status || 404
    if (status === 404) { }

    if (status === 401) {
      ElMessageBox.alert(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          type: 'warning',
          callback: action => {
            location.href = '/'
          }
        }
      )
    }
    return Promise.reject(error)
  })

export default service