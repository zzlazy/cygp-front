<template>
  <div class="page">
    <div class="weui-panel">
        <Calendar
      :months="months"
      :value="value"
      @next="next"
      @prev="prev"
      :multi="multi"
      :events="events"
      :lunar="lunar"
      :clean="clean"
      @select="select"
      ref="calendar"
      @selectMonth="selectMonth"
      @selectYear="selectYear"
    />
    </div>
    <div class="weui-cells__title">数据统计</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_access">
          <div class="weui-badge weui-badge_dot dot" style="margin-left: 5px;margin-right: 5px;"></div>
          <div class="weui-cell__bd">总签到天数</div>
          <div class="weui-cell__ft" style="font-size: 0">
              <div style="display: inline-block;vertical-align:middle; font-size: 17px;">35天</div>
          </div>
      </div>
    </div>
    <button class="button" type="primary">
      获取分享卡片
    </button>
  </div>
</template>

<script>
import { request } from '@/utils/index'
import { host, api } from '@/utils/api'
import Calendar from '@/components/calendar/calendar'
import '@/components/calendar/style.css'
export default {
  data () {
    return {
      value: [[2018,6,7],[2018,6,8],[2018,6,9]],
      multi:true,
      clean:false,
      lunar:true,
      events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
      almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
      tileContent: [
          {date: '2018-9-22', className: 'holiday ', content: '休'},
          {date: '2018-9-23', className: 'holiday ', content: '休'}
      ]
    }
  },
  components: {
    Calendar
  },
  computed: {
    
  },
  mounted(){
    this.setToday()
  },
  methods: {
    selectMonth(month,year){
      console.log(year,month)
    },
    prev(month){
      console.log(month)
    },
    next(month){
      console.log(month)
    },
    selectYear(year){
      console.log(year)
    },
    setToday() {
      this.$refs.calendar.setToday();
    },
    dateInfo() {
      const info = this.$refs.calendar.dateInfo(2018, 8, 23);
      console.log(info);
    },
    select(val, val2) {
      console.log(val)
      console.log(val2)
    }
  }
}
</script>

<style scoped>
.dot{
  background-color: darkgreen;
}
.button{
  width:50%;
  margin-top:30rpx;
  border-radius: 20px;
}
</style>
