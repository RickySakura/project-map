/*
 * @Author: XHX.熊浩翔.RickySakura 
 * @Date: 2022-12-08 16:26:22 
 * @Last Modified by: XHX.熊浩翔.RickySakura
 * @Last Modified time: 2022-12-22 17:28:47
 * 通常使用的请求API
 */

import request from '@/utils/request'

/**
 * 获取广州行政区的区名，区域ID，区域边框坐标
 * @returns {Pormise} promise对象
 */
export function apiGetDistricInfos() {
  return request({
    url: '/bussiness/busAddress/queryAddressList',
    method: 'get',
  });
}

/**
 * 获取数据更新时间
 * @returns {Promise} 更新时间
 */
export function apiGetUpdateTime() {
  return request({
    url: '/bussiness/statics/comment',
    method: 'get'
  })
}

/**
 * 根据学校ID获取对应学校的信息，公用方法
 * @param {string | number} schoolId 学校ID
 * @returns {Pormise} promise对象
 */
export function apiGetSchoolDetailById(schoolId) {
  return request({
    url: '/bussiness/busSchool/queryById',
    method: 'get',
    params: {
      id: schoolId
    },
  });
}