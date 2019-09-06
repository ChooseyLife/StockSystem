<template>
  <d2-container>
      <TableHead slot="header" :formConfig="formConfig" @submit="searchMethod"></TableHead>
      <!-- <d2-crud
      :columns="tableConfig.columns"
      :data="tableConfig.data"
      :rowHandle="rowHandle"
      :edit-template="tableConfig.editTemplate"
      :form-options="tableConfig.formOptions"
      @dialog-open="handleDialogOpen"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      @row-remove="handleRowRemove"></d2-crud> -->
      <TableMain
      :config="tableConfig"
      @Edit="btnEdit"
      @Del="btnDel"></TableMain>
      <TableFooter
      slot="footer"
      :page="tableConfig.page"
      @change="handlePaginationChange"></TableFooter>
  </d2-container>
</template>

<script>
import TableHead from '@/components/global/table/TableHead'
import TableMain from '@/components/global/table/TableMain'
import TableFooter from '@/components/global/table/TableFooter'
import { getProductList } from '@/api/userApi'
export default {
  components: {
    TableHead, TableFooter, TableMain
  },
  mounted () {
    this.getList()
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
        ],
        formData: {
          search: ''
        },
        rules: {
          search: [ { required: true, message: '请输入搜索的关键词', trigger: 'blur' } ]
        }
      },
      tableConfig: {
        columns: [
          {
            title: '名称',
            key: 'price',
            type: 'text'
          },
          {
            title: '备注',
            key: 'thumb',
            type: 'img'
          }
        ],
        options: {
          align: 'center',
          border: true,
          loading: false,
          loadingOptions: {
            text: '拼命加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.8)'
          }
        },
        data: [],
        action: [
          {
            event: 'Edit',
            type: 'text',
            title: '编辑'
          },
          {
            event: 'Del',
            type: 'text',
            title: '删除'
          }
        ],
        page: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40, 50, 100],
          pageTotal: 1
        },
        formOptions: {
          labelWidth: '80px',
          labelPosition: 'left',
          saveLoading: false
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
        }
      },
      rowHandle: {
        edit: {
          icon: 'el-icon-edit',
          size: 'small',
          fixed: 'right',
          confirm: true,
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
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  methods: {
    getList () {
      getProductList().then(res => {
        this.tableConfig.data = res.list.map(item => {
          item.hideEvent = []
          return item
        })
        this.tableConfig.page.pageTotal = res.list.length
        console.log(res)
      })
    },
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

        // done可以传入一个对象来修改提交的某个字段
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
    handlePaginationChange (currentPage) {
      const key = currentPage.current ? 'current' : 'size'
      this.tableConfig.page[key === 'size' ? 'pageSize' : 'currentPage'] = currentPage[key]
      console.log(this.tableConfig.page, key, currentPage)
    },
    handleRowRemove ({ index, row }, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    btnEdit (row, idx) {
      console.log(row, idx)
    },
    btnDel (row, idx) {
      console.log(row, idx)
    },
    searchMethod (value) {
      console.log(value, this.formConfig.formData)
    }
  }
}
</script>
