<template>
  <div class="home-container">
    <div class="home-header">
      <slot name="header"></slot>
    </div>
    <div class="home-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="shadow"></div>
    <div class="home-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.shadow {
  box-shadow: rgb(26 26 44) 7px -1px 250px 100px inset;
  position: absolute;
  z-index: 2;
  height: 100vh;
  width: 100vw;
  pointer-events: none;
  user-select: none;
}
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
