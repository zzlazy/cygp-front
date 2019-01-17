<template>
  <div class="page">
    <div class="weui-panel">
        <div class="page__bd">
          <div class="weui-search-bar">
            <div class="weui-search-bar__form">
              <div class="weui-search-bar__box">
                <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
                <input type="text" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
                <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
                  <icon type="clear" size="14"></icon>
                </div>
              </div>
              <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
                <icon class="weui-icon-search" type="search" size="14"></icon>
                <div class="weui-search-bar__text">搜索</div>
              </label>
            </div>
            <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
          </div>
        </div>
        <div>
          <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
              <div class="weui-cells weui-cells_in-small-appmsg">
                <li v-bind:key="item" v-for= "item in list" class="weui-cell weui-cell_access user" hover-class="weui-cell_active" @click="tabClick(item)">
                  <div class="weui-cell__hd">
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
  </div>
</template>

<script>
import { request } from '@/utils/index'
import { host, api } from '@/utils/api'
export default {
  data () {
    return {
      page:1,
      list:[],
      maxpage: 100,
      inputShowed: false,
      inputVal: ""
    }
  },

  computed: {

  },
  onLoad(option){
    wx.setNavigationBarTitle({
      title: "资料共享"
    })
  },
  onReachBottom() {
    console.log("上拉加载")
    let that = this;
    // 上拉获取更多数据
    this.loadata(this.inputVal) 
  },
  mounted(){
    this.getdata(this.page)
  },
  methods: {
    loadata(inval){
      if(!inval){
        if(this.page != this.maxpage){
          this.page++;
          this.getdata(this.page)
        }else{
          wx.showToast({
            title: '暂无更多数据',
            icon: 'loading',
            duration: 800
          })
        }
      }
    },
    getdata(page){
      wx.showLoading({
        title: '加载中',
      })
      const that = this;
      console.log(api)
      request({
        url: `${host}${api.getAll}?page=${page}`
      }).then((res) => {
        let data = res.data
        if(that.list.length){
          if(data.length == 0){
            wx.showLoading({
              title: '已经到达最底部了！',
            })
            console.log('到底部啦')
            that.maxpage = that.page
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }else{
            that.list = that.list.concat(res.data)
          }
        }else{
          that.list = that.list.concat(res.data)
        }
        wx.hideLoading()
      })
    },
    tabClick(item) {
      wx.navigateTo({
        url: `../shareD/main?tid=${item.tid}&&title=${item.title}`
      })
    },
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = '';
      this.inputShowed = false
      this.page = 1
      this.list = []
      this.getdata(this.page)
    },
    clearInput() {
      this.inputVal = '';
      this.page = 1
      this.list = []
      this.getdata(this.page)
    },
    inputTyping(e) {
      const that = this;
      that.inputVal = e.mp.detail.value
      that.page = 1
      request({
        url: `${host}${api.searchD}`,
        data:{
          key: that.inputVal,
          page: that.page
        }
      }).then((res) => {
        that.list = res.data
      })
    }
  }
}
</script>

<style scoped>
.searchbar-result {
  margin-top: 0;
  font-size: 14px;
}
.user {
  width: 630rpx;
  padding: 0px;
  background-color: #ffffff;
  box-shadow: 0px 5rpx 30rpx 0px rgba(0,0,80,0.07);
  border-radius: 16rpx;
  margin: 5px auto;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
</style>
