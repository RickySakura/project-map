import request, { getAction } from '@/utils/request'

/**
 * 根据几个联合条件，查询符合所有条件的学校列表，至少要传递一个参数
 * @param {string | number} exemplaryType 可选。示范类型：0非示范 1市示范高中 2省示范高中
 * @param {string | number} schoolType 可选。学段类型：例 31初中 34高中 
 * @param {string | number} addressId 可选。行政区ID
 * @param {string | number} schoolProperties 可选。办学类型：11公办 12民办
 * @param {string | number} isCompulsoryEducation 可选。是否义务教育标准学校(0-否,1-是)
 */
export function apiGetRunningSchool(exemplaryType = 0, schoolType = null, addressId = null, schoolProperties = null,isCompulsoryEducation=null) {
  return getAction('/bussiness/busRunningSchoolMap/list',{
    exemplaryType,
    schoolType,
    schoolProperties,
    orgId: addressId,
    isCompulsoryEducation
  })
}

// 右侧工具栏使用
/**
 * 获取教育概况信息，办学地图右侧栏第一个区块中使用。
 * @param {string | number} addressId 行政区ID
 */
export function apiGetRunningSchoolOverview(addressId = null) {
  return request({
    url: '/bussiness/busRunningSchoolMap/city/educationOverview',
    method: 'get',
    params: {
      orgId: addressId,
    },
  });
}


/**
 * 获取各学段教育体量信息，办学地图右侧栏第二个区块中饼图和柱状图使用
 * @param {string | number} addressId 行政区ID
 */
export function apiGetEachLevelEducationVolume(addressId = null) {
  return request({
    url: '/bussiness/busRunningSchoolMap/city/eachSchoolLevelEducationVolume',
    method: 'get',
    params: {
      orgId: addressId,
    },
  });
}

/**
 * 获取办学性质信息，办学地图右侧栏第三个区块中使用
 * @param {string | number} addressId 可选。行政区ID
 * @param {string | number} schoolType 可选。学段类型, 例如11-幼儿园，21-小学
 * @param {string | number} schoolProperties 可选。可能会弃用。
 */
export function apiGetNatureOfRunningSchool(addressId = null, schoolType = null, schoolProperties = null) {
  return request({
    url: '/bussiness/busRunningSchoolMap/city/natureOfRunningASchool',
    method: 'get',
    params: {
      orgId: addressId,
      schoolType,
      schoolProperties
    },
  });
}

/**
 * 查询介绍窗里的信息
 * @param {string | number} addressId 行政区ID
 */
export function apiGetEachDistrict(addressId) {
  return request({
    url: '/bussiness/busRunningSchoolMap/statisticsOfSchoolStudentsInEachDistrict',
    method: 'get',
    params: {
      addressId
    },
  });
}

/**
 * 获取办学地图左侧工具栏中的选项数据
 * @param {string | number} addressId 行政区ID
 */
export function apiGetSchoolTypeOptions(addressId) { 
  return getAction('/bussiness/busSchool/getTheNumberOfSchoolsOfEachType', { orgId: addressId })
}