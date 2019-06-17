<template>
  <d2-container>
    <template slot="header">Page 1 header</template>
        <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :loading="loading"
      :loading-options="loadingOptions"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
  </d2-container>
</template>

<script>
export default {
  name: 'user-center',
  data () {
    return {
      loading: false,
      loadingOptions: {
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
      },
      pagination: {
        currentPage: 1,
        pageSize: 5,
        total: 5
      },
      columns: [
        {
          title: '日期',
          key: 'date',
          width: '180'
        },
        {
          title: '姓名',
          key: 'name',
          width: '180'
        },
        {
          title: '地址',
          key: 'address'
        }
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
    }
  }
}
</script>
