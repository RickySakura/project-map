import getAssetsFile from "./getAssetsFile";

// 办学类型枚举，等价于接口里的runningType
const schoolTypeEnum = [
  {
    schoolType: '',
    label: '全部',
  },
  {
    schoolType: 11,
    label: '幼儿园',
    styleId: 'kindergarten',
  },
  {
    schoolType: 111,
    label: '幼儿园小班',
    styleId: 'kindergarten',
  },
  {
    schoolType: 112,
    label: '幼儿园中班',
    styleId: 'kindergarten',
  },
  {
    schoolType: 113,
    label: '幼儿园大班',
    styleId: 'kindergarten',
  },
  {
    schoolType: 21,
    label: '小学',
    styleId: 'primary-school',
  },
  {
    schoolType: 31,
    label: '初中',
    styleId: 'middle-school',
  },
  {
    schoolType: 312,
    label: '九年一贯制',
    styleId: 'middle-school',
  },
  {
    schoolType: 34,
    label: '高中',
    styleId: 'high-school',
  },
  {
    schoolType: 341,
    label: '完全中学',
    styleId: 'high-school',
  },
  // {
  //   schoolType: 341,
  //   label: "高级中学",
  // },
  {
    schoolType: 345,
    label: '十二年一贯制',
    styleId: 'high-school',
  },
  {
    schoolType: 51,
    label: '特殊教育',
    styleId: 'special-education',
  },
  {
    schoolType: 98,
    label: '外籍子女学校',
    styleId: 'training-institutions',
  },
  {
    schoolType: 36,
    label: '市区属中职',
    styleId: 'secondary-vocational',
  },
  {
    schoolType: 369,
    label: '省中职',
  },
  {
    schoolType: 366,
    label: '市属技工学校',
  },
  {
    schoolType: 41,
    label: '高等教育',
  },
  {
    schoolType: 93,
    label: '教育培训机构',
    styleId: 'foreign-children',
  },
  {
    schoolType: 367,
    label: '省属技工学校',
  },
  {
    schoolType: 99,
    label: '其他',
  },
];

// 学校类型选项，用于办学地图和学位地图的选择器
const schoolTypeOptions = [
  {
    value: '',
    label: '全部',
  },
  {
    value: 11,
    label: '幼儿园',
    icon: getAssetsFile('marks/kindergarten.png'),
  },
  {
    value: 21,
    label: '小学',
    icon: getAssetsFile('marks/primary-school.png'),
  },
  {
    value: 31,
    label: '初中',
    icon: getAssetsFile('marks/middle-school.png'),
  },
  {
    value: 34,
    label: '高中',
    icon: getAssetsFile('marks/high-school.png'),
  },
  {
    value: 36,
    label: '中职教育',
    icon: getAssetsFile('marks/secondary-vocational.png'),
  },
  {
    value: 51,
    label: '特殊教育',
    icon: getAssetsFile('marks/special-education.png'),
  },
  {
    value: 93,
    label: '教育培训机构',
    icon: getAssetsFile('marks/training-institutions.png'),
  },
  {
    value: 98,
    label: '外籍子女学校',
    icon: getAssetsFile('marks/foreign-children.png'),
  },
];

// 学校性质枚举F
const schoolPropertiesEnum = [
  {
    value: 1,
    label: '公办',
  },
  {
    value: 2,
    label: '民办',
  },
];

// 学校属性枚举
const schoolAttributeEnum = [
  {
    value: 1,
    label: '市属学校',
  },
  {
    value: 2,
    label: '区属学校',
  },
  {
    value: 3,
    label: '省属学校',
  },
];

export {
  schoolTypeEnum,
  schoolTypeOptions,
  schoolPropertiesEnum,
  schoolAttributeEnum,
};
