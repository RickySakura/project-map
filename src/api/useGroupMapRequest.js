/*
 * @Author: 熊浩翔
 * @Date: 2022-12-06 15:24:31 
 * @Last Modified by: XHX.熊浩翔.RickySakura
 * @Last Modified time: 2022-12-09 11:32:07
 * @Description 集团地图下API接口文件
 */
import request from '@/utils/request'

/**
 * 获取广州市内集团的概况，例：市属集团数量及其集团下学校数量
 * @param {string | number | null} addressId 行政区ID，等同于 addressId，默认为空。null或不传等于全市
 * @returns {Promise} Promise对象
 */
export function apiGetGroupGeneralOverview(addressId = '') {
  return request({
    url: '/bussiness/busOffice/city/queryGeneralOverview',
    method: 'get',
    params: {
      regionId: addressId,
    },
  });
}

// 左侧工具栏使用：
/**
 * 获取广州市内市属或区属集团的信息列表，包括集团名和集团ID
 * @param {1|2|'1'|'2'} officeType 必传！集团类型，只接受1或2，1表示市属，2表示区属
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} Promise对象
 */
export function apiGetGroupInfoListByOfficeType(officeType, addressId = null) {
  return request({
    url: '/bussiness/busOffice/queryByType',
    method: 'get',
    params: {
      officeType,
      addressId,
    },
  });
}

/**
 * 根据集团ID请求其集团下的所有学校信息，返回一个列表
 * @param {string | number} officeId 必传！集团ID
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} Promise对象
 */
export function apiGetSchoolListByGroupId(officeId, addressId = null) {
  return request({
    url: '/bussiness/busSchool/listByOfficeId',
    method: 'get',
    params: {
      officeId,
      addressId
    },
  });
}


// 右侧工具栏使用：
/**
 * 查询集团覆盖学校情况
 * @param {string | number} schoolType 必传！学段类型, 11-幼儿园，21-小学，可传入"11,21"同时查询多种学段信息
 * @param {string | number} regionId 行政区ID，等同于 addressId，默认为 null，null或不传等于全市
 * @returns {Promise} Promise对象
 */
export function apiGetSchoolsCoveredByTheGroup(schoolType, regionId = null) {
  return request({
    url: '/bussiness/busOffice/city/detailsOfSchoolsCoveredByTheGroup',
    method: 'get',
    params: {
      schoolType,
      regionId
    }
  })
}

/**
 * 查询集团覆盖学生情况
 * @param {1|2|'1'|'2'} officeType 必传！集团类型，只接受1或2，1表示市属，2表示区属
 * @param {string | number} regionId 行政区ID，等同于 addressId，默认为 null，null或不传等于全市
 * @returns {Promise} Promise对象
 */
export function apiGetStudentsCoveredByTheGroup(officeType, regionId = null) {
  return request({
    url: '/bussiness/busOffice/city/detailsOfStudentsCoveredByTheGroup',
    method: 'get',
    params: {
      officeType,
      regionId
    }
  })
}


/**
 * 获取某集团下的学校概况
 * @param {string | number} officeId 必传！集团ID
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} axios请求返回的Promise对象
 */
export function apiGetOverviewOfTheGroupsSchools(officeId, addressId = null) {
  return request({
    url: '/bussiness/busOffice/city/overviewOfTheGroupsSchools',
    method: 'get',
    params: {
      officeId,
      addressId
    }
  })
}

/**
 * 获取某集团下的学生统计情况
 * @param {string | number} officeId 必传！集团ID
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} axios请求返回的Promise对象
 */
export function apiGetStatisticsOfStudentsUnderTheGroup(officeId, addressId = null) {
  return request({
    url: '/bussiness/busOffice/city/statisticsOfStudentsUnderTheGroup',
    method: 'get',
    params: {
      officeId,
      addressId
    }
  })
}

/**
 * 获取某集团下的学校统计情况
 * @param {string | number} officeId 必传！集团ID
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} axios请求返回的Promise对象
 */
export function apiGetStatisticsOfSchoolsUnderTheGroup(officeId, addressId = null) {
  return request({
    url: '/bussiness/busOffice/city/statisticsOfSchoolsUnderTheGroup',
    method: 'get',
    params: {
      officeId,
      addressId
    }
  })
}

// 地图上标记点使用
/**
 * 获取市属/区属集团下所有学校列表  officeType 
 * @param {string | number} officeType 1表示市属 2表示区属
 * @param {string | number} addressId 行政区ID，默认为null，null或不传等于全市
 * @returns {Promise} axios请求返回的Promise对象
 */
export function apiGetGroupSchool(officeType, addressId = null) {
  return request({
    url: '/bussiness/busSchool/listSchoolByOfficeType',
    method: 'get',
    params: {
      officeType,
      addressId,
    },
  });
}