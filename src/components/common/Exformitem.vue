<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p
      v-if="error"
      style="color:red"
    >{{error}}</p>
  </div>
</template>
<script>
import Schema from "async-validator"
export default {
  inject: ["form"],//接收form组件传递过来值
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: { //用户取的单个表单名，比如：uname,password等，与model和rules中的键一致。
      type: String
    }
  },
  data () {
    return {
      error: ""//存放验证失败时的信息
    }
  },
  mounted () {
    this.$on("validate", this.validate)
  },
  methods: {
    validate () {
      //使用async-validator验证时，校验规则和校验的值以键值对方式传入
      const val = this.form.model[this.prop];//获取当前校验的input值
      const rule = this.form.rules[this.prop];//获取当前input的校验规则
      const descriptor = { [this.prop]: rule };
      const schema = new Schema(descriptor);
      const source = { [this.prop]: val };

      schema.validate(source, error => {
        if (error) {
          this.error = error[0].message;//如果有错误，将错误信息赋给error
          this.form.rules[this.prop].error = true;//如果有错误我给当前的校验规则中添加一个error属性赋值为true，主要是方便提交时校验
        } else {
          this.error = "";
          this.form.rules[this.prop].error = false;
        }
      })
    }
  }
}
</script>