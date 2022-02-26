<!--
	定制弹窗标题、按钮和主题内容
	组件开关
	z-index处理
	点击遮罩层关闭弹窗
-->
<template>
  <div
    class="modal-bg"
    v-if="show"
    @click.self="hideModal"
  >
    <div class="modal-container">
      <div class="modal-header">
        {{ title }}
      </div>
      <div class="modal-main">
        <slot></slot>
      </div>
      <slot name="submit"></slot>
      <div
        class="modal-footer"
        v-if="showButton"
      >
        <button @click="submit">OK</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'modal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '弹窗'
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideModal () {
      this.$emit('hideModal')
    },

    submit () {
      this.$emit('submit')
    },
  }
}
</script>
<style lang="less" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  width: 400px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  background: #ccc;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-top: 1px solid #ddd;
}
.modal-footer button {
  width: 100px;
}
.modal-main {
  padding: 15px 40px;
}
</style>