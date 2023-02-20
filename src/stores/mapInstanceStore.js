import { defineStore } from 'pinia';
import { toRaw, markRaw } from 'vue';

// 可独立配置每个标记点图标的具体参数对象,会覆盖后面的自动化导入,键名必须是文件名
const markOptions = {
  'adult-exam1': {
    color: '#dc292b',
  },
  'adult-exam2': {
    color: '#dc292b',
  },
  'adult-exam3': {
    color: '#dc292b',
  },
  'artistic-exam1': {
    color: '#dc292b',
  },
  'artistic-exam2': {
    color: '#dc292b',
  },
  'artistic-exam3': {
    color: '#dc292b',
  },
  exem1: {
    color: '#764ff8',
  },
  exem2: {
    color: '#f39150',
  },
  exem3: {
    color: '#f39150',
  },
  'graduate-exam': {
    color: '#dc292b',
  },
  normal: {
    color: '#764ff8',
  },
  'room-icon-blue': {
    color: '#764ff8',
  },
  'room-icon-green': {
    color: '#32d26d',
  },
  'room-icon-red': {
    color: '#dc292b',
  },
  'self-exam': {
    color: '#dc292b',
  },
  'teacher-exam': {
    color: '#dc292b',
  },
};

const modules = import.meta.glob(
  ['@/assets/img/marks/*.png', '@/assets/img/marks/*.jpg'],
  { eager: true, import: 'default' }
);
let markStyles = {};
let values = Object.values(modules);
values.forEach((src) => {
  if (typeof src !== 'string') return;
  let key = src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));
  let baseOption = {
    width: 20, // 点标记样式宽度（像素）
    height: 20, // 点标记样式高度（像素）
    src,
    offset: { x: 0, y: 30 },
    color: '#764ff8',
    strokeColor: 'rgb(255, 255, 255)',
    strokeWidth: 2,
  };
  Object.assign(baseOption, markOptions[key]);
  markStyles[key] = new TMap.MarkerStyle(baseOption);
});

export const useMapInstanceStore = defineStore('map-instance', {
  state: () => {
    return {
      // TMap的子类实例
      mapSchoolLayer: markRaw(
        new TMap.MultiMarker({
          map: null, //指定地图容器
          zIndex: 2,
          //样式定义
          styles: {
            ...markStyles,
          },
          enableCollision: true, // 开启碰撞
          geometries: [],
        })
      ),

      mapInfoWindow: markRaw(
        new TMap.InfoWindow({
          map: null,
          enableCustom: true,
          position: new TMap.LatLng(23.26152, 113.521604),
          content: '<div></div>',
          offset: { x: 0, y: -35 }, //设置信息窗相对position偏移像素
        })
      ),
    };
  },
  actions: {},
});
