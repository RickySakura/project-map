<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import chartMixin from '@/mixins/chartMixin';

export default {
  mixins: [chartMixin],
  data() {
    return {
      // 这个组件的 option 必须写在data中，应为 option 里需要拿到 this.chart
      option: {
        name: 'groupPie',
        title: {
          text: '',
          left: '32%',
          top: 'center',
          textStyle: {
            color: '#fff',
            lineHeight: 33,
          },
          textAlign: 'center',
          subtext: '',
          subtextStyle: {
            color: '#fff',
            fontSize: '.16rem',
          },
        },
        grid: {
          left: '0%',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
          textStyle: {
            color: '#3B414F',
            fontSize: 10,
          },
          borderColor: '#ccc',
          borderWidth: 1,
          // confine: true,
          appendToBody: true,
        },
        legend: {
          show: false,
        },
        series: [
          {
            type: 'pie',
            animationType: 'scale',
            animationEasing: 'elasticOut',
            avoidLabelOverlap: false,
            radius: ['45%', '55%'],
            center: ['35%', '50%'],
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
              scaleSize: 6,
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
          },
        ],
      },
    };
  },
};
</script>
