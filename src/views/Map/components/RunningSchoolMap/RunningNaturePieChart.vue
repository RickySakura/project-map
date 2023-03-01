<template>
  <div class="running-charts__pie--natrue">
    <MPieChart ref="pieChart" />
  </div>
</template>

<script>
import { apiGetNatureOfRunningSchool } from '@/api/useRunningSchoolRequest';
import { useMapStore } from '@/stores/mapStore';

let legendMixin = {
  orient: 'vertical',
  textStyle: {
    rich: {
      a: {
        fontSize: '.11rem',
        color: '#fff', //白色
      },
      b: {
        fontSize: '.11rem',
        color: '#1F93FF', //蓝色
      },
      c: {
        fontSize: '.11rem',
        color: '#f4812e', //橘色
      },
    },
  },
  itemHeight: 10,
  itemWidth: 10,
};
let seriesPieMixin = {
  type: 'pie',
  radius: ['45%', '35%'],
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
  labelLine: {
    length: 12,
    minTurnAngle: 270,
    length1: 1,
    length2: 5,
  },
};
const naturePieOption = {
  title: {
    text: '',
    textStyle: {
      fontSize: '.12rem',
      fontWeight: 'bolder',
      color: '#fff',
    },
    top: '0',
    left: '0',
  },
  legend: [
    {
      left: '7%',
      bottom: '0',
      ...legendMixin,
    },
    // {
    //   left: '0%',
    //   top: '20%',
    //   ...legendMixin,
    // },
  ],
  series: [
    {
      center: ['20%', '38%'],
      ...seriesPieMixin,
    },
    {
      center: ['50%', '38%'],
      ...seriesPieMixin,
    },
    {
      center: ['80%', '38%'],
      ...seriesPieMixin,
    },

    {
      type: 'pie',
      radius: ['30%', '25%'],
      center: ['20%', '38%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'center',
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
      data: [{ value: 100 }],
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
      apiGetNatureOfRunningSchool(this.addressId, this.schoolType).then(
        ({ result }) => {
          this.updatePieChart(result);
        }
      );
    },
    updatePieChart(data) {
      let labelFormatter = (item) => {
        return (
          `{${item.name === '公办' ? 'a' : 'b'}|${item.name}}` +
          '\n' +
          `{c|${item.percent ? item.percent.toFixed() : '0'}%}` // bug修改
        );
      };
      let options = {
        title: {
          text: this.title,
        },
        series: [
          {
            label: {
              formatter: labelFormatter,
            },
            data: [
              {
                name: '公办',
                value: data.publicSchoolTotal || 0,
                itemStyle: { color: '#5DAAFF' },
              },
              {
                name: '民办',
                value: data.privateSchoolTotal || 0,
                itemStyle: { color: '#F4812E' },
              },
            ],
          },
          {
            label: {
              formatter:
                `${'{total|'}` +
                `${
                  (data.publicSchoolTotal || 0) + (data.privateSchoolTotal || 0)
                }` +
                '}' +
                `${'\n{active|所}'}`,
            },
            data: [
              {
                value:
                  (data.publicSchoolTotal || 0) +
                  (data.privateSchoolTotal || 0),
                itemStyle: {},
              },
            ],
          },
        ],
        legend: [
          {
            formatter: (type) => {
              let [total, color] =
                type === '公办'
                  ? [data.publicSchoolTotal, 'b']
                  : [data.privateSchoolTotal, 'c'];
              return `{a|${type}${this.title}: }{${color}|${total || 0}}{a|所}`;
            },
          },
          // {
          //   formatter: (e) => {
          //     return e === '公办'
          //       ? `{a|${e}:}{b|${
          //           data.publicSchoolTotal || 0
          //         }}{a|所 教职工：}{b|${
          //           data.publicSchoolTeaTotal
          //         }}{a|人 学生：}{b|${data.publicSchoolStuTotal}}{a| 人}`
          //       : `{a|${e}:}{c|${
          //           data.privateSchoolTotal || 0
          //         }}{a|所 教职工：}{c|${
          //           data.privateSchoolTeaTotal
          //         }}{a|人 学生：}{c|${data.privateSchoolStuTotal}}{a| 人}`;
          //   },
          // },
        ],
      };
      this.$refs.pieChart?.clearOption()?.initChart(options);
    },
  },
};
</script>

<style lang="less" scoped>
.running-charts__pie--natrue {
  height: 100%;
  width: 100%;
}
</style>
