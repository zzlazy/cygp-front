<template>
  <div class="page">
    <div class="weui-panel">
        <div class="weui-panel__hd">微博信息</div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_text" v-bind:key ="item" v-for="item in info">
            <div class="weui-media-box__title weui-media-box__title_in-text">{{item.title}}</div>
            <div class="weui-media-box__desc" v-html="item.description"></div>
            <div class="weui-media-box__info">
              <div class="weui-media-box__info__meta">{{item.pubDate}}</div>
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
      itemList:['复制', '分享']
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
    
  }
}
</script>

<style scoped>

</style>
