<template>
  <div class="deathCrowd">
    <div id="deathCrowd" style="height: 100%;width: 100%;z-index: 1;" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import eventBum from '../public/js/EvebtBus'
export default {
  name: 'DeathCrowd',
  data() {
    return {
      getdata: {
        range: 0, // 区域号
        name: '中华人民共和国' // 地区名称
      },
      data: [],
      myChart: null, // 图表
      title: '中国各省拐出统计'
    }
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off('right')
    this.CAdestroy()
  },
  mounted() {
    var that = this
    setTimeout(function() {
      that.getqThedead()
    }, 1000)
    eventBum.$on('right', json => {
      this.CAdestroy()
      this.handle(json)
    })
  },
  methods: {
    // 创建与销毁盒子
    CAdestroy() {
      if (this.myChart !== null) {
        this.myChart.clear()
        this.myChart.dispose()
      }
    },
    handle(datas) {
      var data = []
      if (datas[0] === '拐入') {
        this.title = '各地区拐入至' + datas[1][0].to + '前十统计'
        for (let index = datas[1].length - 10; index < datas[1].length; index++) {
          const element = datas[1][index]
          data.push({ name: element.from, value: element.count })
        }
      } else {
        this.title = datas[1][0].from + '拐出至各地区前十统计'
        for (let index = datas[1].length - 10; index < datas[1].length; index++) {
          const element = datas[1][index]
          data.push({ name: element.to, value: element.count })
        }
      }
      this.initCharts(data)
    },
    initCharts(data) {
      const that = this
      var legend = []
      for (var i = 0; i < data.length; i++) {
        legend.push(data[i].name)
      }
      that.myChart = echarts.init(document.getElementById('deathCrowd'))
      const option = {
        color: ['rgb(0,206,209)', 'rgb(50,149,206)', '#00BFFF','rgb(50,149,206)'],
        tooltip: {},
        title: {
          text: this.title,
          left: 'center',
          padding: 10,
          textStyle: {
            color: '#ffffff',
            fontSize: '0.22rem',
            fontFamily: 'KuHei'
          }
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              normal: {
                borderRadius: 10
              }
            },
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff'
              }
            },
            labelLine: {
              normal: {
                length: 2
              }
            },
            data: data
          },
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45%', '65%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderWidth: 2
            },
            label: {
              position: 'inner',
              formatter: '{d}%',
              color: '#fff'
            },
            data: data
          }
        ]
      }
      window.addEventListener('resize', function() {
        that.chart = echarts.init(document.getElementById('deathCrowd'))
        that.chart.resize()
      })
      that.myChart.setOption(option)
      that.myChart.on('click', function(params) {
      })
    },
    getqThedead() {
      var that = this
      var dataT = [{name:'江苏省',value: 3877, itemStyle:{color: 'rgba(0,206,209)'}},
      {name:'河南省',value: 3021, itemStyle:{color: 'rgba(0,139,139)'}},
      {name:'四川省',value: 2174, itemStyle:{color: 'rgba(95,158,160)'}},
      {name:'福建省',value: 1192, itemStyle:{color: 'rgba(50,149,206)'}},
      {name:'安徽省',value: 973, itemStyle:{color: 'rgba(100,149,237)'}}]
      this.$store.dispatch('datapanel/Turnout', this.getdata).then((dataH) => {
        for (var i = 0; i < dataT.length; i++) {
          if (that.data.length >= 6) {
            break
          }
          if (dataT[i].name === ' ') {
            continue
          } else {
            that.data.push(dataT[i])
          }
        }
        that.initCharts(that.data)
      })
    }
  }
}
</script>
<style scoped>
@font-face {
  src: url("../public/font/KuHei.ttf");
  font-family: "KuHei";
}
.deathCrowd  {
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>
