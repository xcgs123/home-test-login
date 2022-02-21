<template>
  <input
    :type="type"
    :value="value"
    @input="handleInput"
    :placeholder="placeholder"
    :disabled="disabled"
    maxlength="200"
  />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请填写"
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleInput (e) {
      this.$emit("input", e.target.value);//input在这是写死的，这样父组件可直接@input
      this.$parent.$emit("validate");//当值改变时，通知父组件校验
    }
  }
}
</script>