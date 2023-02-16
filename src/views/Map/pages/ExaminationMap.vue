<template>
  <div class="examination-map map-tools-container">
    <LayoutMapView>
      <template #left-tool>
        <ExaminationLeftToolBar />
      </template>

      <template #center-tool>
        <MMapNavigation class="map-navigation-container" />
      </template>

      <template #right-tool>
        <ExaminationRightToolBar />
      </template>
    </LayoutMapView>
    <TheExaminationMultiMarker />
  </div>
</template>

<script>
export default {
  name: 'examinationMap',
  data() {
    return {};
  },
  beforeUnmount() {
    console.log('unmounted');
  },
};
</script>

<style lang="less" scoped>
.map-navigation-container {
  position: absolute;
  top: 0.8rem;
  left: 5.2rem;
}
</style>
