<template>
  <div class="epidemic-center-toolbar__wrapper">
    <div class="item">
      <img src="@/assets/img/epidemicMap/stuff-positive.png" alt="" />
      <div class="info">
        <div class="title">学生阳性总人数</div>
        <div class="number red">
          <span class="num red">{{ bad }}</span> 较昨日<span
            class="yesterday"
            >{{ yesterdayFormatter(yesterdayBad) }}</span
          >
        </div>
      </div>
    </div>
    <div class="item">
      <img src="@/assets/img/epidemicMap/code-red.png" alt="" />
      <div class="info">
        <div class="title">学生红码总人数</div>
        <div class="number red">
          <span class="num red">{{ red }}</span> 较昨日<span
            class="yesterday"
            >{{ yesterdayFormatter(yesterdayRed) }}</span
          >
        </div>
      </div>
    </div>
    <div class="item">
      <img src="@/assets/img/epidemicMap/code-yellow.png" alt="" />
      <div class="info">
        <div class="title">学生黄码总人数</div>
        <div class="number">
          <span class="num yellow">{{ yellow }}</span> 较昨日<span
            class="yesterday"
            >{{ yesterdayFormatter(yesterdayYellow) }}</span
          >
        </div>
      </div>
    </div>
    <div class="item">
      <img src="@/assets/img/epidemicMap/stuff-fever.png" alt="" />
      <div class="info">
        <div class="title">学生发热总人数</div>
        <div class="number">
          <span class="num yellow">{{ fever }}</span> 较昨日<span
            class="yesterday"
            >{{ yesterdayFormatter(yesterdayFever) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetAbnormalReport } from "@/api/useEpidemicMapRequest";
import { mapState } from "pinia";
import { useMapStore } from "@/stores/mapStore";
export default {
  data() {
    return {
      bad: 0,
      yesterdayBad: 0,
      red: 0,
      yesterdayRed: 0,
      yellow: 0,
      yesterdayYellow: 0,
      fever: 0,
      yesterdayFever: 0,
    };
  },
  computed: {
    ...mapState(useMapStore, ["addressId"]),
  },
  watch: {
    addressId() {
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let loading = this.$loading({
        target: ".epidemic-center-toolbar__wrapper",
      });
      apiGetAbnormalReport(this.addressId)
        .then(({ result }) => {
          const today = result.dailyData[0];
          const yesterday = result.increment;

          let {
            feverNumber: f1,
            redNumber: r1,
            yellowNumber: y1,
            positiveNum: p1,
          } = today;
          let {
            feverNumber: f2,
            redNumber: r2,
            yellowNumber: y2,
            positiveNum: p2,
          } = yesterday;

          this.bad = p1;
          this.red = r1;
          this.yellow = y1;
          this.fever = f1;

          this.yesterdayBad = p2;
          this.yesterdayRed = r2;
          this.yesterdayYellow = y2;
          this.yesterdayFever = f2;
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: EpidemicCenterToolBar.vue:117 ~ getData ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    yesterdayFormatter(num) {
      if (num > 0) {
        return `+${num}`;
      } else {
        return num;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.epidemic-center-toolbar__wrapper {
  display: flex;
  justify-content: center;
  padding-top: 0.1rem;
  // 设置最小宽度可能有元素遮挡问题
  // min-width: 11rem;
  transition: transform 300ms, opacity 300ms;
  .item {
    display: flex;
    width: 2.8rem;
    padding: 0.01rem;
    margin: 0 0.05rem;
    background: #0e4169;
    opacity: 1;
    border: 1px solid #01accf;
    border-radius: 4px;
    img {
      width: 25%;
      object-fit: contain;
    }
  }
  .info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      font-size: 0.15rem;
      font-weight: 400;
      color: #fff;
    }
    .number {
      font-weight: 400;
      color: #8e9096;
      .num {
        font-size: 0.24rem;
        font-weight: 600;
      }
      .red {
        color: #f12f2e;
      }
      .yesterday {
        color: #fff;
      }
      .yellow {
        color: #f4812e;
      }
    }
  }
}
</style>
