import { useMapStore } from "@/stores/mapStore";

export default {
  computed: {
    addressId() {
      return useMapStore().addressId;
    },
  },
  watch: {
    addressId() {
      this.updateData();
    },
  },
  mounted() {
    this.updateData();
  },
}