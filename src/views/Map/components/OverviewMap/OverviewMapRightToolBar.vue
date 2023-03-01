<template>
  <div class="right-tools-container" ref="overviewRef">
    <GroupRightInfo hidden="3"></GroupRightInfo>
    <MToolBarBlock>
      <template #toolbar-title> 示范性高中概况 </template>
      <template #toolbar-content>
        <div class="overview-block-wrapper">
          <MrInfoBox
            title="市范性高中"
            icon-url="icons/house.png"
            unit="所"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="demonstrationData[0]?.schoolTotal"
            :content="demonstrationData[0]?.content"
            :per-number="demonstrationData[0]?.schoolTratio"
          />
          <MrInfoBox
            title="省示范性高中"
            icon-url="icons/house.png"
            unit="所"
            :unit-style="{ color: '#3A96FF' }"
            :unit-number="demonstrationData[1]?.schoolTotal"
            :content="demonstrationData[1]?.content"
            :per-number="demonstrationData[1]?.schoolTratio"
          />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 义务教育标准化学校概况 </template>
      <template #toolbar-content>
        <div class="overview-block-wrapper">
          <MrInfoBox
            title="小学"
            icon-url="icons/house.png"
            unit="所"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="compulsoryData[0]?.totalCompulsoryEducationSchools"
            :content="compulsoryData[0]?.content"
            :per-number="compulsoryData[0]?.schoolTratio"
          >
          </MrInfoBox>
          <MrInfoBox
            title="初中"
            icon-url="icons/house.png"
            unit="所"
            :unit-style="{ color: '#3A96FF' }"
            :unit-number="compulsoryData[1]?.totalCompulsoryEducationSchools"
            :content="compulsoryData[1]?.content"
            :per-number="compulsoryData[1]?.schoolTratio"
          />
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 考点地图概况 </template>
      <template #toolbar-content>
        <div class="overview-map-bar">
          <MBarChart ref="examinationBar"></MBarChart>
        </div>
        <div class="options__container">
          <div class="options__wrapper">
            <template v-for="item in btnOptions" :key="item.value">
              <MOptionButton
                v-if="item.accessUserList.includes(activedUser)"
                @click="examSiteType = item.value"
                :active="examSiteType === item.value"
              >
                {{ item.label }}
              </MOptionButton>
            </template>
          </div>
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script setup>
import { apiGetExamSiteStaticList } from '@/api/useExaminationMapRequest';
import {
  apiGetCompulsory,
  apiGetDemonstration,
} from '@/api/useOverviewRequest';
import { useLocalData } from '@/api/useLocalData';
import { useMapStore } from '@/stores/mapStore';
import { ElMessage, ElLoading } from 'element-plus';

let overviewRef = ref()
const mapStore = useMapStore();
// let loading = ref(false);
let examinationBar = ref(); // ExaminationBar组件实例
let districtInfos = useLocalData('runningSchoolRes').runningDistrictInfos; // 行政区枚举数据

let examSiteType = ref(1); // 控制考点类型
const barBaseOptions = {
  series: [
    {
      name: '考生总数',
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 人';
        },
      },
      color: '#fd6900',
    },
    {
      name: '考点总数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      color: '#47B2FF',
      barWidth: 5,
    },
    {
      name: '考场总数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' 个';
        },
      },
      barWidth: 5,
      color: '#50D39F',
    },
  ],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  legend: [
    {
      textStyle: {
        //图例⽂字的样式
        fontSize: 11,
        color: '#fff',
      },
      itemWidth: 10,
      itemHeight: 10,
      right: '0',
      data: ['考生总数', '考点总数', '考场总数'],
    },
  ],
  xAxis: [
    {
      type: 'category',
      axisPointer: {
        type: 'shadow',
      },
      axisLabel: {
        color: '#fff',
        interval: 0, // 强制显示全部x轴
        fontSize: 12,
        width: 40, //底下文字宽度
        overflow: 'breakAll', //底下文字超出宽度换行
        interval: 0, //底下文字出现间隔
        hideOverlap: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '考点数/考场数',
      nameTextStyle: {
        color: '#fff',
      },
      min: 0,
      splitNumber: 3,
      axisLabel: {
        formatter: '{value}',
        color: '#fff ',
      },
    },
    {
      type: 'value',
      name: '考生数',
      nameTextStyle: {
        color: '#fff',
      },
      splitNumber: 3,
      axisLabel: {
        formatter: '{value} %',
        color: '#fff',
      },
    },
  ],
  grid: {
    top: '20%',
    bottom: '2%',
    containLabel: true,
  },
  dataZoom: [
    {
      type: 'slider',
      show: true,
      start: 0,
      end: 50,
      handleSize: 1,
      height: 5, //组件高度
      left: '5%', //左边的距离
      right: '4%', //右边的距离
      bottom: 0,
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
      end: 50,
      zoomLock: false,
    },
  ],
};
// 更新考点地图概况数据
const updateExamChartData = () => {
  let { addressId } = mapStore;
  apiGetExamSiteStaticList(examSiteType.value, addressId).then(
    ({ result: staticListRes }) => {
      updateExamChart(
        addressId
          ? staticListRes.examSiteInfoVo
          : staticListRes.overviewExaminationSitesVos
      );
    }
  );
};
// 更新考点地图概况图表
const updateExamChart = (data) => {
  if (!(Array.isArray(data) && data.length > 0)) {
    ElMessage.warning('没有该考点信息');
    return;
  }

  // 以下四个分别对应 x轴标签，考生数据, 考点数据，考场数据，
  let [label, examineesData, pointsData, roomsData] = [[], [], [], []];
  data.forEach((item) => {
    let addressName = districtInfos.find(
      (area) => area.addressId == item.addressId
    )?.name;
    label.push(addressName || item.name);
    examineesData.push(item.numberExaminees);
    pointsData.push(item.testPoints);
    roomsData.push(item.numberExaminationRooms);
  });
  let options = {
    series: [
      {
        data: examineesData,
      },
      {
        data: pointsData,
      },
      {
        data: roomsData,
      },
    ],
    xAxis: [
      {
        data: label,
      },
    ],
  };
  examinationBar.value
    ?.clearOption()
    ?.mergeToOption(barBaseOptions)
    ?.initChart(options);
};
const stop1 = watch(
  [examSiteType, () => mapStore.addressId],
  updateExamChartData,
  {
    immediate: true,
  }
);

let demonstrationData = ref([]); // 示范性高中概况数据
let compulsoryData = ref([]); // 义务教育学校概况数据
// 考点概况切换考试类型
let { btnOptions } = useLocalData('examinationMapRes');
let activedUser = sessionStorage.getItem('username');
// 更新概况数据
const updateOverviewData = () => {
  // let loading = ElLoading.service()
  // 处理数据和响应之间的关系
  let dataMapper = (data) => {
    let studentNumber = data?.studentNumber || '--',
      teacherNumber = data?.teacherNumber || '--';

    return {
      ...data,
      content: `学生: ${studentNumber}  教职工: ${teacherNumber}`,
    };
  };
  Promise.all([
    apiGetDemonstration(mapStore.addressId),
    apiGetCompulsory(mapStore.addressId),
  ]).then(([{ result: demonstrationRes }, { result: compulsoryRes }]) => {
    demonstrationData.value = demonstrationRes?.map(dataMapper);
    compulsoryData.value = compulsoryRes?.map(dataMapper);
  });
};
const stop2 = watch(() => mapStore.addressId, updateOverviewData, {
  immediate: true,
});

onUnmounted(() => {
  stop1();
  stop2();
});
</script>

<style lang="less" scoped>
.right-tools-container {
  position: relative;
  min-width: 3.9rem;
  height: 8.8rem;
  overflow-y: scroll;
}

.tool-content {
  padding: 0.08rem;
}
.overview-block-wrapper {
  display: flex;
  justify-content: space-around;
  & > div {
    margin: 0 0.1rem;
    min-width: 1.3rem;
  }
}
.overview-map-bar {
  // 问题：很奇怪的特性，Echarts父元素的宽度有时会让Echart无法填满整个元素，会有个莫名其妙的margin，是否跟 min-width有关？
  // 解决：是，因为tm这个父容器没有根容器那么宽，所以会有一段margin填满，草。
  width: 100%;
  height: 3rem;
}
.options__container {
  overflow: hidden;
  width: 4rem;
  white-space: nowrap;
  background: #0b436e;
  border-radius: 14px;
  margin: 0 auto;
  margin-top: 0.12rem;
}
.options__wrapper {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.option-btn) {
  background: none;
  padding: 0.03rem 0.25rem;
  font-size: 0.12rem;

  &:nth-child(2) {
    transform: translateX(-0.14rem);
  }
  &:nth-child(3) {
    transform: translateX(-0.28rem);
  }
  &:nth-child(4) {
    transform: translateX(-0.42rem);
  }
  &:nth-child(5) {
    transform: translateX(-0.56rem);
  }

  &.actived,
  &:hover {
    background: #019eef;
    border-radius: 14px;
  }
}
</style>
