<template>
  <div class="epidemic-right-toolbar__container">
    <div class="epidemic-right-toolbar__wrapper">
      <div class="wrapper-title">
        <img
          src="/src/assets/img/epidemicMap/epidemic-school.png"
          alt=""
        /><span>教师疫情防控详情</span>
      </div>
      <ul>
        <li>
          <RightToolBarBlock1 />
        </li>
        <li>
          <RightToolBarBlock2 />
        </li>
        <li v-if="addressId === ''">
          <RightToolBarBlock3 />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useMapStore } from "@/stores/mapStore";
import { mapWritableState } from "pinia";
import { debounce } from "@/utils/debounce";
import { apiGetOfficeOrSchoolByAreaCategory } from "@/api/useEpidemicMapRequest";
export default {
  setup() {
    const mapStore = useMapStore();
    return {
      mapStore,
    };
  },
  computed: {
    ...mapWritableState(useMapStore, ["addressId", "epidemic"]),
  },
};
</script>

<style lang="less" scoped>
.epidemic-right-toolbar__container {
  position: relative;
  top: 0.05rem;
  display: flex;
  // min-width: 6.35rem;
  user-select: none;
}
.epidemic-right-toolbar__wrapper {
  width: 3.63rem;
  height: 9rem;
  background: #155080;
  overflow-x: hidden;
  overflow-y: scroll;
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
