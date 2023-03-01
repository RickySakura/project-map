import { getAction } from '@/utils/request';

/** 获取义务教育标准化概况数据 */
const apiGetCompulsoryOverview = (addressId) =>
  getAction('/bussiness/busCompulsoryEducation/overviewOfCompulsoryEducation', {
    orgId: addressId,
  });

/** 获取各区义务教育&标准化学校数据 */
const apiGetCompulsoryDistricts = () =>
  getAction(
    '/bussiness/busCompulsoryEducation/compulsoryEducationInAllDistricts'
  );

/** 获取义务教育阶段学校公民办占比数据 */
const apiGetProportion = (addressId) =>
  getAction(
    '/bussiness/busCompulsoryEducation/compulsoryEducationForEachRunningtype',
    { orgId: addressId }
  );

/** 获取各学段义务教育&标准化学校数据 */
const apiGetCompulsoryEducation = (addressId) =>
  getAction(
    '/bussiness/busCompulsoryEducation/proportionOfCompulsoryEducationSchools',
    { orgId: addressId }
  );
export {
  apiGetCompulsoryOverview,
  apiGetCompulsoryDistricts,
  apiGetProportion,
  apiGetCompulsoryEducation,
};
