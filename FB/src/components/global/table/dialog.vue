<template>
  <el-dialog
  :title="config.title"
  :visible.sync="show"
  :modal="true"
  @before-close="handleCancel"
  >
  <div>
    <slot></slot>
  </div>
   <div slot="footer" class="dialog-footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.config.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    handleCancel () {
      this.show = false
    },
    handleConfirm () {
      this.$emit('confirm')
    }
  }
}
</script>
