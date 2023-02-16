// 办学类型枚举，等价于接口里的runningType
const schoolTypeEnum = [
  {
    schoolType: '',
    describe: '全部',
  },
  {
    schoolType: 11,
    describe: '幼儿园',
  },
  {
    schoolType: 111,
    describe: '幼儿园小班',
  },
  {
    schoolType: 112,
    describe: '幼儿园中班',
  },
  {
    schoolType: 113,
    describe: '幼儿园大班',
  },
  {
    schoolType: 21,
    describe: '小学',
  },
  {
    schoolType: 31,
    describe: '初中',
  },
  {
    schoolType: 312,
    describe: '九年一贯制',
  },
  {
    schoolType: 34,
    describe: '高中',
  },
  {
    schoolType: 341,
    describe: '完全中学',
  },
  // {
  //   schoolType: 341,
  //   describe: "高级中学",
  // },
  {
    schoolType: 345,
    describe: '十二年一贯制',
  },
  {
    schoolType: 51,
    describe: '特殊教育',
  },
  {
    schoolType: 98,
    describe: '外籍子女学校',
  },
  {
    schoolType: 36,
    describe: '市区属中职',
  },
  {
    schoolType: 369,
    describe: '省中职',
  },
  {
    schoolType: 366,
    describe: '市属技工学校',
  },
  {
    schoolType: 41,
    describe: '高等教育',
  },
  {
    schoolType: 93,
    describe: '教育培训机构',
  },
  {
    schoolType: 367,
    describe: '省属技工学校',
  },
  {
    schoolType: 99,
    describe: '其他',
  },
];

// 学校性质枚举
const schoolPropertiesEnum = [
  {
    value: 1,
    describe: '公办',
  },
  {
    value: 2,
    describe: '民办',
  },
];

// 学校属性枚举
const schoolAttributeEnum = [
  {
    value: 1,
    describe: '市属学校',
  },
  {
    value: 2,
    describe: '区属学校',
  },
  {
    value: 3,
    describe: '省属学校',
  },
];

export { schoolTypeEnum, schoolPropertiesEnum, schoolAttributeEnum };
