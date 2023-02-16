<template>
  <div class="control-btn">
    <div class="btn-content">
      <img
        src="/src/assets/img/select-icon.png"
        @click="controlSchoolName"
        v-show="!showSchoolName"
      />
      <img
        src="/src/assets/img/selected-icon.png"
        @click="controlSchoolName"
        v-show="showSchoolName"
      />
      <span class="name">{{
        showSchoolName ? "隐藏学校名称" : "显示学校名称"
      }}</span>
    </div>
  </div>
</template>

<script>
import { apiGetGroupSchool } from "@/api/useGroupMapRequest";
import multiMarkerMixin from "@/mixins/multiMarkerMixin";
import { useMapInstanceStore } from "@/stores/mapInstanceStore";

export default {
  mixins: [multiMarkerMixin],
  data() {
    return {
      municipal: true, // 标记当前是否为市属学校
      showSchoolName: true, // 是否显示学校名
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
      this.showSchoolName = true;
      this.infoWindow.close();
      this.setGroupSchoolMark();
    },
    addressId() {
      this.showSchoolName = true;
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
          this.schoolLayerSetGeometries(result);
          this.schoolLayer.setMap(this.map);
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: TheGroupMultiMarker.vue:120 ~ setGroupSchoolMark ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    controlSchoolName() {
      if (!this.showSchoolName) {
        this.schoolLayer.updateGeometries(
          this.schoolLayer.geometries.map((item) => {
            return {
              ...item,
              content: item.properties.schoolName,
            };
          })
        );
      } else {
        this.schoolLayer.updateGeometries(
          this.schoolLayer.geometries.map((item) => {
            return {
              ...item,
              content: "",
            };
          })
        );
      }
      this.showSchoolName = !this.showSchoolName;
    },
  },
};
</script>

<style lang="less" scoped>
.control-btn {
  position: absolute;
  top: 0.05rem;
  right: 4.86rem;
  z-index: 3;

  .btn-content {
    display: flex;
    align-items: center;
    background: url("/src/assets/img/school-btn-bg.png");
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
