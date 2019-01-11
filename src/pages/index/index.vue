<template>
  <div class="page">
    <div class="page__bd page__bd_spacing">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <div v-bind:key ="items" v-for="items in info">
          <swiper-item>
            <div class="weui-media-box weui-media-box_text user">
            <div class="weui-media-box__title weui-media-box__title_in-text name">{{items.name}}</div>
            <div class="weui-media-box__desc slid-img">{{items.title}}</div>
            <div class="weui-media-box__info">
              <div class="weui-media-box__info__meta">{{items.pubDate}}</div>
            </div>
          </div>
          </swiper-item>
        </div>
      </swiper>
    </div>
    <div class="page__bd page__bd_spacing">
      
    </div>
    <div class="button_wrap">
      <img class="button" :src="btname" alt="">
    </div>
    <div class="button_wrap">
      <div class="dktime">
          签到时间:
          {{earlysa}}点 - {{earlyso}}点
          |
          {{lastsa}}点 - {{lastso}}点
      </div>
    </div>
  </div>
</template>

<script>
import { request } from '@/utils/index'
import { host, api } from '@/utils/api'
import Calendar from '@/components/calendar/calendar'
import naozhong from "../../../static/icon/naozhong.png" 
import naozhongdis from "../../../static/icon/naozhong_disab.png"
import '@/components/calendar/style.css'
export default {
  data () {
    return {
      earlysa: 5,
      earlyso: 8,
      lastsa: 22,
      lastso: 3, 
      info:[],
      hitokoto:{},
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    }
  },
  computed: {
    hours(){
      const date = new Date()
      const hourn = date.getHours()
      return hourn
    },
    disab(){
      if(this.hours>this.earlysa && this.hours < this.earlyso){
        return false
      }
      if(this.hours>this.lastsa && this.hours < this.lastso){
        return true
      }
      return false
    },
    btname(){
      if(this.hours>this.earlysa && this.hours < this.earlyso){
        return naozhong
      }
      if(this.hours>this.lastsa && this.hours < this.lastso){
        return naozhong
      }
      return naozhongdis
    }
  },
  mounted(){
    this.getwb()
  },
  methods: {
    getwb(){
      const  that = this;
      request({
        url: `${host}${api.weibo}/2568663307`
      }).then((res) => {
        that.info = res.data
      })
    },
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
  overflow: hidden;
}
.tit{
  text-align: center;
}
.name_tit{
  text-align: right;
  padding-right: 150rpx;
  color: cadetblue;
}
.des_tit{
  font-weight: 800;
  color: aquamarine;
}
.slid-img {
  height: 57rpx;
  overflow: scroll;
}
.name{
  font-weight: 800;
  color: cadetblue;
}
.button_wrap{
  display: flex;
  justify-content: center;
  align-items: center;
}
.button{
  width:200rpx;
  height: 200rpx;
  position: flex;
  justify-items: center;
  align-items: center;
  align-content: center;
  margin-top:30rpx;
  border: 1px solid #cdcdcd;
  box-shadow: 0px 5rpx 30rpx 0px rgba(0,0,80,0.07);
  border-radius: 100rpx;
}
.btn{
  display: flex;
}
.button:disabled{
  background: #cdcdcd;
}
.dktime{
  margin-top: 50rpx;
  color: #cdcdcd;
  font-size: 12px;

}
</style>
