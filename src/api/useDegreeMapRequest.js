import request from '@/utils/request'

/**
 * 根据几个联合条件，查询符合所有条件的学校列表，至少要传递一个参数
 * @param {string | number} exemplaryType 可选。示范类型：0非示范 1市示范高中 2省示范高中
 * @param {string | number} schoolType 可选。学段类型：例 31初中 34高中 
 * @param {string | number} addressId 可选。行政区ID
 * @param {string | number} schoolProperties 可选。办学类型：11公办 12民办
 * @returns {Promise} promise对象
 */
export function apiGetRunningSchool(exemplaryType = 0, schoolType = null, addressId = null, schoolProperties = null) {
  return request({
    url: '/bussiness/busRunningSchoolMap/list',
    method: 'get',
    params: {
      exemplaryType,
      schoolType,
      schoolProperties,
      orgId: addressId
    },
  });
}

// 右侧工具栏使用
/**
 * 获取学位监测概览数据，右侧边栏第一块使用
 * @param {string | number} schoolType 可选。学段类型，例如：11-幼儿园，21-小学，传空则为全部。
 * @param {string | number} addressId 可选。行政区ID
 * @returns {Promise} promise对象
 */
export function apiGetDegreeOverview(schoolType = '', addressId = '') {
  return request({
    url: `/bussiness/busSchool/degreeCheckOverview`,
    method: 'get',
    params: {
      schoolType,
      regionId: addressId
    }
  })
}


/**
 * 获取标准学位统计或最大学位统计数据，右侧边栏第二、三块使用
 * @param {*} degreeType 学位类型。 1标准学位，2最大学位
 * @param {string | number} addressId 可选。行政区ID
 * @returns {Promise} promise对象
 */
export function apiGetDegreeStatisitcs(degreeType = null, addressId = '') {
  return request({
    url: `/bussiness/busSchool/degreeStatistics`,
    method: 'get',
    params: {
      degreeType,
      regionId: addressId
    },
  })
}

