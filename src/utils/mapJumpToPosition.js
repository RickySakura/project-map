import { useMapStore } from "@/stores/mapStore";
const mapStore = useMapStore()


/**
 * 地图公用方法，给定一个TMap.LatLng类型的坐标，将地图定位并缩放到坐标点
 * @param {TMap.LatLng} latlng 需要跳转到的坐标点，必须是TMap.LatLng类型的变量
 * @param {number} zoom 需要缩放的层级，默认为16
 */
export function mapJumpToPosition(latlng, zoom = 16) {
  mapStore?.map?.easeTo({
    center: latlng,
    zoom
  })
}