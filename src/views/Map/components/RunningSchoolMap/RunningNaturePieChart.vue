<template>
  <div class="running-charts__pie--natrue">
    <MPieChart ref="pieChart" />
  </div>
</template>

<script>
import { apiGetNatureOfRunningSchool } from '@/api/useRunningSchoolRequest';
import { useMapStore } from '@/stores/mapStore';
const naturePieOption = {
  title: {
    text: '',
    textStyle: {
      fontSize: '.12rem',
      fontWeight: 'bolder',
      color: '#fff',
    },
    top: '0',
    left: '40%',
  },
  legend: {
    left: '40%',
    top: '20%', 
    textStyle: {
      rich: {
        a: {
          fontSize: '.11rem',
          color: '#1F93FF', //蓝色
        },
        b: {
          fontSize: '.11rem',
          color: '#fff', //灰色
        },
        c: {
          fontSize: '.11rem',
          color: '#fff', //黑色
        },
      },
    },
    itemWidth: 14,
  },
  series: [
    {
      color: ['#5DAAFF', '#FFB884'],
      type: 'pie',
      radius: ['55%', '45%'],
      center: ['20%', '50%'],
      grid: {},
      data: [],
      label: {
        show: true,
        rich: {
          a: {
            color: '#fff',
            fontSize: '.11rem',
          },
          b: {
            color: '#fff',
            fontSize: '.11rem',
          },
          c: {
            color: '#fff',
            fontSize: '.11rem',
          },
        },
      },
    },
    {
      color: ['#75C5FF'],
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '35%'],
      center: ['20%', '50%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: true,
          position: 'center',
          color: '#fff',
          formatter: '{total|0}\n{active|所}',
          rich: {
            total: {
              fontWeight: 'bolder',
              lineHeight: 15,
              fontSize: '.12rem',
              fontFamily: 'Source Han Sans CN, Source Han Sans CN-Bold',
              color: '#fff',
            },
            active: {
              fontFamily: 'Source Han Sans CN, Source Han Sans CN-Regular',
              fontSize: '.09rem',
              color: '#fff',
            },
          },
        },
      },
      labelLine: {
        show: false,
        length: 50,
        length2: 60,
      },
      data: [{ value: 0, name: '', itemStyle: {} }],
    },
  ],
};
export default {
  props: {
    title: String,
    schoolType: {
      type: [Number, String],
      require: true,
      default: '',
    },
  },
  computed: {
    addressId() {
      return useMapStore().addressId;
    },
  },
  watch: {
    addressId() {
      this.updatePieData();
    },
  },
  mounted() {
    this.$refs.pieChart.setBaseOption(naturePieOption);
    this.updatePieData();
  },
  methods: {
    updatePieData() {
      apiGetNatureOfRunningSchool(this.addressId, this.schoolType)
        .then(({ result }) => {
          let options = {
            title: {
              text: this.title,
            },
            series: [
              {
                label: {
                  formatter: (e) => {
                    return (
                      `{${e.name === '公办' ? 'a' : 'b'}|${e.name}}` +
                      '\n' +
                      `{c|${e.percent ? e.percent.toFixed() : '0'}%}` // bug修改
                    );
                  },
                },
                data: [
                  { name: '公办', value: result.publicSchoolTotal || 0, itemStyle: {color: '#5DAAFF'} },
                  { name: '民办', value: result.privateSchoolTotal || 0, itemStyle: {color: '#F4812E'} },
                ],
              },
              {
                label: {
                  normal: {
                    formatter:
                      `${'{total|'}` +
                      `${
                        (result.publicSchoolTotal || 0) +
                        (result.privateSchoolTotal || 0)
                      }` +
                      '}' +
                      `${'\n{active|所}'}`,
                  },
                },
                data: [
                  {
                    name: '',
                    value:
                      (result.publicSchoolTotal || 0) +
                      (result.privateSchoolTotal || 0),
                    itemStyle: {},
                  },
                ],
              },
            ],
            legend: {
              formatter: (e) => {
                return e === '公办'
                  ? `{b|${e}:}{a|${
                      result.publicSchoolTotal || 0
                    }}{b|所 教职工：}{c|${
                      result.publicSchoolTeaTotal
                    }}{b|人 学生：}{c|${result.publicSchoolStuTotal}}{b| 人}`
                  : `{b|${e}:}{a|${
                      result.privateSchoolTotal || 0
                    }}{b|所 教职工：}{c|${
                      result.privateSchoolTeaTotal
                    }}{b|人 学生：}{c|${result.privateSchoolStuTotal}}{b| 人}`;
              },
            },
          };
          this.$refs.pieChart?.clearOption()?.initChart(options);
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: RunningNaturePieChart.vue:200 ~ updatePieData ~ err',
            err
          );
        });
    },
  },
};
</script>

<style lang="less" scoped>
.running-charts__pie--natrue {
  height: 1.1rem;
  width: 4.7rem;
}
</style>
