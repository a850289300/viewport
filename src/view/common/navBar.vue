<template>
  <div class="nav-bar">
    <van-nav-bar 
    left-text="返回"
    :title="title"
    left-arrow
    @click-left="goBack"
    ></van-nav-bar>
  </div>
</template>

<script>
import {
  NavBar 
} from 'vant';

export default {
  components: {
    [NavBar.name]: NavBar
  },

  // computed: {
  //   title: {
  //     get() {
  //       return this.$route.meta.title
  //     },
  //     set(val) {
  //       this.$route.meta.title = val
  //     }
  //   }
  // },

  watch: {
    '$route.meta.title': {
      handler(val) {
        this.title = val;
      }
    }
  },

  created() {
    this.bus.$on("changeTitle", (val)=> {
      this.title = val
    })
  },

  data() {
    return {
      title: ''
    };
  },

  methods: {
    goBack() {
      window.history.go(-1)
    }
  }
};
</script>

<style lang="less">
</style>
