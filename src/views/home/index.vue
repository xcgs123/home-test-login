<template>
  <div>
    <div class="home-main">
      <div>Enjoy every day!</div>
      <button @click="showDialog">Request an invite</button>
    </div>

    <Dialog
      :show="show"
      title="Request an invite"
      @hideModal="hideModal"
    >
      <Login @summitSuccess="handleSuccess" />
    </Dialog>
    <Dialog
      :show="showSuccess"
      title="All done!"
      @submit="showSuccess=false"
      showButton
    >
      <div>you will be one of the first</div>
    </Dialog>
  </div>
</template>

<script>
import Login from "../Login.vue"
import Dialog from "components/common/Dialog.vue";
export default {
  data () {
    return {
      show: false,
      showSuccess: false
    };
  },
  methods: {
    showDialog () {
      this.show = true;
    },
    hideModal () {
      this.show = false;
    },
    handleSuccess () {
      this.hideModal()
      //显示结果弹窗

      this.showSuccess = true
    }
  },
  components: { Login, Dialog }
}
</script>

<style lang="less" scope>
.home-main {
  font-size: 28px;
}
</style>