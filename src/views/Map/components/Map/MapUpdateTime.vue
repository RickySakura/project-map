<template>
  <div class="map-update-time">数据更新时间：{{ time }}</div>
</template>

<script>
import { apiGetUpdateTime } from "@/api/useCommonRequest";
export default {
  data() {
    return {
      time: "",
    };
  },
  methods: {
    formatDate(date) {
      let time = date ? new Date(date) : new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      // 为小于10的数字补0，比如 01：08
      let formatter = (num) => {
        return num < 10 ? "0" + num : num;
      };
      return (
        y +
        "年" +
        formatter(m) +
        "月" +
        formatter(d) +
        "日 " +
        formatter(h) +
        ":" +
        formatter(mm) +
        ":" +
        formatter(s)
      );
    },
  },
  mounted() {
    apiGetUpdateTime()
      .then((res) => {
        this.time = this.formatDate(res.result.updateTimeInPC);
      })
      .catch((err) =>
        console.error("❌ ~ file: MapUpdateTime.vue:47 ~ mounted ~ err", err)
      );
  },
};
</script>

<style lang="less" scoped>
.map-update-time {
  display: flex;
  align-items: center;
  font-weight: 400;
  color: #acd3ff;
}
</style>
