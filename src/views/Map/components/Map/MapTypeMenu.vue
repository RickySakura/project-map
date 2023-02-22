<!--
 * @ 创建人: 熊浩翔
 * @ 创建时间: 2023-02-21 17:54:41
 * @ 最后修改人: 熊浩翔
 * @ 最后修改时间: 2023-02-22 11:38:09
 * @ 描述: 地图类型切换菜单，就地图底部的那个菜单
 -->
<template>
  <div class="menu-container">
    <template v-for="(item, index) in menuList" :key="index">
      <router-link
        v-if="item.accessUserList.includes(activedUser)"
        class="type-menu-item"
        @click="handleMenuItemClick(item.en)"
        :to="{ name: item.en }"
      >
        <img :src="item.url" :alt="item.label" class="menu-icon" />
        <div class="menu-text">{{ item.label }}</div>
      </router-link>
    </template>
  </div>
</template>

<script setup>
import { useLocalData } from '@/api/useLocalData';
import getAssetsFile from '@/utils/getAssetsFile';
import { useMapStore } from '@/stores/mapStore';
import { useRouter } from 'vue-router';

const mapStore = useMapStore();
const router = useRouter();
let activedUser = sessionStorage.getItem('username');

// 如果不是 admin 用户则默认导航到考点地图
if (activedUser !== 'admin') {
  router.push({
    path: '/map/examination',
  });
}

let menuList = useLocalData('menuResNew').map((v) => {
  return {
    ...v,
    url: getAssetsFile(v.url),
  };
});
const handleMenuItemClick = (mapType) => {
  console.log('mapType', mapType);
  mapStore.mapType = mapType;
};
</script>

<style lang="less" scoped>
.menu-container {
  width: 7.1rem;
  display: flex;
  flex-wrap: wrap;
}
.type-menu-item {
  display: flex;
  align-items: center;
  width: 2.11rem;
  height: .64rem;
  background: url('/src/assets/img/mapMenu/btnbg-normal.png') no-repeat center
    center/100% 100%;
  padding: .1rem;
  cursor: pointer;
  margin: 0 .24rem .26rem 0;
  transition: background 200ms;

  &.router-link-active {
    background-image: url('/src/assets/img/mapMenu/btnbg-picked.png');
  }
}
.menu-icon {
  width: .58rem;
  height: .52rem;
}
.menu-text {
  font-size: .15rem;
  font-weight: bold;
  letter-spacing: .02rem;
  background-image: linear-gradient(180deg, #48f2e7 0%, #0d66b4 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  padding-left: .08rem;
}
</style>
