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
       <view class="modules">
          <block class="module" v-for="item in modules" v-bind:key="item">
            <navigator :url="item.url">
              <view class="module">
                <image class="modules__image" :src="item.image"/>
                <text>{{item.text}}</text>
              </view>
            </navigator>
          </block>
        </view>
    <div class="button_wrap">
      <img class="button" :src="btname" alt="" @click="dkcli()">
    </div>
    <div class="btnam_wrap">
        {{btn_name}}
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
import menu1 from "../../../static/icon/zuji.png"
import menu2 from "../../../static/icon/xinyuandan.png"
import menu3 from "../../../static/icon/fenxiang.png"
import '@/components/calendar/style.css'
export default {
  data () {
    return {
      earlysa: 5,
      earlyso: 8,
      earlyready:false,
      lastsa: 22,
      lastso: 3,
      lastready:false, 
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
      ],
      modules: [{
        image: menu1,
        text: '足迹',
        url: '../calendar/main',
      }, {
        image: menu2,
        text: '心语',
        url: '../calendar/main',
      }, {
        image: menu3,
        text: '分享',
        url: '../calendar/main',
      }]
    }
  },
  computed: {
    hours(){
      const date = new Date()
      const hourn = date.getHours()
      return hourn
    },
    disab(){
      if(this.hours>this.earlysa && this.hours < this.earlyso && !this.earlyready){
        return false
      }
      if(this.hours>this.lastsa && !this.lastready || this.hours < this.lastso && !this.lastready){
        return true
      }
      return false
    },
    btname(){
      if(this.hours>this.earlysa && this.hours < this.earlyso && !this.earlyready){
        return naozhong
      }
      if(this.hours>this.lastsa && !this.lastready || this.hours < this.lastso && !this.lastready){
        return naozhong
      }
      return naozhongdis
    },
    btn_name(){
      if(this.hours>this.earlysa && this.hours < this.earlyso && !this.earlyready){
        return "早安打卡"
      }
      if(this.hours>this.lastsa && !this.lastready || this.hours < this.lastso && !this.lastready){
        return "晚安打卡"
      }
      if(this.hours>this.earlysa && this.hours < this.earlyso && this.earlyready){
        return "打卡完成"
      }
      if(this.hours>this.lastsa && this.lastready || this.hours < this.lastso && this.lastready){
        return "打卡完成"
      }
      return "暂时不能打卡"
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
    dkcli(){
      const that = this
      if(this.disab){
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 500,
          mask: true,
          success:() => {
            if(that.hours>that.earlysa && that.hours < that.earlyso && !that.earlyready){
              that.earlyready = true;
            }
            if(that.hours>that.lastsa && !that.lastready || that.hours < that.lastso && !that.lastready){
              that.lastready = true;
            }
          },
          complete: () => {
            wx.showActionSheet({
              itemList: ['分享'],
              success(res) {
                console.log(res.tapIndex)
              },
              fail(res) {
                console.log(res.errMsg)
              }
            })
          }
        });
      }else{
        if(that.earlyready || that.lastready){
            wx.showActionSheet({
              itemList: ['分享'],
              success(res) {
                console.log(res.tapIndex)
              },
              fail(res) {
                console.log(res.errMsg)
              }
            })
        }
      }
    }
  }
}
</script>

<style scoped>
.slide-image {
  width: 100%;
}
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
  margin-top: 45rpx;
}
.btnam_wrap{
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

.modules {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top:50rpx;
}
.modules .module {
  width: 25vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modules .module--disable {
  opacity: .3;
}
.modules .modules__image {
  width: 40px;
  height: 40px;
}


</style>
