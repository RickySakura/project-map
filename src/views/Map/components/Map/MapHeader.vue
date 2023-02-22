<template>
  <div class="map-navigator">
    <div class="map-navigator-left">
      <img
        src="@/assets/img/logo.jpg"
        alt="广州教育地图资源"
        class="map-logo"
      />
      <div class="map-title">广州教育资源地图</div>
    </div>
    <div class="map-navigator-center">
      <!-- <MapMenu /> -->
      <MapNewMenu />
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
import { apiHandleUserLogout } from '@/api/useLoginRequest';
export default {
  methods: {
    logout() {
      this.$confirm('确定退出登录？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        apiHandleUserLogout()
          .then(() => {
            sessionStorage.clear();
            this.$router.replace('/login');
            location.reload();
          })
          .catch((err) => {
            console.error('❌ ~ file: MapHeader.vue:41 ~ logout ~ err', err);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-navigator {
  // background: #052f4e;
  background: url('/src/assets/img/header_bg.png') no-repeat top left;
  background-size: 92% 110%;
  height: 0.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.map-navigator-left {
  margin-left: 0.2rem;
  margin-right: 0.15rem;
  display: flex;
  align-items: center;
}
.map-title {
  font-size: 0.3rem;
  font-weight: 400;
  letter-spacing: 0.01rem;
  padding-bottom: 0.05rem;
}

.map-navigator-center {
  display: flex;
}

.map-navigator-right {
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

.map-logo {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.22rem;
  margin-left: .05rem;
  object-fit: cover;
  cursor: pointer;
}

.map-logout-btn {
  width: 0.2rem;
  height: 0.2rem;
  margin-left: 0.05rem;
  margin-right: 0.1rem;
  cursor: pointer;
}
</style>
