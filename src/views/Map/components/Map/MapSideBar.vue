<template>
  <div class="map-sidebar">
    <div
      :class="[
        'map-sidebar-item',
        addressId === item.addressId ? 'selected' : '',
      ]"
      v-for="item in slidebarList"
      :key="item.addressId"
      @click="handleSlideBarClick(item.addressId)"
    >
      {{ item.addressName }}
    </div>
  </div>
</template>

<script>
import { useMapStore } from '@/stores/mapStore';
import { mapWritableState } from 'pinia';
import { useLocalData } from '@/api/useLocalData';
export default {
  data() {
    return {
      slidebarList: [],
    };
  },
  computed: {
    ...mapWritableState(useMapStore, ['addressId']),
  },
  created() {
    this.slidebarList = useLocalData('mapRes').mapDistrictBorderLatLngList.map(
      (item) => {
        return {
          addressName: item.adressName || item.addressName || '',
          addressId: item.addressId,
        };
      }
    );
  },
  methods: {
    handleSlideBarClick(addressId) {
      this.addressId = addressId;
    },
  },
};
</script>

<style lang="less" scoped>
.map-sidebar {
  font-size: 0.14rem;
  position: relative;
  top: 0;
  left: 0;
  padding: 0.3rem 0;
  width: 0.9rem;
  height: calc(100vh - 0.54rem);
  // background: url('/src/assets/img/info-window-border.png') top right/34% 10% no-repeat,
  //   linear-gradient(270deg, #026fb3d7 0%,#01558ad7 30%, transparent 70%) no-repeat;
  // transform: scaleX(-1);
  background-color: #1a2338;
  box-shadow: 0px 3px 8px 0px rgba(148, 158, 180, 0.17);
}

.map-sidebar-item {
  width: 100%;
  padding: 0.14rem 0;
  font-weight: 400;
  text-align: center;
  color: #fff;
  border-top: 1px solid #0006;
  cursor: pointer;
  &:last-child {
    border-bottom: 1px solid #0006;
  }

  &.selected {
    position: relative;
    background-color: #0006;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      background-color: #027aff;
      height: 100%;
      width: 0.04rem;
    }
  }
}
</style>
