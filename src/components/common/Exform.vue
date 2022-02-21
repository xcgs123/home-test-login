<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  provide () {//写法上和data一样，组件传值
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate (cb) {//表单提交时调用的方法，传入一个回调函数
      var ispass = Object.keys(this.model).every(item => {
        console.log(item, this.model[item], this.rules.error)
        return this.model[item] && !this.rules.error
      })
      cb(ispass);//将校验结果传递出去
    }
  }
}
</script>