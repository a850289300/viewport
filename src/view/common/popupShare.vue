<template>
    <div class="share">
      <p class="shareTitle">分享至</p>
      <span class="wechat" @click="share2wechat">微信好友</span>
      <span class="wechatMoment" @click="share2wechatMoment">朋友圈</span>
    </div>
</template>

<script>


export default {


  data() {
    return {
      title: ''
    };
  },

  methods: {
    share2wechat() {
      
    },
    share2wechatMoment(){

    }
  }
};
</script>

<style lang="less" scoped>
.share{
  .shareTitle{
    width: 100vw;
    height: 21px;
    font-size: 15px;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 21px;
    margin-bottom: 16px;
    text-align: center;
  }
  .wechat,.wechatMoment{
    display: inline-block;
    width: 48px;
    height:55px;
    text-align: center;
    padding-top: 39px;
    background: url('../../asset/image/icon/wechat@2x.png') no-repeat top center;
    background-size:28px 24px ;
    box-sizing: border-box;
    font-weight: 400;
    color: #FFFFFF;
    font-size: 11px;
    margin-left: 93px;

  }
  .wechatMoment{
    background: url('../../asset/image/icon/Group@2x.png') no-repeat top center;
    background-size:28px 24px ;
    margin-left: 93px;
    margin-left: 107px;

    
  }

}
</style>
