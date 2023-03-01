<template>
  <div class="m-info-box" :style="styles">
    <img :src="handleIcon" alt="icon" v-if="iconUrl" />
    <div class="m-info-box-content">
      <span class="content-title">{{ title }}</span>
      <span class="unit" :style="unitStyle">
        {{ unitNumber }}
        <i style="font-size: 0.12rem; color: #9eb0c2">{{ unit }}</i>
      </span>
      <slot name="extra-info">
        <span class="content-extra-info" v-if="extraInfoNumber"
          >含<i style="color: #fff">{{ extraInfoNumber }}</i
          >所学校</span
        >
      </slot>
    </div>
  </div>
</template>

<script>
import getAssetsFile from '@/utils/getAssetsFile';
export default {
  props: {
    title: String,
    unitStyle: {
      type: Object,
      default: {},
    },
    iconUrl: String,
    unit: String,
    unitNumber: Number,
    extraInfoNumber: Number,
    styles: Object,
  },
  computed: {
    handleIcon() {
      return getAssetsFile(this.iconUrl)
     }
  }
};
</script>

<style lang="less" scoped>
.m-info-box {
  display: flex;
  align-items: flex-start;
  img {
    width: 0.12rem;
    height: 0.12rem;
    margin-right: 0.07rem;
  }
}
.m-info-box-content {
  display: flex;
  flex-direction: column;
  font-size: 0.12rem;
  // line-height: 0.12rem;
  span {
    margin-bottom: 0.06rem;
  }
}
.content-title {
  line-height: 0.12rem;
}

.unit {
  font-size: 0.16rem;
  font-weight: 700;
}
.content-extra-info {
  color: #9eb0c2;
}
</style>
