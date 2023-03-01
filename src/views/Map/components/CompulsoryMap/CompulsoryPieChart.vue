<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import chartMixin from '@/mixins/chartMixin';

export default {
  mixins: [chartMixin],
  data() {
    let seriesOptions = {
      type: 'pie',
      animationType: 'scale',
      animationEasing: 'elasticOut',
      avoidLabelOverlap: false,
      radius: ['48%', '58%'],
      labelLine: {
        length: 25,
        minTurnAngle: 140,
        lineStyle: {
          color: '#FFA311',
          width: 2,
        },
        length1: 0.1,
        length2: 0.1,
      },
      itemStyle: {
        borderColor: '#fff',
      },
      labelLayout: (params) => {
        const isLeft = params.labelRect.x < this.chart.getWidth() / 3;
        const points = params.labelLinePoints || [[], [], []];
        points[2][0] = isLeft
          ? params.labelRect.x
          : params.labelRect.x + params.labelRect.width;
        return {
          labelLinePoints: points,
        };
      },
      label: {
        formatter:
          '{text1|{b}}{num1|{c}}{text1|所}\n{text2|占比}{num2|{d}}{per|%}',
        lineHeight: 30,
        padding: [3, 0, 0, 5],
        bleedMargin: 5,
        rich: {
          text1: {
            fontSize: 12,
            color: '#FFA311',
            fontWeight: 300,
          },
          text2: {
            fontSize: 12,
            color: '#fff',
            fontWeight: 300,
            padding: [0, 0, 0, 10],
          },
          per: {
            fontSize: 12,
            color: '#fff',
            fontWeight: 300,
          },
          num1: {
            fontSize: 16,
            color: '#FFA311',
            fontWeight: 400,
          },
          num2: {
            fontSize: 16,
            color: '#fff',
            fontWeight: 400,
          },
        },
      },
      emphasis: {
        scaleSize: 5,
      },
      data: [
        {
          itemStyle: {
            color: '#ffa311',
          },
          label: {
            show: true,
          },
        },
        {
          itemStyle: {
            color: '#47b2ff',
          },
          label: {
            show: false,
          },
        },
      ],
    };

    let middlePieOptions = {
      name: '中间环形图',
      type: 'pie',
      radius: ['0%', '40%'],
      avoidLabelOverlap: false,
      emphasis: {
        scale: false,
        label: {
          show: true,
          fontSize: '30',
          fontWeight: 'bold',
        },
      },
      itemStyle: {
        color: '#80add255',
        borderColor: '#63b5f4',
      },
      label: {
        show: false,
        position: 'center',
      },
      labelLine: {
        show: false,
      },
      data: [100],
    };
    return {
      // 这个组件的 option 必须写在data中，因为 option 里需要拿到 this.chart
      option: {
        title: [
          {
            text: '',
            left: '17%',
            top: 'center',
            textStyle: {
              color: '#fff',
              lineHeight: 22,
              fontSize: '.14rem',
              rich: {
                a: {
                  fontSize: '.18rem',
                  fontWeight: 'bolder',
                },
              },
            },
            textAlign: 'center',
          },
          {
            text: '',
            left: '81%',
            top: 'center',
            textStyle: {
              color: '#fff',
              lineHeight: 22,
              fontSize: '.14rem',
              rich: {
                a: {
                  fontSize: '.18rem',
                  fontWeight: 'bolder',
                },
              },
            },
            textAlign: 'center',
          },
        ],
        grid: {
          left: '0%',
        },
        tooltip: {
          trigger: 'item',
          // confine: true,
          appendToBody: true,
          backgroundColor: '#013c6c',
          borderWidth: 0,
          textStyle: {
            color: '#fff',
            fontSize: 10,
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            center: ['18%', '50%'],
            ...seriesOptions,
          },
          {
            startAngle: 270,
            center: ['82%', '50%'],
            ...seriesOptions,
          },
          {
            center: ['18%', '50%'],
            ...middlePieOptions,
          },
          {
            center: ['82%', '50%'],
            ...middlePieOptions,
          },
        ],
      },
    };
  },
};
</script>

