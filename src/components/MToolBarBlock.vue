<template>
  <div class="m-toolbar-wrapper">
    <div class="m-toolbar-top">
      <slot name="toolbar-top">
        <span class="m-toolbar-title">
          <img
            src="/src/assets/img/mapMenu/title-arrow.png"
            alt=""
            class="title-arrow"
          />
          <span><slot name="toolbar-title"></slot></span>
          <img
            src="/src/assets/img/mapMenu/title-double-arrow.png"
            alt=""
            class="title-double-arrow"
          />
        </span>
      </slot>

      <slot name="toolbar-title-bar"></slot>

      <slot name="toolbar-top"></slot>
    </div>
    <div>
      <slot name="toolbar-content"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.m-toolbar-wrapper {
  color: #fff;
  // width: fit-content;
  margin: 0.06rem 0;
  // padding: 0.12rem 0;
  padding-bottom: 0.12rem;
  border-radius: 2px;
  // background: url('/src/assets/img/content-bg.png') repeat 100% 100%;
}
.m-toolbar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // padding-bottom: 0.15rem;
  margin-bottom: 0.15rem;
}
// .m-toolbar-title {
//   font-size: 0.13rem;
//   border-left: 4px solid #027aff;
//   padding-left: 0.09rem;
//   line-height: 0.13rem;
// }

.m-toolbar-title {
  position: relative;
  // width: 4.2rem;
  width: 90%;
  height: 0.3rem;
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
  width: 0.24rem;
  height: 0.24rem;
  margin: 0.09rem 0.05rem 0 0.13rem;
}
.title-double-arrow {
  width: 0.3rem;
  height: 0.3rem;
  margin-top: 0.1rem;
  margin-left: 0.05rem;
}
</style>
