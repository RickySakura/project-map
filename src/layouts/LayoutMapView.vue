<template>
  <div class="map-left-toolbar toolbar">
    <slot name="left-tool"></slot>
  </div>
  <div class="map-center-toolbar toolbar">
    <slot name="center-tool"></slot>
  </div>
  <div class="map-right-toolbar toolbar">
    <slot name="right-tool"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.toolbar {
  position: absolute;
  top: 0;
  z-index: 3;
}
.map-left-toolbar {
  left: 1.1rem;
}
.map-center-toolbar {
  width: 100%;
  display: inline-flex;
  justify-content: center;
}
.map-right-toolbar {
  right: 0;
  // background-color: #052f4e;
}
</style>
