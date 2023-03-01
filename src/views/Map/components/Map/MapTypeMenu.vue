<!--
 * @ 创建人: 熊浩翔
 * @ 创建时间: 2023-02-21 17:54:41
 * @ 最后修改人: 熊浩翔
 * @ 最后修改时间: 2023-03-01 16:58:52
 * @ 描述: 地图类型切换菜单，就地图底部的那个菜单
 -->
<template>
  <div class="menu-container">
    <div class="menu-wrapper">
      <template v-for="(item, index) in menuList" :key="index">
        <div
          :class="{
            'type-menu-item': true,
            actived: itemActived === index,
          }"
          v-if="item.children"
          @click="handleMenuItemClick(item, index)"
        >
          <img :src="item.icon" :alt="item.label" class="menu-icon" />
          <div
            class="menu-text"
            :style="item.label.length > 7 ? menuTextStyle : ''"
          >
            {{ item.label }}
          </div>
        </div>

        <a v-if="item.aHref" :href="item.aHref" class="type-menu-item">
          <img :src="item.icon" :alt="item.label" class="menu-icon" />
          <div
            class="menu-text"
            :style="item.label.length > 7 ? menuTextStyle : ''"
          >
            {{ item.label }}
          </div>
        </a>
      </template>
    </div>
    <div class="menu-wrapper" v-if="subMenuList.length > 0">
      <template v-for="(item, index) in subMenuList" :key="index">
        <a
          v-if="item.aHref"
          :href="item.aHref"
          :style="[item.itemStyle]"
          class="type-menu-item sub-menu-item"
          target="blank"
        >
          <img :src="item.icon" :alt="item.label" class="menu-icon" />
          <div
            class="menu-text"
            :style="item.label.length > 5 ? subMenuTextStyle : ''"
          >
            {{ item.label }}
          </div>
        </a>

        <router-link
          v-if="item.route"
          class="type-menu-item sub-menu-item"
          :style="[item.itemStyle]"
          @click="handleSubItemClick(item.route)"
          :to="{ name: item.route }"
        >
          <img :src="item.icon" :alt="item.label" class="menu-icon" />
          <div
            class="menu-text"
            :style="[item.label.length > 5 ? subMenuTextStyle : '', item.textStyle]"
          >
            {{ item.label }}
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useLocalData } from '@/api/useLocalData';
import getAssetsFile from '@/utils/getAssetsFile';
import { useMapStore } from '@/stores/mapStore';
import { useRouter } from 'vue-router';

const mapStore = useMapStore();
const router = useRouter();

// 如果不是 admin 用户则默认导航到考点地图
// let activedUser = sessionStorage.getItem('username');
// if (activedUser !== 'admin') {
//   router.push({
//     path: '/map/examination',
//   });
// }

// 处理静态图片路径
const handleAssetsMapper = (v) => {
  return {
    ...v,
    icon: getAssetsFile(v.icon),
  };
};
// 一级菜单
let menuList = useLocalData('mapTypeList').map(handleAssetsMapper);
let itemActived = ref(0);

// 二级菜单
let subMenuList = ref([]);
subMenuList.value =
  menuList[0].children && menuList[0].children.map(handleAssetsMapper);

const handleMenuItemClick = (item, index) => {
  if (item.children) {
    itemActived.value = index;
    subMenuList.value = item.children.map(handleAssetsMapper);
    return;
  }
};
const handleSubItemClick = (mapType) => (mapStore.mapType = mapType);

// 处理menuText的特殊样式，适应宽度
const menuTextStyle = {
  'letter-spacing': '0.02rem',
  // 'font-size': '0.12rem',
  'padding-left': 0,
  'width': '.8rem'
};
const subMenuTextStyle = {
  // 'letter-spacing': 0,
  'transform-origin': 'left',
  transform: 'scale(0.86)',
  width: 'auto'
};
</script>

<style lang="less" scoped>
.menu-container {
  // width: 7.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: .15rem;
}
.menu-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.type-menu-item {
  display: flex;
  align-items: center;
  width: 2.1rem;
  height: 0.6rem;
  background: url('/src/assets/img/mapMenu/btnbg-normal.png') no-repeat center
    center/100% 100%;
  // padding: 0.1rem;
  cursor: pointer;
  margin: 0 0.05rem 0.12rem 0;
  transition: background 200ms;
  user-select: none;
  cursor: pointer;

  &.actived,
  &.router-link-active {
    background-image: url('/src/assets/img/mapMenu/btnbg-picked.png');
    .menu-text {
      color: #fff;
    }
  }

}
.sub-menu-item {
  // margin: 0 -.1rem 0.26rem 0;
  width: 1.21rem;
  height: 0.45rem;

  .menu-text {
    letter-spacing: 0.01rem;
    font-size: .15rem;
    width: .5rem;
  }
  .menu-icon {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0;
  }
}
.menu-icon {
  width: 0.52rem;
  height: 0.5rem;
  margin-left: 0.06rem;
  margin-right: 0.15rem;
  box-sizing: border-box;
}
.menu-text {
  font-size: 0.16rem;
  font-weight: bold;
  letter-spacing: 0.05rem;
  background-image: linear-gradient(180deg, #48f2e7 0%, #0d66b4 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 0.1rem;
  transition: color 200ms;
}
</style>
