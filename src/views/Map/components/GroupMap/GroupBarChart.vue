<template>
  <div style="width: 100%; height: 100%"></div>
</template>

<script>
import chartMixin from '@/mixins/chartMixin';

const baseOption = {
  tooltip: {
    trigger: 'axis',
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
      interval: '0', //底下文字出现间隔
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
    bottom: '0',
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

const groupBarOption = {
  color: ['#47B2FF', '#F4812E'],
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '10%',
    right: '8%',
    left: '8%',
    bottom: '15%',
  },
  legend: [
    {
      orient: 'horizontal',
      left: '25%',
      bottom: '7.5%',
      itemWidth: 10, // 设置图例图形的宽
      itemHeight: 2,
      textStyle: {
        //图例⽂字的样式
        fontSize: 11,
        color: '#fff',
      },
      data: [
        {
          name: '学生人数',
          icon: 'rect', //  这个字段控制形状  类型包括 circle 圆形，triangle 三角形，diamond 四边形，arrow 变异三角形，none 无
        },
      ],
    },
    {
      orient: 'horizontal',
      right: '25%',
      bottom: '7.5%',
      itemWidth: 10, // 设置图例图形的宽
      itemHeight: 10,
      textStyle: {
        //图例⽂字的样式
        fontSize: 11,
        color: '#fff',
      },
      data: [
        {
          name: '占全市比例',
          icon: 'rect', //  这个字段控制形状  类型包括 circle 圆形，triangle 三角形，diamond 四边形，arrow 变异三角形，none 无
        },
      ],
    },
  ],
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLabel: {
        // interval: 0, // 强制显示全部x轴
        color: '#fff', //更改坐标轴文字颜色
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '学生人数：万人',
      nameTextStyle: {
        color: '#fff',
      },
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: ['#F4812E', '#5470C6'],
        },
      },
      axisLabel: {
        formatter: '{value}',
        color: '#fff', //更改坐标轴文字颜色
      },
      splitNumber: 3,
    },
    {
      type: 'value',
      name: '占全市比例（%）',
      nameTextStyle: {
        color: '#fff',
      },
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: ['#F4812E', '#5470C6'],
        },
      },
      axisLabel: {
        formatter: '{value}',
        color: '#fff', //更改坐标轴文字颜色
      },
      splitNumber: 3,
    },
  ],
  dataZoom: [
    {
      type: 'slider',
      show: true,
      start: 0,
      end: 80,
      handleSize: 1,
      height: 1, //组件高度
      width: '73%',
      left: '14%', //左边的距离
      right: '4%', //右边的距离
      bottom: '21%',
      fillerColor: '#D0D2D9',
      backgroundColor: '#4df3f3',
      borderRadius: 5,
      showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
      zoomLock: true,
    },
    {
      zoomLock: true,
      type: 'inside',
      xAxisIndexx: 0,
      filterMode: 'filter',
      fillerColor: '#D0D2D9',
      start: 0,
      end: 80,
      zoomLock: false,
    },
  ],
  series: [
    {
      name: '占全市比例',
      type: 'bar',
      yAxisIndex: 1,
      barWidth: 6,
      data: [],
      tooltip: {
        valueFormatter: function (value) {
          return value + ' %';
        },
      },
    },
    {
      name: '学生人数',
      type: 'line',
      yAxisIndex: 0,
      data: [],
      symbol: 'circle',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 万人';
        },
      },
    },
  ],
};

export default {
  mixins: [chartMixin],
  created() {
    this.setBaseOption(baseOption);
    this.mergeToOption(groupBarOption);
  },
};
</script>
