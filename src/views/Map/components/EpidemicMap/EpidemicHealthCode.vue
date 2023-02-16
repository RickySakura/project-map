<template>
  <div class="health-code">
    <div class="health-main bg-content">
      <div>
        <img src="@/assets/img/red-qr-code.png" alt="" />
        <div class="code-num">
          <span
            >红码人数<span class="red-qr-code">{{ redNum }}</span></span
          >
          <span>较昨日{{ redYesterday > 0 ? "+" : "" }}{{ redYesterday }}</span>
        </div>
      </div>
      <div>
        <img src="@/assets/img/yellow-qr-code.png" alt="" />
        <div class="code-num">
          <span
            >黄码人数<span class="yellow-qr-code">{{ yellowNum }}</span></span
          >
          <span
            >较昨日{{ yellowYesterday > 0 ? "+" : ""
            }}{{ yellowYesterday }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    redNum: [String, Number],
    yellowNum: [String, Number],
    redYesterday: [String, Number],
    yellowYesterday: [String, Number],
  },
};
</script>

<style lang="less" scoped>
.bg-content {
  background: url("/src/assets/img/epidemicMap/content-bg.png");
  background-size: 100% 100%;
}
.health-code {
  border-radius: 2px;
  overflow: hidden;

  .health-main {
    display: flex;
    padding: 0.533vw 0;
    .code-num {
      color: #fff;
    }
    & > div {
      flex: 1;
      display: flex;
      align-items: center;

      & > img {
        width: 0.14rem;
        height: 0.14rem;
        margin: 0 0.1rem 0 0.18rem;
      }

      .code-num {
        & > span {
          display: block;
        }

        & > span:nth-child(1) {
          margin-bottom: 0.04rem;
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff;

          & > span {
            margin-left: 0.04rem;
            font-size: 0.14rem;
            font-weight: 600;
          }
        }

        & > span:nth-child(2) {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #bec3d2;
        }

        .red-qr-code {
          color: #f12f2e;
        }

        .yellow-qr-code {
          color: #f4812e;
        }
      }
    }
  }
}
</style>
