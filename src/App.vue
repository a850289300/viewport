<template>
  <div id="app">
    <narBar></narBar>
    <router-view class="content"/>
  </div>
</template>

<script>
import narBar from '@/view/common/navBar.vue';

export default {
  components: {
    narBar
  },
};
</script>
<style lang="less">
@import '../assets/styles/common.less';

body {
  font-size: 16px;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.content{
  height: calc(100vh - 46px);
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
