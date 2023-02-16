<template>
  <div class="conatiner">
    <div class="process-container">
      <span class="title"> 第一针接种率</span>
      <el-progress
        class="progress progress-bg"
        :percentage="onePercent"
        color="#B5D8FF"
        :format="() => format(one)"
      ></el-progress>

      <span class="percent" style="color: #ff9940"
        >{{ onePercent?.toFixed() }}%</span
      >
    </div>

    <div class="process-container">
      <span class="title"> 第二针接种率</span>
      <el-progress
        color="#6BB1FF"
        class="progress progress-bg"
        :percentage="twoPercent"
        :format="() => format(two)"
      ></el-progress>

      <span class="percent" style="color: #ff9940"
        >{{ twoPercent?.toFixed() }}%</span
      >
    </div>

    <div class="process-container">
      <span class="title"> 第三针接种率</span>
      <el-progress
        color="##017AFF"
        class="progress progress-bg"
        :percentage="threePercent"
        :format="() => format(three)"
      ></el-progress>

      <span class="percent" style="color: #ff443e"
        >{{ threePercent?.toFixed() }}%</span
      >
    </div>

    <div class="process-container">
      <span class="title"> 未接种率</span>
      <el-progress
        color="#FFB884"
        class="progress no-progress-bg"
        :percentage="noPercent"
        :format="() => format(no)"
      ></el-progress>

      <span class="percent" style="color: #ff443e"
        >{{ noPercent?.toFixed() }}%</span
      >
    </div>
  </div>
</template>
<script>
export default {
  props: {
    one: {
      type: [Number, String],
      default: 0,
    },
    two: {
      type: [Number, String],
      default: 0,
    },
    three: {
      type: [Number, String],
      default: 0,
    },
    no: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    totalNum() {
      return this.one + this.two + this.three + this.no;
    },
    onePercent() {
      if (!this.totalNum) return 0;
      return (this.one / this.totalNum) * 100;
    },
    twoPercent() {
      if (!this.totalNum) return 0;
      return (this.two / this.totalNum) * 100;
    },
    threePercent() {
      if (!this.totalNum) return 0;
      return (this.three / this.totalNum) * 100;
    },
    noPercent() {
      if (!this.totalNum) return 0;
      return (this.no / this.totalNum) * 100;
    },
  },
  methods: {
    format(num) {
      num = Number(num);
      if (num == 0) {
        return num + "人";
      } else if (num > 1 && num < 10000) {
        return num + "人";
      } else {
        return (num / 10000).toFixed(2) + "万人";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.conatiner {
  padding-bottom: 0.05rem;
  .process-container {
    margin-bottom: 0.02rem;
    display: flex;
    justify-content: space-around;
    .percent {
      width: 0.31rem;
    }
    .title {
      white-space: nowrap;
      display: block;
      width: 0.8rem;
      font-size: 0.12rem;
      color: #ffffff;
      text-align: center;
    }
    .progress {
      width: 55%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      :deep(.el-progress__text) {
        white-space: nowrap;
        font-size: 0.12rem !important;
        color: #bec3d2;
      }
    }

    .progress-bg {
      :deep(.el-progress-bar) {
        .el-progress-bar__outer {
          background-color: #dfebf9;
        }
      }
    }
    :deep(.el-progress-bar) {
      width: 1.7rem !important;
    }

    .no-progress-bg {
      :deep(.el-progress-bar) {
        .el-progress-bar__outer {
          background-color: #f9eadf;
        }
      }
    }
  }
}
</style>
