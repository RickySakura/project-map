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
      <template #toolbar-title> 各考点考场统计情况</template>
      <template #toolbar-content>
        <div style="height: 3.35rem">
          <MBarChart ref="examBar1" />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 各考点考生统计情况</template>
      <template #toolbar-content>
        <div style="height: 3.35rem">
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
      this.updateData();
    },
    examSiteType() {
      this.updateData();
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
        apiGetExamSiteStaticList(this.examSiteType, this.addressId),
      ])
        .then(([{ result: overviewRes }, { result: staticListRes }]) => {
          this.overviewRes = overviewRes;
          this.updateExamBar1(staticListRes.examSiteInfoVo);
          this.updateExamBar2(staticListRes.examSiteInfoVo);
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: ExaminationRightInfoDetail.vue:105 ~ updateData ~ err',
            err
          );
        })
        .finally(loading.close);
    },

    updateExamBar1(data) {
      let lable = data.map((item) => item.name);
      let values = data.map((item) => item.numberExaminationRooms);
      let educationBar = {};

      if (lable.length > 0 && values.length > 0) {
        educationBar = {
          title: {
            text: '',
          },
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
            show: true,
            data: lable,
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
            axisPointer: {
              type: 'line',
            },
          },
          yAxis: {
            name: '考场数',
            show: true,
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
        };
      } else {
        educationBar = {
          title: {
            text: '暂无数据',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 18,
              fontWeight: 'normal',
              color: '#fff',
            },
          },
          xAxis: {
            show: false,
          },
          yAxis: {
            show: false,
          },
          tooltip: {
            axisPointer: {
              type: 'none',
            },
          },
          series: [
            {
              data: values,
            },
          ],
          dataZoom: [
            {
              show: false,
            },
          ],
        };
      }
      this.$refs.examBar1?.clearOption()?.initChart(educationBar);
    },
    updateExamBar2(data) {
      let lable = data.map((item) => item.name);
      let values = data.map((item) => item.numberExaminees);
      let educationBar = null;
      if (lable.length > 0 && values.length > 0) {
        educationBar = {
          title: {
            // subtext: '考场数'
            text: '',
          },
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
                  fontSize: 20,
                  color: '#000',
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
            show: true,
            data: lable,
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
          },
          yAxis: {
            name: '学生人数',
            show: true,
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
      } else {
        educationBar = {
          title: {
            text: '暂无数据',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 18,
              fontWeight: 'normal',
              color: '#fff',
            },
          },
          xAxis: {
            show: false,
          },
          yAxis: {
            show: false,
          },
          tooltip: {
            axisPointer: {
              type: 'none',
            },
          },
          series: [
            {
              data: values,
            },
          ],
          dataZoom: [
            {
              show: false,
            },
          ],
        };
      }
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
