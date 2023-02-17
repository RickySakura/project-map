import { defineStore } from 'pinia';
import { toRaw, markRaw } from 'vue';
import roomIconBlue from '@/assets/img/marks/room-icon-blue.png';
import roomIconGreen from '@/assets/img/marks/room-icon-green.png';
import roomIconRed from '@/assets/img/marks/room-icon-red.png';
import exem1 from '@/assets/img/marks/exem1.png';
import exem2 from '@/assets/img/marks/exem2.png';
import exem3 from '@/assets/img/marks/exem3.png';
import adultExamIcon from '@/assets/img/examinationMap/adult-exam.png';
import adultExamIcon2 from '@/assets/img/examinationMap/adult-exam2.png';
import adultExamIcon3 from '@/assets/img/examinationMap/adult-exam3.png';
import selfExamIcon from '@/assets/img/examinationMap/self-exam.png';
import teacherExamIcon from '@/assets/img/examinationMap/teacher-exam.png';
import artisticExamIcon from '@/assets/img/examinationMap/artistic-exam.png';
import artisticExamIcon2 from '@/assets/img/examinationMap/artistic-exam2.png';
import artisticExamIcon3 from '@/assets/img/examinationMap/artistic-exam3.png';
import graduateExamIcon from '@/assets/img/examinationMap/graduate-exam.png';

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
let srcs = {};
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
  srcs[key] = new TMap.MarkerStyle(baseOption);
});
console.log(srcs);

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
            // 默认样式
            normal: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: roomIconBlue,
              offset: { x: 0, y: 30 },
              color: '#764ff8',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            // 市属学校样式
            municipalSchool: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: roomIconBlue,
              offset: { x: 0, y: 30 },
              color: '#764ff8',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            // 区属学校样式
            boroughSchool: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: roomIconGreen,
              offset: { x: 0, y: 30 },
              color: '#32d26d',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            // 核心学校样式
            coreSchool: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: roomIconRed,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            exemStyle1: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              offset: { x: 0, y: 30 },
              color: '#764ff8',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
              src: exem1,
            }),
            exemStyle2: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              offset: { x: 0, y: 30 },
              color: '#f39150',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
              src: exem2,
            }),
            exemStyle3: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              offset: { x: 0, y: 30 },
              color: '#f39150',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
              src: exem3,
            }),
            adultCollegeExam1: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: adultExamIcon,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            adultCollegeExam2: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: adultExamIcon2,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            adultCollegeExam3: new TMap.MarkerStyle({
              width: 20, // 点标记样式宽度（像素）
              height: 20, // 点标记样式高度（像素）
              src: adultExamIcon3,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            selfExam: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: '/src/assets/img/examinationMap/self-exam.png',
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            teachingExam: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: teacherExamIcon,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            artisticExam1: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: artisticExamIcon,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            artisticExam2: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: artisticExamIcon2,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            artisticExam3: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: artisticExamIcon3,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
            graduateExam: new TMap.MarkerStyle({
              width: 20,
              height: 20,
              src: graduateExamIcon,
              offset: { x: 0, y: 30 },
              color: '#dc292b',
              strokeColor: 'rgb(255, 255, 255)',
              strokeWidth: 2,
            }),
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
