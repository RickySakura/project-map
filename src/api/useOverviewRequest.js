import { getAction } from "@/utils/request";

// 概况总览地图请求

/** 获取示范性高中概况 */
const apiGetDemonstration = addressId => getAction('/bussiness/busExemplarySchool/overviewOfDemonstrationSchool', { orgId: addressId })
/** 获取义务教育学校概况 */
const apiGetCompulsory = addressId => getAction('/bussiness/busCompulsoryEducation/overviewOfCompulsoryEducationSchools', { orgId: addressId })

export { apiGetDemonstration, apiGetCompulsory };