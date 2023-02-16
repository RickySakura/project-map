<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import chartMixin from '@/mixins/chartMixin';

const baseOption = {
  title: {
    left: 'center',
    top: 'center',
  },
  grid: {
    left: '0%',
  },
  tooltip: {
    formatter: (e) => {
      return `${e.marker}${e.name.replace('数量', '')}<br>数量：${
        e.data.value
      }<br>占比：${e.percent || 0}%`;
    },
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    textStyle: {
      color: '#3B414F',
      fontSize: 10,
    },
    borderColor: '#ccc',
    borderWidth: 1,
  },
  graphic: [
    // 为环形图中间添加文字
    {
      type: 'text',
      left: '20%',
      top: '50%',
      style: {
        textAlign: 'center',
        fill: '#3B414F',
        fontSize: 11,
      },
    },
  ],
  // color: ['#5DAAFF', '#F4812E'],
  legend: {
    // 图例
    orient: 'vertical',
    right: '0',
    top: '22',
    itemWidth: 10, // 设置图例图形的宽
    itemHeight: 10,
    textStyle: {
      fontSize: '.11rem',
      color: '#fff',
    },
  },
  series: [
    {
      type: 'pie',
      radius: ['50%', '60%'],
      center: ['38%', '60%'],
      avoidLabelOverlap: false,
      data: [
        {
          name: '公办',
          value: 324,
        },
        {
          name: '民办',
          value: 369,
        },
      ],
      label: {
        show: true,
        bleedMargin: 5,
      },
      labelLine: {
        //折线长度
        length1: 0.1,
        length2: 0.1,
      },
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
