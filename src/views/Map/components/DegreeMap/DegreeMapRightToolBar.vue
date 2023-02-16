<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 学位监测概览 </template>
      <template #toolbar-title-bar>
        <div class="school-type-choose">
          <el-select
            v-model="value"
            @change="handleSchoolTypeChange"
            placeholder="请选择"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in selectOptions"
              :key="item.schoolType"
              :label="item.describe"
              :value="item.schoolType"
            >
            </el-option>
          </el-select>
        </div>
      </template>
      <template #toolbar-content>
        <div class="degree-overview-content">
          <div class="degree-overview-top">
            <div class="item" v-for="(item, index) in topBoxValue" :key="index">
              <img :src="item.img" alt="degree" />
              <div class="text">
                <span>{{ item.label }}</span>
                <div>
                  <span class="highlight">{{ item.count }}</span>
                  {{ item.unit }}
                </div>
              </div>
            </div>
          </div>
          <div class="degree-overview-bottom">
            <div class="bottom-left">
              <div class="overview-item_top">
                <div class="contents">
                  <p class="number">
                    {{ degreeOverview.standardDegreeTotal }}<span>人</span>
                  </p>
                  <p class="describe">标准学位数</p>
                </div>
                <div class="decorate">
                  <div class="line-bold"></div>
                  <div class="line-light"></div>
                  <div class="slash"></div>
                </div>
              </div>
              <div class="overview-item_bottom">
                <div class="contents">
                  <p class="number">
                    {{ degreeOverview.proportionOfStandardRedundantDegrees }}
                  </p>
                  <p class="describe">标准冗余学位占比</p>
                </div>
                <div class="decorate">
                  <div class="line-bold"></div>
                  <div class="line-light"></div>
                  <div class="slash"></div>
                </div>
              </div>
            </div>
            <div class="bottom-center">
              <img src="@/assets/img/degreeMap/earth.png" alt="center" />
            </div>
            <div class="bottom-right">
              <div class="overview-item_top">
                <div class="contents">
                  <p class="number">
                    {{ degreeOverview.maxDegreeTotal }}<span>人</span>
                  </p>
                  <p class="describe">最大学位数</p>
                </div>
                <div class="decorate">
                  <div class="line-bold"></div>
                  <div class="line-light"></div>
                  <div class="slash"></div>
                </div>
              </div>
              <div class="overview-item_bottom">
                <div class="contents">
                  <p class="number">
                    {{ degreeOverview.maxProportionOfRedundantDegrees }}
                  </p>
                  <p class="describe">最大冗余学位占比</p>
                </div>
                <div class="decorate">
                  <div class="line-bold"></div>
                  <div class="line-light"></div>
                  <div class="slash"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 标准学位统计 </template>
      <template #toolbar-content>
        <div class="degree-map-bar">
          <MBarChart ref="standardDegreeBar" />
        </div>
        <div class="degree-description">
          {{ standardDegreeDescribe }}
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 最大学位统计 </template>

      <template #toolbar-content>
        <div class="degree-map-bar">
          <MBarChart ref="maxDegreeBar" />
        </div>
        <div class="degree-description">
          {{ maxDegreeDescribe }}
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetDegreeOverview,
  apiGetDegreeStatisitcs,
} from '@/api/useDegreeMapRequest';
import { useMapStore } from '@/stores/mapStore';
import { mapState } from 'pinia';
import degree from '@/assets/img/degreeMap/degree.png';
import degreeSchool from '@/assets/img/degreeMap/degree-school.png';
import degreeClass from '@/assets/img/degreeMap/degree-class.png';

const DegreeBarBaseOptions = {
  series: [
    {
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 万人';
        },
      },
      color: '#47B2FF',
      barWidth: 5,
    },
    {
      name: '实际人数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 万人';
        },
      },
      barWidth: 5,
      color: '#50D39F',
    },
    {
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' %';
        },
      },
      color: '#4DF3F3',
    },
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: {
    textStyle: {
      //图例⽂字的样式
      fontSize: 11,
      color: '#fff',
    },
  },
  xAxis: [
    {
      type: 'category',
      axisPointer: {
        type: 'shadow',
      },
      axisLabel: {
        color: '#fff',
        interval: 0, // 强制显示全部x轴
        fontSize: 12,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '人数(万人)',
      nameTextStyle: {
        color: '#fff',
      },
      min: 0,
      splitNumber: 3,
      axisLabel: {
        formatter: '{value}',
        color: '#fff ',
      },
    },
    {
      type: 'value',
      name: '占比',
      nameTextStyle: {
        color: '#fff',
      },
      splitNumber: 3,
      axisLabel: {
        formatter: '{value} %',
        color: '#fff',
      },
    },
  ],
  grid: {
    top: '20%',
    right: '3%',
    bottom: '2%',
    left: '3%',
    containLabel: true,
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      start: 0,
      end: 50,
      handleSize: 1,
      height: 5, //组件高度
      left: '5%', //左边的距离
      right: '4%', //右边的距离
      bottom: 0,
      fillerColor: '#D0D2D9',
      backgroundColor: '#4df3f3',
      borderRadius: 5,
      showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
      zoomLock: true,
    },
    {
      zoomLock: true,
      type: 'inside',
      xAxisIndexx: 0,
      filterMode: 'filter',
      fillerColor: '#D0D2D9',
      start: 0,
      end: 50,
      zoomLock: false,
    },
  ],
};

export default {
  data() {
    return {
      standardDegreeDescribe: '',
      maxDegreeDescribe: '',
      degreeOverview: {},
      selectOptions: [
        {
          schoolType: '',
          describe: '全部',
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
          schoolType: 34,
          describe: '高中',
        },
      ],
      value: '',
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId']),
    topBoxValue() {
      return [
        {
          label: '学校总数',
          count: this.degreeOverview.totalSchools || 0,
          unit: '个',
          img: degreeSchool,
        },
        {
          label: '实际学生总人数',
          count: this.degreeOverview.actualNumber || 0,
          unit: '人',
          img: degreeSchool,
        },
        {
          label: '班级总数',
          count: this.degreeOverview.totalClass || 0,
          unit: '个',
          img: degreeClass,
        },
        {
          label: '2023年新生入学可保障学位',
          count: this.degreeOverview.maxDegreeTotal || 0,
          unit: '人',
          img: degree,
        },
      ];
    },
  },
  watch: {
    addressId() {
      this.value = '';
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let loading = this.$loading({
        target: this.$el,
      });
      Promise.all([
        apiGetDegreeOverview('', this.addressId),
        apiGetDegreeStatisitcs(1, this.addressId),
        apiGetDegreeStatisitcs(2, this.addressId),
      ])
        .then(
          ([
            { result: degreeOverviewRes },
            { result: standardDegreeRes },
            { result: maxDegreeRes },
          ]) => {
            this.degreeOverview = degreeOverviewRes;
            this.standardDegreeDescribe =
              standardDegreeRes.standardDegreeDescribe;
            this.maxDegreeDescribe = maxDegreeRes.maxDegreeDescribe;
            this.updateStandardDegreeBar(
              standardDegreeRes.degreeStatisticsDescribeVos
            );
            this.updateMaxDegreeBar(maxDegreeRes.degreeStatisticsDescribeVos);
          }
        )
        .catch((err) => {
          console.error(
            '🚀 ~ file: DegreeMapRightToolBar.vue:372 ~ updateData ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    // 更新学位监测概览数据
    updateDegreeOverview(schoolType) {
      let loading = this.$loading({
        target: this.$el,
      });
      apiGetDegreeOverview(schoolType, this.addressId)
        .then(({ result }) => {
          this.degreeOverview = result;
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: DegreeMapRightToolBar.vue:388 ~ updateDegreeOverview ~ err',
            err
          );
        })
        .finally(loading.close);
    },

    updateStandardDegreeBar(data) {
      let label = [];
      let standardValues = [];
      let actualValues = [];
      let proportions = [];
      data.forEach((item) => {
        if (!item) return;
        // x坐标轴文本超过五个字可能会被遮挡，所以需要插入换行符 \n
        let schoolTypeName = item.schoolTypeName;
        if (schoolTypeName.length >= 5) {
          schoolTypeName =
            schoolTypeName.substr(0, 3) + '\n' + schoolTypeName.substr(3);
        }
        label.push(schoolTypeName);
        standardValues.push(
          item.degreeCheckOverviewVos.standardDegreeTotal / 10000
        );
        actualValues.push(item.degreeCheckOverviewVos.actualNumber / 10000);
        let p =
          item.degreeCheckOverviewVos.proportionOfStandardRedundantDegrees;
        proportions.push(Number(p.substring(0, p.length - 1)));
      });

      this.$refs.standardDegreeBar
        ?.clearOption()
        ?.mergeToOption(DegreeBarBaseOptions);
      this.$refs.standardDegreeBar?.initChart({
        series: [
          {
            name: '标准学位数',
            data: standardValues,
          },
          {
            data: actualValues,
          },
          {
            name: '标准冗余学位占比',
            data: proportions,
          },
        ],
        legend: {
          data: ['标准学位数', '实际人数', '标准冗余学位占比'],
        },
        xAxis: [
          {
            data: label,
          },
        ],
      });
    },
    updateMaxDegreeBar(data) {
      let label = [];
      let maxValues = [];
      let actualValues = [];
      let proportions = [];
      data.forEach((item) => {
        let schoolTypeName = item.schoolTypeName;
        if (schoolTypeName.length >= 5) {
          schoolTypeName =
            schoolTypeName.substr(0, 3) + '\n' + schoolTypeName.substr(3);
        }
        label.push(schoolTypeName);
        maxValues.push(item.degreeCheckOverviewVos.maxDegreeTotal / 10000);
        actualValues.push(item.degreeCheckOverviewVos.actualNumber / 10000);
        let p = item.degreeCheckOverviewVos.maxProportionOfRedundantDegrees;
        proportions.push(Number(p.substring(0, p.length - 1)));
      });

      this.$refs.maxDegreeBar
        ?.clearOption()
        ?.mergeToOption(DegreeBarBaseOptions);
      this.$refs.maxDegreeBar?.initChart({
        series: [
          {
            name: '标准学位数',
            data: maxValues,
          },
          {
            data: actualValues,
          },
          {
            name: '标准冗余学位占比',
            data: proportions,
          },
        ],
        legend: {
          data: ['标准学位数', '实际人数', '标准冗余学位占比'],
        },
        xAxis: [
          {
            data: label,
          },
        ],
      });
    },
    handleSchoolTypeChange(val) {
      this.updateDegreeOverview(val);
    },
  },
};
</script>

<style lang="less" scoped>
.right-toolbar-container {
  position: relative;
}
.toolbar-block-wrapper {
  display: flex;
  justify-content: space-between;
  & > div {
    margin: 0 0.1rem;
  }
}

// FIXME:学位监测概览里的样式会导致宽度异常，可能是 flex 布局的原因
.degree-overview-content {
  width: 4rem;
  margin: 0 auto;
  padding: 0 0.16rem;

  & > div {
    width: 100%;
  }

  .degree-overview-top {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    display: flex;
    width: 50%;
    margin-bottom: 0.12rem;

    img {
      height: 0.5rem;
      width: 0.5rem;
      margin-right: 0.12rem;
    }

    .text {
      color: #fff;
      font-size: 0.12rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-weight: lighter;
    }

    .highlight {
      color: #21ffe8;
      font-size: 0.18rem;
      font-weight: bold;
    }
  }

  .degree-overview-bottom {
    width: 100%;
    height: 1.3rem;
    display: flex;
    justify-content: space-between;

    .bottom-left,
    .bottom-right {
      width: 41%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .overview-item_bottom .slash {
      transform: rotate(-45deg);
    }

    .bottom-right {
      .decorate {
        transform: scaleX(-1);
      }

      .contents {
        left: auto;
        right: 0;
        text-align: end;
      }
    }

    .bottom-center {
      img {
        margin-top: 85%;
        width: 0.66rem;
        height: 0.57rem;
      }
    }
  }

  .overview-item_top,
  .overview-item_bottom {
    width: 100%;
    color: #fff;
    font-size: 0.12rem;
    height: 0.42rem;
    position: relative;

    .decorate {
      width: 100%;
      height: 100%;
      display: flex;
    }

    .line-bold {
      width: 56%;
      height: 100%;
      border-bottom: 2px solid #4df3f3;
    }

    .line-light {
      width: 30%;
      border-bottom: 1px solid #4df3f3;
      transform: translateY(-0.005rem);
    }

    .slash {
      width: 14%;
      border-bottom: 1px solid #4df3f3;
      transform: rotate(45deg);
      transform-origin: left bottom;
      position: relative;

      &::after {
        content: '';
        width: 0.02rem;
        height: 0.02rem;
        border-radius: 50%;
        background-color: #4df3f3;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: translateY(0.015rem);
      }
    }

    .contents {
      position: absolute;
      top: 0;
      left: 0;
    }

    .number {
      color: #ffa200;
      font-size: 0.16rem;
      font-weight: bold;

      span {
        color: #9eb0c2;
        font-size: 0.12rem;
        font-weight: 400;
      }
    }
  }
}

.degree-map-bar {
  height: 3.2rem;
  padding: 0.1rem;
}

.degree-description {
  width: 3.8rem;
  margin: 0 auto;
  background-color: #02355a;
  border-radius: 6px;
  color: #fff;
  font-size: 0.12rem;
  padding: 0.1rem;
}
</style>
