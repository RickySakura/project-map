import merge from "lodash.merge";
import * as echarts from "echarts";
import { markRaw } from 'vue'

export default {
  data() {
    return {
      chart: null,
      timeOut: null,
      option: {},
      baseOption: {}
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    // this.$bus.$on('resizeEchart', () => {
    //   this.handleResize()
    // })
  },
  beforeDestroy() {
    clearTimeout(this.timeOut);
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
      window.removeEventListener("resize", this.handleResize);
    }
  },
  methods: {
    immediateResize() { },
    handleResize() {
      clearTimeout(this.timeOut);
      this.timeOut = this.chart ? setTimeout(() => this.chart.resize(), 500) : null;
    },
    // 设置Echart的初始选项
    setBaseOption(baseOption) {
      this.baseOption = JSON.parse(JSON.stringify(baseOption))
      this.option = JSON.parse(JSON.stringify(baseOption))
    },
    // 将额外选项混入进初始选项
    mergeToBaseOption(extraOption) {
      this.baseOption = merge({}, this.baseOption, extraOption)
      return this
    },
    // 将额外选项混入进当前选项
    mergeToOption(extraOption) {
      this.option = merge({}, this.option, extraOption)
      return this
    },
    // 提供给外部父组件的方法，用于设置自定义的配置，可不断累加，并不是init初始化的意思
    initChart(extraOption) {
      this.mergeToOption(extraOption);
      if (!this.chart) {
        this.chart = markRaw(echarts.init(this.$el));
      }
      this.chart.setOption(this.option, {
        notMerge: true
      });
      return this
    },
    // 还原baseOption
    clearOption() {
      this.option = JSON.parse(JSON.stringify(this.baseOption))
      return this
    }
  },
}