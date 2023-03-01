<template>
  <div class="epidemic-left-toolbar__container">
    <div class="epidemic-left-toolbar__wrapper">
      <div class="wrapper-title">
        <img
          src="/src/assets/img/epidemicMap/epidemic-school.png"
          alt=""
        /><span>学生疫情防控详情</span>
      </div>
      <ul>
        <li>
          <LeftToolBarBlock1 />
        </li>
        <li>
          <LeftToolBarBlock2 />
        </li>
        <li v-if="addressId === ''">
          <LeftToolBarBlock3 />
        </li>
      </ul>
    </div>
    <MDivision
      :options="options"
      :default-actived-index="activedIndex"
      @optionClick="settleOptionClick"
      @listItemClick="settleListItmeClick"
      class="epidemic-division"
    >
      <template #title>
        <div>{{ title }}</div>
      </template>
    </MDivision>
  </div>
</template>

<script>
import { useMapStore } from "@/stores/mapStore";
import { mapWritableState } from "pinia";
import { debounce } from "@/utils/debounce";
import { apiGetOfficeOrSchoolByAreaCategory } from "@/api/useEpidemicMapRequest";
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
      title: "风险地区",
      activedIndex: -1,
      options: [
        {
          label: "低风险",
          icon: getAssetsFile("epidemicMap/square-green.png"),
          value: 3,
          children: [],
        },
        {
          label: "中风险",
          icon: getAssetsFile("epidemicMap/square-yellow.png"),
          value: 2,
          children: [],
        },
        {
          label: "高风险",
          icon: getAssetsFile("epidemicMap/square-red.png"),
          value: 1,
          children: [],
        },
      ],
    };
  },
  computed: {
    ...mapWritableState(useMapStore, ["addressId", "epidemic"]),
  },
  watch: {
    addressId() {
      this.updateOptions();
    },
  },
  mounted() {
    this.updateOptions();
  },
  methods: {
    updateOptions() {
      let loading = this.$loading();
      Promise.all([
        apiGetOfficeOrSchoolByAreaCategory(3, this.addressId),
        apiGetOfficeOrSchoolByAreaCategory(2, this.addressId),
        apiGetOfficeOrSchoolByAreaCategory(1, this.addressId),
      ])
        .then((resArray) => {
          resArray.forEach(({ result }, index) => {
            if (Array.isArray(result)) {
              this.options[index].children = result.map((v) => {
                return {
                  label: v.schoolName || "",
                  ...v,
                };
              });
              let labels = ["低风险", "中风险", "高风险"];
              this.options[index].label =
                labels[index] + ` (含${result.length}所学校)`;
              this.epidemic.schoolList =
                this.options[Math.abs(this.epidemic.areaCategory - 3)].children;
            }
          });
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: EpidemicLeftToolBar.vue:111 ~ updateOptions ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    settleOptionClick({ option, index }) {
      // this.epidemic.areaCategory = option.value; 原本直接修改值会导致页面卡顿
      let loading = this.$loading();
      debounce(() => {
        this.epidemic.areaCategory = option.value;
        this.epidemic.schoolList = this.options[index].children;
        loading.close();
      }, 500)();
    },
    settleListItmeClick({ item, index }) {
      this.epidemic.selectedSchool = item;
    },
  },
};
</script>

<style lang="less" scoped>
.epidemic-left-toolbar__container {
  position: relative;
  top: 0.05rem;
  left: -1.1rem;
  display: flex;
  min-width: 6.35rem;
  user-select: none;
}
.epidemic-left-toolbar__wrapper {
  width: 3.63rem;
  height: 9rem;
  margin-right: 0.2rem;
  background: #155080;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: transform 300ms;
}
.epidemic-division {
  height: 100%;
  position: sticky;
  left: 1.1rem;
  top: 2rem;
  transition: transform 300ms;
}
.wrapper-title {
  position: sticky;
  top: 0;
  background-image: url("/src/assets/img/epidemicMap/bg1.png");
  background-size: 100% 100%;
  padding: 0.05rem 0.1rem;
  font-size: 0.16rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fff;
  img {
    width: 0.1rem;
    object-fit: cover;
    margin-right: 0.05rem;
  }
  span {
    font-size: 0.16rem;
  }
}
</style>
