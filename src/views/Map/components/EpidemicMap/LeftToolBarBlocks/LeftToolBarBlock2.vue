<template>
  <div class="epidemic-left__block--2">
    <EpidemicToolBarBlock>
      <template #title> 学生核酸检测结果 </template>
      <template #content>
        <div class="custom-tooltip">
          <div>
            <img src="@/assets/img/epidemicMap/checked-icon.png" alt="safe" />
            <span style="color: #fff">已检测人数</span>
            <span class="checked">{{ nucleicAcidRes.nucAcidNum || 0 }}</span>
          </div>

          <div>
            <img
              src="@/assets/img/epidemicMap/positive-icon.png"
              alt="danger"
            />
            <span style="color: #fff">阳性人数</span>
            <span class="positive">{{ nucleicAcidRes.positiveNum || 0 }}</span>
          </div>
        </div>
        <div class="nucleic-acid-bar">
          <MBarChart ref="acidBar" />
        </div>
      </template>
    </EpidemicToolBarBlock>
    <EpidemicToolBarBlock>
      <template #title> 学生接种新冠疫苗情况 </template>
      <template #content>
        <EpidemicProgressGroup
          :one="injectionRes?.vaccineInjectionOneTimeNum || 0"
          :two="injectionRes?.vaccineInjectionTwoTimeNum || 0"
          :three="injectionRes?.vaccineInjectionThreeTimeNum || 0"
          :no="injectionRes?.nonVaccineInjectionNum || 0"
        />
      </template>
    </EpidemicToolBarBlock>
    <EpidemicToolBarBlock>
      <template #title> 学生跨区流动统计 </template>
      <template #title-extra>
        <el-row type="flex" class="legend">
          <el-row type="flex" align="middle">
            <i class="yellow-square"></i>
            <span>流动占比</span>
          </el-row>
          <el-row type="flex" align="middle">
            <i class="green-line"></i>
            <span style="margin-right: 0.1rem">市平均值</span>
          </el-row>
        </el-row>
      </template>
      <template #content>
        <div class="student-cross-bar">
          <MBarChart ref="studentCrossBar" />
        </div>
      </template>
    </EpidemicToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetStudentNucleicAcid,
  apiGetStudentInjection,
  apiGetCityStudentCross,
  apiGetDistrictStudentCorss,
} from '@/api/useEpidemicMapRequest';
import toolBarBlockMixin from './toolBarBlockMixin';

const option = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: false,
  },
  toolbox: {
    show: true,
  },
  grid: {
    top: '18%',
    bottom: '30%',
    right: '5%',
    containlabel: true,
  },
  calculable: true,

  xAxis: [
    {
      type: 'category',
      data: [],
      axisLabel: {
        hideOverlap: true,
        margin: 10,
        width: 100,
        color: '#FFFFFF',
        interval: 0, //底下文字出现间隔
      },
      axisLine: {
        lineStyle: {
          width: 1,
          color: '#DDDDDD',
        },
      },
      axisTick: {
        show: false, // 刻度线不显示
      },
    },
  ],
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
      bottom: '10%', //底边的距离
      fillerColor: '#D0D2D9',
      borderRadius: 5,
      showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
    },
  ],
  yAxis: [
    {
      axisLabel: {
        fontSize: 10,
        color: '#BEC3D2',
        hideOverlap: true,
        formatter: '{value}%',
      },
      type: 'value',
    },
  ],
  series: [
    {
      barWidth: 10,

      label: {
        formatter: '{c}' + '%',
        show: true,
        position: 'top',
        textStyle: {
          color: '#FFFFFF',
        },
      },
      color: '#FFB884',
      name: '流动占比',
      type: 'bar',
      data: [],
      markLine: {
        label: {
          show: false,
        },
        symbol: ['none', 'none'],
        lineStyle: {
          type: 'solid',
          color: '#4FD29E',
        },
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
  ],
};

export default {
  mixins: [toolBarBlockMixin],
  data() {
    return {
      nucleicAcidRes: {},
      injectionRes: {},
    };
  },
  mounted() {
    this.$refs.studentCrossBar?.mergeToBaseOption(option);
  },
  methods: {
    decideStudentCrossApi() {
      // 由于历史原因，关于学生跨区流动统计信息，全市和各区分为了两个不同的接口，所以需要多做一步判断
      if (this.addressId === '') {
        // 全市接口
        return apiGetCityStudentCross();
      } else {
        // 各区接口
        return apiGetDistrictStudentCorss(this.addressId);
      }
    },
    updateData() {
      let loading = this.$loading({
        target: this.$el,
      });
      Promise.all([
        apiGetStudentNucleicAcid(this.addressId),
        apiGetStudentInjection(this.addressId),
        this.decideStudentCrossApi(),
      ])
        .then(
          ([
            { result: nucleicAcidRes },
            { result: injectionRes },
            { result: studentCrossRes },
          ]) => {
            this.nucleicAcidRes = nucleicAcidRes;
            this.injectionRes = injectionRes;
            this.updateAcidBar(nucleicAcidRes);
            this.updatStudentCrossBar(studentCrossRes);
          }
        )
        .catch((err) => {})
        .finally(loading.close);
    },
    updateAcidBar(data) {
      let chartData = [
        data.nagative24Num,
        data.nagative48Num,
        data.nagative72Num,
        data.nagative128Num,
        data.nagativeThan128Num,
      ];
      this.$refs.acidBar?.clearOption()?.initChart({
        xAxis: {
          data: [
            '24小时阴性',
            '48小时阴性',
            '72小时阴性',
            '7天阴性',
            '7天以上阴性',
          ],
        },
        yAxis: {
          axisLabel: {
            formatter(v) {
              let num = Number(v);
              if (num == 0) {
                return num;
              } else if (num > 1 && num < 10000) {
                return num;
              } else {
                return (num / 10000).toFixed() + 'w';
              }
            },
          },
        },
        series: [
          {
            barWidth: 10,
            color: '#5DAAFF',
            data: chartData,
          },
        ],
        grid: {
          right: '8%',
        },
      });
    },
    updatStudentCrossBar(data) {
      if (this.addressId === '') {
        this.$refs.studentCrossBar?.clearOption()?.initChart({
          xAxis: [
            {
              data: data.name,
            },
          ],
          series: [
            {
              label: {
                fontSize: 10,
              },
              data: data.proportion,
            },
          ],
        });
      } else {
        data = data?.filter((i) => {
          return !i.regionName?.includes('广州');
        });
        this.$refs.studentCrossBar?.clearOption()?.initChart({
          xAxis: [
            {
              data: data
                ?.map((i) => i.regionName)
                ?.filter((i) => {
                  return !i.includes('广州');
                }),
            },
          ],
          series: [
            {
              label: {
                fontSize: 10,
              },
              data: data?.map((i) => i.proportion),
            },
          ],
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.custom-tooltip {
  display: flex;
  padding: 0 0.1rem;
  align-items: center;

  & > div {
    flex: 1;
    display: flex;
    align-items: center;
    color: #3b3e45;

    img {
      width: 0.1rem;
      object-fit: contain;
      margin-right: 0.05rem;
    }

    .checked {
      margin-left: 0.05rem;
      font-weight: bold;
      color: #fff;
    }

    .positive {
      margin-left: 0.05rem;
      font-weight: bold;
      color: #f12f2e;
    }
  }

  & > div:nth-child(1) {
    padding-left: 0.08rem;
  }

  & > div:nth-child(2) {
    padding-left: 0.2rem;
  }
}

.nucleic-acid-bar,
.student-cross-bar {
  height: 1.4rem;
}

.yellow-square {
  margin: 0 0.05rem;
  width: 0.1rem;
  height: 0.1rem;
  background-color: #ffb884;
}

.green-line {
  margin: 0 0.05rem;
  width: 0.1rem;
  height: 0.01rem;
  background-color: #4fd29e;
}
</style>
