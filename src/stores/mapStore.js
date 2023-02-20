import { defineStore } from 'pinia';
import { markRaw, toRaw } from 'vue';

export const useMapStore = defineStore('map', {
  state: () => {
    return {
      // TMap实例
      mapRef: null, // 地图实例 TMap.map
      // 普通实例
      mapType: '', // 地图类型
      addressId: '', // 区域ID
      // 集团地图专用
      group: {
        officeId: null,
        officeType: 1,
        selectedSchool: null,
      },
      runningSchool: {
        schoolList: [],
        selectedSchool: null,
      },
      epidemic: {
        schoolList: [],
        selectedSchool: null,
        areaCategory: 3,
      },
      degree: {},
      examination: {
        schoolList: [],
        selectedSchool: null,
        examSiteType: 1, // 考点类型
      },
      navigation: {
        schoolList: [],
      },
      mapProps: {},
    };
  },
  getters: {
    map() {
      return toRaw(this.mapRef);
    },
  },
  actions: {
    getMap() {
      return toRaw(this.map);
    },
    resetGroup() {
      this.group = {
        officeId: null,
        officeType: 1,
      };
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['addressId'], // 配置需要持久化保存的状态
  },
});
