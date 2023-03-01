<template>
  <div class="left-toolbar-container">
    <MDivision
      :options="options"
      :default-actived-index="activedIndex"
      enable-extra-list
      @optionClick="settleOptionClick"
      @listItemClick="settleListItmeClick"
      @extraListItemClick="settleExtraListItmeClick"
    >
      <template #title>
        <img
          src="@/assets/img/groupMap/group-school-icon.png"
          alt="icon"
          class="group-school-icon"
        />
        <div>{{ title }}</div>
      </template>
    </MDivision>
  </div>
</template>

<script>
import {
  apiGetGroupGeneralOverview,
  apiGetGroupInfoListByOfficeType,
  apiGetSchoolListByGroupId,
} from "@/api/useGroupMapRequest";
import { useMapStore } from "@/stores/mapStore";
import { mapWritableState } from "pinia";
import { debounce } from "@/utils/debounce";
import getAssetsFile from '@/utils/getAssetsFile';
export default {
  data() {
    return {
      title: "市属教育集团",
      activedIndex: 0,
      options: [
        {
          label: "市属教育集团 (含0个集团，共0所)",
          icon: getAssetsFile("marks/municipal-school.png"),
          value: 1, // 1代表市
          children: [],
        },
        {
          label: "区属教育集团 (含0个集团，共0所)",
          icon: getAssetsFile("marks/borough-school.png"),
          value: 2, // 2代表区
          children: [],
        },
      ],
    };
  },
  computed: {
    ...mapWritableState(useMapStore, ["addressId", "group"]),
  },
  watch: {
    addressId() {
      this.updateOptions();
    },
  },
  mounted() {
    this.updateOptions();
  },
  methods: {
    updateOptions() {
      let loading = this.$loading({
        target: ".m-division-container",
      });
      Promise.all([
        apiGetGroupGeneralOverview(this.addressId),
        apiGetGroupInfoListByOfficeType(1, this.addressId),
        apiGetGroupInfoListByOfficeType(2, this.addressId),
      ])
        .then(
          ([
            { result: overview },
            { result: infoList1 },
            { result: infoList2 },
          ]) => {
            this.options[0].label = `市属教育集团 (含${
              overview.municipalQuantity || 0
            }个集团，共${overview.municipalQuantitySchoolNumber || 0}所)`;

            this.options[1].label = `区属教育集团 (含${
              overview.boroughQuantity || 0
            }个集团，共${overview.boroughQuantitySchoolNumber || 0}所)`;

            this.options[0].children = infoList1.map((v) => {
              return {
                label: v.officeName,
                ...v,
              };
            });

            this.options[1].children = infoList2.map((v) => {
              return {
                label: v.officeName,
                ...v,
              };
            });
          }
        )
        .catch((err) => {
          console.error(
            "❌ ~ file: GroupMapLeftToolBar.vue:104 ~ created ~ err",
            err
          );
        })
        .finally(loading.close);
    },
    settleOptionClick({ option, index }) {
      this.activedIndex = index;
      let loading = this.$loading();
      debounce(() => {
        this.group.officeType = option.value;
        loading.close();
      }, 500)();
    },
    settleListItmeClick({ item, index }) {
      this.group.officeId = item.id;
      apiGetSchoolListByGroupId(item.id, this.addressId)
        .then(({ result }) => {
          let child = this.options[this.activedIndex].children[index];
          child.children = result.map((v) => {
            return {
              label: v.schoolName,
              ...v,
            };
          });
        })
        .catch((err) => {
          console.error(
            "❌ ~ file: GroupMapLeftToolBar.vue:128 ~ settleListItmeClick ~ err",
            err
          );
        });
    },
    settleExtraListItmeClick({ item }) {
      this.group.selectedSchool = item;
    },
  },
};
</script>

<style lang="less" scoped>
.left-toolbar-container {
  position: relative;
  top: 0.2rem;
}
.group-school-icon {
  width: 0.16rem;
  height: 0.19rem;
  margin-right: 0.05rem;
}
</style>
