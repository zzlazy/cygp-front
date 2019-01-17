<template>
  <div class="page">
    <div class="weui-panel">
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg">
              <div class="weui-cells weui-cells_in-small-appmsg">
                <li v-bind:key="items" v-for= "items in info" class="user" hover-class="weui-cell_active" @click="tabClick(items)">
                  <div class="weui-media-box__title weui-media-box__title_in-text name">{{items.name}}</div>
                    <div class="weui-media-box__desc slid-img">{{items.title}}</div>
                    <div class="weui-media-box__info">
                        <div class="weui-media-box__info__meta">{{items.pubDate}}</div>
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
      info:[]
    }
  },
  computed: {
    
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
    tabClick(item){
      console.log(item)
      wx.navigateTo({
        url: `../wbdetail/main?tid=${item._id}`
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
  padding:0px 20px;
}
.slid-img {
  height: 57rpx;
}
.name{
  font-weight: 800;
  color: cadetblue;
}
</style>
