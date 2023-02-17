<script>
import multiMarkerMixin from '@/mixins/multiMarkerMixin';
import { apiGetEpidemicTypeArea } from '@/api/useEpidemicMapRequest';

let areaPolyLine = new TMap.MultiPolygon({
  styles: {
    lowRisk: new TMap.PolygonStyle({
      color: 'rgba(0, 200, 0 , 0.8)',
      borderColor: 'rgba(0, 200, 0 , 0.8)',
    }),
    midRisk: new TMap.PolygonStyle({
      color: 'rgba(255, 211, 112, 0.8)',
      borderColor: 'rgba(255, 211, 112, 0.8)',
    }),
    highRisk: new TMap.PolygonStyle({
      color: 'rgba(196, 73, 75, 0.8)',
      borderColor: 'rgba(196, 73, 75, 0.8)',
    }),
  },
  geometries: [],
});

export default {
  render() {},
  mixins: [multiMarkerMixin],
  computed: {
    selectedSchool() {
      return this.examination.selectedSchool;
    },
    schoolList() {
      return this.examination.schoolList;
    },
  },
  watch: {
    schoolList(v) {
      this.setExaminationMark();
    },
    addressId() {
      this.infoWindow.close();
      this.setExaminationMark();
      // this.updateAreaLine();
    },
    selectedSchool(newSchool) {
      this.setInfoWindow(newSchool, true);
    },
  },
  mounted() {
    this.setExaminationMark();
    // this.updateAreaLine();
    areaPolyLine.setMap(this.map);
    // this.examSchoolLayer.setMap(this.map);
    this.schoolLayer.setMap(this.map)
  },
  beforeUnmount() {
    areaPolyLine.setMap(null);
  },
  methods: {
    setExaminationMark() {
      // this.examSchoolLayerSetGeometries(this.schoolList);
      this.schoolLayerSetGeometries(this.schoolList, { content: '' })
    },
    updateAreaLine() {
      Promise.all([
        apiGetEpidemicTypeArea(1, this.addressId),
        apiGetEpidemicTypeArea(2, this.addressId),
        apiGetEpidemicTypeArea(3, this.addressId),
      ]).then((resArray) => {
        let typeAreaRes = [];
        resArray.forEach(({ result }, type) => {
          typeAreaRes.push(
            result?.records.map((i) => {
              let gzPolygonArr = `[${i.coordinates}]`;
              return {
                styleId: (() => {
                  if (type + 1 === 1) return 'highRisk';
                  if (type + 1 === 2) return 'midRisk';
                  if (type + 1 === 3) return 'lowRisk';
                })(),
                paths: JSON.parse(gzPolygonArr).map(
                  (_) => new TMap.LatLng(Number(_[1]), Number(_[0]))
                ),
              };
            })
          );
        });
        areaPolyLine?.setGeometries([
          ...typeAreaRes[0],
          ...typeAreaRes[1],
          ...typeAreaRes[2],
        ]);
      });
    },
  },
};
</script>
