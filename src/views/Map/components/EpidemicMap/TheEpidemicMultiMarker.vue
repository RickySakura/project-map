<template>
  <div></div>
</template>
<script>
import multiMarkerMixin from "@/mixins/multiMarkerMixin";
import {
  apiGetEpidemicTypeArea,
  apiGetOfficeOrSchoolByAreaCategory,
} from "@/api/useEpidemicMapRequest";

let areaPolyLine = new TMap.MultiPolygon({
  styles: {
    lowRisk: new TMap.PolygonStyle({
      color: "rgba(0, 200, 0 , 0.8)",
      borderColor: "rgba(0, 200, 0 , 0.8)",
    }),
    midRisk: new TMap.PolygonStyle({
      color: "rgba(255, 211, 112, 0.8)",
      borderColor: "rgba(255, 211, 112, 0.8)",
    }),
    highRisk: new TMap.PolygonStyle({
      color: "rgba(196, 73, 75, 0.8)",
      borderColor: "rgba(196, 73, 75, 0.8)",
    }),
  },
  geometries: [],
});
export default {
  mixins: [multiMarkerMixin],
  data() {
    return {
      typeAreaRes: [],
    };
  },
  computed: {
    selectedSchool() {
      return this.epidemic.selectedSchool;
    },
    schoolList() {
      return this.epidemic.schoolList;
    },
    areaCategory() {
      return this.epidemic.areaCategory;
    },
  },
  watch: {
    schoolList(v) {
      this.setEpidemicSchoolMark();
    },
    addressId() {
      this.infoWindow.close();
      this.updateTypeAreaData();
      this.setEpidemicSchoolMark();
    },
    selectedSchool(newSchool) {
      this.setInfoWindowBySchoolId(newSchool.id || newSchool.schoolId);
    },
    areaCategory(val) {
      this.updateTypeAreaPolyLine(this.typeAreaRes[val - 1] || []);
    },
  },
  mounted() {
    this.updateTypeAreaData();
    this.setEpidemicSchoolMark();
    this.schoolLayer.setMap(this.map);
    areaPolyLine.setMap(this.map);
  },
  beforeUnmount() {
    areaPolyLine.setMap(null);
  },
  methods: {
    setEpidemicSchoolMark() {
      this.schoolLayerSetGeometries(this.schoolList, { styleId: "normal" });
    },
    updateTypeAreaData() {
      this.typeAreaRes = [];
      Promise.all([
        apiGetEpidemicTypeArea(1, this.addressId),
        apiGetEpidemicTypeArea(2, this.addressId),
        apiGetEpidemicTypeArea(3, this.addressId),
      ])
        .then((resArray) => {
          resArray.forEach(({ result }, type) => {
            this.typeAreaRes.push(
              result?.records.map((i) => {
                let gzPolygonArr = `[${i.coordinates}]`;
                return {
                  styleId: (() => {
                    if (type + 1 === 1) return "highRisk";
                    if (type + 1 === 2) return "midRisk";
                    if (type + 1 === 3) return "lowRisk";
                  })(),
                  paths: JSON.parse(gzPolygonArr).map(
                    (_) => new TMap.LatLng(Number(_[1]), Number(_[0]))
                  ),
                };
              })
            );
          });
          this.updateTypeAreaPolyLine(this.typeAreaRes[this.areaCategory - 1]);
        })
        .catch((err) => {
          console.error(
            "❌  ~ file: TheEpidemicMultiMarker.vue:103 ~ updateTypeAreaData ~ err",
            err
          );
        });
    },
    updateTypeAreaPolyLine(data) {
      areaPolyLine.setGeometries(data);
    },
  },
};
</script>
