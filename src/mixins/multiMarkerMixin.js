import { mapJumpToPosition } from '@/utils/mapJumpToPosition';
import {
  createInfoWindowTemplate,
  createExamWindowTemplate,
} from '@/utils/useInfoWindowTemplate';
import { apiGetSchoolDetailById } from '@/api/useCommonRequest';
import { useMapStore } from '@/stores/mapStore';
import { useMapInstanceStore } from '@/stores/mapInstanceStore';
import { mapState } from 'pinia';
import { useIsNull } from '@/utils/useIsNull';

export default {
  computed: {
    ...mapState(useMapStore, [
      'map',
      'addressId',
      'mapType',
      'group',
      'runningSchool',
      'epidemic',
      'degree',
      'examination',
    ]),
    ...mapState(useMapInstanceStore, {
      schoolLayer: 'mapSchoolLayer',
      infoWindow: 'mapInfoWindow',
    }),
  },
  mounted() {
    this.infoWindow.setMap(this.map);
    this.schoolLayer.on('click', ({ geometry }) => {
      console.log('schoolLayer', geometry);

      // 考点地图有特殊性，不能请求接口，所以在这里判断，可能算个bug
      if (this.mapType === 'examination') {
        this.setInfoWindow(geometry.properties);
      } else { 
        this.setInfoWindowBySchoolId(
          geometry.properties.id || geometry.properties.schoolId
        );
      }

    });
    this.map.on('click', () => {
      this.infoWindow.close();
    });
  },
  beforeUnmount() {
    this.schoolLayer.setMap(null);
    this.infoWindow.setMap(null);
    useMapInstanceStore().$reset();
  },
  methods: {
    setInfoWindow(result, jump = false) {
      if (useIsNull(result.latitude)) {
        this.$message.warning('该学校没有经度信息');
        return;
      }
      if (useIsNull(result.longitude)) {
        this.$message.warning('该学校没有纬度信息');
        return;
      }

      if (jump) {
        mapJumpToPosition(
          new TMap.LatLng(Number(result.latitude), Number(result.longitude)),
          20
        );
      }

      this.infoWindow.setPosition(
        new TMap.LatLng(Number(result.latitude), Number(result.longitude))
      ); //设置信息窗位置
      this.infoWindow.setContent(createExamWindowTemplate(result));
      setTimeout(() => {
        this.infoWindow.open(); //打开信息窗
      });
    },
    setInfoWindowBySchoolId(schoolId) {
      console.log('setInfoWindowBySchoolId');
      let loading = this.$loading({ target: '.map-info-window' });
      apiGetSchoolDetailById(schoolId)
        .then(({ result }) => {
          if (useIsNull(result.latitude)) {
            this.$message.warning('该学校没有经度信息');
            return;
          }
          if (useIsNull(result.longitude)) {
            this.$message.warning('该学校没有纬度信息');
            return;
          }
          mapJumpToPosition(
            new TMap.LatLng(Number(result.latitude), Number(result.longitude)),
            20
          );
          this.infoWindow.setPosition(
            new TMap.LatLng(Number(result.latitude), Number(result.longitude))
          ); //设置信息窗位置
          this.infoWindow.setContent(createInfoWindowTemplate(result));
          setTimeout(() => {
            this.infoWindow.open(); //打开信息窗
          });
        })
        .catch((err) => {
          console.error(
            '🚀 ~ file: multiMarkerMixin.js:65 ~ setInfoWindowBySchoolId ~ err',
            err
          );
        })
        .finally(loading.close);
    },
    schoolLayerSetGeometries(schoolList, geometryOptions) {
      this.schoolLayer?.setGeometries(
        schoolList?.map((school) =>
          this.createSchoolGeometry(school, geometryOptions)
        )
      );
    },
    // 根据学校数据创建geometry对象，用于更新点位数据
    createSchoolGeometry(school, geometryOptions) {
      let latitude = school.latitude || school.schoolLatitude;
      let longitude = school.longitude || school.schoolLongitude;
      if (typeof latitude === 'string') {
        latitude = Number(latitude.replace(',', ''));
      }
      if (typeof longitude === 'string') {
        longitude = Number(longitude?.replace(',', ''));
      }
      if (useIsNull(latitude)) latitude = 0;
      if (useIsNull(longitude)) longitude = 0;

      let geometry = {
        styleId: (() => {
          let styleId = 'normal';
          if (school.officeType === '1') styleId = 'municipalSchool';
          if (school.officeType === '2') styleId = 'boroughSchool';
          if (school.exemplaryType === '1') styleId = 'exemStyle1';
          if (school.exemplaryType === '2') styleId = 'exemStyle2';
          if (school.exemplaryType === '3') styleId = 'exemStyle3';
          if (school.isCoreSchool === '1') styleId = 'coreSchool';
          if (school.examSiteType) {
            if (school.examSiteType == '1')
              return `adultCollegeExam${school.examSiteStatus}`;
            if (school.examSiteType == '2') return `teachingExam`;
            if (school.examSiteType == '3') return `selfExam`;
            if (school.examSiteType == '4')
              return `artisticExam${school.examSiteStatus}`;
            if (school.examSiteType == '5') return `graduateExam`;
          }
          return styleId;
        })(),
        position: new TMap.LatLng(Number(latitude), Number(longitude)), //点标记坐标位置
        content: school.schoolName || school.name || '',
        properties: {
          id: school.id || school.schoolId,
          latitude,
          longitude,
          position: new TMap.LatLng(Number(latitude), Number(longitude)),
          ...school,
          //自定义属性
        },
      };
      if (geometryOptions) Object.assign(geometry, geometryOptions);
      return geometry;
    },
    schoolLayerUpdateGeometries(mapper) {
      if (typeof mapper === 'function') {
        this.schoolLayer.updateGeometries(
          this.schoolLayer.geometries.map(mapper)
        );
      }
      if (Array.isArray(mapper)) {
        this.schoolLayer.updateGeometries(mapper);
      }
    },
    setSchoolLayerOptions(multiMarkerOptions) {
      if (!multiMarkerOptions) return;
      this.schoolLayer?.setMap(null);
      Object.assign(this.schoolLayer, multiMarkerOptions);
      this.schoolLayer?.setMap(this.map);
    },
  },
};
