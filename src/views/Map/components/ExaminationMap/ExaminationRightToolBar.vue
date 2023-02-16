<template>
  <examinationRightInfo v-if="addressId === ''"></examinationRightInfo>
  <examinationRightInfoDetail v-else></examinationRightInfoDetail>
</template>

<script>
import { useMapStore } from "@/stores/mapStore";
import { computed } from "@vue/runtime-core";
export default {
  setup() {
    const mapStore = useMapStore();
    let addressId = computed(() => mapStore.addressId);
    return {
      addressId,
    };
  },
};
</script>

<style lang="less" scoped></style>
