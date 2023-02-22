<template>
  <div class="home-container">
    <!-- 前景图 -->
    <!-- <img class="frontground" src="../assets/img/map/map-fg.png" alt=""> -->
    <div class="home-header">
      <slot name="header"></slot>
    </div>
    <div class="home-sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="home-content">
      <slot name="content"></slot>
    </div>
    <div class="home-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.frontground {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
}
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 44, 74);
  // background: #1a2338;
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

.home-footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
</style>
