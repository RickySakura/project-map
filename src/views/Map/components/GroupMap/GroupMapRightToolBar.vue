<template>
  <div class="group-map-right-main">
    <GroupRightInfo v-if="!isShowGroupInfoDetail" />
    <GroupRightInfoDetail v-else />
    <div
      class="back"
      v-if="isShowGroupInfoDetail"
      @click="isShowGroupInfoDetail = false"
    >
      返回
    </div>
  </div>
</template>

<script setup>
import { useMapStore } from "@/stores/mapStore";
import { ref, watch } from "@vue/runtime-core";

let isShowGroupInfoDetail = ref(false);
watch(
  () => useMapStore().group.officeId,
  (newValue) => {
    if (newValue) {
      isShowGroupInfoDetail.value = true;
    } else {
      isShowGroupInfoDetail.value = false;
    }
  }
);
</script>

<style lang="less" scoped>
.back {
  position: absolute;
  top: 0.12rem;
  right: 0.15rem;
  height: 0.22rem;
  width: 0.45rem;
  border-radius: 2px;
  text-align: center;
  background-color: #052f4e;
  color: #fff;
  cursor: pointer;
}
</style>
