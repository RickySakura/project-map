<template>
  <div class="group-map map-tools-container">
    <LayoutMapView>
      <template #left-tool>
        <GroupMapLeftToolBar> </GroupMapLeftToolBar>
      </template>

      <template #right-tool>
        <GroupMapRightToolBar></GroupMapRightToolBar>
      </template>
    </LayoutMapView>
    <TheGroupMultiMarker />
  </div>
</template>

<script>
export default {
  name: "groupMap",
  data() {
    return {};
  },
  beforeUnmount() {
    console.log("unmounted");
  },
};
</script>

<style lang="less" scoped></style>
