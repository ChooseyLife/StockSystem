<template>
  <el-table
      :data="tableData"
      v-loading="config.options.loading ? config.options.loading : false"
      :border="config.options.border"
      style="width: 100%;">
      <el-table-column
      v-for="(colItem, colIdx) in config.columns"
      :key="colIdx"
      :label="colItem.title"
      :prop="colItem.key"
      :align="config.options.align">
        <template slot-scope="scope">
          <span v-if="colItem.type === 'text'" v-text="scope.row[colItem.key]"></span>
          <span v-else-if="colItem.type === 'img'">
            <img :src="scope.row[colItem.key]" style="width: 100%"/>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="config.action"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button v-for="(btnItem, btnIdx) in config.action"
          :key="btnIdx"
          v-text="btnItem.title"
          :type="btnItem.type"
          fixed="right"
          v-show="!scope.row.hideEvent.includes(btnItem.event)"
          @click="btnEvent(btnItem, scope.row, scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
  props: {
    config: {
      type: Object
    }
  },
  methods: {
    btnEvent (item, row, idx) {
      this.$emit(`${item.event}`, row, idx)
    }
  },
  computed: {
    tableData () {
      return this.config.data.slice((this.config.page.currentPage - 1) * this.config.page.pageSize, this.config.page.currentPage * this.config.page.pageSize)
    }
  }
}
</script>
