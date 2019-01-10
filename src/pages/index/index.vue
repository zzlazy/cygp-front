<template>
  <div class="page">
    <div class="weui-panel">
        <div class="page__bd page__bd_spacing">
          <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
            <div v-for="item in imgUrls" :key="item" class="slide-item">
              <swiper-item>
                <image :src="item" class="slide-image" />
              </swiper-item>
            </div>
          </swiper>
        </div>
        <div class="weui-panel__hd">微博信息</div>
        <div class="weui-panel__bd">
          <scroll-view scroll-y style="height: 750rpx;">
            <div class="weui-media-box weui-media-box_text user" v-bind:key ="item" v-for="item in info">
              <div class="weui-media-box__title weui-media-box__title_in-text">{{item.title}}</div>
              <div class="weui-media-box__desc" v-html="item.description"></div>
              <div class="weui-media-box__info">
                <div class="weui-media-box__info__meta">{{item.pubDate}}</div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
  </div>
</template>

<script>
import { request } from '@/utils/index'
import { host, api } from '@/utils/api'
export default {
  data () {
    return {
      info:[],
      itemList:['复制', '分享'],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        '../../static/tooopen_sy_143912755726.jpg',
        '../../static/tooopen_sy_175866434296.jpg',
        '../../static/tooopen_sy_175833047715.jpg'
      ]
    }
  },
  computed: {
    
  },
  mounted(){
    const  that = this;
    request({
        url: `${host}${api.weibo}/2568663307`
      }).then((res) => {
        that.info = res.data
      })
  },
  methods: {
    swiperChange(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      // console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
    }
  }
}
</script>

<style scoped>
.user {
  width: 630rpx;
  background-color: #ffffff;
  box-shadow: 0px 5rpx 30rpx 0px rgba(0,0,80,0.07);
  border-radius: 16rpx;
  margin: 15px auto;
}
.slide-image {
  width: 100%;
  height: 100%;
  box-shadow: 0px 5rpx 30rpx 0px rgba(0,0,80,0.07);
}
</style>
