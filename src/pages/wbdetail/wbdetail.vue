<template>
  <div class="page">
    <div class="weui-article__h1 ticolor">{{info.name}}</div>
    <div class="weui-media-box__info pubtime">
        <div class="pubtime">{{info.pubDate}}</div>
    </div>
    <div class="weui-article__section">
        <div class="weui-article__section">
            <div class="weui-article__p" v-html="info.description"></div>
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
      info:{}
    }
  },
  computed: {
    
  },
  onLoad(option){
    const that = this;
    request({
        url:host+api.wedetail,
        data:{
            id: option.tid
        }
    }).then((res) =>{
        that.info = res.data
    })
  },
  mounted(){
  },
  methods: {
    
  }
}
</script>

<style scoped>
.page {
  margin-top: 10px;
}
.articlepa{
	padding: 0 100rpx;
}
.ticolor{
	color:#1296db;
	text-align: center;
}
.pubtime{
    text-align: right;
    padding:0px 35rpx;
}
img{
    width:100%;
}
</style>
