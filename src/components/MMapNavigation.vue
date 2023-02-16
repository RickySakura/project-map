<template>
  <div @mousedown="handleDragStart" ref="nav-container">
    <div class="map-navigation" v-if="isNavActed">
      <el-icon @click="toggleNav" color="#fff" size="15">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-029747aa=""
        >
          <path
            fill="currentColor"
            d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
          />
        </svg>
      </el-icon>
      <div class="select-wrapper">
        <el-select
          v-model="from"
          placeholder="请选择起点"
          filterable
          clearable
          size="small"
          @change="disableToOption"
        >
          <el-option
            v-for="(item, index) in fromOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          data-v-029747aa=""
          class="switch-icon"
          @click="switchSelected"
        >
          <path
            fill="currentColor"
            d="M118.656 438.656a32 32 0 0 1 0-45.248L416 96l4.48-3.776A32 32 0 0 1 461.248 96l3.712 4.48a32.064 32.064 0 0 1-3.712 40.832L218.56 384H928a32 32 0 1 1 0 64H141.248a32 32 0 0 1-22.592-9.344zM64 608a32 32 0 0 1 32-32h786.752a32 32 0 0 1 22.656 54.592L608 928l-4.48 3.776a32.064 32.064 0 0 1-40.832-49.024L805.632 640H96a32 32 0 0 1-32-32z"
          ></path>
        </svg>
        <el-select
          v-model="to"
          placeholder="请选择终点"
          clearable
          filterable
          size="small"
          @change="disableFromOption"
        >
          <el-option
            v-for="(item, index) in toOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          @click="mapNavigation"
          :icon="Search"
          style="margin-left: 0.05rem; width: 0.36rem; border-radius: 6px"
        ></el-button>
      </div>
      <div class="recommend-wrapper" v-if="recommendItemArray.length > 0">
        <div class="recommend-title">推荐路线</div>
        <div class="recommend-content">
          <div
            class="recommend-content-item"
            :class="[index === selectedIndex ? 'actived' : '']"
            v-for="(item, index) in recommendItemArray"
            :key="index"
            @click="selectLine(item.id, index)"
          >
            <div
              class="other"
              :class="[
                item.tag === '距离短' ? 'low-distance' : '',
                item.tag === '时间短' ? 'low-time' : '',
              ]"
            >
              {{ item.tag }}
            </div>
            <div class="describe">{{ item.duration }}分钟</div>
            <div class="describe">
              {{ (item.distance / 1000).toFixed(1) }}公里
            </div>
            <div class="describe">
              {{ item.privatetrafficLightCount }}个红绿灯
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="map-navigation navbar"
      @click="toggleNav"
      :style="navigationStyle"
      v-else
    >
      <img src="@/assets/img/map/fly.png" alt="icon" class="icon" />
      导航查询
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
</script>
<script>
import { apiQueryMapNavigation } from '@/api/useExaminationMapRequest';
import fromIcon from '@/assets/img/map/from.png';
import toIcon from '@/assets/img/map/to.png';
import { mapState } from 'pinia';
import { useMapStore } from '@/stores/mapStore';

let mapNavigationLine = new TMap.MultiPolyline({
  id: 'polyline-layer', //图层唯一标识
  map: null, //绘制到目标地图
  zIndex: 91,
  //折线样式定义
  styles: {
    style_green: new TMap.PolylineStyle({
      color: 'rgb(1, 197, 123)', //线填充色
      width: 10, //折线宽度
      borderWidth: 3, //边线宽度
      borderColor: 'rgb(20, 116, 81)',
      showArrow: true,
      arrowOptions: {
        space: 70,
      },
      lineCap: 'round',
    }),
    green_grey: new TMap.PolylineStyle({
      color: 'rgb(153, 209, 196)', //线填充色
      width: 10, //折线宽度
      borderWidth: 3, //边线宽度
      borderColor: 'rgba(140, 186, 166, 0.8)',
      showArrow: true,
      arrowOptions: {
        space: 70,
      },
      lineCap: 'round',
    }),
  },
  geometries: [],
});

let marker = new TMap.MultiMarker({
  id: 'marker-layer',
  map: null,
  zIndex: 15,
  styles: {
    start: new TMap.MarkerStyle({
      width: 25,
      height: 25,
      anchor: { x: 16, y: 32 },
      src: fromIcon,
    }),
    end: new TMap.MarkerStyle({
      width: 25,
      height: 25,
      anchor: { x: 16, y: 32 },
      src: toIcon,
    }),
  },
  geometries: [],
});

export default {
  data() {
    return {
      from: '',
      to: '',
      mapNavigationLine: null, // 导航线
      marker: null, // 起终点点位
      isNavActed: false,
      fromDisableIndex: -1, // 起点禁用的选项下标
      toDisableIndex: -1, // 终点禁用的选项下标
      recommendItemArray: [],
      selectedIndex: 0, // 选中的推荐路线的下标
      originPosition: {}, //拖动前的位置
      navigationStyle: {},
    };
  },
  computed: {
    ...mapState(useMapStore, [
      'mapType',
      'map',
      'addressId',
      'examination',
      'navigation',
    ]),
    examSiteType() {
      return this.examination.examSiteType;
    },
    schoolList() {
      return this.navigation.schoolList;
    },
    fromOptions() {
      return this.schoolList?.map((v, index) => {
        let option = {
          label: v.name,
          value: v.latitude + ',' + v.longitude,
        };
        if (index === this.fromDisableIndex) option.disabled = true;
        return option;
      });
    },
    toOptions() {
      return this.schoolList?.map((v, index) => {
        let option = {
          label: v.name,
          value: v.latitude + ',' + v.longitude,
        };
        if (index === this.toDisableIndex) option.disabled = true;
        return option;
      });
    },
  },
  watch: {
    examSiteType() {
      this.clearAllData();
    },
    mapType() {
      this.clearAllData();
    },
    addressId() {
      this.clearAllData();
    },
  },
  mounted() {
    // 初始化导航线样式，和起终点样式

    mapNavigationLine.on('click', (o) => {
      this.selectLine(o.geometry.id, Number(o.geometry.id.substring(4))); // 这个4是 line 字串的长度，也就是 line1 处理为 1
    });
    mapNavigationLine.setMap(this.map);
    marker.setMap(this.map);
  },
  beforeUnmount() {
    this.clearAllData();
  },
  methods: {
    mapNavigation() {
      mapNavigationLine.setGeometries([]); // 先清空原数据
      marker.setGeometries([]);
      this.recommendItemArray = [];

      apiQueryMapNavigation(this.from, this.to).then(({ result }) => {
        let geometries = []; // 描线用数组
        result.forEach((navigation, index) => {
          let { distance, duration, privatetrafficLightCount, tag, polyline } =
            navigation;

          // 推荐文本
          this.recommendItemArray.push({
            distance,
            duration,
            privatetrafficLightCount,
            tag,
            id: `line${index}`,
          });

          // 描线
          let polyArray = [];
          for (let i = 0; i < polyline.length; i += 2) {
            polyArray.push(new TMap.LatLng(polyline[i], polyline[i + 1]));
          }
          geometries.push({
            id: `line${index}`,
            paths: polyArray,
            styleId: (() => {
              if (index === 0) return 'style_green';
              return 'green_grey';
            })(),
          });
        });

        geometries.push(geometries.shift());
        mapNavigationLine.setGeometries(geometries);

        // 绘制起终点
        marker.setGeometries([
          {
            id: 'start',
            styleId: 'start',
            position: new TMap.LatLng(
              result[0].polyline[0],
              result[0].polyline[1]
            ),
          },
          {
            id: 'end',
            styleId: 'end',
            position: new TMap.LatLng(
              result[0].polyline?.at(-2),
              result[0].polyline?.at(-1)
            ),
          },
        ]);
      });
    },
    toggleNav() {
      this.isNavActed = !this.isNavActed;
      // 同时清理所有数据
      this.clearAllData();
    },
    /**
     * 当起点选择后，使相同的终点选项无效
     * @param {*} v
     */
    disableToOption(v) {
      this.toDisableIndex = this.toOptions.findIndex((option) => {
        return option.value === v;
      });
    },
    /**
     * 当终点选择后，使相同的起点选项无效
     * @param {*} v
     */
    disableFromOption(v) {
      this.fromDisableIndex = this.fromOptions.findIndex((option) => {
        return option.value === v;
      });
    },
    /**
     * 交换起点和终点选项
     */
    switchSelected({ target: dom }) {
      if (dom.classList.contains('rotate')) {
        dom.classList.remove('rotate');
      } else {
        dom.classList.add('rotate');
      }
      [this.fromDisableIndex, this.toDisableIndex] = [
        this.toDisableIndex,
        this.fromDisableIndex,
      ];
      [this.from, this.to] = [this.to, this.from];
    },
    /**
     * 选择某个推荐路线
     * @description 将该路线置亮，其他置暗
     * @param {*} lineId
     */
    selectLine(lineId, index) {
      let geometries = mapNavigationLine.getGeometries();
      let latest = 0;

      geometries.forEach((v, i) => {
        if (v.id === lineId) {
          v.styleId = 'style_green';
          latest = i;
        } else {
          v.styleId = 'green_grey';
        }
      });
      geometries.push(geometries.splice(latest, 1)[0]);
      mapNavigationLine.setGeometries(geometries);

      this.selectedIndex = index;
    },
    clearAllData() {
      this.fromDisableIndex = this.toDisableIndex = -1;
      this.from = this.to = '';
      this.recommendItemArray = [];
      mapNavigationLine.setGeometries([]);
      marker.setGeometries([]);
    },
    handleDragStart(e) {
      let el = this.$refs['nav-container'];
      let time = setTimeout(() => {
        this.navigationStyle = {
          'pointer-events': 'none',
        };
        el.style.opacity = '0.8';
        let disX = e.clientX - el.offsetLeft;
        let disY = e.clientY - el.offsetTop;
        document.onmousemove = (event) => {
          let translateX = event.clientX - disX;
          let translateY = event.clientY - disY;
          //移动当前元素
          el.style.position = 'absolute';
          if (
            translateX >= 0 &&
            translateX <= window.innerWidth - el.offsetWidth
          ) {
            el.style.left = translateX + 'px';
          }
          if (
            translateY >= 0 &&
            translateY <= window.innerHeight - el.offsetHeight
          ) {
            el.style.top = translateY + 'px';
          }
        };
      }, 200);
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        clearTimeout(time);
        el.style.opacity = '1';
        this.navigationStyle = {};
      };
    },
  },
};
</script>

<style lang="less" scoped>
.map-navigation {
  position: relative;
  // right: 0.25rem;
  // width: 24em;
  color: #fff;
  font-size: 0.14rem;
  display: flex;
  flex-direction: column;
  place-items: center;
  padding: 0.15rem 0.14rem 0.1rem 0.13rem;
  border: 1px solid #67d2f3;
  overflow: hidden;
  overflow-y: scroll;
  z-index: 11;
  background: linear-gradient(
    270deg,
    rgba(10, 91, 157, 0.9) 0%,
    rgba(13, 65, 106, 0.9) 100%
  );

  &.navbar {
    padding: 0.1rem;
    flex-direction: row;
    background: linear-gradient(95deg, #0473cf 0%, #085da2 100%);
    cursor: pointer;
    user-select: none;

    .icon {
      width: 0.16rem;
      height: 0.16rem;
      margin-right: 0.05rem;
    }
  }

  .el-icon {
    position: absolute;
    top: 0.03rem;
    right: 0;
    scale: 0.9;
    font-weight: bolder;
  }

  p {
    white-space: pre-wrap;
    text-align: center;
  }
}

.select-wrapper {
  display: flex;
  align-items: center;

  .switch-icon {
    width: 0.15rem;
    margin: 0 0.045rem;
    transition: transform 300ms;
    cursor: pointer;

    &.rotate {
      transform: rotate(180deg);
    }
  }
}

.recommend-wrapper {
  width: 100%;
  margin-top: 0.17rem;
  background-color: #145d99;

  .recommend-title {
    background: linear-gradient(90deg, #0174c1 0%, #1c6dab7a 100%);
    font-size: 0.13rem;
    line-height: 0.3rem;
    padding-left: 0.13rem;
  }

  .recommend-content {
    padding: 0.14rem;
    font-size: 0.12rem;
    display: flex;
    flex-direction: column;

    .recommend-content-item {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      margin-bottom: 0.16rem;

      &:last-child {
        margin-bottom: 0;
      }

      .low-time,
      .low-distance,
      .other {
        background-color: rgb(106, 91, 91);
        border-radius: 6px;
        padding: 0.02rem 0.1rem;
        text-align: center;
      }

      .low-distance {
        background-color: #29c524;
      }

      .low-time {
        background-color: #2f79ff;
      }

      .describe {
        padding-left: 0.18rem;
        display: inline-flex;

        &::after {
          content: '|';
          padding-left: 0.18rem;
        }

        &:last-child::after {
          content: '';
          padding-left: 0;
        }
      }

      &.actived::after {
        content: '';
        display: inline-block;
        border: 8px solid transparent;
        border-right-color: red;
        width: 0;
        height: 0;
        padding-left: 0;
        margin-left: 0.05rem;
      }
    }
  }
}
</style>
<style lang="less">
.map-navigation {
  .el-input__wrapper {
    height: 0.36rem;
    width: 1.4rem;
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
      inset;

    ::placeholder {
      color: #fff;
    }
  }
}
.el-button {
  .el-icon {
    scale: 1.3;
  }
}

.el-select-dropdown {
  z-index: 9;

  .el-select-dropdown__list {
    padding: 0;
  }

  .el-select-dropdown__wrap {
    margin-bottom: -0.05rem !important;
  }

  .el-select-dropdown__item {
    color: #fff;
    background-color: #00496e;

    &.selected {
      background-color: #00496e;
    }

    &.is-disabled {
      color: #c0c4cc;
      background-color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .el-select-dropdown__item.hover {
    &:hover {
      background-color: #012d50;
    }
  }
}
</style>
