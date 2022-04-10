<template>
  <div>
    <h2
      style="margin:0;text-align:center;">
      {{this.date}}
    </h2>
    <Time :options="options"
      :dateTimes="dateTimes"
      @getDateFun="getDateFun"
      :interval="interval"></Time>
  </div>
</template>

<script>
import { dateFormat } from '../utils/formatdate.js'
import Time from '../views/time.vue'
export default {
  name: 'app',
  data() {
    return {
      date: '',
      options: {
        speed: 1, // 速度
        speedMax: 10 // 速度最大值
      },
      interval: 20, // 日期间的间隔
      dateTimes: [
        '03-04',
        '03-05',
        '03-06',
        '03-07',
        '03-08',
        '03-09',
        '03-10',
        '03-11',
        '03-12',
        '03-13'
      ]
    }
  },
  components: {
    Time
  },
  mounted() {
    // 获取最近 10 天的日期
    let list = []
    for (let i = 0; i < 10; i++) {
      list.unshift(
        dateFormat(
          new Date(
            new Date().setDate(new Date().getDate() - i)
          ).toLocaleDateString(),
          'MM-dd'
        )
      )
    }
    this.date = list[0]
    this.dateTimes = list
  },
  methods: {
    // 接收父组件传值
    getDateFun(time) {
      console.log(time)
      this.date = time
    },
  }
}
</script>