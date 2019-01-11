<template>
  <div class="page">
    <div class="page__bd page__bd_spacing">
      <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular" @change="swiperChange" @animationfinish="animationfinish">
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
    <div class="weui-panel">
        <div class="weui-panel__hd">调剂信息</div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
              <div class="weui-cells weui-cells_in-small-appmsg">
                <li v-bind:key="item" v-for= "item in tjlist" class="weui-cell weui-cell_access user" hover-class="weui-cell_active" @click="tabClick(item)">
                  <div class="weui-cell__hd">
                    <!-- <image :src="icon20" style="width: 20px;height: 20px;margin-right: 5px" /> -->
                  </div>
                  <div class="weui-cell__bd weui-cell_primary">
                    <div>{{item.title}}</div>
                  </div>
                </li>
              </div>
            </div>
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
      page: 1,
      itemList:['复制', '分享'],
      tjlist:[],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 900,
      circular: true,
    }
  },
  computed: {
    
  },
  mounted(){
    const  that = this;
    this.getTj()
    request({
        url: `${host}${api.weibo}/2568663307`
      }).then((res) => {
        that.info = res.data
      })
  },
  onReachBottom() {
    console.log("上拉加载")
    let that = this;
    // 上拉获取更多数据
    this.loadata() 
  },
  methods: {
    loadata(){
      this.page ++;
      this.getTj()
    },
    getTj(){
      const that = this;
      request({
        url: `${host}${api.tiaoji}/?page=${that.page}`
      }).then((res) => {
        if(that.tjlist.length){
          const lilen = that.tjlist[that.tjlist.length-1].title
          const relen = res.data[res.data.length-1].title
          if(lilen == relen){
            wx.showLoading({
              title: '已经到达最底部了！',
            })
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }else{
            that.tjlist = that.tjlist.concat(res.data)
          }
        }else{
          that.tjlist = that.tjlist.concat(res.data)
        }
        wx.hideLoading()
      })
    },
    swiperChange(e) {
      console.log('第' + e.mp.detail.current + '张轮播图发生了滑动');
    },
    animationfinish(e) {
      console.log('第' + e.mp.detail.current + '张轮播图滑动结束');
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
  overflow: hidden;
}
.slid-img {
  height: 57rpx;
  overflow: scroll;
}
.name{
  font-weight: 800;
  color: cadetblue;
}
</style>
