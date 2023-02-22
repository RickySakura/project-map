<template>
  <div class="map-menu">
    <div v-for="item in menuList" :key="item.label">
      <router-link
        v-if="item.accessUserList.includes(activedUser)"
        class="map-menu-item"
        @click="handleMenuItemClick(item.en)"
        :to="{ name: item.en }"
      >
        <img :src="item.url" :alt="item.label" />
        <span>{{ item.label }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useLocalData } from '@/api/useLocalData';
import { useMapStore } from '@/stores/mapStore';
import getAssetsFile from '@/utils/getAssetsFile';
export default {
  setup() {
    const mapStore = useMapStore();
    return {
      mapStore,
    };
  },
  data() {
    return {
      menuList: [],
      activedUser: sessionStorage.getItem('username'),
    };
  },
  created() {
    this.menuList = useLocalData('menuRes').map(v => { 
      return {
        ...v,
        url: getAssetsFile(v.url)
      }
    });
    // 如果不是 admin 用户则默认导航到考点地图
    if (this.activedUser !== 'admin') {
      this.$router.push({
        path: '/map/examination',
      });
    }
  },
  methods: {
    handleMenuItemClick(mapType) {
      console.log('mapType', mapType);
      this.mapStore.mapType = mapType;
    },
  },
};
</script>

<style lang="less" scoped>
.map-menu {
  display: flex;
  height: 0.33rem;
  margin-top: 0.4rem;
}
.map-menu-item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 0.15rem;
  background: url('@/assets/img/mapMenu/btn-bg2.png') center/100% 100%;
  margin-right: 0.05rem;
  cursor: pointer;
  transition: background 200ms;

  &.router-link-active {
    background-image: url('@/assets/img/mapMenu/btn-bg.png');
    span {
      -webkit-text-fill-color: white !important;
      color: white !important;
    }
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
