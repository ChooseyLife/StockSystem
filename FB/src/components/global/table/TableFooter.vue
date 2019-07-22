<template>
  <el-pagination
    :current-page="page.currentPage"
    :page-size="page.pageNo"
    :total="page.pageTotal"
    :page-sizes="[10, 30, 100, 200]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    page: {
      type: Object
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        current: this.current,
        size: val,
        total: this.total
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        current: val,
        size: this.size,
        total: this.total
      })
    }
  }
}
</script>
