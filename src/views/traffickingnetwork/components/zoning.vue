<template>
  <div id="region" style="height: 100%;width: 100%;z-index: 1;" />
</template>
<script>
import * as echarts from 'echarts'
import eventBum from '../public/js/EvebtBus'
export default {
  name: 'Administrativeregion',
  data() {
    return {
      getdata: {
        range: 0, // 区域号
        name: '陕西省' // 地区名称
      },
      data: [], // 地区名
      datas: [], // 确诊数
      man: [], // 重症数
      woman: [], // 死亡数
      myChart: null, // 图表
      title: '中国各省拐卖数量',
      start: 30
    }
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off('right')
    // document.getElementById('region').style.display = 'none'
    this.CAdestroy()
  },
  mounted() {
    var that = this
    eventBum.$on('right', json => {
      this.CAdestroy()
      this.handle(json)
    })
    setTimeout(function() {
      that.getARegion()
    }, 1000)
  },
  methods: {
    // 创建与销毁盒子
    CAdestroy() {
      if (this.myChart !== null) {
        this.myChart.clear()
        this.myChart.dispose()
      }
    },
    handle(data) {
      console.log(data)
      const name = []
      const all = []
      const man = []
      const woman = []
      if (data[0] === '流入') {
        this.title = '各地区流入至' + data[1][0].to + '统计'
        for (let index = 0; index < data[1].length; index++) {
          const element = data[1][index]
          name.push(element.from.substring(0, 4))
          all.push(element.count)
          man.push(element.middata.女生)
          woman.push(element.middata.男生)
        }
      } else {
        this.title = data[1][0].from + '流出至各地区统计'
        for (let index = 0; index < data[1].length; index++) {
          const element = data[1][index]
          name.push(element.to.substring(0, 4))
          all.push(element.count)
          man.push(element.middata.女生)
          woman.push(element.middata.男生)
        }
      }
      if (data[2] === 1) {
        this.start = 40
      } else if (data[2] === 2) {
        this.start = 85
      }
      this.initCharts(name, all, man, woman)
    },
    initCharts(name, all, man, woman) {
      const that = this
      that.myChart = echarts.init(document.getElementById('region'))
      const option = {
        title: {
          text: that.title,
          left: 'center',
          padding: 5,
          textStyle: {
            color: '#ffffff',
            fontSize: '0.22rem',
            fontFamily: 'KuHei'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 悬浮柱状
          }
        },
        legend: {
          data: ['合计', '男', '女'],
          y: '50%',
          top: '10%',
          orient: 'horizontal',
          textStyle: {
            color: '#ffffff'
          },
          selected: {
            '合计': false
          }
        },
        color: ['#00BFFF', 'rgb(50,149,206)', 'rgb(0,206,209)'],
        yAxis: {
          type: 'category',
          data: name,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '5%',
          containLabel: true,
          height: '80%'
        },
        xAxis: {
          type: 'value',

          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          axisTick: { // y轴小格子隐藏
            show: false
          },
          axisLabel: { // y轴全部显示
            interval: 0,
            rotate: 25, // 代表逆时针旋转45度
            fontSize: '10px'
          }
        },
        series: [
          {
            name: '合计',
            type: 'bar',
            stack: 'total',
            label: {
              show: true,
              position: 'right',
              color: '#fff',
              backgroundColor: 'none'
            },
            emphasis: {
              focus: 'series'
            },
            barWidth: '85%',
            data: all
          },
          {
            name: '男',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true,
            //   fontSize: 10,
            //   align: 'center',
            //   color: 'rgba(255, 255, 255, 0.75)'
            // },
            emphasis: {
              focus: 'series'
            },
            barWidth: '85%',
            data: man
          },
          {
            name: '女',
            type: 'bar',
            stack: 'total',
            // label: {
            //   show: true,
            //   fontSize: 10,
            //   align: 'center',
            //   color: 'rgba(255, 255, 255, 0.75)'
            // },
            emphasis: {
              focus: 'series'
            },
            barWidth: '85%',
            data: woman
          }
        ]
      }
      window.addEventListener('resize', function() {
        that.myChart = echarts.init(document.getElementById('region'))
        that.myChart.resize()
      })
      that.myChart.setOption(option)
    },
    getARegion() {
      var that = this
      this.$store.dispatch('datapanel/AR', this.getdata).then((dataH) => {
        that.data = []
        var data = dataH[0].value
        var datas = dataH[1].value
        for (var i = 0; i < data.length; i++) {
          if (data[i].name === ' ') {
            continue
          }
          that.data.push(data[i].name.substring(0, 4))
          that.datas.push(data[i].value)
        }
        for (var j = 0; j < datas.length; j++) {
          if (datas[j].name === ' ') {
            continue
          }
          if (datas[j].gender === '男') {
            if (that.data.indexOf(datas[j].name) !== -1) {
              that.man.push(datas[j].value)
            } else {
              that.man.push(0)
            }
          } else if (datas[j].gender === '女') {
            if (that.data.indexOf(datas[j].name) !== -1) {
              that.woman.push(datas[j].value)
            } else {
              that.woman.push(0)
            }
          }
        }
        that.initCharts(that.data, that.datas, that.man, that.woman)
      }).catch(() => {
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
  #region {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
