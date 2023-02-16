<template>
  <section class="epidemic-toolbar-block">
    <div class="block-title">
      <span><slot name="title"></slot></span>
      <slot name="title-extra"></slot>
    </div>
    <div class="block-content">
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.block-title {
  background: linear-gradient(84deg, #008dff 0%, rgba(9, 95, 167, 0) 100%);
  background-size: 100% 100%;
  color: #fff;
  font-weight: 400;
  font-size: 0.12rem;
  padding: 0.09rem 0 0.09rem 0.03rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    border-left: 3px solid #fff;
    padding-left: 0.05rem;
  }
}

.block-content {
  background: url("/src/assets/img/epidemicMap/content-bg.png") center
    center/100% 100% no-repeat;
  padding: 0.05rem;
}
</style>
