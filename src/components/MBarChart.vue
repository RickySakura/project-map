<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import chartMixin from '@/mixins/chartMixin';

const baseOption = {
  tooltip: {
    trigger: 'axis',
    textStyle: {
      color: '#fff',
      fontSize: 16,
    },
    borderWidth: 0,
    className: 'echarts-tooltip-dark',
    appendToBody: true,
  },
  legend: {
    // 图例
    textStyle: {
      //图例⽂字的样式
      color: '#fff',
    },
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      color: '#fff',
      hideOverlap: true,
      width: 40, //底下文字宽度
      overflow: 'breakAll', //底下文字超出宽度换行
      interval: 0, //底下文字出现间隔
    },
    axisLine: {
      lineStyle: {
        width: 1,
        color: '#fff',
      },
    },
    axisTick: {
      show: false, // 刻度线不显示
    },
  },
  grid: {
    left: '5%',
    right: '2%',
    bottom: '10%',
    top: '10%',
    containLabel: true,
  },
  yAxis: {
    axisLabel: {
      hideOverlap: true,
      color: '#fff',
    },
    type: 'value',
    splitNumber: 3,
  },
  series: [
    {
      type: 'bar',
    },
  ],
};

export default {
  mixins: [chartMixin],
  mounted() {
    this.setBaseOption(baseOption);
  },
};
</script>
