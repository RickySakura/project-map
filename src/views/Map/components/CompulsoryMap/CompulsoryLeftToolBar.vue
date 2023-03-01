<template>
  <div class="left-toolbar-container">
    <MSelect
      title="义务教育标准化学段"
      :options="schoolTypeOptions"
      v-model="schoolType"
      placeholder="请选择学校类型"
      @change="schoolTypeChange"
    />
    <MSelect
      title="示范性普通高中"
      :options="exemplaryTypeOptions"
      v-model="exemplaryType"
      placeholder="请选择示范性学校"
      @change="exemplaryTypeChange"
    />
    <MDivision
      :options="options"
      :default-actived-index="activedIndex"
      :show-options="false"
      @listItemClick="settleListItmeClick"
    >
      <template #title>
        <img
          src="@/assets/img/groupMap/group-school-icon.png"
          alt="icon"
          class="school-icon"
        />
        <div>{{ title }}</div>
      </template>
    </MDivision>
  </div>
</template>

<script>
import { apiGetRunningSchool } from '@/api/useRunningSchoolRequest';
import { useMapStore } from '@/stores/mapStore';
import getAssetsFile from '@/utils/getAssetsFile';

export default {
  setup() {
    const mapStore = useMapStore();
    return {
      mapStore,
    };
  },
  data() {
    return {
      title: '学校列表',
      activedIndex: 0,
      options: [
        {
          label: '学校列表',
          icon: getAssetsFile('runningSchoolMap/point-red.png'),
          children: [],
        },
      ],
      schoolTypeOptions: [
        {
          value: 21,
          label: '小学',
        },
        {
          value: 31,
          label: '初中',
        },
      ],
      schoolType: 21,
      exemplaryTypeOptions: [
        {
          value: 1,
          label: '市示范性高中',
        },
        {
          value: 2,
          label: '省示范性高中',
        },
      ],
      exemplaryType: undefined,
    };
  },
  computed: {
    addressId() { 
      return this.mapStore.addressId
    },
  },
  watch: {
    addressId() {
      let func = this.schoolType
        ? this.schoolTypeChange
        : this.exemplaryTypeChange;
      func();
    },
  },
  mounted() {
    this.updateRunningSchool([0, this.schoolType, this.addressId, null, 1]);
  },
  methods: {
    schoolTypeChange(v) {
      this.updateRunningSchool([0, this.schoolType, this.addressId, null, 1]);
      this.exemplaryType = undefined;
    },
    exemplaryTypeChange(v) {
      this.updateRunningSchool([
        this.exemplaryType,
        34,
        this.addressId,
        null,
        null,
      ]);
      this.schoolType = undefined;
    },
    updateRunningSchool(params) {
      let loading = this.$loading();
      apiGetRunningSchool(...params)
        .then(({ result }) => {
          this.mapStore.runningSchool.schoolList = result;
          // this.options[0].label = this.title + `，共${result?.length || 0}所`;
          this.options[0].children = result?.map((v) => {
            return {
              label: v.schoolName,
              ...v,
            };
          });
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: RunningSchoolLeftToolBar.vue:150 ~ updateRunningSchool ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    settleListItmeClick({ item }) {
      console.log(item);
      this.mapStore.runningSchool.selectedSchool = item;
    },
  },
};
</script>

<style lang="less" scoped>
.left-toolbar-container {
  position: relative;
  top: 0.2rem;
  opacity: 1;
  transition: transform 500ms, opacity 500ms;
  :deep(.m-select) {
    margin-bottom: 0.1rem;
  }
}
.school-icon {
  width: 0.16rem;
  height: 0.19rem;
  margin-right: 0.05rem;
}
</style>
