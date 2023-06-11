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
<style>
body {
  font-size: 16px;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.content{
  height: calc(100vh - 46px);
}
</style>
