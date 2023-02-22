<template>
  <div class="right-toolbar-container">
    <MToolBarBlock>
      <template #toolbar-title> 学校概况 </template>
      <template #toolbar-content>
        <div class="toolbar-block-wrapper">
          <MInfoBox
            title="教育集团总数"
            icon-url="icons/public-stu.png"
            unit="个"
            :unit-style="{ color: '#FFA311' }"
            :unit-number="overviewRes.totalQuantity || 0"
            :extra-info-number="overviewRes.totalQuantitySchoolNumber || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="市属教育集团总数"
            icon-url="icons/public-stu.png"
            unit="个"
            :unit-number="overviewRes.municipalQuantity || 0"
            :unit-style="{ color: '#8D92F8' }"
            :extra-info-number="overviewRes.municipalQuantitySchoolNumber || 0"
          >
          </MInfoBox>
          <MInfoBox
            title="区属教育集团总数"
            icon-url="icons/public-stu.png"
            unit="个"
            :unit-number="overviewRes.boroughQuantity || 0"
            :unit-style="{ color: '#70EA6C' }"
            :extra-info-number="overviewRes.boroughQuantitySchoolNumber || 0"
          >
          </MInfoBox>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 集团覆盖学校概况 </template>
      <template #toolbar-content>
        <div class="group-charts-container">
          <div class="group-pie-single">
            <GroupPieChart ref="groupPie"></GroupPieChart>
          </div>
          <div class="group-pie-double">
            <GroupPieChart
              ref="smallGroupPie1"
              style="height: 50%"
            ></GroupPieChart>
            <GroupPieChart
              ref="smallGroupPie2"
              style="height: 50%"
            ></GroupPieChart>
          </div>
        </div>
      </template>
    </MToolBarBlock>
    <MToolBarBlock>
      <template #toolbar-title> 集团覆盖学生概况 </template>
      <template #toolbar-title-bar>
        <div class="group-choose">
          <el-select
            v-model="value"
            @change="handleOfficeSelect"
            placeholder="请选择"
            :popper-append-to-body="false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </template>
      <template #toolbar-content>
        <div class="group-charts-container">
          <GroupBarChart ref="groupBar" />
        </div>
      </template>
    </MToolBarBlock>
  </div>
</template>

<script>
import {
  apiGetGroupGeneralOverview,
  apiGetSchoolsCoveredByTheGroup,
  apiGetStudentsCoveredByTheGroup,
} from '@/api/useGroupMapRequest';
import { useMapStore } from '@/stores/mapStore';
import { mapState } from 'pinia';
import { schoolTypeEnum } from '@/utils/useEnums';
export default {
  data() {
    return {
      overviewRes: {},
      // schoolsRes: {},
      studentsRes: {},
      options: [
        {
          value: 1,
          label: '市属教育集团',
        },
        {
          value: 2,
          label: '区属教育集团',
        },
      ],
      value: 1,
      centerText: '全市',
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId']),
  },
  watch: {
    addressId() {
      this.centerText = this.addressId ? '全区' : '全市';
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      let loading = this.$loading({
        target: '.group-map-right-main',
      });
      Promise.all([
        apiGetGroupGeneralOverview(this.addressId),
        apiGetSchoolsCoveredByTheGroup('11,21', this.addressId),
        apiGetSchoolsCoveredByTheGroup('11', this.addressId),
        apiGetSchoolsCoveredByTheGroup('21', this.addressId),
        apiGetStudentsCoveredByTheGroup(1, this.addressId),
        apiGetStudentsCoveredByTheGroup(2, this.addressId),
      ])
        .then(
          ([
            { result: overviewRes },
            { result: schoolsResPart1 },
            { result: schoolsResPart2 },
            { result: schoolsResPart3 },
            { result: municipalRes },
            { result: boroughRes },
          ]) => {
            this.overviewRes = overviewRes;
            this.updateGroupPie(
              schoolsResPart1,
              schoolsResPart2,
              schoolsResPart3
            );
            this.updateGroupBar(municipalRes);
            this.studentsRes.municipalRes = municipalRes; // 市属
            this.studentsRes.boroughRes = boroughRes; // 区属
          }
        )
        .catch((err) => {
          console.error(
            '❌ ~ file: GroupRightInfo.vue:129 ~ updateOptions ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    updateGroupPie(schoolsResPart1, schoolsResPart2, schoolsResPart3) {
      this.$refs.groupPie?.initChart({
        title: {
          text: `${this.centerText}\n${schoolsResPart1.schoolsNumber || 0}所`,
          subtext: '\n\n幼儿园、中小学',
        },
        series: [
          {
            data: [
              {
                value: schoolsResPart1.municipalQuantitySchoolTotal || 0,
                name: '集团覆盖',
              },
              {
                value:
                  (schoolsResPart1.schoolsNumber || 0) -
                  (schoolsResPart1.municipalQuantitySchoolTotal || 0),
                name: this.centerText,
              },
            ],
          },
        ],
      });

      this.$refs.smallGroupPie1?.initChart({
        title: {
          text: `${this.centerText}\n${schoolsResPart2.schoolsNumber || 0}所`,
          top: '46%',
          left: '28%',
          subtext: '\n\n幼儿园',
          subtextStyle: {
            color: '#fff',
            fontSize: 14,
            height: 200,
          },
          textStyle: {
            fontSize: 14,
            lineHeight: 20,
          },
        },
        series: [
          {
            center: ['30%', '60%'],
            data: [
              {
                value: schoolsResPart2.municipalQuantitySchoolTotal || 0,
                name: '集团覆盖',
              },
              {
                value:
                  (schoolsResPart2.schoolsNumber || 0) -
                  (schoolsResPart2.municipalQuantitySchoolTotal || 0),
                name: this.centerText,
              },
            ],
          },
        ],
      });

      this.$refs.smallGroupPie2?.initChart({
        title: {
          text: `${this.centerText}\n${schoolsResPart3.schoolsNumber || 0}所`,
          top: '46%',
          left: '28%',
          subtext: '\n\n中小学',
          subtextStyle: {
            color: '#fff',
            fontSize: 14,
            height: 200,
          },
          textStyle: {
            fontSize: 14,
            lineHeight: 20,
          },
        },
        series: [
          {
            center: ['30%', '60%'],
            data: [
              {
                value: schoolsResPart3.municipalQuantitySchoolTotal || 0,
                name: '集团覆盖',
              },
              {
                value:
                  (schoolsResPart3.schoolsNumber || 0) -
                  (schoolsResPart3.municipalQuantitySchoolTotal || 0),
                name: this.centerText,
              },
            ],
          },
        ],
      });
    },
    updateGroupBar(data) {
      let totalStudents = data.totalStudents;
      let schoolType = ['合计'];
      let officeData = [1];
      let stuData = [totalStudents / 10000];

      for (let item of data.studentsCoveredByTheGroupData) {
        let type = schoolTypeEnum.find((v) => {
          return v.schoolType === item.runningType;
        }) || { label: '' };
        schoolType.push(type.label);

        officeData.push((item.studentNumber / totalStudents).toFixed(2));
        stuData.push(item.studentNumber / 10000);
      }
      this.$refs.groupBar?.initChart({
        xAxis: [
          {
            type: 'category',
            data: schoolType || [],
          },
        ],
        series: [
          {
            type: 'bar',
            data: officeData || [],
          },
          {
            type: 'line',
            data: stuData || [],
          },
        ],
      });
    },
    handleOfficeSelect(v) {
      if (v === 1) {
        this.updateGroupBar(this.studentsRes.municipalRes);
      } else if (v === 2) {
        this.updateGroupBar(this.studentsRes.boroughRes);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.toolbar-block-wrapper {
  display: flex;
  justify-content: space-between;
  & > div {
    margin: 0 0.1rem;
  }
}
.group-charts-container {
  display: flex;
  width: 4.8rem;
  height: 3.6rem;
  .group-pie-single {
    position: relative;
    height: 100%;
    width: 50%;
  }
  .group-pie-double {
    height: 100%;
    width: 50%;
  }
}

.group-choose {
  margin-right: 0.09rem;
}
</style>
