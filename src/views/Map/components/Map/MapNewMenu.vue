<template>
  <div class="map-menu">
    <button
      class="map-menu-item"
      :class="{
        actived: addressId === item.addressId,
      }"
      v-for="item in menuList"
      :key="item.addressId"
      @click="handleClick(item.addressId)"
    >
      <span>{{ item.addressName }}</span>
    </button>
  </div>
</template>

<script>
import { useLocalData } from '@/api/useLocalData';
import { useMapStore } from '@/stores/mapStore';

export default {
  setup(props) {
    const store = useMapStore();

    const handleClick = (addressId) => {
      store.addressId = addressId;
      console.log(addressId);
    };
    let addressId = computed(() => store.addressId);
    return {
      addressId,
      handleClick,
    };
  },
  computed: {
    menuList() {
      return useLocalData('mapRes').mapDistrictBorderLatLngList.map((item) => {
        return {
          addressName: item.adressName || item.addressName || '',
          addressId: item.addressId,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
.map-menu {
  display: flex;
  height: 0.33rem;
  margin-top: 0.25rem;
  transform: translateX(.33rem);
}
.map-menu-item {
  width: 1rem;
  height: 0.39rem;
  background: linear-gradient(180deg, #044574 0%, #0e1620 100%);
  opacity: 0.8;
  border: 1px solid #0078ce;
  transform: skewX(-25deg);

  &.actived {
    background: linear-gradient(180deg, #1a8ede 0%, #043253 100%);
    box-shadow: 0px 2px 6px 1px rgba(24, 167, 249, 0.28);
    opacity: 1;
    border: 1px solid #0168b3;
  }

  & > span {
    display: inline-block;
    color: #fff;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular-, PingFangSC-Regular;
    line-height: 0;
    transform: skewX(25deg);
  }
}
</style>
