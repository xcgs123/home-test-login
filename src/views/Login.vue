<template>
  <ex-form
    class="contain"
    :rules="rulesform"
    :model="modelform"
    ref="loginForm"
  >
    <div class="content">
      <ex-form-item
        prop="name"
        class="mb20"
      >
        <ex-input
          class="ex-input"
          v-model="modelform.name"
          :placeholder="'Full name'"
        ></ex-input>
      </ex-form-item>
      <ex-form-item
        prop="email"
        class="mb20"
      >
        <ex-input
          class="ex-input"
          type="email"
          v-model="modelform.email"
          :placeholder="'Email'"
        ></ex-input>
      </ex-form-item>
      <ex-form-item
        prop="comfirmEmail"
        class="mb20"
      >
        <ex-input
          class="ex-input"
          type="comfirmEmail"
          v-model="modelform.comfirmEmail"
          :placeholder="'Comfirm email'"
          :disabled="!modelform.email"
        ></ex-input>
      </ex-form-item>
    </div>
    <ex-form-item class="mt30">
      <button
        :disabled="pending"
        type="button"
        @click="submitForm('loginForm')"
      >{{ pending?'pelese wait':'Send' }}</button>
    </ex-form-item>
    <div style="color:red">{{submitError}}</div>
  </ex-form>
</template>

<script>
import ExInput from 'components/common/Exinput'
import ExFormItem from 'components/common/Exformitem'
import ExForm from 'components/common/Exform'
import { emailRule } from '../common/rule'
import { api } from '../config/api'
import { post } from '../common/until/request'

export default {
  components: {
    ExInput,
    ExFormItem,
    ExForm
  },
  data () {
    return {
      modelform: {
        name: "",
        email: "",
        comfirmEmail: ""
      },
      rulesform: {
        name: [{ required: true }],
        email: [...emailRule, { required: true }],
        comfirmEmail: [...emailRule, { required: true }]
      },
      pending: false,
      submitError: ''
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate(async vate => {
        if (!vate) {
          this.submitError = '校验失败'
          return
        }
        //请求接口
        this.pending = true
        const params = this.modelform
        const res = await post(api.commitUserInfo, params)

        this.pending = false
        console.log(res)
        if (res.code === 0) {
          console.log("提交成功")
          this.$emit('summitSuccess')
          return
        }

        this.submitError = res.mes
        console.log(res.mes || "提交失败")
      });
    }
  }
}
</script>
<style scoped lang="less">
.contain {
  text-align: center;
}

.content {
  display: inline-block;
  width: 100%;
}
.ex-input {
  width: 80%;
  display: inline-block;
  height: 30px;
}
.sumit {
}
</style>