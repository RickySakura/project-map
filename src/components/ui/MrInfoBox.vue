<template>
  <div class="m-info-box" :style="styles">
    <img :src="handleIcon" alt="icon" v-if="iconUrl" />
    <div class="m-info-box-content">
      <!-- 开始 -->
      <span class="unit">
        <i style="color: #dce7ff">{{ title }}</i>
        <i style="margin: 0 0.07rem" :style="unitStyle">{{ unitNumber }}</i>
        <i style="color: #9eb0c2">{{ unit }}</i>

        <i style="color: #dce7ff"> 占比</i>
        <i style="margin: 0 0.07rem" :style="unitStyle">{{ perNumber }}</i>
      </span>
      <span class="content-main">
        <slot name="content">
          {{ content }}
        </slot>
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
    content: String,
    iconUrl: String,
    unit: String,
    unitNumber: [Number, String],
    extraInfoNumber: Number,
    styles: Object,
    perNumber: [Number, String],
  },
  computed: {
    handleIcon() {
      return getAssetsFile(this.iconUrl);
    },
  },
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
.content-main {
  line-height: 0.12rem;
  font-size: 0.12rem;
  color: #bec3d2;
  transform: scale(0.88);
  transform-origin: left;
  white-space: pre-wrap;
}

.unit {
  font-size: 0.12rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-top: -0.05rem;
  white-space: pre-wrap;
}
.content-extra-info {
  color: #9eb0c2;
}
</style>
