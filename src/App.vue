<template>
  <div
    id="app"
    class="container flex"
  >
    <Header />
    <div class="center">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from 'components/Header'
import Footer from 'components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
<style lang="less">
@import './style/common';

.container.flex {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.flex .center {
  flex: 1;
  overflow-y: scroll;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>