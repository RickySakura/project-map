<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 教育概况 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="各级各类学校总数"
            icon-url="icons/house.png"
            unit="个"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="overviewRes.schoolNumber || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="教职工总数"
            icon-url="icons/school-staff.png"
            unit="人"
            :unit-number="overviewRes.teacherNumber || 0"
            :unit-style="{ color: '#8D92F8' }"
          >
          </MInfoBox>
          <MInfoBox
            title="在校学生数"
            icon-url="icons/school-stu.png"
            unit="人"
            :unit-number="overviewRes.studentNumber || 0"
            :unit-style="{ color: '#70EA6C' }"
          >
          </MInfoBox>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各学段教育体量 </template>
      <template #toolbar-content>
        <div class="running-charts__container--pie">
          <MPieChart ref="educationPie" />
        </div>
        <div class="running-charts__container--bar">
          <MBarChart ref="educationBar" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 办学性质 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="公办学校总数"
            icon-url="icons/house.png"
            unit="个"
            :unit-style="{ color: '#FFA311', fontSize: '.16rem' }"
            :unit-number="natureOverviewRes.publicSchoolTotal || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="公办教师总数"
            icon-url="icons/school-staff.png"
            unit="人"
            :unit-number="natureOverviewRes.publicSchoolTeaTotal || 0"
            :unit-style="{ color: '#8D92F8', fontSize: '.16rem' }"
          >
          </MInfoBox>
          <MInfoBox
            title="公办学生总数"
            icon-url="icons/school-stu.png"
            unit="人"
            :unit-number="natureOverviewRes.publicSchoolStuTotal || 0"
            :unit-style="{ color: '#70EA6C', fontSize: '.16rem' }"
          >
          </MInfoBox>
        </div>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="民办学校总数"
            icon-url="icons/house.png"
            unit="个"
            :unit-style="{ color: '#FFA311', fontSize: '.16rem' }"
            :unit-number="natureOverviewRes.privateSchoolTotal || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="民办教师总数"
            icon-url="icons/school-staff.png"
            unit="人"
            :unit-number="natureOverviewRes.privateSchoolTeaTotal || 0"
            :unit-style="{ color: '#8D92F8', fontSize: '.16rem' }"
          >
          </MInfoBox>
          <MInfoBox
            title="民办学生总数"
            icon-url="icons/school-stu.png"
            unit="人"
            :unit-number="natureOverviewRes.privateSchoolStuTotal || 0"
            :unit-style="{ color: '#70EA6C', fontSize: '.16rem' }"
          >
          </MInfoBox>
        </div>
        <RunningNaturePieChart
          v-for="item in naturePiesArray"
          :key="item.schoolType"
          :title="item.title"
          :school-type="item.schoolType"
        />
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetRunningSchoolOverview,
  apiGetEachLevelEducationVolume,
  apiGetNatureOfRunningSchool,
} from '@/api/useRunningSchoolRequest';
import { useMapStore } from '@/stores/mapStore';
import { mapState } from 'pinia';
export default {
  data() {
    return {
      overviewRes: {},
      studentsRes: {},
      natureOverviewRes: {},
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
        apiGetRunningSchoolOverview(this.addressId),
        apiGetEachLevelEducationVolume(this.addressId),
        apiGetNatureOfRunningSchool(this.addressId),
      ])
        .then(
          ([
            { result: overviewRes },
            { result: volumeRes },
            { result: natureOverviewRes },
          ]) => {
            this.overviewRes = overviewRes;
            this.natureOverviewRes = natureOverviewRes;
            this.updateRunningPie(volumeRes);
            this.updateRunningBar(volumeRes);
          }
        )
        .catch((err) => {
          console.error("🚀 ~ file: RunningSchoolRightToolBar.vue:193 ~ updateData ~ err", err)
        })
        .finally(loading.close);
    },
    updateRunningPie(data) {
      let educationPieList = [];
      for (let i = 0; i < data.length; i++) {
        educationPieList = educationPieList?.concat({
          value: data[i].schoolNumber,
          name: data[i].schoolTypeName,
        });
      }
      const educationPieOption = {
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
          '#F98CB5',
        ],
        title: {
          left: 'center',
        },
        legend: {
          // 图例
          right: '10%',
          top: '5%',
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            color: '#000',
            fontSize: 10,
          },
          borderColor: '#ccc',
          borderWidth: 1,
        },
        graphic: [
          // 为环形图中间添加文字
          {
            type: 'text',
            style: {
              text: '',
              textAlign: 'center',
            },
          },
          {
            type: 'text',
            style: {
              text: '',
              textAlign: 'center',
            },
          },
        ],
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['30%', '50%'],
            data: educationPieList,
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
      this.$refs.educationPie?.clearOption()?.initChart(educationPieOption);
    },
    updateRunningBar(data) {
      let schoolData = data?.map((item) => {
        return [item.schoolTypeName, item.teacherNumber, item.studentNumber];
      });
      const educationBarOption = {
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
                fontSize: 20,
                color: '#fff',
                lineHeight: 20,
              },
              value: {
                fontSize: 20,
                color: '#3e4555',
                lineHeight: 24,
              },
            },
          },
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
            margin: 10,
            align: 'left',
            width: 38,
            overflow: 'breakAll',
            interval: '0', //底下文字出现间隔
          },
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            // color: "#fff",
            fontSize: 10,
          },
          borderColor: '#ccc',
          borderWidth: 1,
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
          dimensions: ['date', '教职工数', '学生'],
          source: schoolData,
        },
        dataZoom: [
          {
            zoomLock: true,
            type: 'slider',
            show: true,
            startValue: 0,
            endValue: 6,
            height: 5,
            left: '5%',
            right: '4%',
            bottom: '0%',
            fillerColor: '#D0D2D9',
            borderRadius: 5,
            showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
          },
        ],
        series: [
          {
            barWidth: 5,
            color: '#47B2FF',
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
      this.$refs.educationBar?.clearOption()?.initChart(educationBarOption);
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
    min-width: 1.3rem;
  }
}

.running-charts__container--pie {
  height: 2.4rem;
  // width: 4.7rem;
}
.running-charts__container--bar {
  height: 1.6rem;
  // width: 4.7rem;
  margin: 0 0.1rem;
}
</style>
