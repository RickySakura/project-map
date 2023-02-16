<template>
  <div :style="styles" :class="['option-btn', active ? 'active' : '']">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: [String, Object],
      default: {},
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less">
.option-btn {
  color: #fff;
  z-index: 2;
  background-color: red;
  font-size: 0.15rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.15rem;
  align-items: center;
  background: url("/src/assets/img/mapMenu/btn-bg2.png");
  background-size: 100% 100%;
  transition: all 300ms;
  -webkit-transition: all 300ms;
  -o-transition: all 300ms;

  &.active {
    background: url("/src/assets/img/mapMenu/btn-bg.png");
    background-size: 100% 100%;
  }

  &:hover {
    background: url("/src/assets/img/mapMenu/btn-bg.png");
    background-size: 100% 100%;
    opacity: 0.9;
  }

  img {
    width: 0.15rem;
    height: 0.15rem;
    object-fit: contain;
    margin-right: 0.08rem;
  }

  span {
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(#93cdfe 0%, #ffffff 100%);
  }
}
</style>
