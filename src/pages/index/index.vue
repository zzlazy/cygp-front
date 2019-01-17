<template>
  <div class="page">
    <div class="page__bd page__bd_spacing">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <div v-bind:key ="items" v-for="items in info">
          <swiper-item @click="wbcli(items)">
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
          <div class="module" v-for="item in modules" v-bind:key="item">
            <navigator :url="item.url">
              <view class="module">
                <image class="modules__image" :src="item.image"/>
                <text>{{item.text}}</text>
              </view>
            </navigator>
          </div>
          <div class="module">
            <div>
              <view class="module" @click="sharecli()">
                <image class="modules__image" :src="fenx"/>
                <text>分享</text>
              </view>
            </div>
          </div>
        </view>
    <div class="button_wrap">
      <img :class="btncla" :src="btname" alt="" @click="dkcli()">
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
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      earlysa: 5,
      earlyso: 8,
      earlyready:false,
      lastsa: 17,
      lastso: 3,
      lastready:false, 
      info:[],
      fenx:menu3,
      hitokoto:{},
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
      modules: [{
        image: menu1,
        text: '足迹',
        url: '../calendar/main',
      }, {
        image: menu2,
        text: '心语',
        url: '../webo/main',
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
      if(this.hours>=this.earlysa && this.hours <= this.earlyso && !this.earlyready){
        return true
      }
      if(this.hours>=this.lastsa && !this.lastready || this.hours <= this.lastso && !this.lastready){
        return true
      }
      return false
    },
    btname(){
      if(this.hours>=this.earlysa && this.hours <= this.earlyso && !this.earlyready){
        return naozhong
      }
      if(this.hours>=this.lastsa && !this.lastready || this.hours <= this.lastso && !this.lastready){
        return naozhong
      }
      return naozhongdis
    },
    btncla(){
      if(this.hours>=this.earlysa && this.hours <= this.earlyso && !this.earlyready){
        return "button"
      }
      if(this.hours>=this.lastsa && !this.lastready || this.hours <= this.lastso && !this.lastready){
        return "button"
      }
      return "button active"
    },
    btn_name(){
      if(this.hours >= this.earlysa && this.hours <= this.earlyso && !this.earlyready){
        return "早安打卡"
      }
      if(this.hours>=this.lastsa && !this.lastready || this.hours <= this.lastso && !this.lastready){
        return "晚安打卡"
      }
      if(this.hours>=this.earlysa && this.hours <= this.earlyso && this.earlyready){
        return "打卡完成"
      }
      if(this.hours >= this.lastsa && this.lastready || this.hours <= this.lastso && this.lastready){
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
    wbcli(item){
      console.log(item)
      wx.navigateTo({
        url: `../wbdetail/main?tid=${item._id}`
      })
    },
    sharecli(){
      let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
      wx.showModal({
        title: '分享提示',
        content: '您确认将百度云盘的资料分享给大家使用吗？',
        success(res) {
          if (res.confirm) {
            wx.getClipboardData({
              success(res) {
                // 分享云盘资料
                let url = res.data.match(reg)
                if(url && url[0].indexOf('https://pan.baidu.com')>=0){
                  wx.showToast({
                    title: '分享成功',
                    icon: 'success',
                    duration: 1000
                  })
                }else{
                  wx.showToast({
                    title: '分享失败',
                    icon: 'loading',
                    duration: 500
                  })
                }
              },
              fail(res){
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    dkcli(){
      const that = this
      console.log(this.disab)
      if(this.disab){
        wx.showToast({
          title: '打卡成功',
          icon: 'success',
          duration: 800,
          mask: true,
          success:() => {
            if(that.hours>=that.earlysa && that.hours <= that.earlyso && !that.earlyready){
              that.earlyready = true;
            }
            if(that.hours>=that.lastsa && !that.lastready || that.hours <= that.lastso && !that.lastready){
              that.lastready = true;
            }
          },
          complete: () => {
            setTimeout(()=>{
              wx.showActionSheet({
                itemList: ['分享'],
                success(res) {
                  console.log(res.tapIndex)
                },
                fail(res) {
                  console.log(res.errMsg)
                }
              })
            },500)
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
.button {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: scale(1.25);
  margin-top: 100rpx;
  margin-bottom: 20rpx;
  width: 60px;
  height: 60px;
  line-height: 2.6;
  font-size: 24px;
  color: #e1dada;
  text-shadow: 0px -1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  text-decoration: none;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #f4f4f4), color-stop(100%, #e3e3e3));
  background-image: -moz-gradient(linear, left top, left bottom, color-stop(0%, #f4f4f4), color-stop(100%, #e3e3e3));
  -webkit-transition: box-shadow 0.3s ease-in-out,  background-image 0.3s ease-in-out, text-shadow 0.5s linear, color 0.5s linear;
  -moz-transition: box-shadow 0.3s ease-in-out,  background-image 0.3s ease-in-out, text-shadow 0.5s linear, color 0.5s linear;
}
.button.active {
  color: #00d0b0;
  text-shadow: 0px 0px 7px #37ffb1;
  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #e3e3e3), color-stop(100%, #f4f4f4));
  background-image: -moz-gradient(linear, left top, left bottom, color-stop(0%, #e3e3e3), color-stop(100%, #f4f4f4));
}

</style>
