<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 义务教育标准化概况 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="义务教育阶段学校"
            icon-url="icons/house.png"
            unit="所"
            :unit-style="{ color: '#e87bf9' }"
            :unit-number="overviewRes.totalCompulsoryEducationSchools || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="已验收的标准化学校"
            icon-url="icons/school-staff.png"
            unit="所"
            :unit-number="overviewRes.totalAcceptedStandardizedSchools || 0"
            :unit-style="{ color: '#5efb53' }"
          >
          </MInfoBox>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各区义务教育&标准化学校 </template>
      <template #toolbar-content>
        <div class="compulsory-charts__container--bar">
          <MBarChart ref="bar1" />
        </div>
      </template>
    </MToolBarBlock>

    <!-- 用于概况总览地图掺入内容 -->
    <slot name="overview-map"></slot>

    <MToolBarBlock>
      <template #toolbar-title> 义务教育阶段学校公民办占比 </template>
      <template #toolbar-content>
        <div class="compulsory-charts__container--pie">
          <CompulsoryPieChart ref="pie" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各学段义务教育&标准化学校 </template>
      <template #toolbar-content>
        <div class="compulsory-charts__container--bar">
          <MBarChart ref="bar2" />
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetCompulsoryDistricts,
  apiGetCompulsoryEducation,
  apiGetCompulsoryOverview,
  apiGetProportion,
} from '@/api/useCompulsoryRequest';
import { useMapStore } from '@/stores/mapStore';
import { schoolTypeEnum } from '@/utils/useEnums';
import { mapState } from 'pinia';

export default {
  data() {
    return {
      overviewRes: {},
      studentsRes: {},
      naturePiesArray: [
        {
          title: '幼儿园',
          schoolType: 11,
        },
        {
          title: '小学',
          schoolType: 21,
        },
        {
          title: '初中',
          schoolType: 31,
        },
        {
          title: '高中',
          schoolType: 34,
        },
        {
          title: '中职教育',
          schoolType: 36,
        },
        {
          title: '特殊教育',
          schoolType: 51,
        },
        {
          title: '教育培训机构',
          schoolType: 93,
        },
        {
          title: '外籍子女学校',
          schoolType: 98,
        },
      ],
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId']),
  },
  watch: {
    addressId() {
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let loading = this.$loading();
      Promise.all([
        apiGetCompulsoryOverview(this.addressId),
        apiGetCompulsoryDistricts(this.addressId),
        apiGetProportion(this.addressId),
        apiGetCompulsoryEducation(this.addressId),
      ])
        .then(
          ([
            { result: overviewRes },
            { result: districtsRes },
            { result: proportionRes },
            { result: educationRes },
          ]) => {
            this.overviewRes = overviewRes;
            this.updateBarChart(districtsRes);
            this.updateBarChart2(educationRes);
            this.updatePieChart(proportionRes);
            console.log(educationRes);
          }
        )
        .catch((err) => {
          console.error(
            '🚀 ~ file: CompulsoryRightToolBar.vue:131 ~ updateData ~ err:',
            err
          );
        })
        .finally(loading.close);
    },
    updatePieChart(data) {
      let {
        totalAcceptedStandardizedSchools: total1,
        totalCompulsoryEducationSchools: total2,
      } = data[0];

      let {
        totalAcceptedStandardizedSchools: total3,
        totalCompulsoryEducationSchools: total4,
      } = data[1];
      const options = {
        title: [
          {
            text: `公办\n{a|${total1 || 0}} 所`,
          },
          {
            text: `民办\n{a|${total3 || 0}} 所`,
          },
        ],
        series: [
          {
            data: [
              {
                value: total1 || 0,
                name: '标准化学校 ',
              },
              {
                value: total2 - total1 || 0,
                name: '差值',
              },
            ],
          },
          {
            data: [
              {
                value: total3,
                name: '标准化学校',
              },
              {
                value: total4 - total3 || 0,
                name: '差值',
              },
            ],
          },
        ],
      };
      this.$refs.pie?.initChart(options);
    },
    updateBarChart(data) {
      let schoolData = data?.map((item) => {
        return [
          item.addressName,
          item.totalCompulsoryEducationSchools,
          item.totalAcceptedStandardizedSchools,
        ];
      });
      const options = {
        textStyle: {
          color: '#fff',
        },
        legend: {
          x: 'right',
          itemWidth: 10,
          itemHeight: 10,
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              width: 2,
              color: '#fff',
            },
          },
          axisLabel: {
            overflow: 'breakAll',
            interval: 0, //底下文字出现间隔
          },
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          textStyle: {
            color: '#fff',
            fontSize: 10,
          },
          borderWidth: 0,
          className: 'echarts-tooltip-dark',
          valueFormatter: (value) => value + '所'
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            },
          },
          axisTick: {
            show: false, // 刻度线不显示
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: '#fff',
            },
          },
        },
        dataset: {
          dimensions: ['data', '义务教育阶段学校', '已验收的标准化学校'],
          source: schoolData,
        },
        dataZoom: [
          {
            zoomLock: false,
            type: 'slider',
            show: true,
            startValue: 0,
            endValue: 6,
            height: 5,
            left: '5%',
            right: '4%',
            bottom: '0%',
            fillerColor: '#4c93cd',
            borderRadius: 5,
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
          },
        ],
        series: [
          {
            barWidth: 5,
            color: '#47b2ff',
            type: 'bar',
          },
          {
            barWidth: 5,
            color: '#50D39F',
            type: 'bar',
          },
        ],
        grid: {
          top: '20%',
          right: '5%',
          bottom: '5%',
        },
      };
      this.$refs.bar1?.clearOption()?.initChart(options);
    },
    updateBarChart2(data) {
      let eduData = data?.map((item) => {
        return [
          item.runningTypeName,
          item.totalAcceptedStandardizedSchools,
          item.totalCompulsoryEducationSchools,
        ];
      });

      const options = {
        textStyle: {
          color: '#fff',
        },
        legend: {
          x: 'right',
          itemWidth: 10,
          itemHeight: 10,
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              width: 2,
              color: '#fff',
            },
          },
          axisLabel: {
            overflow: 'breakAll',
            interval: 0, //底下文字出现间隔
          },
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          textStyle: {
            color: '#fff',
            fontSize: 10,
          },
          borderWidth: 0,
          className: 'echarts-tooltip-dark',
          valueFormatter: (value) => value + '所'
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            },
          },
          axisTick: {
            show: false, // 刻度线不显示
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: '#fff',
            },
          },
        },
        dataset: {
          dimensions: ['data', '义务教育阶段学校', '已验收的标准化学校'],
          source: eduData,
        },
        // dataZoom: [
        //   {
        //     zoomLock: false,
        //     type: 'slider',
        //     show: true,
        //     startValue: 0,
        //     endValue: 6,
        //     height: 5,
        //     left: '5%',
        //     right: '4%',
        //     bottom: '0%',
        //     fillerColor: '#4c93cd',
        //     borderRadius: 5,
        //     showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
        //   },
        // ],
        series: [
          {
            barWidth: 5,
            color: '#fea101',
            type: 'bar',
          },
          {
            barWidth: 5,
            color: '#75daf7',
            type: 'bar',
          },
        ],
        grid: {
          top: '20%',
          right: '5%',
          bottom: '5%',
        },
      };
      this.$refs.bar2?.clearOption()?.initChart(options);
    },
    
  },
};
</script>

<style lang="less" scoped>
.right-toolbar-container {
  width: 4.5rem;
  transition: transform 300ms;
}
.toolbar-block-wrapper {
  display: flex;
  justify-content: space-around;
  & > div {
    margin: 0 0.1rem;
    min-width: 1.3rem;
  }
}

.compulsory-charts__container--pie {
  height: 2.2rem;
}
.compulsory-charts__container--bar {
  height: 1.88rem;
  margin: 0 0.1rem;
}
</style>
