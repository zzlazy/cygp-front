<template>
  <div class="page">
    <div class="weui-panel">
        <div class="weui-panel__hd">调剂信息</div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
              <div class="weui-cells weui-cells_in-small-appmsg">
                <li v-bind:key="item" v-for= "item in tjlist" class="weui-cell weui-cell_access user" hover-class="weui-cell_active" @click="tabClick(item)">
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
      page: 1,
      itemList:['复制', '分享'],
      tjlist:[]
    }
  },
  computed: {
    
  },
  mounted(){
    this.getTj()
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
      wx.showLoading({
        title: '加载中',
      })
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
