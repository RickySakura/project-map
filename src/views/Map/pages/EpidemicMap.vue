<template>
  <div
    class="epidemic-map map-tools-container"
    :class="[isShowTools ? '' : 'hidden']"
  >
    <LayoutMapView>
      <template #left-tool>
        <EpidemicLeftToolBar v-show="true" />
        <div class="open-btn" @click="toggleToolBarShowState">
          <div v-if="isShowTools">
            <img
              src="/src/assets/img/epidemicMap/switch-close.png"
              alt="switch"
            />
            收起疫情数据
          </div>
          <div v-else>
            <img
              src="/src/assets/img/epidemicMap/switch-open.png"
              alt="switch"
            />
            查看疫情数据
          </div>
        </div>
      </template>

      <template #center-tool>
        <EpidemicCenterToolBar />
      </template>

      <template #right-tool>
        <EpidemicRightToolBar />
      </template>
    </LayoutMapView>
    <TheEpidemicMultiMarker />
  </div>
</template>

<script>
export default {
  name: "epidemicMap",
  data() {
    return {
      isShowTools: true,
    };
  },
  beforeUnmount() {
    console.log("unmounted");
  },
  methods: {
    toggleToolBarShowState() {
      this.isShowTools = !this.isShowTools;
    },
  },
};
</script>

<style lang="less" scoped>
.open-btn {
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 2.46rem;
  writing-mode: vertical-lr;
  letter-spacing: 0.04rem;
  width: 0.5rem;
  padding: 0.2rem 0.05rem;
  color: white;
  background: url("/src/assets/img/epidemicMap/switch-bg.png") center
    center/100% 100% no-repeat;
  transition: transform 300ms;
  cursor: pointer;
}
</style>
