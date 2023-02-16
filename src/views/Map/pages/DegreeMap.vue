<template>
  <div class="degree-map map-tools-container">
    <LayoutMapView>
      <template #left-tool>
        <DegreeMapLeftToolBar />
      </template>

      <template #right-tool>
        <DegreeMapRightToolBar />
      </template>
    </LayoutMapView>
    <TheDegreeMultiMarker />
  </div>
</template>

<script>
export default {
  name: "degreeMap",
  data() {
    return {};
  },
  beforeUnmount() {
    console.log("unmounted");
  },
};
</script>

<style lang="less" scoped></style>
