<template>
  <div class="account">
    <div class="user">
        <div class="weui-cell">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                <div class="avatar-wrapper">
                    <open-data class="avatar" type="userAvatarUrl" lang="zh_CN"></open-data>
                </div>
            </div>
            <div class="weui-cell__bd">
                <open-data type="userNickName" lang="zh_CN"></open-data>
                <div style="width:350rpx;font-size: 13px;color: #888888;">{{hitokoto.hitokoto}}</div>
            </div>
        </div>
    </div>
    <view class="other">
        <view class="item" @click="tapto()">
            <image class="image" src="../../static/icon/jibu.png"/>
            <view class="info">
            <view>打卡日历</view>
            <image class="arrow-right" src="../../static/icon/arrow_right.png"/>
            </view>
        </view>
        <button class="item button">
            <image class="image" src="../../static/icon/jilu.png"/>
            <view class="info">
                <view>打卡记录</view>
                <image class="arrow-right" src="../../static/icon/arrow_right.png"/>
            </view>
        </button>
    </view>
  </div>
</template>
<script>
import { request } from '@/utils/index'
import { host, api } from '@/utils/api'
export default {
    data(){
        return {
            hitokoto:{},
            isLogin: false,
            studentInfo:{
                name: "猪钟浩"
            }
        }
    },
    mounted(){
      this.getonesay()
    },
    methods: {
        tapto(){
            wx.navigateTo({
                url: '../calendar/main'
            })
        },
        getonesay(){
          const that = this;
          request({
            url: `${host}${api.onesay}`
          }).then((res) => {
            that.hitokoto = res.data;
            console.log(res.data)
          })
        }
    }
}
</script>
<style scoped>
.account {
  margin-top: 30rpx;
}
.user {
  width: 630rpx;
  height: 230rpx;
  background-color: #ffffff;
  box-shadow: 0px 5rpx 30rpx 0px rgba(0,0,80,0.07);
  border-radius: 16rpx;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user .avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
}
.user .avatar-wrapper {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 60rpx;
}
.user .button {
  width: 300rpx;
  height: 70rpx;
  background-color: #6dde9e;
  box-shadow: 0 10rpx 25rpx 0 rgba(109,222,158,0.26);
  border-radius: 34rpx;
  font-size: 26rpx;
  color: #ffffff;
  text-align: center;
  line-height: 70rpx;
}
.user .info {
  width: 280rpx;
  font-size: 36rpx;
  line-height: 0px;
  letter-spacing: 0px;
  color: #333333;
}
.user .info .name {
  height: 35rpx;
  line-height: 35rpx;
}
.user .info .student {
  display: flex;
  align-items: center;
  margin-top: 38rpx;
  font-size: 26rpx;
  color: #cccccc;
}
.user .info .student .image {
  margin-right: 30rpx;
  width: 106rpx;
  height: 38rpx;
}
.other {
  margin: 20rpx 0;
}
.other .item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.other .item .image {
  width: 35rpx;
  height: 35rpx;
}
.other .item .info {
  height: 120rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  margin-left: 8rpx;
  color: #999999;
  padding: 40rpx 30rpx 40rpx 20rpx;
  width: 547rpx;
  border-bottom: 1rpx solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.button {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  appearance: none;
  font-smoothing: antialiased;
  outline: none;
}
.button::after {
  border: none;
}
.arrow-right {
  width: 12rpx;
  height: 20rpx;
}
</style>
