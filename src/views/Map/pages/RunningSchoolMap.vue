<template>
  <div class="running-school-map map-tools-container">
    <LayoutMapView>
      <template #left-tool>
        <RunningSchoolLeftToolBar :style="leftToolStyle" />
        <div
          :class="['toggle-overlay-btn', isShowOverlay ? 'active' : '']"
          v-if="isMainRunningMap"
          @click="toggleDomOverlay"
        >
          办学信息
        </div>
      </template>

      <template #right-tool>
        <RunningSchoolRightToolBar
          :style="rightToolStyle"
        />
      </template>
    </LayoutMapView>
    <TheRunningDomOverlay v-if="isShowOverlay" />
    <TheRunningMultiMarker v-else />
  </div>
</template>

<script>
import { useMapStore } from '@/stores/mapStore';
export default {
  name: 'runningSchoolMap',
  data() {
    return {
      isShowOverlay: true,
      isMainRunningMap: true,
      leftToolStyle: {
        opacity: 0,
      },
      rightToolStyle: {
        transform: 'translateX(110%)',
      },
    };
  },
  computed: {
    addressId() {
      return useMapStore().addressId;
    },
  },
  mounted() {
    if (this.addressId !== '') {
      this.isShowOverlay = false;
      this.isMainRunningMap = false;
      this.showTools();
    }
    this.$watch(
      () => useMapStore().addressId,
      (val) => {
        if (val !== '') {
          this.isMainRunningMap = false;
          this.isShowOverlay = false;
          this.showTools();
        } else {
          this.isMainRunningMap = true;
          this.isShowOverlay = true;
          this.hideTools();
        }
      }
    );
  },
  methods: {
    toggleDomOverlay() {
      if (this.isShowOverlay) {
        this.showTools();
      } else {
        this.hideTools();
        let { map, mapProps } = useMapStore();
        let { center, zoom } = mapProps;
        map.easeTo(
          {
            center,
            zoom,
          },
          {
            duration: 500,
          }
        );
      }
      this.isShowOverlay = !this.isShowOverlay;
    },
    hideTools() {
      this.leftToolStyle.opacity = 0;
      this.rightToolStyle.transform = 'translateX(110%)';
    },
    showTools() {
      this.leftToolStyle.opacity = 1;
      this.rightToolStyle.transform = 'translateX(0)';
    },
  },
  beforeUnmount() {
    console.log('unmounted');
  },
};
</script>

<style lang="less" scoped>
.toggle-overlay-btn {
  position: fixed;
  color: #fff;
  z-index: 9;
  background-color: red;
  font-size: 0.2rem;
  // top: 1.5rem;
  // left: 0.5rem;
  left: 3.5rem;
  bottom: .2rem;
  cursor: pointer;
  height: 0.5rem;
  width: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.15rem;
  background: url('/src/assets/img/mapMenu/btn-bg2.png');
  background-size: 100% 100%;
  margin-right: 0.05rem;
  user-select: none;
  transition: background 300ms;
  -webkit-transition: background 300ms;
  -o-transition: background 300ms;

  &.active {
    background: url('/src/assets/img/mapMenu/btn-bg.png');
    background-size: 100% 100%;
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
