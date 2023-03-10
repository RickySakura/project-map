<template>
  <div class="left-toolbar-container">
    <MSelect
      title="学校类型"
      :options="schoolTypeOptions"
      v-model="schoolType"
      placeholder="请选择学校类型"
      @change="schoolTypeChange"
    />
    <MSelect
      title="示范性学校"
      :options="exemplaryTypeOptions"
      v-model="exemplaryType"
      placeholder="请选择示范性学校"
      @change="exemplaryTypeChange"
    />
    <MDivision
      :options="options"
      :actived-index="activedIndex"
      @listItemClick="settleListItmeClick"
    >
      <template #title>
        <div>{{ title }}</div>
      </template>
    </MDivision>
  </div>
</template>

<script>
import { apiGetRunningSchool } from "@/api/useDegreeMapRequest";
import { useMapStore } from "@/stores/mapStore";
import { mapState } from "pinia";
import getAssetsFile from '@/utils/getAssetsFile'

export default {
  setup() {
    const mapStore = useMapStore();
    return {
      mapStore,
      map: mapStore.map,
    };
  },
  data() {
    return {
      title: "学校列表",
      activedIndex: 0,
      options: [
        {
          label: "学校列表",
          icon: getAssetsFile("runningSchoolMap/point-red.png"),
          children: [],
        },
      ],
      schoolTypeOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 11,
          label: "幼儿园",
        },
        {
          value: 21,
          label: "小学",
        },
        {
          value: 31,
          label: "初中",
        },
        {
          value: 34,
          label: "高中",
        },
        {
          value: 36,
          label: "中职教育",
        },
        {
          value: 51,
          label: "特殊教育",
        },
        {
          value: 93,
          label: "教育培训机构",
        },
        {
          value: 98,
          label: "外籍子女学校",
        },
      ],
      schoolType: 34,
      exemplaryTypeOptions: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "市示范性高中",
        },
        {
          value: 2,
          label: "省示范性高中",
        },
      ],
      exemplaryType: 0,
    };
  },
  computed: {
    ...mapState(useMapStore, ["addressId"]),
  },
  watch: {
    addressId() {
      this.updateRunningSchool();
    },
  },
  mounted() {
    this.updateRunningSchool();
  },
  methods: {
    schoolTypeChange(v) {
      this.updateRunningSchool();
    },
    exemplaryTypeChange(v) {
      this.updateRunningSchool();
    },
    updateRunningSchool() {
      let loading = this.$loading({
        target: ".m-division-container",
      });
      apiGetRunningSchool(
        this.exemplaryType,
        this.schoolType,
        this.addressId,
        null
      )
        .then(({ result }) => {
          this.mapStore.runningSchool.schoolList = result;
          this.options[0].label = this.title + `，共${result?.length || 0}所`;
          this.options[0].children = result?.map((v) => {
            return {
              label: v.schoolName,
              ...v,
            };
          });
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: RunningSchoolLeftToolBar.vue:150 ~ updateRunningSchool ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    settleListItmeClick({ item }) {
      this.mapStore.runningSchool.selectedSchool = item;
    },
  },
};
</script>

<style lang="less" scoped>
.left-toolbar-container {
  position: relative;
  top: 0.2rem;
}
.group-school-icon {
  width: 0.16rem;
  height: 0.19rem;
  margin-right: 0.05rem;
}
</style>
