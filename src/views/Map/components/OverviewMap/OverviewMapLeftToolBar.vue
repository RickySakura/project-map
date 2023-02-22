<template>
  <div class="left-tools-container">
    <!-- 工具栏标题 -->
    <div class="tool-title">
      <img
        src="/src/assets/img/mapMenu/title-arrow.png"
        alt=""
        class="title-arrow"
      />
      <span>办学概况</span>
      <img
        src="/src/assets/img/mapMenu/title-double-arrow.png"
        alt=""
        class="title-double-arrow"
      />
    </div>
    <!-- 工具栏主体 -->
    <div class="tool-content">
      <MToolBarBlock>
        <template #toolbar-title> 学位监测概览 </template>
        <template #toolbar-content> 123 </template>
      </MToolBarBlock>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.left-tools-container {
  position: relative;
  min-width: 3.9rem;

  /deep/ .m-right-toolbar-wrapper{
    background: none;
  }
}
.tool-title {
  position: relative;
  width: 4.55rem;
  height: 0.32rem;
  background: linear-gradient(
    83deg,
    #095793 0%,
    #006fb2 31%,
    rgba(0, 54, 100, 0.1) 100%
  );
  display: flex;
  align-items: center;

  & > span {
    font-size: 0.15rem;
    font-weight: 400;
    letter-spacing: 0.01rem;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    // 使用百分比 padding 可以自适应自身宽度
    padding: 3.6%;
    top: 0;
    left: 0;
    background: url('/src/assets/img/mapMenu/title-border.png') no-repeat center
      center/100% 100%;
    user-select: none;
    pointer-events: none;
  }
}
.title-arrow {
  width: 0.25rem;
  height: 0.25rem;
  margin: 0.09rem 0.05rem 0 0.13rem;
}
.title-double-arrow {
  width: 0.3rem;
  height: 0.3rem;
  margin-top: 0.1rem;
  margin-left: 0.05rem;
}
.tool-content {
  padding: 0.08rem;
}
</style>
