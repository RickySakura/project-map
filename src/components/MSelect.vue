<template>
  <div class="m-select">
    <div
      class="m-select__wrapper"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="m-select__title">
        <img class="m-select__icon" src="@/assets/img/cap.png" alt="" />
        <span>{{ title }}</span>
      </div>
      <el-select
        :="$attrs"
        :multiple="multiple"
        :placeholder="placeholder"
        :clearable="clearable"
      >
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [Array, Object, Number],
      default: () => {
        return [];
      },
    },
    // valueKey
    // - 不传则为整个item赋值
    // - 传`$key` 返回index（array）或key（object）
    valueKey: {
      type: String,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="less">
.m-select {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 2.7rem;
  background-color: #00496e;
  border: 1px solid #37a8ff;
  border-radius: 6px;

  .m-select__wrapper {
    display: flex;
    overflow: hidden;
    min-height: 0.4rem;

    .m-select__title {
      width: auto;
      font-size: 0.14rem;
      white-space: nowrap;
      background-color: #006491;
      padding-right: 0.05rem;
      color: #fff;
      border-right: 1px solid #37a8ff;
    }
    .m-select__icon {
      width: 0.16rem;
      height: 0.12rem;
      margin: 0 0.05rem 0 0.11rem;
    }

    & > div {
      display: flex;
      align-items: center;
    }

    :deep(.el-input) {
      padding-left: 0.01rem;
      .el-input__wrapper {
        background-color: #00496e;
        box-shadow: none !important;
        width: auto;
        &.is-focus {
          box-shadow: none !important;
        }
        .el-input__inner {
          z-index: 999;
        }
      }
    }
  }
}
</style>

<style lang="less">
.el-cascader-menu {
  background-color: #00496e;
  border-right: 1px solid #37a8ff;
  color: #fff;

  .el-cascader-node {
    color: #fff;

    &:hover,
    &.is-active {
      background: #012d50 !important;
    }
  }
}

.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background: #012d50 !important;
}

.el-popper {
  border: none !important;
}
</style>
