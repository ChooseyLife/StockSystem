<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">
    <el-form-item
      v-for="(item, idx) in formConfig.formItem"
      :key="idx"
      :label="item.label"
      :prop="item.prop">
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.prop]"
        placeholder="状态选择"
        style="width: 100px;">
        <el-option
          v-for="(optItem, optIdx) in item.data"
          :key="optIdx"
          :label="optItem.label"
          :value="optItem.value"/>
      </el-select>
      <el-input
        v-else-if="item.type === 'input'"
        v-model.trim="form[item.prop]"
        :placeholder="item.placeholder"
        :type="item.type"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  props: {
    formConfig: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        type: '1',
        user: 'FairyEver',
        key: '',
        note: ''
      },
      rules: {
        type: [ { required: true, message: '请选择一个状态', trigger: 'change' } ],
        user: [ { required: true, message: '请输入用户', trigger: 'change' } ]
      }
    }
  },
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>
