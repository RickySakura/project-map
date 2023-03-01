import request, { getAction } from '@/utils/request';

// 考点地图 API

/**
 * 根据考点类型获取学校列表，用于考点地图的左工具栏
 * @param {string | number} examSiteType 必传！考点类型 0非考试类型 1成人高考 2教资考试 3自考 4艺考。默认为 1。
 * @param {string | number} addressId 行政区ID，空为全市
 * @returns {Promise}
 */
export function apiGetListByExamSiteType(examSiteType = 1, addressId = '') {
  return request({
    url: '/bussiness/examSite/list',
    method: 'get',
    params: {
      examSiteType,
      orgId: addressId,
    },
  });
}

/**
 * 获取考点概况信息，用于右侧工具栏
 * @param {string | number} examSiteType 必传！考点类型 0非考试类型 1成人高考 2教资考试 3自考 4艺考。默认为 1。
 * @param {string | number} addressId 行政区ID，空为全市
 * @returns {Promise}
 */
export function apiGetExaminationOverview(examSiteType = 1, addressId = '') {
  return request({
    url: '/bussiness/examSite/overviewExaminationSites',
    method: 'get',
    params: {
      examSiteType,
      orgId: addressId,
    },
  });
}

/**
 * 获取各区考点占比统计，或者 获取区的考点考场统计数据
 * @param {string | number} examSiteType 必传！考点类型 0非考试类型 1成人高考 2教资考试 3自考 4艺考。默认为 1。
 * @param {string | number} addressId 如果为空则查全市，否则查区域
 */
export function apiGetExamSiteStaticList(examSiteType = 1, addressId = '') {
  let url, params;
  if (addressId) {
    // 区域
    url = '/bussiness/examSite/statisticsRegionalExamSites';
    params = { examSiteType, orgId: addressId };
  } else {
    // 全市
    url = '/bussiness/examSite/examinationSiteStatisticsList';
    params = { examSiteType };
  }
  return getAction(url, params);
}


/**
 * 考点地图-查询两坐标直接的导航路线
 * @param {string} from
 * @param {string} to
 * @returns {Promise}
 */
export function apiQueryMapNavigation(from, to) {
  return request({
    url: '/bussiness/busSchool/navigationQuery',
    method: 'get',
    params: {
      from,
      to,
    },
  });
}
