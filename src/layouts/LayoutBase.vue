<template>
  <div class="home-container">
    <div class="home-header">
      <slot name="header"></slot>
    </div>
    <div class="home-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="home-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #1a2338;
  color: #fff;
  font-size: 0.14rem;
}

.home-header {
  position: relative;
  z-index: 2;
  display: flex;
  place-content: center;
}

.home-sidebar {
  position: absolute;
  left: 0;
  z-index: 3;
}

.home-content {
  width: 100%;
  height: 100%;
  background-color: #a6c5e8;
  position: relative;
}
</style>
