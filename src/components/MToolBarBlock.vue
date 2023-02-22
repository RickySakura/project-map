<template>
  <div class="m-right-toolbar-wrapper">
    <div class="right-toolbar-top">
      <span
        class="right-toolbar-title"
        :style="titleStyle"
        :class="[titleClass]"
      >
        <slot name="toolbar-title"></slot>
      </span>
      <slot name="toolbar-title-bar"></slot>
      <slot name="toolbar-top"></slot>
    </div>
    <slot name="toolbar-content"></slot>
  </div>
</template>

<script>
export default {
  props: {
    titleStyle: Object,
    titleClass: String,
  },
};
</script>

<style lang="less" scoped>
.m-right-toolbar-wrapper {
  color: #fff;
  // width: fit-content;
  margin: 0.06rem 0;
  padding: 0.12rem 0;
  border-radius: 2px;
  background: url("/src/assets/img/content-bg.png") repeat 100% 100%;
}
.right-toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding-bottom: 0.15rem;
  margin-bottom: .15rem;
}
.right-toolbar-title {
  font-size: 0.13rem;
  border-left: 4px solid #027aff;
  padding-left: 0.09rem;
  line-height: 0.13rem;
}
</style>
