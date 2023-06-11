<template>
   <p class="popup-title">
        <span class="back" @click="goBack"></span>
        <span class="home" @click="goHome"></span>
    </p>
</template>

<script>


export default {


  data() {
    return {
      title: ''
    };
  },

  methods: {
    goBack() {
      window.history.go(-1)
    },
    goHome(){
      if(this.$route.path === '/curriculum'){
        location.reload()
      }else{
        this.$router.push('/curriculum')
      }
      
    }
  }
};
</script>

<style lang="less" scoped>
.popup-title{
  height: 18px;
  margin-top: 33px;
  .back,.home{
    display: inline-block;
    height: 18px;
    width: 10px;
    background: url('../../asset/image/icon/nav_icon_arrow_left1@2x.png') no-repeat center center;
    background-size: 10px 18px;

  }
  .back{
    margin-left: 16px;
  }
  .home{
    width: 25px;
    height: 22px;
    float: right;
    margin-right: 17px;
    background: url('../../asset/image/icon/tab_home_normal@2x.png') no-repeat center center;
    background-size: 25px 22px;

  }
}
</style>
