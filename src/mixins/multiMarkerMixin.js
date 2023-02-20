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
import { schoolTypeEnum } from '@/utils/useEnums';

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
      // 用于配置地图上不同类型点的样式，也可以根据mapType配置每个地图不同的点样式
      const getStyleId = () => {
        let styleId = 'normal'; // 默认样式
        // 办学地图点位样式
        if (this.mapType === 'running-school') { 
          if (!school.runningType) { 
            console.warn('该学校没有办学类型信息', school);
            return
          }
          let schoolOption = schoolTypeEnum.find(v => v.schoolType === Number(school.runningType))
          return schoolOption?.styleId || styleId
        }

        if (school.officeType === '1') styleId = 'municipal-school'; // 市属学校样式
        if (school.officeType === '2') styleId = 'borough-school'; // 区属学校样式
        if (school.exemplaryType === '1') styleId = 'exem1';
        if (school.exemplaryType === '2') styleId = 'exem2';
        if (school.exemplaryType === '3') styleId = 'exem3';
        if (school.isCoreSchool === '1') styleId = 'core-school'; // 核心学校样式
        if (school.examSiteType) {
          if (school.examSiteType === '1')
            return `adult-exam${school.examSiteStatus}`;
          if (school.examSiteType === '2') return `teacher-exam`;
          if (school.examSiteType === '3') return `self-exam`;
          if (school.examSiteType === '4')
            return `artistic-exam${school.examSiteStatus}`;
          if (school.examSiteType === '5') return `graduate-exam`;
        }
        return styleId;
      }


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
        styleId: getStyleId(),
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
