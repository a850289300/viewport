<template>
    <div class="works-container">
        <div class="tool">
          <span class="save" @click="saveProject"></span>
          <span class="more" @click="resetEdit = true"></span>  
        </div>
        <div class="swipe-box" :style="{width: width + 'px', height: height + 'px'}">
            <van-swipe @change="changeIndex" :initial-swipe="currentIndex" :touchable="operationType !== 'personality'">
                <van-swipe-item v-for="(image, index) in imgList" :key="index">
                    <canvas :id="'canvas-' + index"></canvas>
                    <!-- 利用遮罩层阻止canvas的事件 -->
                    <span v-show="operationType === 'preview'" class="mask-box"></span>
                </van-swipe-item>
            </van-swipe>
        </div>
        <span class="arrow-down"  :class="{ 'arrow-up': isFold , 'arrow-height': tabType === 3}" @click="isFold = !isFold"></span>
        <div class="operate" :class="['operate' + tabType, { 'operate-fold' : isFold}]">
          <!-- :style="{width: width + 'px'}" --> 
          <span class="preview-box-left">
            <p class="box box1" v-show="tabType === 1">{{ currentIndex + 1 }}/{{ imgList.length }}</p>
            <p class="box box2" v-show="tabType === 2">{{selfUploadImgList.length}}/{{ selfUploadImgListMax }} <upload v-if="selfUploadImgList.length < selfUploadImgListMax" class="upload" :btnText="'上传'" @callback="uploadCallback"/></p>

            <p class="box box3" v-show="tabType === 3">素<br/>材</p>
          </span>
          <!-- 作品 -->
          <div class="preview-box" v-if="tabType === 1">
              <span v-for="(image, index) in imgList" :key="index" style="position: relative">
                <img :src="image" class="preview-img" @click="changeIndex(index)">
                <span v-if="index === currentIndex" class="active-preview-img"></span>
              </span>
          </div>
          <!-- 作品集 -->
          <div class="preview-box" v-if="tabType === 2">
              <span v-for="(image, index) in selfUploadImgList" :key="index" style="position: relative">
                <img :src="image" class="preview-img" @click="addDecoration(image)">
              </span>
          </div>
          <!-- 装饰 (个性化) -->
          <div class="source-box" v-if="tabType === 3">
            <p class="tabs">
              <span v-for="item in sourceMap" :key="item.id" class="tab-item" :class="{active:currentSource === item.id}" @click="currentSource = item.id">{{ item.name }}</span> 
            </p>
            <span class="arrow-right"></span>
            <div v-show="currentSource === item.id" class="preview-box" v-for="item in sourceMap" :title="item.name" :key="item.id">
              <span v-for="(image, index) in decorationMap[item.id].images" :key="index" class="source-item">
                <img :src="image.src" class="preview-img" @touchstart="addDecoration(image.src)">
              </span>
            </div>
          </div>
        </div>
        <!-- :style="{width: width + 'px'}" -->
        <div class="operate-box">
          <span class="operate-box-item col-3" v-if="['personality','edit'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @touchstart="save">保存</van-button></span>
          <span class="operate-box-item col-3" v-if="['personality'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @touchstart="edit">编辑</van-button></span>
          <span class="operate-box-item col-3" v-if="['edit'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @touchstart="individuation">个性化</van-button></span>
          <span class="operate-box-item col-3" v-if="['personality','edit'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @touchstart="generate">生成</van-button></span>
          <span class="operate-box-item col-2" v-if="['preview'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @touchstart="saveAlbum">保存相册</van-button></span>
          <span class="operate-box-item col-2" v-if="['preview'].includes(operationType)"><van-button class="btn-works" round size="small" color="#49D391" @click="share">分享</van-button></span>
        </div>
        <div class="foot-tab">
          <span @click="tabType = 1" :class="{'active': tabType === 1}">作品集</span>
          <span @click="tabType = 2" :class="{'active': tabType === 2}">作品</span>
          <span @click="tabType = 3" :class="{'active': tabType === 3}">个性化</span>
        </div>
        <!-- 只输入作品名 -->
        <van-popup v-model="popup" :close-on-click-overlay="false" :round="true">
            <div class="popup-modal">
                <div class="popup-top">
                    <van-field v-model="projectName" class="popus-input" placeholder="请输入作品名称" />
                </div>
                <div class="popup-bottom">
                    <span class="btn popus-btn" @touchstart="confirm">确认</span>
                    <span class="popup-exit" @touchstart="exit">取消并退出</span>
                </div>
            </div>
        </van-popup>
        <!-- 输入作品名和姓名 年龄等 -->
        <van-popup v-model="popup2" :close-on-click-overlay="false" :round="true">
            <div class="popup-modal popup-modal2">
                <div class="popup-top">
                    <van-field v-model="projectName" class="popus-input" placeholder="请输入作品名称" />
                    <van-field v-model="name" class="popus-input popus-input-name" placeholder="姓名" />
                    <van-field v-model="age" class="popus-input popus-input-age" placeholder="年龄" />
                    <van-field v-model="sign" type="textarea" class="popus-input popus-input-intro" placeholder="个性签名"/>
                </div>
                <div class="popup-bottom">
                    <span class="btn popus-btn" @touchstart="confirm">确认</span>
                    <span class="popup-exit" @touchstart="exit">取消并退出</span>
                </div>
            </div>
        </van-popup>
        <!-- 重新编辑 -->
        <van-popup class="reset-popup van-popup van-popup--round van-popup--center" v-model="resetEdit" :close-on-click-overlay="true" :round="true">
            <div class="triangle"></div>
            <div class="reset" @click="reloadProject">重新编辑</div>
        </van-popup>
        <!-- 保存  弹框 -->
        <van-popup class="van-popup-public" v-model="isShowSaveSuccess">
            <popup-title @goBack="isShowSaveSuccess = false"/>
            <p class="title">小小宇航员</p>
            <van-image src="/myqcloud/koolearn/template/2-海边度假风/content-10.jpg" radius="10"  width="269" height="377"/>
            <span class="btn-small" @click="isShowSaveSuccess = false">继续编辑</span>
            <span class="btn-small btn-small2" @click="reloadProject">重新编辑</span>

            <popup-share class="share"/>
        </van-popup>

        <!-- 保存  弹框 2 -->
        <van-popup class="van-popup-public van-popup-save2" v-model="isShowSaveSuccess2">
            <popup-title @goBack="isShowSaveSuccess2 = false"/>
            <van-image src="/myqcloud/koolearn/template/2-海边度假风/content-10.jpg" radius="10"  width="341" height="479"/>
            <span class="btn-small" @click="isShowSaveSuccess = false">继续编辑</span>
            <span class="btn-small btn-small2" @touchstart="saveAlbum">保存相册</span>
        </van-popup>
        <van-share-sheet v-model="showShare" :options="options" cancel-text=""  @select="selectShare"/>
    </div>
</template>
<script>
import { fabric } from 'fabric';
export default {
  data() {
    return {
      tabType:1, // 当前选中的tab
      isFold: false,// 是否折叠
      resetEdit: false, // 重新编辑
      isShowSaveSuccess: false,// 保存成功
      isShowSaveSuccess2: false,// 保存2
      popup: false, // 弹框
      popup2: false, // 弹框
      projectName: '',// 作品名称
      name: '', 
      age: '',
      sign: '',
      canvas: {},
      scaleX: 1,
      scaleY: 1,
      width: 0, // 宽度
      height: 0, // 高度
      imgList: [],
      id: '', // 模板id
      type: '', //  当前类型 创建 或者 查看
      currentIndex: 0, // 当前第几张图片
      allData: { // 所有的数据

      },
      operationType: 'edit', // 编辑 edit, 个性化 personality， 预览 preview
      sourceMap: [],
      selfUploadImgList:[], // 自定义上传的装饰
      selfUploadImgListMax: 3, // 自定义上传装饰的最大值
      currentSource: '', // 当前激活状态的选中素材类型
      decorationMap: {}, // 素材资源
      showShare: false, // 是否展示分享面板
      options: [
        { name: '微信好友', icon: 'wechat', type: '1' },
        { name: '朋友圈', icon: 'wechat-moments', type: '2' },
      ],
    };
  },
  async created() {
    const { id, type } = this.$route.query;
    this.id = id;
    this.type = type;
    // 获取模板资源
    await this.loadImgList()
    // 当前作品集下的图片列表
    this.imgList = this.templateList[id].images;
    this.decorationMap = this.decoration || {};
    for(var key in this.decorationMap){
      if(!this.currentSource) this.currentSource = key
      this.sourceMap.push({name:this.decorationMap[key].name,id:key})
    }
    
    // 本地不存在这个模板的保存记录 则提示输入名称 年龄等
    // eslint-disable-next-line no-debugger
    debugger
    let savedData = JSON.parse(localStorage.getItem(this.id))
    this.popup2 = !savedData?.name
    
    this.$nextTick(()=>{
      this.initProject()
    })
    
  },
  methods: {
    async loadImgList(){
      let templateList = await this.$http.get('/myqcloud/koolearn/config/templateList.json')
      let decoration = await this.$http.get('/myqcloud/koolearn/config/decoration.json')
      this.templateList = templateList.data
      this.decoration = decoration.data
    },
    initProject(){
      this.getBoxInfo();
      this.createAllCanvas();
      this.changeTitle()
    },
    // 重新编辑 先置空 重新加载
    reloadProject(){
      this.resetProject()
      this.initProject()
      this.isShowSaveSuccess = false
      this.resetEdit = false
    },
    saveProject(){
      this.isShowSaveSuccess = true
      this.save()
    },
    // 重置
    resetProject(){
      this.save('reset')
    },
    // 分享
    selectShare(options) {
      const { type } = options;
      switch (type) {
        case '1':
          console.log('调用微信好友分享接口!')
          break;
        case '2':
          console.log('调用微信朋友圈分享接口!')
          break;  
      }
    },
    // 保存到相册
    saveAlbum() {
      // eslint-disable-next-line no-debugger
      // debugger
      const canvas = this.canvas;
      const id = new Date().getTime()
      for (let i in canvas) {
        const item = canvas[i];
        this.downloadImg(item.toDataURL({format: 'jpeg'}), `${id}-${i}`)
      }
    },
    uploadCallback(res){
      this.selfUploadImgList.push(res.Location.replace('pre-wall-e-1253017550.cos.ap-nanjing.myqcloud.com','/myqcloud'))
      console.log(res)
    },
    // 下载图片
    downloadImg(src, id) {
      const a = document.createElement("a");
      a.setAttribute("href", src);
      a.setAttribute("download", `${id}.jpg`);
      a.setAttribute("target", "_blank");
      a.setAttribute("id", "downLoad");
      a.click();
    },
    // 分享
    share() {
      this.showShare = true;
    },
    // 保存
    save(type) {
      const canvas = this.canvas;
      const values = {}
      for (let i in canvas) {
        const info = this.getData(canvas[i])
        values[i] = info;
      }
      // eslint-disable-next-line no-debugger
      // debugger
      
      const data = {
        id: this.id, // 模板id
        name: this.projectName, // 作品名称
        data: values // 数据
      }

      if(type === 'reset'){
        data.data = {}
      }
      localStorage.setItem(this.id, JSON.stringify(data));
    },
    // 编辑
    edit() {
      this.operationType = 'edit';
      this.changeTitle()
    },
    // 个性化
    individuation() {
      this.operationType = 'personality'
      this.changeTitle()
    },
    // 生成
    generate() {
      this.operationType = 'preview';
      this.changeTitle()
    },
    // 修改页面标题
    changeTitle() {
        let name = '';
        switch(this.operationType) {
            case 'edit': 
                name = '作品集编辑';
                break
            case 'personality':
                name = '作品集个性化';
                break
            case 'preview':
                name = '作品集个性化预览'
                break

        }
        this.bus.$emit('changeTitle', name)
    },
    // 修改Index
    changeIndex(index) {
        this.currentIndex = index;
    },
    // 计算容器宽度
    getBoxInfo() {
        const { w, h } = this.getContainerInfo(9 / 16);
        this.width = w;
        this.height = h;
    },
    // 初始化所有的canvas
    createAllCanvas() {
        this.imgList.forEach((item, index)=> {
          this.canvas[index] = this.initCanvas(index, this.imgList[index])
        })
    },
    // 退出
    exit() {
      window.history.go(-1);
    },
    // 确认
    confirm() {
      if(!this.projectName){
        return alert('请输入作品名！');
      }
      this.popup = false;
      this.popup2 = false;

    },
    // 从缓存中获取数据
    getDataByCache(index) {
      // eslint-disable-next-line no-debugger
      // debugger
      const info = JSON.parse(localStorage.getItem(this.id));
      const sX = this.scaleX; // 整体的缩放比例
      const sY = this.scaleY; // 整体的缩放比例
      const data = info.data || {};
      
      
      data[index].forEach(item => {
        const { type, angle } = item;
        const left = item.left * sX;
        const top = item.top * sY;
        const width = item.width * sX;
        const height = item.height * sY;
        
        if (type === "image") {
          this.addImg(
            index,
              // this.imgList[0],
            item.src,
            {
              left,
              top,
              width,
              height,
              angle
            }
          );
        } else if (type === "rect") {
            this.addRect(index, {
            left,
            top,
            width,
            height,
            angle,
            fill: "red",
            stroke: "black"
          });
        }
      });
      
    },

    // 根据当前屏幕按照比例计算出容器的大小(假设宽高比9/16)
    getContainerInfo(aspectRatio) {
      const w = document.body.clientWidth * 0.8;
      const h = document.body.clientHeight * 0.8;
      const containerSspectRatio = w / h; // 容器的宽高比
      if (containerSspectRatio > aspectRatio) {
        // 如果容器的宽高比大于期望的宽高比,说明我们需要将容器的h作为高度，然后按照期待的缩放比求出宽度
        return {
          h,
          w: h * aspectRatio
        };
      } else {
        return {
          w,
          h: w / aspectRatio
        };
      }
    },

    // 初始化canvas
    initCanvas(index, url) {
      const canvas = new fabric.Canvas( (index || index === 0) ? `canvas-${index}` : 'canvas', {
        width: this.width,
        height: this.height
      });
      // 通过图片渲染成canvas的背景,如果存在背景图片
      if (url) {
        fabric.Image.fromURL(url, img => {
          const scaleX = canvas.width / img.width;
          const scaleY = canvas.height / img.height;
          this.scaleX = scaleX;
          this.scaleY = scaleY;
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX,
            scaleY
          });
          // this.addRect(id, {
          //   left: 100,
          //   top: 100,
          //   width: 50,
          //   height: 50,
          //   fill: 'red',
          //   stroke: 'black',
          //   angle: 0
          // })
          this.getDataByCache(index);
        });
      }
      // 新增删除控制器
      const deleteImg = document.createElement("img");
      deleteImg.src =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: "pointer",
        mouseUpHandler: this.deleteObject, // 删除按钮对应的事件
        render: this.renderIcon(deleteImg),
        cornerSize: 24
      });
      return canvas;
    },

    // 添加素材
    addDecoration(src) {
      this.addImg('', src);
    },

    // 添加图片
    addImg(id, url, data) {
      id = id || this.currentIndex;
      if (url) {
        fabric.Image.fromURL(url, img => {
          if (data) {
            let { left = 0, top = 0, angle = 0, width = img.width, height = img.height } = data;
            const scaleX = width / img.width;
            const scaleY = height / img.height;
            img.set({
              width: img.width,
              height: img.height,
              crossOrigin: 'Anonymous',
              left,
              top,
              angle,
              scaleX,
              scaleY
            }); // 拿图片的真实高度
          }
          this.canvas[id].add(img);
        });
      }
    },

    // 添加矩形
    addRect(id, data) {
      id = id || this.currentIndex  
      const { left, top, width, height, fill, stroke, angle } = data;
      const rect = new fabric.Rect({
        left,
        top,
        width,
        height,
        fill,
        stroke,
        angle
      });
      this.canvas[id].add(rect);
    },

    // icon渲染函数
    renderIcon(icon) {
      return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        const size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    },
    // 删除按钮对应的事件
    deleteObject(eventData, transform) {
      const target = transform.target;
      const canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    },
    // 生成图片
    createImg() {
      const dataURL = this.canvas.toDataURL({
        format: "png",
        quality: 1
      });
      var link = document.createElement("a");
      link.download = "fabric.png";
      link.href = dataURL;
      link.click();
    },
    // 获取数据（矩形旋转后，如果canvas画布变大后，再回显位置错位）
    getData(canvas) {
      const objects = canvas.getObjects();
      const data = [];
      const sX = Number(this.scaleX);
      const sY = Number(this.scaleY);
      objects.forEach(item => {
        
        let { width, height, left, top, angle, type, scaleX, scaleY } = item;
        // 所有的 宽高left,top都需要进行坐标转换
        if (type === "image") {
          
          console.log(item,item.getSrc())
          width = width * scaleX;
          height = height * scaleY;
        }
        data.push({
          left: left / sX,
          top: top / sY,
          width: width / sX,
          height: height / sY,
          angle,
          type,
          src: (item.getSrc && item.getSrc())
        });
      });
      return data;
    },

    // 计算选择后的位置
    getPosition(data) {
      // 计算旋转后的新坐标位置
      var radian = fabric.util.degreesToRadians(data.angle);
      var cos = Math.cos(radian);
      var sin = Math.sin(radian);
      var centerPoint = new fabric.Point(
        data.left + data.width / 2,
        data.top + data.height / 2
      );
      var newCenterPoint = new fabric.Point(
        centerPoint.x * cos + centerPoint.y * sin,
        centerPoint.y * cos - centerPoint.x * sin
      );
      data.left = newCenterPoint.x - data.width / 2;
      data.top = newCenterPoint.y - data.height / 2;
      return JSON.parse(JSON.stringify(data));
    }
  }
};
</script>
<style lang="less" scoped>

@import '../curriculum//popup.less';
@import './index.less';
.van-popup-save2{
  .van-image{
    margin-top: 65px;
  }
}
.van-popup-public {

  .btn-small{
    width: 123px;
    height: 44px;
    margin-left: 53px;

  } 
  .btn-small2{
    margin-left: 23px;
  }
  .share{
    position: fixed;
    bottom: 69px;
  }
}
.reset-popup{
  background: transparent;
  height: 75px;
  top: 99px;
  right: 10px;
  left: auto;
  transform: none;
}
 
.triangle{
  display: inline-block;
  width: 0;
  height: 0;
  border:8px transparent solid;
  border-bottom: 10px #fff solid;
  position: absolute;
  top: -7px;
  right: 12px;
}
.reset{
  display: inline-block;
  width: 128px;
  height: 70px;
  border-radius: 10px;
  margin-top: 5px;
  font-size: 15px;
  font-weight: 400;
  color: #333333;
  padding-left: 62px;
  background: #fff url('../../asset/image/icon/reset.png') no-repeat 24px center;
  background-size: 24px 24px;
  line-height: 70px;
  
}
.works-container {
  height: calc(100vh - 46px - 50px);
  background: #F5F5F5;
  .van-share-sheet__option{
    flex: 1;
  }
  .van-popup{
    border-radius: 10px;
  }
  .popup-modal {
    width: 295px;
    // height: 229px;
    .popup-top {
      padding: 26px 24px 22px 24px;
      border: 1px solid #f1f1f1;
      .popus-input {
        width: 247px;
        height: 58px;
        padding: 15px 18px;
        background: #f6f9fd;
        border-radius: 5px;
      }
      .van-field__body{
        height: 28px;
        line-height: 28px;
      }
    }
    .popup-bottom {
      padding: 20px;
      text-align: center;
      .popus-btn {
        width: 235px;
        height: 40px;
        margin-left: 0;
        border: none;
        color: #fff;
        border-radius: 20px;
      }
      .popup-exit {
        display: block;
        font-size: 11px;
        font-size: 12px;
        color: #999;
        text-align: center;
        width: 100%;
        cursor: pointer;
        margin-top: 25px;
      }
    }
  }
  .popup-modal2{
    .popus-input{
      &:nth-child(1){
        margin-top: 0;
      }
      margin-top: 13px;
      &.popus-input-name,&.popus-input-age{
        width: 113px;
        display: inline-block;
      }
      &.popus-input-age{
        float: right;
      }
      &.popus-input-intro{
        height: 100px;
      }
    }
  }
  .swipe-box {
    position: relative;
    margin: 0 auto;
    padding: 1vh 0;
    .mask-box {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
  .preview-box-left{
    display: inline-block;
    position: absolute;
    width: 46px;
    height: 75px;
    background: #FAFAFA;
    bottom: 10px;
    left: 10px;
    line-height: 75px;
    font-size: 10px;
    font-weight: 500;
    color: #333333;
    text-align: center;
    border-radius: 7px 7px 7px 7px;
    .box::after{
      content: '';
      display: inline-block;
      height: 75px;
      width: 0px;
      border-right:1px dotted #ccc ;
      position: absolute;
      right: -9px;
      top: 0;
    }
    .box2{
      line-height: 63px;
    }
    .box3{
      line-height: 21px;
      padding-top: 17px;
    }
    .upload{
        display: inline-block;
        width: 40px;
        height: 15px;
        line-height: 15px;
        background: rgb(73, 211, 145);
        color: #fff;
        font-size: 10px;
        border-radius: 7px;
        position: absolute;
        top:41px;
        left: 3px;
    }
  }
  .preview-box {
    position: absolute;
    bottom: 10px;
    width: calc(100vw - 74px);
    left: 74px;
    height: 75px;
    margin: 0 auto;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    box-sizing: border-box;
    .preview-img {
        height: 100%;
        max-width: 40px;
        margin: 0 5px;
    }
    .active-preview-img {
      position: absolute;
      background: #52d484;
      height: 0.53333vw;
      display: inline-block;
      width: calc(100% - 10px);
      left: 5px;
      bottom: 0;
    }
  }
  .operate-box {
    position: absolute;
    bottom: 250px;
    padding: 1vh 2vw;
    width: 100vw;
    background: #fff;
    box-sizing: border-box;
    .btn-works {
      padding: 0 20px;
    }
    .operate-box-item {
      display: inline-block;
      text-align: center;
    }
    .col-3 {
      width: 32vw;
    }
    .col-2 {
      width: 48vw;
    }
  }
  .source-box {
    margin: 0 auto;
    .source-item {
      display: inline-block;
      position: relative;
      width: 62px;
      height: 75px;
      background: #fff;
      .preview-img {
        width: auto;
        height: auto;
        position: absolute;
        top: 50%;
        transform: translate(-50%,-50%);
        left: 50%;
        
      }
    }
    .van-tabs__content {
      padding: 1vh 0;
    }
  }
}
.arrow-down,.arrow-up{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #FFFFFF  url('../../asset/image/icon/arrow_down.png') no-repeat center center;
    box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.06);
    border-radius: 10px;
    position: absolute;
    bottom: 161px;
    right: 10px;
    transition: bottom 0.3s;
}
.arrow-height{
  bottom: 206px;
}
.arrow-up{
  transform: rotate(180deg);
  bottom: 58px;
}
.operate{
  height: 103px;
  width: 100vw;
  background: #fff;
  position: absolute;
  bottom: 50px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  &.operate3{
    height: 148px;
  }
  &.operate-fold{
    height: 0;
  }
  
}
.tabs{
  padding-top: 13px;
  padding-bottom: 10px;
  background: #fff;
  white-space: nowrap;
  overflow-x: auto;
  width: calc(100% - 17px);
  float: left;
  .tab-item{
    margin: 0 16px;
    font-size: 16px;
    font-weight: 500;
    color: #666666;
    &.active{
      color: #333333;
      position: relative;
      
      &::before{
        position: absolute;
        display: inline-block;
        content: '';
        width: 20px;
        height: 3px;
        background: #1FB895;
        border-radius: 3px;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
.arrow-right{
  display: inline-block;
  height: 100%;
  width: 17px;
  height: 46px;
  background:  url('../../asset/image/icon/arrow-right.png') no-repeat center center;
  background-size: 5px 9px;
  float: left;
}

</style>
