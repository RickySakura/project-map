<template>
  <div>
    <el-table
      :data="tableData"
      class="table"
      :height="height"
      v-loading="tableLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
    >
      <el-table-column
        fixed="left"
        min-width="55"
        prop="name"
        label="行政区域"
      ></el-table-column>
      <el-table-column
        min-width="50"
        prop="total"
        :label="type === 1 ? '学校数' : type === 2 ? '学生数' : '教师数'"
      >
      </el-table-column>
      <el-table-column min-width="50" label="低风险区">
        <template v-slot="{ row }">
          <div>
            {{ row.InLowRiskAreaTotal || 0 }}
            <!-- {{ row }} -->
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="55" label="高风险区">
        <template v-slot="{ row }">
          <div :class="[row.InHighRiskAreaTotal > 0 ? 'danger' : '']">
            {{ row.InHighRiskAreaTotal || 0 }}
            <!-- {{ row.schoolsInHighRiskAreaTotal }} -->
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="55" label="中风险区">
        <template v-slot="{ row }">
          <div :class="[row.InHighRiskAreaTotal > 0 ? 'danger' : '']">
            {{ row.InMediumRiskAreaTotal || 0 }}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "5vw",
    },
    type: {
      type: Number,
      default: 1,
    },
    tableLoading: {
      type: Boolean,
      defalut: false,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    tableData(nv) {},
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.danger {
  color: red;
}

.el-table {
  font-size: 0.12rem;
}

:deep(.el-table) tr {
  background-color: #155080 !important;
  color: #fff;
  td {
    background: transparent;
  }
}

:deep(.el-table) .cell {
  padding: 0;
  text-align: center;
}

.table {
  &.el-table {
    background: rgba(2, 122, 255, 0.1);
  }

  // 修改表格
  .is-leaf {
    font-size: 0.14rem;
    color: #30455c;
    font-weight: 400;
    background: rgba(2, 122, 255, 0.8);
  }

  .el-table tbody {
    border: none;

    td {
      font-size: 0.14rem;
    }
  }

  :deep(.el-table__body) .el-table__row.hover-row td {
    background: rgba(2, 122, 255, 0.1) !important;
  }

  // 修改表格边框
  .el-table th.is-leaf {
    /* 去除上边框 */
    border: none;
    width: 0.5rem;
    border-color: transparent;
  }

  .el-table,
  .el-table__expanded-cell {
    background: transparent;
  }

  :deep(th.el-table__cell.is-leaf) {
    border-color: transparent;
  }

  .el-table th .cell {
    /* 去除上边框 */
    border: none !important;
    border-right: 1px solid #d1e3f9;
  }

  .el-table th:nth-of-type(9).is-leaf .cell {
    /* 去除上边框 */
    border: none;
  }

  :deep(.el-table__row) > td {
    /* 去除表格线 */
    border: none;
    border-bottom: 1px dashed #bec3d2;
  }

  :deep(.el-table__cell) {
    padding: 0 !important;
    width: 0.5rem !important;
  }

  :deep(th.el-table__cell) {
    & > .cell {
      font-size: 0.12rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fff;
      width: 100%;
      padding: 0 !important;
      text-align: center;
    }
    background-color: rgba(2, 122, 255, 0.8);
  }

  :deep(tr.el-table__cell) > .cell {
    color: #fff;
  }
}
</style>
