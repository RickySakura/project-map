<template>
  <div class="m-division-container">
    <div class="m-division-options" v-if="options.length > 0 && showOptions">
      <div
        class="m-division-option"
        :class="[optionActivedIndex == index ? 'actived' : '']"
        v-for="(option, index) in options"
        :key="index"
        @click="handleOptionClick(option, index)"
      >
        <img v-if="option.icon" :src="option.icon" alt="icon" />
        <div class="division-option-label">
          <slot name="label" :option="option">
            {{ option.label }}
          </slot>
        </div>
      </div>
    </div>
    <div class="m-division-panel">
      <div
        class="m-division-content"
        v-if="
          optionActivedIndex > -1 && optionActivedIndex <= options.length - 1
        "
      >
        <div class="content-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="content-search-bar" v-if="enableSearch">
          <input
            type="text"
            :placeholder="placeholder"
            v-model="searchText"
            @input="handleSearch"
          />
          <img src="@/assets/img/search-icon.png" alt="search" class="icon" />
        </div>
        <ol class="content-list">
          <li
            class="content-list-item"
            :class="[listItemActivedIndex === index ? 'actived' : '']"
            v-for="(item, index) in listSearchResult"
            :key="index"
            @click="handleListItemClick(item, index)"
          >
            <div class="item-index">{{ index + 1 }}</div>
            <div class="item-label">
              {{ typeof item === 'string' ? item : item.label }}
            </div>
          </li>
          <div class="no-data" v-if="activedList && activedList.length <= 0">
            暂无数据
          </div>
        </ol>
      </div>
      <div
        class="m-division-content extra-list"
        v-if="listItemActivedIndex > -1 && enableExtraList"
      >
        <ol class="content-list">
          <li
            class="content-list-item"
            :class="[extraItemActivedIndex === index ? 'actived' : '']"
            v-for="(item, index) in extraList"
            :key="index"
            @click="handleExtraListItemClick(item, index)"
          >
            <div class="item-index">{{ index + 1 }}</div>
            <div class="item-label">
              {{ typeof item === 'string' ? item : item.label }}
            </div>
          </li>
          <div class="no-data" v-if="extraList && extraList.length <= 0">
            暂无数据
          </div>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useMapStore } from '@/stores/mapStore';
export default {
  /**
   * props API:
   * title: 列表框左上角的标题内容
   * placeholder: 搜索框内的占位内容(如果开了搜索框的话)
   * enableSearch: 控制是否显示搜索框
   * options: Divison组件上方(默认是上方)的选择按钮列表
   *    optionItem: options内的格式一般为 { label: "", icon: "", children: [] }，其中 icon 可能需要经过getAssetsFile处理, children为option对应的列表数据
   * defaultActivedIndex: 第一次加载时默认选中的 optionItem 的索引值, 从 0 开始
   * enableExtraList: 点击列表中的项时是否展开二级列表, 如果需要在必须在 options 中配置 children 属性, 每一项对应一个额外列表数据。
   *    optionItem: { children: [{ label: "", icon: "", children: [ 这里是额外列表 ] }] }
   * listData: 用于手动控制列表内容，在做网络处理时可用，此时不需要再 options 选项中配置 children
   */
  props: {
    title: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入关键词搜索',
    },
    enableSearch: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      required: true,
      default: [],
    },
    defaultActivedIndex: {
      type: Number,
      default: -1,
    },
    enableExtraList: {
      type: Boolean,
      default: false,
    },
    listData: {
      type: Array,
      default: () => [],
    },
    showOptions: {
      type: Boolean,
      default: true
    },
    keyCode: {
      type: Object,
      default: { label: 'label' },
    },
  },
  data() {
    return {
      listItemActivedIndex: -1,
      optionActivedIndex: -1,
      searchText: '',
      extraItemActivedIndex: -1,
    };
  },
  computed: {
    ...mapState(useMapStore, ['addressId']),
    activedList() {
      this.listItemActivedIndex = -1;

      if (Array.isArray(this.listData) && this.listData.length > 0)
        return this.listData;

      return this.options[this.optionActivedIndex]?.children || []; // 判空处理
    },
    listSearchResult() {
      if (!this.enableSearch) {
        return this.activedList;
      } else {
        return this.activedList.filter((v) => {
          if (typeof v === 'string') return v.includes(this.searchText);
          if (typeof v?.label === 'string')
            return v.label.includes(this.searchText);
        });
      }
    },
    extraList() {
      if (this.enableExtraList) {
        return (
          this.options[this.optionActivedIndex]?.children[
            this.listItemActivedIndex
          ]?.children || []
        );
      } else {
        return [];
      }
    },
  },
  watch: {
    addressId() {
      this.listItemActivedIndex = -1;
    },
  },
  mounted() {
    if (this.defaultActivedIndex > -1 && this.options.length > 0) {
      this.optionActivedIndex = this.defaultActivedIndex;
    }
  },
  methods: {
    $reset() {
      this.listItemActivedIndex = -1;
      this.optionActivedIndex = -1;
      this.searchText = '';
      this.extraItemActivedIndex = -1;
    },
    handleOptionClick(option, index) {
      if (this.optionActivedIndex === index) {
        // 重复点击
        this.$reset();
      } else {
        this.optionActivedIndex = index;
        this.listItemActivedIndex = -1;
        this.extraItemActivedIndex = -1;
        this.$nextTick(() => {
          this.$emit('optionClick', { option, index });
        });
      }
    },
    handleListItemClick(item, index) {
      this.listItemActivedIndex = index;
      if (this.enableExtraList) {
        this.extraItemActivedIndex = -1;
      }
      this.$nextTick(() => {
        this.$emit('listItemClick', { item, index });
      });
    },
    handleExtraListItemClick(item, index) {
      this.extraItemActivedIndex = index;
      this.$nextTick(() => {
        this.$emit('extraListItemClick', { item, index });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.m-division-container {
  position: relative;
  width: 2.7rem;
  color: #fff;
}
.m-division-panel {
  display: flex;
}
.m-division-content {
  min-width: 2.7rem;
  height: 5.8rem;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 4px;
  background-color: #012d50;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.06);
  border: 1px solid #37a8ff;
  margin-right: 0.06rem;
}
.content-title {
  width: 100%;
  height: 0.37rem;
  font-size: 0.13rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 0 0.1rem;
  background: linear-gradient(180deg, #006491 0%, #005882 55%, #012d50 100%);
}
.content-search-bar {
  display: flex;
  position: sticky;
  top: 0.1rem;
  align-items: center;
  width: 2.36rem;
  height: 0.3rem;
  margin: 0.1rem;
  background-color: #00496e;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  padding-left: 0.1rem;
  input {
    width: 84%;
    height: 0.25rem;
    color: #78d4fd;
    font-size: 0.14rem;
    line-height: 0.14rem;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    // -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &::placeholder,
    &::-webkit-input-placeholder {
      color: #78d4fd;
    }
  }
  .icon {
    width: 0.15rem;
    height: 0.15rem;
  }
}

.content-list {
  padding: 0 0.1rem;
}
.no-data {
  font-size: 0.14rem;
  line-height: 0.3rem;
  text-align: center;
}
.content-list-item {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  height: 0.3rem;
  font-size: 0.15rem;
  cursor: pointer;
  &.actived {
    background-color: #036fc8;
    border-radius: 5px;
  }
}

.item-index {
  width: 0.15rem;
  background-color: rgba(130, 234, 255, 0.1);
  text-align: center;
  line-height: 0.15rem;
  border-radius: 50%;
  color: #a1fcfe;
}

.item-label {
  height: 0.18rem;
  width: 2.23rem;
  padding-left: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.m-division-options {
  margin: 0.1rem 0;
  background-color: #012d50;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.06);
  border: 1px solid #37a8ff;
  border-radius: 4px;
}
.m-division-option {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 0.29rem;
  padding-left: 0.1rem;

  &.actived {
    border-right: 4px solid #01d9fd;
    background: linear-gradient(
      180deg,
      #00558e 0%,
      #013c64 29%,
      #014777 72%,
      #00558e 100%
    );
  }

  // 选项前的图标
  img {
    width: 0.175rem;
    height: 0.175rem;
    margin-right: 0.1rem;
  }
}
.division-option-label {
  font-size: 0.134rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.child-content {
  position: absolute;
  top: 0;
  left: 100%;
}
</style>
