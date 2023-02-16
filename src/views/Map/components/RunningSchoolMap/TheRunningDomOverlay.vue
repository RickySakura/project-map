<template>
  <div v-for="(item, index) in districtInfos" :key="index">
    <MMesseageWindow
      :style="item.overlayDOM.style"
      ref="districtInfoWindow"
      v-if="item.addressId === currentDOMIndex"
      :lat="item.overlayDOM.lat"
      :lng="item.overlayDOM.lng"
      :offset="item.overlayDOM.offset || []"
      :class="`overlay-${item.addressId}`"
    >
      <template #content>
        {{ districtContents[currentDOMIndex] || item.overlayDOM.content }}
      </template>
    </MMesseageWindow>
  </div>
</template>

<script>
import { useLocalData } from '@/api/useLocalData';
import { useMapStore } from '@/stores/mapStore';
import districtBg from '@/assets/img/marks/district-bg.png';
import { apiGetEachDistrict } from '@/api/useRunningSchoolRequest';

function MDomOverlay(options) {
  TMap.DOMOverlay.call(this, options);
}
MDomOverlay.prototype = new TMap.DOMOverlay();

export default {
  data() {
    return {
      districtInfos: useLocalData('runningSchoolRes').runningDistrictInfos,
      districtContents: [],
      currentDOMIndex: 5,
      currentLineIndex: 10,
      overlayLinesArray: [],
    };
  },
  computed: {
    map() {
      return useMapStore().map;
    },
    addressId() {
      return useMapStore().addressId;
    },
  },
  mounted() {
    // 继承DOM覆盖类，重写updateDOM方法，在地图缩放或位移后会被调用，实时调整DOM元素的位置
    MDomOverlay.prototype.createDOM = () => {
      // 遍历区域数据，为每一个设置了overlayDOM的元素绘制线条
      this.districtInfos.forEach((item) => {
        if (item.overlayDOM) {
          // 线条路径
          let path = [
            new TMap.LatLng(item.lat, item.lng),
            new TMap.LatLng(item.overlayDOM.lat, item.overlayDOM.lng),
          ];
          let line = new TMap.MultiPolyline({
            map: this.map,
            zIndex: 15,
            styles: {
              solidLine: new TMap.PolylineStyle({
                color: '#8BE6EE',
                width: 2,
              }),
            },
            geometries: [
              {
                paths: path,
                styleId: 'solidLine',
              },
            ],
          });
          line.setVisible(false);
          this.overlayLinesArray.push(line);
        }
      });
      this.updateDOMOverlay();
      this.changeDomBanner(this.currentDOMIndex);
      return document.createElement('b');
    };
    MDomOverlay.prototype.updateDOM = this.updateDOMOverlay;
    new MDomOverlay({
      map: this.map,
    });

    // 新市区图标层
    this.centerPointLayer = new TMap.MultiMarker({
      map: this.map,
      styles: {
        default: new TMap.MarkerStyle({
          width: 60, // 宽度
          height: 23, // 高度
          anchor: { x: 30, y: 11 }, // 锚点位置
          src: districtBg, // 标注点图片url或base64地址
          color: '#5BEEFF', // 标注点文本颜色
          size: 12, // 标注点文本文字大小
        }),
      },
      geometries: (() => {
        return this.districtInfos.map((i) => {
          return {
            id: i.addressId,
            position: new TMap.LatLng(Number(i.lat), Number(i.lng)),
            content: i.name,
            properties: {
              //标注点的属性数据
              name: i.name,
              id: i.addressId,
            },
          };
        });
      })(),
    });
    this.getOverlayContent();
    this.centerPointLayer.on('click', (e) => {
      let { id } = e.geometry.properties;
      // 点击后，显示对应的区域 DOMOverlay 介绍
      this.changeDomBanner(id);
      // this.domBannerPause(this.pauseDelay)  // 临时取消轮播
      this.getOverlayContent();
    });
  },
  beforeUnmount() {
    this.centerPointLayer.setMap(null);
    this.centerPointLayer.destroy();
    this.overlayLinesArray.forEach((line) => {
      line.setMap(null);
      line.destroy();
    });
  },
  methods: {
    updateDOMOverlay() {
      this.$refs.districtInfoWindow.forEach(({ $el, $attrs }) => {
        let pixel = this.map.projectToContainer(
          new TMap.LatLng(Number($attrs.lat), Number($attrs.lng))
        );

        if ($attrs.offset.length > 0) {
          $el.style.transform = `translate(${
            pixel.getX() + $attrs.offset[0]
          }px, ${pixel.getY() + $attrs.offset[1]}px)`;
        } else {
          // 将移动坐标调整到DOM元素的中心点
          $el.style.transform = `translate(${
            pixel.getX() - $el.clientWidth / 2
          }px, ${pixel.getY() - $el.clientHeight / 2}px)`;
        }
        // this.resizeDOMOverlay(
        //   {
        //     width: window.innerWidth,
        //     height: window.innerHeight,
        //   },
        //   $el
        // );
      });
    },
    // 手动媒体查询
    resizeDOMOverlay({ width, height }, el = null) {
      if (width && height && el) {
        if (height <= 746) {
          el.style.transform += ' scale(0.65)';
        } else if (height > 746 && height <= 961) {
          let scale = 0.0007 * height + 0.13;
          el.style.transform += ` scale(${scale})`;
        } else if (height > 961) {
          el.style.transform += ' scale(1)';
        }
      }
    },
    // DOMOverlay 轮播用方法
    changeDomBanner(addressId) {
      this.currentDOMIndex = addressId;
      this.currentLineIndex = this.districtInfos.findIndex(
        (v) => v.addressId == addressId
      );
      this.overlayLinesArray.forEach((line) => {
        line.setVisible(false);
      });
      this.overlayLinesArray[this.currentLineIndex].setVisible(true);
      // DOMOverlay的位置更新，必须手动调用
      this.$nextTick(() => {
        this.updateDOMOverlay();
      });
    },
    showDomOverlay() {
      this.centerPointLayer.setVisible(true);
      this.overlayLinesArray[this.currentLineIndex].setVisible(true);
    },
    hideDomOverlay() {
      this.centerPointLayer.setVisible(false);
      this.overlayLinesArray.forEach((line) => line.setVisible(false));
      // 将DOM元素和线的指针重置为默认值
      this.currentDOMIndex = 5;
      this.currentLineIndex = 10;
    },
    getOverlayContent() {
      if (this.districtContents[this.currentDOMIndex] === undefined) {
        let loading = this.$loading();
        apiGetEachDistrict(this.currentDOMIndex)
          .then((res) => {
            this.districtContents[this.currentDOMIndex] = res.result;
          })
          .finally(loading.close);
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
