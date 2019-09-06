<template>
  <d2-container>
      <TableHead slot="header" :formConfig="searchConfig" @submit="searchMethod" @add="handleAdd"></TableHead>
      <TableMain
      :config="tableConfig"
      @Edit="btnEdit"
      @Del="btnDel">
        <m-dialog :config="config" @confirm="handleConfirm">
          <el-form :model="formData" :rules="rules" ref="form">
            <el-form-item v-for="(item, idx) in formList" :key="idx" :label="item.label" :prop="item.prop">
              <el-input v-if="item.type === 'input'" :type="item.isType" v-model="formData[item.prop]"></el-input>
            </el-form-item>
          </el-form>
        </m-dialog>
      </TableMain>
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
import MDialog from '@/components/global/table/dialog'
import { getUserList } from '@/api/userApi'
export default {
  components: {
    TableHead, TableFooter, TableMain, MDialog
  },
  mounted () {
    for (let k = 0; k < 20; k++) {
      this.tableConfig.data.push(
        {
          id: k + 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          forbidEdit: false,
          showEditButton: true,
          hideEvent: []
        }
      )
    }
    this.getList()
  },
  data () {
    return {
      searchConfig: {
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
            key: 'date',
            type: 'text'
          },
          {
            title: '电话',
            key: 'username',
            type: 'text'
          },
          {
            title: '备注',
            key: 'role',
            type: 'text'
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
      config: {
        title: '',
        visible: false
      },
      formList: [],
      formData: [],
      rules: []
    }
  },
  methods: {
    getList () {
      getUserList().then(res => {
        this.tableConfig.data = res.list.map(item => {
          item.hideEvent = []
          return item
        })
        this.tableConfig.page.pageTotal = res.list.length
        console.log(res)
      })
    },
    handlePaginationChange (currentPage) {
      const key = currentPage.current ? 'current' : 'size'
      this.tableConfig.page[key === 'size' ? 'pageSize' : 'currentPage'] = currentPage[key]
      console.log(this.tableConfig.page, key, currentPage)
    },
    handleAdd () {
      console.log(1)
      this.config.visible = true
      this.config.title = '新建'
    },
    handleConfirm () {},
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
