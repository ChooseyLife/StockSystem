<template>
  <d2-container>
    <template slot="header">
      <TableHead :formConfig="formConfig"></TableHead>
    </template>
        <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      :loading="loading"
      :loading-options="loadingOptions"
      edit-title="编辑"
      :edit-template="editTemplate"
      :rowHandle="rowHandle"
      :form-options="formOptions"
      @dialog-open="handleDialogOpen"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      :pagination="pagination"
      @pagination-current-change="paginationCurrentChange"/>
  </d2-container>
</template>

<script>
import TableHead from '@/components/global/table/TableHead'
export default {
  components: {
    TableHead
  },
  data () {
    return {
      formConfig: {
        formItem: [
          {
            prop: 'search',
            type: 'input',
            placeholder: '请输入关键字'
          }
        ]
      },
      columns: [
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '姓名',
          key: 'name'
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
          address: '上海市普陀区金沙江路 1518 弄',
          forbidEdit: false,
          showEditButton: true
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          forbidEdit: false,
          showEditButton: true
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          forbidEdit: false,
          showEditButton: true
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          forbidEdit: false,
          showEditButton: true
        }
      ],
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
          show (index, row) {
            if (row.showEditButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidEdit) {
              return true
            }
            return false
          }
        }
      },
      editTemplate: {
        date: {
          title: '日期',
          value: ''
        },
        name: {
          title: '姓名',
          value: ''
        },
        address: {
          title: '地址',
          value: ''
        },
        forbidEdit: {
          title: '禁用按钮',
          value: false,
          component: {
            show: false
          }
        },
        showEditButton: {
          title: '显示按钮',
          value: true,
          component: {
            show: false
          }
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
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
      }
    }
  },
  methods: {
    handleDialogOpen ({ mode, row }) {
      this.$message({
        message: '打开模态框，模式为：' + mode,
        type: 'success'
      })
    },
    editRowWithNewTemplate () {
      this.$refs.d2Crud.showDialog({
        mode: 'edit',
        rowIndex: 2,
        template: {
          date: {
            title: '日期',
            value: ''
          },
          name: {
            title: '姓名',
            value: ''
          }
        }
      })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done({
          address: '我是通过done事件传入的数据！'
        })
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    },
    paginationCurrentChange (currentPage) {
      this.pagination.currentPage = currentPage
    }
  }
}
</script>
