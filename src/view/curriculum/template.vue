<template>
    <div class="template-container">
        <van-search v-model="searchVal" @search="search"  @clear="clear" placeholder="请输入搜索关键词" shape="round" left-icon="search"  background=""></van-search>
        <div class="list-container">
          <div class="list-item" v-for="(item, index) in templateList" :key="index" :clickable=true @click="previewImage(item)">
            <van-image :src="item.src" radius="10" />
            <p class="template-name">{{item.name}}</p>
          </div>
        </div>
        <van-image-preview v-model="show" :images="images" showIndicators className="preview">
            <template v-slot:index>
                {{currentTemplate.name}}
            </template>
            <template v-slot:cover>
                <span class="btn bth-tran" @click="cancle">取消</span>
                <span class="btn " @click="select">选定</span>
            </template>
        </van-image-preview>
    </div>
</template>
<script>
export default {
  data() {
    return {
      searchVal: "", // 搜索内容
      templateList: '',
      show: false, // 是否展示图片预览框
      images: [], // 展示的图片地址
      currentTemplate: {} // 当前模板
    };
  },
  created() {
    this.loadImgList()
  },
  mounted() {
  },
  methods: {
    async loadImgList(){
      let templateList = await this.$http.get('/koolearn/config/templateList.json')
      let decoration = await this.$http.get('/koolearn/config/decoration.json')
      this.templateList = templateList.data
      this.decoration = decoration.data
    },
    search() {
      const searchVal = this.searchVal;
      const arr = [];
      this.templateList.forEach((item)=> {
        const { name } = item;
        if (name.indexOf(searchVal) > -1) {
          arr.push(item)
        }
      })
      this.templateList = arr;
    },
    clear() {
      this.searchVal = "";
    },
    // 预览图片
    previewImage(val) {
      this.show = true;
      this.images = val.images || [];
      this.currentTemplate = val;
    },
    // 取消
    cancle() {
      this.show = false;
    },
    // 选择
    select() {
      this.$router.push({ path: "works", query: { id: this.currentTemplate.id, type: "create" } });
    }
  }
};
</script>
<style lang="less">
.template-container {
  .van-search{
    padding: 12px 16px 20px 16px;
  }
  .van-search__content{
    height: 50px;
    border-radius: 10px;
    line-height: 50px;
    padding-top: 13px;
    padding-right: 17px;
    box-sizing: border-box;
  }
  .van-field__left-icon{
    margin-right: 11px;
  }
  .van-cell{
    padding: 0;
  }
  .van-icon-search{
    &::before{
      content: '';
      display: inline-block;
      width: 16px ;
      height: 16px;
    }
    background: url('../../asset/image/icon/nav_icon_search@2x.png') no-repeat center center;
    background-size: 16px 16px;
  }
  .van-image{
    width: 160px;
    height: 284px;
  }
  /deep/.van-icon-clear{
    position: relative;
    right: 17px !important;
  }
  .list-container {
    padding: 0 16px;
    max-height: calc(100vh - 128px);
    box-sizing: border-box;
    overflow-y: auto;
    .list-item{
      width: 160px;
      float: left;
      height: 334px;
      &:nth-child(2n + 1){
        margin-right: 23px;
      }
    }
    .template-name {
      padding-top: 8px;
      padding-bottom: 22px;
      font-size: 14px;
      height: 20px;
      font-weight: 400;
      color: #333333;
      line-height: 0px;
      text-align: center;
    }
  }
  .van-image-preview__cover {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 635px;
  }
  .preview {
    .van-image-preview__image {
      width: 269px;
      height: 478px;
      position: absolute;
      height: auto;
      margin: 0 auto;
      background: #fff;
      border-radius: 2.66667vw;
      top: 107px;
    }
    .btn{
      width: 123px;
      margin-left: 23px;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      &:first-child{
        margin-left: 53px;
      }
    }
    .van-image__img {
      border-radius: 10px;
    }
    .van-swipe__indicators {
      top: 597px;
    }
    .van-image-preview__index {
      top: 76px;
      height: 22px;
      font-size: 16px;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 22px;
    }
  }
}
</style>
