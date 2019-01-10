<template>
  <div class="page">
	<div class="weui-panel__hd">{{list.title}}</div>
   <div class="weui-form-preview">
      <div class="weui-form-preview__bd">
				<div class="weui-form-preview__item">
          <div class="weui-form-preview__value" style="color:#f40">复制这段内容后打开百度网盘手机App，操作更方便哦</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">链接地址</div>
          <div class="weui-form-preview__value">{{info.url}}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">提取码</div>
          <div class="weui-form-preview__value">{{info.code}}</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <div @click="open" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">操作</div>
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
			info:{},
			itemList:['复制', '分享']
    }
  },
  computed: {

  },
  onLoad(option){
			const that = this;
		  this.list = option
			wx.setNavigationBarTitle({
				title: "云盘信息"
			})
      request({
				url: host +api.getDetail,
				data:{
					tid: option.tid
				}
			}).then((res) => {
				that.info = res.data
				console.log(res)
			})
  },
  mounted(){
    const that = this;
  },
  methods: {
		// 百度云盘复制分享功能
    clipdata(item){
			wx.setClipboardData({
        data: `链接：${item.url} 提取码：${item.code}  复制这段内容后打开百度网盘手机App，操作更方便哦`,
        success(res) {
          wx.getClipboardData({
            success(res) {
              console.log(res.data) // data
            }
          })
        }
      })
		},
		open(){
			let _this = this;
      wx.showActionSheet({
        itemList: this.itemList,
        success: function (res) {
					if(res.tapIndex == 0){
						//调用复制功能
						_this.clipdata(_this.info)
					}else{
						// 调用分享功能
					}
        }
      });
		}
  }
}
</script>

<style scoped>
.page {
  margin-top: 10px;
}
</style>
