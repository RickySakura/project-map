<template>
  <div class="epidemic-left__block--1">
    <EpidemicToolBarBlock>
      <template #title> 涉疫统计 </template>
      <template #title-extra>
        <div class="table-type-switch">
          <span @click="setTableType(1)" :class="{ active: tableType == 1 }"
            >学校涉疫</span
          >
          <span @click="setTableType(3)" :class="{ active: tableType == 3 }"
            >教师涉疫</span
          >
        </div>
      </template>
      <template #content>
        <div class="table-container">
          <EpidemicTable
            :tableData="tableData"
            :type="tableType"
            height="25vh"
            style="width: 100%"
          />
        </div>
      </template>
    </EpidemicToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetRelatedSchoolStatistics,
  apiGetTeacherEpidemic,
} from "@/api/useEpidemicMapRequest";
import toolBarBlockMixin from "./toolBarBlockMixin";

export default {
  mixins: [toolBarBlockMixin],
  data() {
    return {
      tableData: [],
      tableType: 1,
      tableRes: {},
    };
  },
  mounted() {},
  methods: {
    updateData() {
      let loading = this.$loading({
        target: this.$el,
      });
      Promise.all([apiGetRelatedSchoolStatistics(), apiGetTeacherEpidemic()])
        .then(([{ result: schoolRes }, { result: teacherRes }]) => {
          let mapper = (data, keyStart) => {
            if (Array.isArray(data)) {
              return data.map((i) => {
                return {
                  name: i.coundtryName,
                  total: i[`${keyStart}Total`],
                  InSealedAreaTotal: i[`${keyStart}sInSealedAreaTotal`],
                  InControlAreaTotal: i[`${keyStart}sInControlAreaTotal`],
                  InPreventionAreaTotal: i[`${keyStart}sInPreventionAreaTotal`],
                  InHighRiskAreaTotal: i[`${keyStart}sInHighRiskAreaTotal`],
                  InLowRiskAreaTotal: i[`${keyStart}sInLowRiskAreaTotal`],
                  InMediumRiskAreaTotal: i[`${keyStart}sInMediumRiskAreaTotal`],
                };
              });
            }
          };
          this.tableRes.schoolRes = mapper(schoolRes, "school");
          this.tableRes.teacherRes = mapper(teacherRes, "teacher");
          this.tableData = this.tableRes.schoolRes;
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: RightToolBarBlock3.vue:74 ~ updateData ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    setTableType(type) {
      this.tableType = type;
      this.tableData =
        type === 1 ? this.tableRes.schoolRes : this.tableRes.teacherRes;
    },
  },
};
</script>

<style lang="less" scoped>
.table-type-switch {
  border-radius: 5px;
  background-color: #00558e;
  border: 1px solid #37a8ff;
  padding: 0.03rem;
  margin-right: 0.1rem;

  span {
    color: #bec3d2;
    cursor: pointer;
    display: inline-block;
    padding: 0.05rem;
  }

  .active {
    border-radius: 5px;
    background: #1175e5;
    color: #ffffff;
  }
}
.table-container {
  margin-bottom: 0.2rem;
}
</style>
