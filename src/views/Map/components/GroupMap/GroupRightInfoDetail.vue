<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 教育集团概况 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="学生总人数"
            icon-url="icons/public-stu.png"
            unit="(人)"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="overviewRes.studentTotal || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="教师总人数"
            icon-url="icons/public-stu.png"
            unit="(人)"
            :unit-number="overviewRes.teacherTotal || 0"
            :unit-style="{ color: '#8D92F8' }"
          >
          </MInfoBox>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 学校统计概况 </template>
      <template #toolbar-content>
        <div class="group-charts-container group-schools">
          <MBarChart ref="groupSchoolsBar" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 学生统计概况 </template>
      <template #toolbar-content>
        <div class="group-charts-container">
          <MBarChart ref="groupStudentsBar" />
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetOverviewOfTheGroupsSchools,
  apiGetStatisticsOfStudentsUnderTheGroup,
  apiGetStatisticsOfSchoolsUnderTheGroup,
} from '@/api/useGroupMapRequest';
import { useMapStore } from '@/stores/mapStore';
import { mapState } from 'pinia';
import { schoolTypeEnum } from '@/utils/useEnums';

export default {
  data() {
    return {
      overviewRes: {},
      schoolsRes: {},
      studentsRes: {},
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId', 'group']),
    officeId() {
      return this.group.officeId;
    },
  },
  watch: {
    officeId() {
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let loading = this.$loading({
        target: '.group-map-right-main',
      });
      Promise.all([
        apiGetOverviewOfTheGroupsSchools(this.officeId, this.addressId),
        apiGetStatisticsOfSchoolsUnderTheGroup(this.officeId, this.addressId),
        apiGetStatisticsOfStudentsUnderTheGroup(this.officeId, this.addressId),
      ])
        .then(
          ([
            { result: overviewRes },
            { result: schoolsRes },
            { result: studentsRes },
          ]) => {
            this.overviewRes = overviewRes;
            this.updateGroupSchoolsBar(schoolsRes);
            this.updateGroupStudentsBar(studentsRes);
          }
        )
        .catch((err) => {
          console.error(
            '❌ ~ file: GroupRightInfoDetail.vue:105 ~ updateData ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    updateGroupSchoolsBar(data) {
      let label = [],
        studentTotal = [],
        teacherTotal = [];
      data.forEach((item) => {
        label.push(item.schoolName || 0);
        studentTotal.push(item.studentTotal || 0);
        teacherTotal.push(item.teacherTotal || 0);
      });

      // 学校统计情况图
      let option = {
        textStyle: {
          color: '#fff',
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: true, // 刻度线不显示
          },
          axisLabel: {
            formatter: function (value, index) {
              return (value / 10000).toFixed(2);
            },
            interval: 0,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            color: '#000',
            fontSize: 10,
          },
          borderColor: '#ccc',
          borderWidth: 1,
          valueFormatter: (value) => `${(value / 10000).toFixed(2)}万人`,
        },
        yAxis: {
          type: 'category',
          name: '人数(万人)',
          data: label || [],
          axisLabel: {
            overflow: 'breakAll',
            interval: 0,
            width: 90,
          },
        },
        series: [
          {
            name: '学生人数',
            barWidth: 20,
            color: '#47b2ff',
            type: 'bar',
            data: studentTotal,
          },
          {
            name: '教师人数',
            barWidth: 20,
            color: '#50d39f',
            type: 'bar',
            data: teacherTotal,
          },
        ],
        grid: {
          top: '10%',
          right: '10%',
          left: '3%',
          bottom: '0%',
        },
      };
      this.$refs.groupSchoolsBar?.clearOption()?.initChart(option);
    },
    updateGroupStudentsBar(data) {
      if (!Array.isArray(data.studentsCoveredByTheGroupData)) return;
      let label = ['合计'],
        studentNumber = [],
        teacherNumber = [];

      data.studentsCoveredByTheGroupData.forEach((v, i) => {
        if (i == 0) {
          studentNumber.push(data.totalStudents);
          teacherNumber.push(data.totalTeachers);
        } else {
          let typeName = schoolTypeEnum.find(
            (item) => item.schoolType === Number(v.runningType)
          ).label;
          label.push(typeName);
          studentNumber.push(v.studentNumber);
          teacherNumber.push(v.teacherNumber);
        }
      });

      // 学生统计情况图
      let option = {
        textStyle: {
          color: '#fff',
        },
        xAxis: {
          type: 'category',
          data: label || [],
          axisTick: {
            show: false, // 刻度线不显示
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          textStyle: {
            color: '#000',
            fontSize: 10,
          },
          borderColor: '#ccc',
          borderWidth: 1,
          valueFormatter: (value) => +value + '人',
        },
        yAxis: {
          name: '人数(人)',
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
            name: '学生人数',
            barWidth: 15,
            color: '#47b2ff',
            type: 'bar',
            data: studentNumber,
          },
          {
            name: '教师人数',
            barWidth: 15,
            color: '#50d39f',
            type: 'bar',
            data: teacherNumber,
          },
        ],
        grid: {
          top: '20%',
          right: '8%',
          bottom: '18%',
        },
      };
      this.$refs.groupStudentsBar?.clearOption()?.initChart(option);
    },
  },
};
</script>

<style lang="less" scoped>
// .right-toolbar-container {
// }
.toolbar-block-wrapper {
  display: flex;
  width: 2.8rem;
  margin: 0 auto;
  justify-content: space-between;
  & > div {
    margin: 0 0.1rem;
  }
}
.group-charts-container {
  display: flex;
  width: 100%;
  height: 3.6rem;
}
.group-schools {
  height: 5rem;
}
</style>
