<!--
 * @ 创建人: 熊浩翔
 * @ 创建时间: 2023-02-05 14:24:54
 * @ 最后修改人: 熊浩翔
 * @ 最后修改时间: 2023-02-14 17:45:00
 * @ 描述: 办学地图中的点位控制及其事件
 -->
<template></template>
<script>
import multiMarkerMixin from '@/mixins/multiMarkerMixin';
import { useRunningTypeFilter } from '@/hooks/useFilter';

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
    selectedSchool(newSchool) {
      // 2023 2 14 修改,当点击了被过滤掉的点位时,将其重新添加回点位列表中,使其重新显示在地图上
      let schoolList = useRunningTypeFilter(this.schoolList);
      schoolList.push(newSchool);
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
