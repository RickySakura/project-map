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
// 这里必须同时遍历 modules 的 key和value，应为import.meta.glob导入的如果是图片的话 value 会被编译成url或者base64格式，所以
// 不能作为直接参照修改，必须还要借助modules 的key，因为key是不会被编译的！！！
Object.entries(modules).forEach(([key, value]) => { 
  let styleKey = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
  let baseOption = {
    width: 13, // 点标记样式宽度（像素）
    height: 13, // 点标记样式高度（像素）
    src: value,
    offset: { x: 0, y: 30 },
    color: '#764ff8',
    strokeColor: 'rgb(255, 255, 255)',
    strokeWidth: 2,
  };
  Object.assign(baseOption, markOptions[styleKey]);
  markStyles[styleKey] = new TMap.MarkerStyle(baseOption);
})

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
