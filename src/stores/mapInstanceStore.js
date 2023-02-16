import { defineStore } from 'pinia'
import { toRaw, markRaw } from 'vue'
import roomIconBlue from "@/assets/img/marks/room-icon-blue.png";
import roomIconGreen from "@/assets/img/marks/room-icon-green.png";
import roomIconRed from "@/assets/img/marks/room-icon-red.png";
import exem1 from '@/assets/img/marks/exem1.png'
import exem2 from '@/assets/img/marks/exem2.png'
import exem3 from '@/assets/img/marks/exem3.png'
import adultExamIcon from '@/assets/img/examinationMap/adult-exam.png'
import adultExamIcon2 from '@/assets/img/examinationMap/adult-exam2.png'
import adultExamIcon3 from '@/assets/img/examinationMap/adult-exam3.png'
import selfExamIcon from '@/assets/img/examinationMap/self-exam.png'
import teacherExamIcon from '@/assets/img/examinationMap/teacher-exam.png'
import artisticExamIcon from '@/assets/img/examinationMap/artistic-exam.png'
import artisticExamIcon2 from '@/assets/img/examinationMap/artistic-exam2.png'
import artisticExamIcon3 from '@/assets/img/examinationMap/artistic-exam3.png'
import graduateExamIcon from '@/assets/img/examinationMap/graduate-exam.png'

export const useMapInstanceStore = defineStore('map-instance', {
  state: () => {
    return {
      // TMap的子类实例
      mapSchoolLayer: markRaw(new TMap.MultiMarker({
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
            color: "#764ff8",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          // 市属学校样式
          municipalSchool: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: roomIconBlue,
            offset: { x: 0, y: 30 },
            color: "#764ff8",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          // 区属学校样式
          boroughSchool: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: roomIconGreen,
            offset: { x: 0, y: 30 },
            color: "#32d26d",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          // 核心学校样式
          coreSchool: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: roomIconRed,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          exemStyle1: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            offset: { x: 0, y: 30 },
            color: "#764ff8",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
            src: exem1,
          }),
          exemStyle2: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            offset: { x: 0, y: 30 },
            color: "#f39150",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
            src: exem2,
          }),
          exemStyle3: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            offset: { x: 0, y: 30 },
            color: "#f39150",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
            src: exem3,
          }),
        },
        enableCollision: true, // 开启碰撞
        geometries: [],
      })),

      mapExaminationSchoolLayer: markRaw(new TMap.MultiMarker({
        map: null, //指定地图容器
        zIndex: 2,
        //样式定义
        styles: {
          adultCollegeExam1: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: adultExamIcon,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          adultCollegeExam2: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: adultExamIcon2,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          adultCollegeExam3: new TMap.MarkerStyle({
            width: 20, // 点标记样式宽度（像素）
            height: 20, // 点标记样式高度（像素）
            src: adultExamIcon3,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          selfExam: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: selfExamIcon,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          teachingExam: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: teacherExamIcon,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          artisticExam1: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: artisticExamIcon,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          artisticExam2: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: artisticExamIcon2,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          artisticExam3: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: artisticExamIcon3,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
          graduateExam: new TMap.MarkerStyle({
            width: 20,
            height: 20,
            src: graduateExamIcon,
            offset: { x: 0, y: 30 },
            color: "#dc292b",
            strokeColor: "rgb(255, 255, 255)",
            strokeWidth: 2,
          }),
        },
        enableCollision: false, // 开启碰撞
        geometries: [],
      })),

      mapInfoWindow: markRaw(new TMap.InfoWindow({
        map: null,
        enableCustom: true,
        position: new TMap.LatLng(23.26152, 113.521604),
        content: "<div></div>",
        offset: { x: 0, y: -35 }, //设置信息窗相对position偏移像素
      }))
    }
  },
  actions: {

  }
})
