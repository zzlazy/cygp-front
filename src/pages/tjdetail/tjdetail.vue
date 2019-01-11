<template>
  <div class="page">
		<div class="weui-article articlepa">
			<div class="weui-article__h1 ticolor">{{list.title}}</div>
			<div class="weui-article__section">
				<div class="weui-article__section" v-for = "item in info" v-bind:key="item">
					<div class="weui-article__p" >
						{{item}}
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
			list:{},
			info: [],
			itemList:['复制', '分享']
    }
  },
  computed: {

  },
  onLoad(option){
    const that = this;
		this.list = option
		console.log(option)
    wx.setNavigationBarTitle({
        title: option.title
		})
		request({
			url: host +api.getTjDetail,
			data:{
				tid: option.tid
			}
		}).then((res) => {
			console.log(res)
			that.info = res.data.title
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
</style>
