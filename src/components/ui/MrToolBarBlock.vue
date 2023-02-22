<!--
 * @ 创建人: 熊浩翔
 * @ 创建时间: 2023-02-22 14:34:22
 * @ 最后修改人: 熊浩翔
 * @ 最后修改时间: 2023-02-22 14:42:59
 * @ 描述: 修改了样式的 MToolBarBlock
 -->

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
  // background: url("/src/assets/img/content-bg.png") repeat 100% 100%;
}
.right-toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.15rem;
  padding: .05rem;
  background: linear-gradient(
    83deg,
    rgba(7, 44, 71, 0.14) 0%,
    #0e3657 46%,
    rgba(9, 37, 61, 0.37) 100%
  );
}
.right-toolbar-title {
  font-size: 0.13rem;
  // border-left: 4px solid #027aff;
  border-left: 4px solid #fff;
  padding-left: 0.09rem;
  line-height: 0.13rem;
}
</style>
