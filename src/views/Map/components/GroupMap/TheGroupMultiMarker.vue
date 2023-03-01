<template>
  <div class="control-btn">
    <div class="btn-content">
      <img
        src="/src/assets/img/select-icon.png"
        @click="toggleNameShow"
        v-show="!showSchoolName"
      />
      <img
        src="/src/assets/img/selected-icon.png"
        @click="toggleNameShow"
        v-show="showSchoolName"
      />
      <span class="name">{{
        showSchoolName ? '隐藏学校名称' : '显示学校名称'
      }}</span>
    </div>
  </div>
</template>

<script>
import { apiGetGroupSchool } from '@/api/useGroupMapRequest';
import multiMarkerMixin from '@/mixins/multiMarkerMixin';

export default {
  mixins: [multiMarkerMixin],
  data() {
    return {
      municipal: true, // 标记当前是否为市属学校
      showSchoolName: false, // 是否显示学校名,true为显示
    };
  },
  computed: {
    officeType() {
      return this.group.officeType;
    },
    selectedSchool() {
      return this.group.selectedSchool;
    },
  },
  watch: {
    map(newValue) {
      if (newValue) {
        this.setGroupSchoolMark();
      }
    },
    officeType() {
      // this.showSchoolName = true;
      this.showSchoolName = false;
      this.infoWindow.close();
      this.setGroupSchoolMark();
    },
    addressId() {
      // this.showSchoolName = true;
      this.showSchoolName = false;
      this.infoWindow.close();
      this.setGroupSchoolMark();
    },
    selectedSchool(newSchool) {
      this.setInfoWindowBySchoolId(newSchool.id || newSchool.schoolId);
    },
  },
  mounted() {
    this.setGroupSchoolMark();
  },
  methods: {
    setGroupSchoolMark() {
      let loading = this.$loading();
      apiGetGroupSchool(this.officeType, this.addressId)
        .then(({ result }) => {
          // TODO: 集团地图初始化取消地图碰撞和显示学校名称，可能会改回来
          this.schoolLayerSetGeometries(result, { content: '' });
          this.setSchoolLayerOptions({ enableCollision: false });
        })
        .catch((err) => {
          console.error(
            '❌ ~ file: TheGroupMultiMarker.vue:120 ~ setGroupSchoolMark ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    // 控制显示隐藏学校名称
    toggleNameShow() {
      if (!this.showSchoolName) {
        this.schoolLayerUpdateGeometries((item) => {
          return {
            ...item,
            content: item.properties.schoolName,
          };
        });
      } else {
        this.schoolLayerUpdateGeometries((item) => {
          return {
            ...item,
            content: '',
          };
        });
      }
      this.showSchoolName = !this.showSchoolName;
    },
  },
};
</script>

<style lang="less" scoped>
.control-btn {
  position: absolute;
  top: 0.07rem;
  right: 4.96rem;
  z-index: 3;

  .btn-content {
    display: flex;
    align-items: center;
    background: url('/src/assets/img/school-btn-bg.png');
    background-size: 100% 100%;
    color: #fff;
    padding: 0.1rem;

    img {
      cursor: pointer;
      width: 0.14rem;
      height: 0.14rem;
    }

    .name {
      margin-left: 0.1rem;
    }
  }
}
</style>
