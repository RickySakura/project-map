import request from '@/utils/request'

/**
 * 获取学生每日异常情况与健康码情况，用于疫情地图中的 LeftToolBarBlock1.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetAbnormalReport(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/student/abnormalReport',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}


/**
 * 获取学生共同居住人员健康码情况，用于疫情地图中的 LeftToolBarBlock1.vue
 * @param {string | number} addressId 行政区ID，可以为空（不传、null、空字符串）
 * @returns {Promise}
 */
export function apiGetParentHealthCode(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/parent/healthCode',
    method: 'get',
    params: {
      orgId: addressId,
    },
  });
}

/**
 * 获取学生核酸测试结果的统计信息，用于疫情地图中的 LeftToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetStudentNucleicAcid(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/student/nucleicAcid',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}

/**
 * 获取学生接种新冠疫苗的统计信息，用于疫情地图中的 LeftToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetStudentInjection(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/student/vaccineInjection',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}

/**
 * 获取（全市！）学生跨区流动统计，只能用于查全市！
 * 用于疫情地图中的 LeftToolBarBlock2.vue
 * @returns {Promise}
 */
export function apiGetCityStudentCross() {
  return request({
    url: '/bussiness/busStudent/cross',
    method: 'get',
  });
}


/**
 * 获取（各区！）学生跨区流动情况，只能用于查询各区，无法查询全市！
 * 用于疫情地图中的 LeftToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，必传！不能为空！不能查全市！
 * @returns {Promise}
 */
export function apiGetDistrictStudentCorss(addressId) {
  return request({
    url: '/bussiness/busEpidemicMap/region/student/studentOriginDistribution',
    method: 'get',
    params: {
      orgId: addressId,
    },
  });
}

/**
 * 获取全市（学校）涉疫统计信息，用于疫情地图中的 LeftToolBarBlock3.vue
 * @returns {Promise}
 */
export function apiGetRelatedSchoolStatistics() {
  return request({
    url: '/bussiness/busEpidemicMap/city/student/queryEpidemicRelatedSchoolStatistics',
    method: 'get',
  });
}

/**
 * 获取全市（学生）涉疫统计信息，用于疫情地图中的 LeftToolBarBlock3.vue
 * @returns {Promise}
 */
export function apiGetRelatedStudentStatistics() {
  return request({
    url: '/bussiness/busEpidemicMap/city/student/queryEpidemicRelatedStudentStatistics',
    method: 'get',
  });
}


/**
 * 获取低、中、高风险区边框的信息，用于显示地图上的区域
 * @param {string | number} areaCategory 风险类型，1高风险 2中风险 3低风险
 * @param {string | number} addressId 行政区ID，可以为空（不传、null、空字符串）
 * @returns {Promise}
 */
export function apiGetEpidemicTypeArea(areaCategory, addressId = '') {
  return request({
    url: '/bussiness/busArea/list',
    method: 'get',
    params: {
      page: 1,
      pageSize: 1000,
      areaCategory,
      addressId,
    },
  });
}


/**
 * 获取疫情数据地图学校列表
 * @param {string | number} areaCategory 风险类型，1高风险 2中风险 3低风险
 * @param {string | number} addressId 行政区ID，可以为空（不传、null、空字符串）
 * @param {string | number}  type 查询类型 1 集团 2 学校，默认为2学校
 * @returns 
 */
export function apiGetOfficeOrSchoolByAreaCategory(areaCategory, addressId = '', type = 2) {
  return request({
    url: '/bussiness/busArea/getOfficeOrSchoolByAreaCategory',
    method: 'get',
    params: {
      addressId,
      areaCategory,
      type,
    },
  });
}


/**
 * 获取教师每日异常情况与健康码情况，用于疫情地图中的 RightToolBarBlock1.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetTeacherAbnormalReport(addressId) {
  return request({
    url: '/bussiness/busEpidemicMap/teacher/abnormalReport',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}

/**
 * 获取学生核酸测试结果的统计信息，用于疫情地图中的 RightToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetTeacherNucleicAcid(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/teacher/nucleicAcid',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}

/**
 * 获取教师接种新冠疫苗的统计信息，用于疫情地图中的 RightToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，如果要查全市则不要传入参数！否则返回结果会为空。
 * @returns {Promise}
 */
export function apiGetTeacherVaccines(addressId = '') {
  return request({
    url: '/bussiness/busEpidemicMap/teacher/vaccineInjection',
    method: 'get',
    params: addressId !== '' ? {
      orgId: addressId,
    } : null,
  });
}


/**
 * 获取（全市！）教师跨区流动统计，只能用于查全市！
 * 用于疫情地图中的 RightToolBarBlock2.vue
 * @returns {Promise}
 */
export function apiGetTeacherCross() {
  return request({
    url: '/bussiness/busEpidemicMap/city/teacher/cross',
    method: 'get',
  });
}


/**
 * 获取（各区！）教师跨区流动情况，只能用于查询各区，无法查询全市！
 * 用于疫情地图中的 RightToolBarBlock2.vue
 * @param {string | number} addressId 行政区ID，必传！不能为空！不能查全市！
 * @returns {Promise}
 */
export function apiAreaGetTeacherCross(addressId) {
  return request({
    url: '/bussiness/busEpidemicMap/region/teacher/originDistribution',
    method: 'get',
    params: {
      orgId: addressId,
    },
  });
}

/**
 * 获取全市（教师）涉疫统计信息，用于疫情地图中的 RightToolBarBlock3.vue
 * @returns {Promise}
 */
export function apiGetTeacherEpidemic() {
  return request({
    url: '/bussiness/busEpidemicMap/city/teacher/queryEpidemicRelatedStudentStatistics',
    method: 'get',
  });
}