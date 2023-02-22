<template>
  <ExaminationRightInfo v-if="addressId === ''"></ExaminationRightInfo>
  <ExaminationRightInfoDetail v-else></ExaminationRightInfoDetail>
</template>

<script>
import { useMapStore } from "@/stores/mapStore";
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
