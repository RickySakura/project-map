<template>
  <div class="map-navigator">
    <div class="map-navigator-left">
      <img
        src="@/assets/img/logo.jpg"
        alt="广州教育地图资源"
        class="map-logo"
      />
      广州教育资源地图
    </div>
    <div class="map-navigator-center">
      <MapMenu />
    </div>
    <div class="map-navigator-right">
      <MapUpdateTime />
      <img
        src="@/assets/img/login/logout.png"
        alt="logout"
        class="map-logout-btn"
        @click="logout"
      />
    </div>
  </div>
</template>

<script>
import { apiHandleUserLogout } from "@/api/useLoginRequest";
export default {
  methods: {
    logout() {
      this.$confirm("确定退出登录？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        apiHandleUserLogout()
          .then(() => {
            sessionStorage.clear();
            this.$router.replace("/login");
            location.reload();
          })
          .catch((err) => {
            console.error("❌ ~ file: MapHeader.vue:41 ~ logout ~ err", err);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-navigator {
  // background: #052f4e;
  background: url("../../../../assets/img/header_bg.png");
  background-size: 100% 100%;
  height: 0.7rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.map-navigator-left {
  font-size: 0.24rem;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(#93cdfe, #fff);
  margin-left: 0.2rem;
  display: flex;
  align-items: center;
}

.map-navigator-center {
  display: flex;
}

.map-navigator-right {
  display: flex;
  align-items: center;
}

.map-logo {
  width: 0.32rem;
  height: 0.32rem;
  margin-right: 0.08rem;
  object-fit: cover;
  cursor: pointer;
}

.map-logout-btn {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.05rem;
  cursor: pointer;
}
</style>
