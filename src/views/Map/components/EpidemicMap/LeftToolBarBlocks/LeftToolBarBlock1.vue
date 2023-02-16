<template>
  <div class="epidemic-left__block--1">
    <EpidemicToolBarBlock>
      <template #title> 学生每日异常情况统计 </template>
      <template #content>
        <div class="report-bar">
          <MBarChart ref="reportBar" />
        </div>
      </template>
    </EpidemicToolBarBlock>
    <EpidemicToolBarBlock>
      <template #title> 学生健康码情况 </template>
      <template #content>
        <EpidemicHealthCode
          :redNum="abnormalRes?.dailyData?.at(-1)?.redNumber || 0"
          :yellowNum="abnormalRes?.dailyData?.at(-1)?.yellowNumber || 0"
          :redYesterday="abnormalRes?.increment?.redNumber || 0"
          :yellowYesterday="abnormalRes?.increment?.yellowNumber || 0"
        />
      </template>
    </EpidemicToolBarBlock>
    <EpidemicToolBarBlock>
      <template #title> 学生共同居住人健康码情况 </template>
      <template #content>
        <EpidemicHealthCode
          :redNum="parentHealthRes?.dailyData?.at(0)?.redNumber || 0"
          :yellowNum="parentHealthRes?.dailyData?.at(0)?.yellowNumber || 0"
          :redYesterday="parentHealthRes?.increment?.redNumber || 0"
          :yellowYesterday="parentHealthRes?.increment?.yellowNumber || 0"
        />
      </template>
    </EpidemicToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetAbnormalReport,
  apiGetParentHealthCode,
} from '@/api/useEpidemicMapRequest';
import toolBarBlockMixin from './toolBarBlockMixin';

const option = {
  legend: {
    itemGap: 80,
    data: [
      {
        name: '发热人数',
        itemStyle: { opacity: 0, color: '#fff' },
        textStyle: { color: '#fff' },
      },
      {
        name: '未返校人数',
        itemStyle: { opacity: 0 },
        textStyle: { color: '#fff' },
      },
    ],
    textStyle: {
      rich: {
        a: {
          color: '#fff',
        },
        b: {
          color: '#fff',
        },
        c: {
          padding: [5, 0, 0, 0],
          color: '#fff',
        },
      },
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '6%',
    right: '6%',
    bottom: '20%',
    top: '35%',
    containLabel: false,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    splitLine: { show: true },
    axisLabel: {
      color: '#BEC3D2',
    },
    axisLine: {
      show: false,
    },
    // data: [],
  },
  series: [
    {
      symbol: 'circle',
      color: '#F4812E',
      name: '发热人数',
      type: 'line',
      data: [],
    },
    {
      symbol: 'circle',
      name: '未返校人数',
      color: '#027AFF',
      type: 'line',
      data: [],
    },
  ],
  yAxis: {
    type: 'value',
    show: false,
    splitLine: { show: false },
  },
};

export default {
  mixins: [toolBarBlockMixin],
  data() {
    return {
      abnormalRes: {},
      parentHealthRes: {},
    };
  },
  mounted() {
    this.$refs.reportBar.mergeToBaseOption(option);
  },
  methods: {
    updateData() {
      let loading = this.$loading({
        target: this.$el,
      });
      Promise.all([
        apiGetAbnormalReport(this.addressId),
        apiGetParentHealthCode(this.addressId),
      ])
        .then(([{ result: abnormalRes }, { result: parentHealthRes }]) => {
          abnormalRes?.dailyData?.reverse();
          this.abnormalRes = abnormalRes;
          this.parentHealthRes = parentHealthRes;
          this.updateReportBar(abnormalRes);
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: ToolBarBlock1.vue:146 ~ updateData ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    updateReportBar(data) {
      this.$refs.reportBar?.clearOption()?.initChart({
        legend: {
          formatter: (name) => {
            let arr = [
              `${name}`,
              `{${name == '发热人数' ? 'a' : 'b'}|${data?.dailyData?.reduce(
                (per, curr) => {
                  return (
                    per +
                    curr[
                      name === '发热人数' ? 'feverNumber' : 'nonReturnSchoolNum'
                    ]
                  );
                },
                0
              )}}`,
              '\n',
              `{c|${'较昨日 ' + this.selectVsYesterday(name)}}`,
            ];
            return arr.join('');
          },
        },
        xAxis: {
          data: data?.dailyData?.map((i) => {
            const tmp = i.date.split('').splice(4);
            return `${tmp[0] + tmp[1] + '/' + tmp[2] + tmp[3]}`;
          }),
        },
        series: [
          {
            data: data?.dailyData?.map((i) => i.feverNumber),
          },
          {
            data: data?.dailyData?.map((i) => i.nonReturnSchoolNum),
          },
        ],
      });
    },
    selectVsYesterday(name) {
      const value =
        this.abnormalRes?.increment[
          name === '发热人数' ? 'feverNumber' : 'nonReturnSchoolNum'
        ];
      return value > 0 ? `+${value}` : value;
    },
  },
};
</script>

<style lang="less" scoped>
.report-bar {
  height: 1.4rem;
}
</style>
