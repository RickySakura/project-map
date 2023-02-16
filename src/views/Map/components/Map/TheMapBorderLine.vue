<script>
// 地图边框线控制器, 随addressId的状态而变化, 调整地图的缩放zoom大小

import { useMapStore } from '@/stores/mapStore';
import { useLocalData } from '@/api/useLocalData';
import { mapWritableState } from 'pinia';

// 地图边框实例 TMap.MultiPolyline
let { mapDistrictBorderLatLngList, mapDistrictOptions } =
  useLocalData('mapRes');

function getPath(codeList) {
  if (!Array.isArray(codeList)) return;
  let paths = [];
  codeList.forEach((latlng) => {
    paths = paths.concat(latlng);
  });
  return paths;
}

export default {
  data() {
    return {
      mapBorderLine: null,
    };
  },
  computed: {
    ...mapWritableState(useMapStore, ['map', 'addressId', 'mapProps']),
  },
  watch: {
    map: {
      handler() {
        // this.mapBorderLine?.setMap(this.map);
        this.map && this.mapBorderLine?.addTo(this.map);
      },
    },
    addressId: {
      handler(addressId) {
        // this.mapBorderLine?.setMap(null);
        // this.mapBorderLine?.destroy();

        // 绘制地图边界
        // this.mapBorderLine = new TMap.MultiPolygon({
        //   map: this.map,
        //   zIndex: 90,
        //   styles: {
        //     default: new TMap.PolygonStyle({
        //       color: 'rgba(55, 119, 255, 0.2)',
        //     }),
        //     district: new TMap.PolygonStyle({
        //       color: 'rgba(55, 119, 255, 0.3)',
        //     }),
        //   },
        //   geometries: (() => {
        //     if (addressId === '') {
        //       return mapDistrictBorderLatLngList.map((item) => {
        //         return {
        //           id: item.addressId,
        //           paths: item.codeList.map((latlng) => {
        //             return new TMap.LatLng(latlng[0], latlng[1]);
        //           }),
        //         };
        //       });
        //     } else {
        //       return [
        //         {
        //           id: addressId,
        //           styleId: 'district',
        //           paths: mapDistrictBorderLatLngList
        //             ?.find((item) => item.addressId === addressId)
        //             ?.codeList?.map((latlng) => {
        //               return new TMap.LatLng(latlng[0], latlng[1]);
        //             }),
        //         },
        //       ];
        //     }
        //   })(),
        // });

        this.mapBorderLine?.remove();
        this.mapBorderLine?.destroy();
        let fillColor = new TMap.GradientColor({
          stops: {
            0: 'rgba(62, 183, 217, 0.5)',
            0.25: 'rgba(17, 42, 69, 0.5)',
            0.8: 'rgba(17, 42, 69, 0.5)',
            1: 'rgba(62, 183, 217, 0.5)',
          },
          angle: 260,
        });
        this.mapBorderLine = new TMap.visualization.Area({
          styles: {
            // 设置区域图样式
            default: {
              fillColor,
              // fillColor: '#0f2a45',
              strokeColor: 'rgba(78, 212, 243, 0.9)',
              strokeWidth: 2,
            },
            district: {
              fillColor: 'rgba(17, 42, 69, 0.5)',
              strokeColor: 'rgba(78, 212, 243, 0.9)',
              strokeWidth: 2,
            },
          },
          enableBloom: true,
        });
        let paths = (() => {
          if (addressId === '') {
            return mapDistrictBorderLatLngList.map((item) => {
              return {
                path: getPath(item.codeList),
                styleId: item.addressId ? 'district' : 'default',
              };
            });
          } else {
            return [
              {
                path: getPath(
                  mapDistrictBorderLatLngList?.find(
                    (item) => item.addressId === addressId
                  )?.codeList
                ),
              },
            ];
          }
        })();
        // 区域图实例的 addTo 方法必须确保在 map 实例化之后调用,否则会报错
        this.mapBorderLine.setData(paths);
        this.map && this.mapBorderLine.addTo(this.map);

        // 调整地图缩放和中心点
        let { center, zoom } = mapDistrictOptions.find(
          (item) => item.addressId === addressId
        );
        this.mapProps = {
          center,
          zoom,
        };

        this.$nextTick(() => {
          this.map?.easeTo({
            center: new TMap.LatLng(center[0], center[1]),
            zoom,
          });
        });
      },
      immediate: true,
    },
  },
  render() {},
};
</script>
