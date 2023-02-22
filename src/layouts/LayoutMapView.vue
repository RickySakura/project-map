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
  // left: 1.1rem;
  top: .13rem;
  left: .11rem;
  padding: .22rem;

  // 新增地图边框
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1.28rem;
    height: 9.51rem;
    background: url('/src/assets/img/map/tool-border.png') no-repeat top
      left/100% 100%;
    transform: scaleX(-1);
  }
}
.map-center-toolbar {
  width: 100%;
  display: inline-flex;
  justify-content: center;
}
.map-right-toolbar {
  // right: 0;
  right: .11rem;
  // background-color: #052f4e;
  &::before {
    content: '';
    position: fixed;
    top: .45rem;
    right: 0;
    width: 1.28rem;
    height: 9.51rem;
    background: url('/src/assets/img/map/tool-border.png') no-repeat top
      left/100% 100%;
  }
}
</style>
