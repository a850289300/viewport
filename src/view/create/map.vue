<template>
  <div class="learning-map">
    <div class="bg">
      <span class="btn btndemo" @click="openShow">点击</span>
      <!-- <img :src="bgUrl" /> -->
      
      <popup-title/>
    </div>

    <van-popup v-model="show" :close-on-click-overlay="true" :round="true">
      <p class="star"><span></span><span></span><span></span></p>
      <div class="swiper-container swiper-container-horizontal">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <!-- <p class="star"><span></span><span></span><span></span></p> -->
            <img
              src="/koolearn/template/2-海边度假风/content-9.jpg"
              class="main-img"
            />
          </div>
          <div class="swiper-slide">
            <!-- <p class="star"><span></span><span></span><span></span></p> -->
            <img
              src="/koolearn/template/2-海边度假风/content-10.jpg"
              class="main-img"
            />
          </div>
          <div class="swiper-slide swiper-slide-next">
            <!-- <p class="star"><span></span><span></span><span></span></p> -->
            <img
              src="/koolearn/template/2-海边度假风/content-8.jpg"
              class="main-img"
            />
          </div>
        </div>
      </div>
      <div
        class="swiper-pagination swiper-pagination-clickable"
        id="pagination"
      ></div>
      <span class="btn" @click="show = false">{{
        activeIndexText[activeIndex]
      }}</span>
    </van-popup>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.css";
let mySwiper = null;
export default {
  data() {
    return {
      show: false,
      mySwiper: null,
      activeIndex: 0,
      activeIndexText: ["DIY", "画框装裱", "二次创作"],
      bgUrl: require("../../asset/image/map/map-bg.png"),
    };
  },
  mounted() {
    document.addEventListener("touchend", () => {
      console.log(mySwiper?.activeIndex);
      this.activeIndex = mySwiper?.activeIndex || 0;
    });
  },
  methods: {
    openShow() {
      this.show = true;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
    confirm() {
      //
    },
    initSwiper() {
      let scale, es;
      console.log(scale);
      mySwiper = new Swiper(".swiper-container", {
        slidesPerView: "auto",
        centeredSlides: !0,
        touchRatio: 1, //触摸变慢
        watchSlidesProgress: !0,
        pagination: {
          el: ".swiper-pagination",
        },
        paginationClickable: !0,

        onProgress: function (a) {
          var b, c, d;
          for (b = 0; b < a.slides.length; b++)
            (c = a.slides[b]),
              (d = c.progress),
              (scale = 1 - Math.min(Math.abs(0.2 * d), 1)),
              (es = c.style),
              (es.opacity = 1 - Math.min(Math.abs(d / 2), 1)),
              (es.webkitTransform =
                es.MsTransform =
                es.msTransform =
                es.MozTransform =
                es.OTransform =
                es.transform =
                  "translate3d(0px,0," + -Math.abs(150 * d) + "px)");
        },
        onSetTransition: function (a, b) {
          for (var c = 0; c < a.slides.length; c++)
            (es = a.slides[c].style),
              (es.webkitTransitionDuration =
                es.MsTransitionDuration =
                es.msTransitionDuration =
                es.MozTransitionDuration =
                es.OTransitionDuration =
                es.transitionDuration =
                  b + "ms");
        },
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "./map.css";
.bg img {
  width: 100vw;
  height: 100vh;
}
.btndemo {
  position: fixed;
}
.van-popup {
  background: transparent;
  width: 100vw;
  height: 100vh;
}
.swiper-slide-active .star {
  opacity: 1;
}
.star {
  display: block;
  opacity: 1;
  width: 197px;
  height: 40px;
  margin: 0 auto;
  margin-bottom: 41px;
  top: 140px;
  position: relative;
  span {
    display: inline-block;
    width: 43px;
    height: 40px;
    background: url("../../asset/image/icon/shoucang_icon_selected@2x(1).png")
      no-repeat bottom center;
    background-size: 31px 29px;
    &:nth-child(2) {
      background: url("../../asset/image/icon/shoucang_icon_selected@2x.png");
      background-size: 43px 40px;
      margin: 0 32px;
    }
  }
}
.swiper-slide {
  img {
    border-radius: 10px;
    width: 213px;
    height: 284px;
  }
}

.van-popup .btn {
  margin-left: 64px;
  width: 248px;
  margin-top: 50px;
}
</style>
