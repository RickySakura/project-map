<template>
  <div class="map-container" id="map-container"></div>
  <div class="map-left-border"></div>
  <TheMapBorderLine />
</template>

<script>
import { useMapStore } from '@/stores/mapStore';
import { mapWritableState } from 'pinia';
import { useLocalData } from '@/api/useLocalData';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(useMapStore, [
      'map',
      'mapRef',
      'mapType',
      'addressId',
      'mapProps',
    ]),
  },
  watch: {
    mapType() {
      let loading = this.$loading();
      let { center, zoom } = this.mapProps;
      this.mapRef.easeTo({
        zoom,
        center,
      });
      loading.close();
    },
    addressId() {
      let loading = this.$loading();
      setTimeout(() => {
        loading.close();
      }, 300);
    },
  },
  mounted() {
    let { sw, ne, center, zoom, minZoom, maxZoom, mapStyleId } =
      useLocalData('mapRes');
    this.mapRef = new TMap.Map('map-container', {
      mapStyleId,
      zoom, //设置地图缩放级别
      minZoom, //此处设置地图的缩放级别  最小值
      maxZoom, //此处设置地图的缩放级别  最大值
      center: new TMap.LatLng(center[0], center[1]), //设置地图中心点坐标
      boundary: new TMap.LatLngBounds(
        new TMap.LatLng(ne[0], ne[1]),
        new TMap.LatLng(sw[0], sw[1])
      ), // 设置地图边界范围
      rotatable: false,
      pitchable: false,
    });

    // 清除地图控件
    this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
    this.map.removeControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE);

    this.map
      .getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
      .setClassName('map-rotate-controller');
    document
      .getElementsByClassName('map-rotate-controller')[0]
      .addEventListener('click', () => {
        let { center: propCenter, zoom: propZoom } = this.mapProps;
        this.$nextTick(() => {
          this.mapRef.easeTo({
            center: propCenter,
            zoom: propZoom,
          });
        });
      });
  },
};
</script>

<style lang="less" scoped>
.map-container {
  height: 100%;
  z-index: 1;
}
.map-left-border {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 0.3rem 0;
  width: 0.9rem;
  height: calc(100vh - 0.54rem);
  background: url('/src/assets/img/info-window-border.png') top right/34% 10% no-repeat,
    linear-gradient(270deg, #026fb3d7 0%,#01558ad7 30%, transparent 70%) no-repeat;
}
</style>
