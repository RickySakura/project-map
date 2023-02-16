<template>
  <div class="left-toolbar-container">
    <div class="left-toolbar-options__wrapper">
      <div v-for="item in btnOptions" :key="item.value">
        <MOptionButton
          v-if="item.accessUserList.includes(activedUser)"
          @click="handleButtonClick(item.value)"
          :active="examSiteType === item.value"
        >
          {{ item.label }}
        </MOptionButton>
      </div>
    </div>

    <div class="left-toolbar-content" v-if="isShowSchoolList">
      <div v-if="searchList.length > 0">
        <!-- 搜索框 -->
        <div class="search-box">
          <input
            type="text"
            placeholder="请输入关键词搜索"
            v-model="searchText"
          />
          <img src="@/assets/img/search-icon.png" />
        </div>
        <div class="remarks" v-if="examSiteType === 1">
          <p>
            1.标“▲”考试类型为高起本考点，考试时间为两天，其余考点考试时间为一天半。
          </p>
          <p>2.标“●”为新增考点；标“〇”为备用考点；标“Ⓞ”为平移考点</p>
        </div>
        <div class="remarks" v-if="examSiteType === 4">
          <p>标“●”为新增考点；标“〇”为备用考点；标“Ⓞ”为平移考点</p>
        </div>
        <div class="list">
          <div
            class="list-item"
            :class="[listItemActivedIndex === i ? 'active' : '']"
            v-for="(item, i) in searchList"
            :key="i"
            @click="handleListItemClick(item, i)"
          >
            <div class="index">{{ i + 1 }}</div>
            <div class="name one-line">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { useMapStore } from '@/stores/mapStore';
import { computed, onMounted, ref, watch } from '@vue/runtime-core';
import { apiGetListByExamSiteType } from '@/api/useExaminationMapRequest';
import { ElLoading } from 'element-plus';
import { debounce } from '@/utils/debounce';
import { useLocalData } from '@/api/useLocalData';

// 状态导入
const mapStore = useMapStore();
let examSiteType = computed(() => mapStore.examination.examSiteType);

// 考点选项按钮部分
// let btnOptions = [
//   { label: '成人高考', value: 1 },
//   { label: '教资考试', value: 2 },
//   { label: '自考', value: 3 },
//   { label: '艺考', value: 4 },
//   { label: '研究生考试', value: 5 },
// ];
let { btnOptions } = useLocalData('examinationMapRes');
let activedUser = sessionStorage.getItem('username');

function handleButtonClick(type) {
  listItemActivedIndex.value = -1;
  if (examSiteType.value === type) {
    // 重复点击
    isShowSchoolList.value = false;
    mapStore.examination.examSiteType = 0;
  } else {
    let loading = ElLoading.service({
      lock: true,
      text: '数据加载中...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    isShowSchoolList.value = true;
    debounce(() => {
      mapStore.examination.examSiteType = type;
      updateListData(type);
      loading.close();
    }, 400)();
  }
}

// 展示学生列表部分
let isShowSchoolList = ref(true);
let listItemActivedIndex = ref(-1);
let schoolList = ref([]);
let searchText = ref('');
let searchList = computed(() => {
  if (searchText.value === '') {
    return schoolList.value;
  } else {
    return schoolList.value?.filter((v) => {
      return v?.name?.includes(searchText.value);
    });
  }
});

// 选中学校
function handleListItemClick(item, index) {
  listItemActivedIndex.value = index;
  mapStore.examination.selectedSchool = item;
}

// 获取和更新数据的方法
let examinationRes = {};
function updateListData(type) {
  if (examinationRes[type]) {
    schoolList.value = examinationRes[type];
    mapStore.examination.schoolList = examinationRes[type];
    mapStore.navigation.schoolList = examinationRes[type];
  } else {
    apiGetListByExamSiteType(type, mapStore.addressId).then(({ result }) => {
      schoolList.value = result;
      examinationRes[type] = result;
      mapStore.navigation.schoolList = result;
      mapStore.examination.schoolList = result;
    });
  }
}
watch(
  () => mapStore.addressId,
  () => {
    examinationRes = {};
    listItemActivedIndex.value = -1;
    updateListData(examSiteType.value);
  }
);
onMounted(() => {
  let firstAccessBtnType =
    btnOptions?.find((item) => {
      return item.accessUserList.includes(activedUser);
    })?.value || 1;

  firstAccessBtnType == 1
    ? updateListData(1)
    : handleButtonClick(firstAccessBtnType);
});
</script>

<style lang="less" scoped>
.left-toolbar-container {
  position: relative;
  top: 0.45rem;
}
.left-toolbar-options__wrapper {
  position: relative;
  // width: 3.5rem;
  width: auto;
  display: flex;
  // justify-content: space-around;
  align-items: center;
}

.left-toolbar-content {
  padding: 0.1rem;

  &.close {
    height: auto;
  }

  min-width: 2.7rem;
  max-height: 81vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 4px;
  background: #012d50;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.06);
  border: 1px solid #37a8ff;
  position: relative;
  top: 0.15rem;

  .list {
    color: #fff;

    .list-item {
      display: flex;
      align-items: center;
      height: 0.3rem;
      line-height: 0.3rem;
      cursor: pointer;

      &.active {
        background-color: rgb(3, 111, 200);
        border-radius: 5px;
      }

      .index {
        width: 0.15rem;
        height: 0.15rem;
        background: rgba(130, 234, 255, 0.1);
        text-align: center;
        line-height: 0.15rem;
        border-radius: 50%;
        font-size: 0.12rem;
        color: #a1fcfe;
      }

      .name {
        padding-left: 0.2rem;
        font-size: 0.12rem;
      }
    }
  }

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 2.36rem;
    height: 0.3rem;
    margin: 0.1rem 0;
    background: #00496e;
    box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    padding-left: 0.1rem;

    input {
      width: 84%;
      height: 0.25rem;
      line-height: 0.14rem;
      background: transparent;
      border: none;
      outline: none;
      /*禁止拖拽*/
      resize: none;
      /*去除iOS默认样式*/
      -webkit-appearance: none;
      /*去除点击时背景高亮样式*/
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      color: #78d4fd;

      &::input-placeholder {
        color: #78d4fd;
      }

      &::-webkit-input-placeholder {
        //兼容WebKit browsers（Chrome的内核）
        color: #78d4fd;
      }
    }

    img {
      width: 0.2rem;
      height: 0.2rem;
    }
  }

  .remarks {
    color: orange;
    font-size: 0.12rem;

    p:first-child {
      width: 3rem;
      margin-bottom: 0.05rem;
    }
  }
}
</style>
