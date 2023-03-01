<template>
  <div class="left-toolbar-container">
    <MDivision
      :options="options"
      :default-actived-index="3"
      :list-data="listData"
      @optionClick="handleOptionClick"
      @listItemClick="handleListItmeClick"
    >
      <template #title>
        <img
          src="@/assets/img/groupMap/group-school-icon.png"
          alt="icon"
          class="school-icon"
        />
        <div>{{ title }}</div>
      </template>

      <template #label="{ option }">
        {{ option.label }} ({{ option.schoolNumber }}所)
      </template>
    </MDivision>
  </div>
</template>

<script>
import {
  apiGetRunningSchool,
  apiGetSchoolTypeOptions,
} from '@/api/useRunningSchoolRequest';
import { useMapStore } from '@/stores/mapStore';
import { schoolTypeOptions } from '@/utils/useEnums';

export default {
  setup() {
    const mapStore = useMapStore();

    return { mapStore };
  },
  data() {
    let options = schoolTypeOptions.filter((item) => item.value);
    return {
      title: '学校列表',
      schoolType: 34,
      options,
      listData: [],
    };
  },
  computed: {
    addressId() {
      return this.mapStore.addressId;
    },
  },
  watch: {
    addressId() {
      this.updateRunningSchool();
    },
    schoolType() {
      this.updateRunningSchool();
    },
  },
  mounted() {
    this.updateRunningSchool();
  },
  methods: {
    updateRunningSchool() {
      let loading = this.$loading();
      apiGetRunningSchool(0, this.schoolType, this.addressId, null)
        .then(({ result }) => {
          this.mapStore.runningSchool.schoolList = result;
          this.listData = result.map((v) => {
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

      apiGetSchoolTypeOptions(this.addressId).then(({ result }) => {
        if (!Array.isArray(result)) return;
        this.options.forEach((item) => {
          let { schoolNumber } = result.find(
            (v) => item.value == v.runningType
          );
          item.schoolNumber = schoolNumber || '--';
        });
      });
    },
    handleListItmeClick({ item }) {
      console.log(item);
      this.mapStore.runningSchool.selectedSchool = item;
    },
    handleOptionClick({ option }) {
      this.schoolType = option.value;
    },
  },
};
</script>

<style lang="less" scoped>
.left-toolbar-container {
  position: relative;
  opacity: 1;
  transition: transform 500ms, opacity 500ms;
}
.group-school-icon {
  width: 0.16rem;
  height: 0.19rem;
  margin-right: 0.05rem;
}
.school-icon {
  width: 0.16rem;
  height: 0.19rem;
  margin-right: 0.05rem;
}
</style>
