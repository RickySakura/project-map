<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 考点概况 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="考点总数"
            icon-url="icons/house.png"
            unit="个"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="overviewRes.testPoints || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="考场总数"
            icon-url="icons/house.png"
            unit="场"
            :unit-number="overviewRes.numberExaminationRooms || 0"
            :unit-style="{ color: '#8D92F8' }"
          >
          </MInfoBox>
          <MInfoBox
            title="考生数"
            icon-url="icons/school-stu.png"
            unit="人"
            :unit-number="overviewRes.numberExaminees || 0"
            :unit-style="{ color: '#70EA6C' }"
          >
          </MInfoBox>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各区考点占比统计 </template>
      <template #toolbar-content>
        <div style="height: 2.7rem; width: 100%;">
          <MPieChart ref="examPie" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各区考场统计</template>
      <template #toolbar-content>
        <div style="height: 2.5rem">
          <MBarChart ref="examBar1" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各区考生统计</template>
      <template #toolbar-content>
        <div style="height: 2.5rem">
          <MBarChart ref="examBar2" />
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import { useMapStore } from '@/stores/mapStore';
import { mapState } from 'pinia';
import {
  apiGetExaminationOverview,
  apiGetExamSiteStaticList,
} from '@/api/useExaminationMapRequest';
import { useLocalData } from '@/api/useLocalData';

export default {
  data() {
    return {
      overviewRes: {},
      studentsRes: {},
      districtInfos: useLocalData('runningSchoolRes').runningDistrictInfos,
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId', 'examination']),
    examSiteType() {
      return this.examination.examSiteType;
    },
  },
  watch: {
    addressId() {
      if (this.examSiteType !== 0) {
        this.updateData();
      }
    },
    examSiteType() {
      if (this.examSiteType !== 0) {
        this.updateData();
      }
    },
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let loading = this.$loading({
        target:
          this.addressId === ''
            ? '.right-toolbar-container'
            : '.map-right-toolbar',
      });
      Promise.all([
        apiGetExaminationOverview(this.examSiteType, this.addressId),
        apiGetExamSiteStaticList(this.examSiteType),
      ])
        .then(([{ result: overviewRes }, { result: staticListRes }]) => {
          this.overviewRes = overviewRes;
          this.updateExamPie(staticListRes.overviewExaminationSitesVos);
          this.updateExamBar1(staticListRes.overviewExaminationSitesVos);
          this.updateExamBar2(staticListRes.overviewExaminationSitesVos);
        })
        .catch((err) => {
          console.error("🚀 ~ file: ExaminationRightInfo.vue:118 ~ updateData ~ err", err)
        })
        .finally(loading.close);
    },

    updateExamPie(data) {
      let list = data.map((item) => {
        return {
          value: item.testPoints || 0,
          name: this.districtInfos.find(
            (area) => area.addressId === Number(item.addressId)
          ).name,
        };
      });
      let pie = {
        color: [
          '#6CC1FF',
          '#FFBA88',
          '#1E75FE',
          '#6DD5AB',
          '#CB8EED',
          '#42D198',
          '#FF7475',
          '#C3C3C3',
          '#F98CB5',
          '#55007f',
          '#00aa00',
        ],
        title: {
          left: 'center',
        },
        legend: {
          top: '0',
          right: '2%',
          textStyle: {
            fontSize: '.11rem',
            color: '#fff',
            rich: {
              a: {
                width: 40,
                align: 'left',
                fontSize: '.11rem',
                lineHeight: 4,
              },
              b: {
                width: 30,
                align: 'right',
                fontSize: '.11rem',
                lineHeight: 4,
              },
            },
          },
          formatter: (name) => {
            let tabValue;
            list.forEach((item) => {
              if (item.name === name) {
                tabValue = item.value;
              }
            });

            const arr = [`{a|${name}}` + `{b|${tabValue || 0}个}`];
            return arr;
          },
        },
        tooltip: {
          valueFormatter: value => value + '个'
        },
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['30%', '50%'], // 饼图位置参数 x y
            data: list,
            emphasis: {
              itemStyle: {
                shadowOffsetX: 0,
              },
            },
            itemStyle: {
              borderColor: '#fff',
            },
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };
      this.$refs.examPie?.clearOption()?.initChart(pie);
    },
    updateExamBar1(data) {
      let lable = [];
      let values = [];
      data.forEach((item) => {
        let area = this.districtInfos.filter(
          (area) => area.addressId == item.addressId
        );
        if (area.length > 0) {
          lable.push(area[0].name);
          values.push(item.numberExaminationRooms);
        }
      });
      const educationBar = {
        title: {},
        textStyle: {
          color: '#fff',
        },
        legend: {
          x: 'right',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            rich: {
              b: {
                fontSize: '.2rem',
                color: '#fff',
                lineHeight: 20,
              },
              value: {
                fontSize: '.2rem',
                color: '#3e4555',
                lineHeight: 24,
              },
            },
          },
        },
        xAxis: {
          type: 'category',
          data: lable,
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            color: '#000',
            fontSize: '.1rem',
          },
          borderColor: '#ccc',
          borderWidth: 1,
        },
        yAxis: {
          name: '考场数',
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
            show: true, // 网格线
            lineStyle: {
              type: 'dotted',
              color: '#fff',
            },
          },
        },
        dataZoom: [
          {
            zoomLock: true,
            type: 'slider',
            show: true,
            startValue: 0, // 初始显示值
            endValue: 6, // 结束显示值
            height: 5, //组件高度
            left: '5%', //左边的距离
            right: '4%', //右边的距离
            bottom: '0%', //底边的距离
            fillerColor: '#D0D2D9',
            borderRadius: 5,
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
          },
        ],
        series: [
          {
            barWidth: 20,
            color: '#47B2FF',
            type: 'bar',
            data: values,
          },
        ],
        grid: {
          top: '12%',
          right: '5%',
          bottom: '5%',
        },
      };
      this.$refs.examBar1?.clearOption()?.initChart(educationBar);
    },
    updateExamBar2(data) {
      let lable = [];
      let values = [];
      data.forEach((item) => {
        let area = this.districtInfos.filter(
          (area) => area.addressId == item.addressId
        );
        if (area.length > 0) {
          lable.push(area[0].name);
          values.push(item.numberExaminees);
        }
      });
      const educationBar = {
        textStyle: {
          color: '#fff',
        },
        legend: {
          x: 'right',
          // left: 44,
          itemWidth: 10,
          itemHeight: 10,

          textStyle: {
            rich: {
              b: {
                fontSize: '.2rem',
                color: '#000',
                lineHeight: 20,
              },
              value: {
                fontSize: '.2rem',
                color: '#3e4555',
                lineHeight: 24,
              },
            },
          },
        },
        xAxis: {
          type: 'category',
          data: lable,
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            color: '#000',
            fontSize: '.1rem',
          },
          borderColor: '#ccc',
          borderWidth: 1,
        },
        yAxis: {
          name: '学生人数',
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
            show: true, // 网格线
            lineStyle: {
              type: 'dotted',
              color: '#fff',
            },
          },
        },
        dataZoom: [
          {
            zoomLock: true,
            type: 'slider',
            show: true,
            startValue: 0, // 初始显示值
            endValue: 6, // 结束显示值
            height: 5, //组件高度
            left: '5%', //左边的距离
            right: '4%', //右边的距离
            bottom: '0%', //底边的距离
            fillerColor: '#D0D2D9',
            borderRadius: 5,
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
          },
        ],
        series: [
          {
            barWidth: 20,
            color: '#47B2FF',
            type: 'bar',
            data: values,
          },
        ],
        grid: {
          top: '20%',
          right: '5%',
          bottom: '5%',
        },
      };
      this.$refs.examBar2?.clearOption()?.initChart(educationBar);
    },
  },
};
</script>

<style lang="less" scoped>
.right-toolbar-container {
  transition: transform 300ms;
}
.toolbar-block-wrapper {
  display: flex;
  justify-content: space-around;
  & > div {
    margin: 0 0.1rem;
  }
}

.running-charts__container--pie {
  height: 2.4rem;
}
.running-charts__container--bar {
  height: 1.6rem;
  margin: 0 0.1rem;
}
</style>
