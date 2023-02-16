<template>
  <div class="message-window__container">
    <slot name="content"></slot>
    <slot name="extra"></slot>
  </div>
</template>

<script>
export default {
  name: "regionInfo",
};
</script>

<style lang="less" scoped>
.message-window__container {
  max-width: 4.48rem;
  // max-width: 0;
  // max-height: 0;
  background: linear-gradient(270deg, #095a9d 0%, #0e416b 100%);
  font-size: 0.12rem;
  font-family: Han Sans CN-Regular, Han Sans CN;
  font-weight: 400;
  text-align: start;
  color: #f5f7fe;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.12rem 0.2rem 0.15rem 0.15rem;
  border: 1px solid #53c2f2e1;
  z-index: 9;
  line-height: 0.18rem;
  text-align: start;
  box-sizing: border-box;
  box-shadow: 0 0 0 1px #39819e, inset 0 0 0 1px #3d8fb3;
  white-space: pre-wrap;
  transition: max-width 600ms ease-out;
  overflow: hidden;

  &::after {
    content: "";
    z-index: 9;
    width: 0.52rem;
    height: 1.44rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: scale(0.5);
    transform-origin: top right;
    background: url("/src/assets/img/info-window-border.png") top right/100% 100% no-repeat;
  }

  &::before {
    content: "";
    z-index: 9;
    width: 0.51rem;
    height: 0.58rem;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: scale(0.5);
    transform-origin: bottom left;
    background: url("/src/assets/img/info-window-border2.png") bottom left/100% 100% no-repeat;
  }
}
</style>
