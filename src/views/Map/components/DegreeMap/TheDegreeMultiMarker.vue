<!--
 * @ 创建人: 熊浩翔
 * @ 创建时间: 2023-02-05 14:24:53
 * @ 最后修改人: 熊浩翔
 * @ 最后修改时间: 2023-02-14 17:45:02
 * @ 描述: 学位监测地图中的点位控制及其事件
 -->
<template></template>
<script>
import { useRunningTypeFilter } from '@/hooks/useFilter';
import multiMarkerMixin from '@/mixins/multiMarkerMixin';

export default {
  mixins: [multiMarkerMixin],
  data() {
    return {};
  },
  computed: {
    selectedSchool() {
      return this.runningSchool.selectedSchool;
    },
    schoolList() {
      return this.runningSchool.schoolList;
    },
  },
  watch: {
    schoolList(v) {
      this.setRunningSchoolMark();
    },
    addressId() {
      this.infoWindow.close();
      this.setRunningSchoolMark();
    },
    // 当左侧工具栏中的Division点击后,改变了当前选中学校时触发
    selectedSchool(newSchool) {
      // 2023 2 14 修改,当点击了被过滤掉的点位时,将其重新添加回点位列表中,使其重新显示在地图上
      let schoolList = useRunningTypeFilter(this.schoolList);
      schoolList.push(newSchool)
      this.schoolLayerSetGeometries(schoolList);

      this.setInfoWindowBySchoolId(newSchool.id || newSchool.schoolId);
    },
  },
  mounted() {
    this.setRunningSchoolMark();
    this.schoolLayer.setMap(this.map);
  },
  methods: {
    setRunningSchoolMark() {
      // 2023 2 14 修改，过滤教育培训机构
      let schoolList = useRunningTypeFilter(this.schoolList);
      this.schoolLayerSetGeometries(schoolList);
      // this.schoolLayerSetGeometries(this.schoolList);
    },
  },
};
</script>
