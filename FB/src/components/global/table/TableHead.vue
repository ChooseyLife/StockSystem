<template>
  <el-form
    :inline="true"
    :model="formConfig.formData"
    :rules="formConfig.rules"
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
        v-model="formConfig.formData[item.prop]"
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
        v-model.trim="formConfig.formData[item.prop]"
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
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: this.formConfig.message ? this.formConfig.message : '搜索错误'
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
