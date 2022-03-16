<template>
  <div class="severeCrowd">
    <div id="severeCrowd" style="height: 100%;width: 100%;z-index: 1;" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import eventBum from '../public/js/EvebtBus'
export default {
  name: 'SevereCrowd',
  data() {
    return {
      getdata: {
        range: 0, // 区域号
        name: '中华人民共和国' // 地区名称
      },
      data: [],
      myChart: null, // 图表
      title: '中国各省拐入统计'
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
      that.getqCpopulation()
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
      var that = this
      var data_baby = []
      var data_juvenile = []
      var data_teenagers = []
      var data_other = []
      var place_name = []
      if (datas[0] === '拐入') {
        this.title = '各地区拐入至' + datas[1][0].to + '儿童年龄组统计'
        for (let index = 0; index < datas[1].length; index++) {
          const element = datas[1][index]
          place_name.push(element.from)
        }
      } else {
        this.title = datas[1][0].from + '拐出至各地区儿童年龄组统计'
        for (let index = 0; index < datas[1].length; index++) {
          const element = datas[1][index]
          place_name.push(element.to)
        }
      }
      for (let i = 0; i < datas[1].length; i++) {
        const element = datas[1][i]
        data_baby.push(element.middata.婴幼儿)
        data_juvenile.push(element.middata.少年)
        data_teenagers.push(element.middata.青少年)
        data_other.push(element.middata.其他)
      }
      const option = {
        color: ['#00BFFF', 'rgb(50,149,206)', 'rgb(0,206,209)','rgb(50,149,206)'],
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            realtime: true,
            start: 0,
            end: 50,
            bottom: '5%',
            height: '8%'
          }
        ],
        legend: {
          top: '12%',
          orient: 'horizontal',
          textStyle: {
            color: '#ffffff'
          },
          data: ['婴幼儿', '少年', '青少年', '其他']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: place_name,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: '婴幼儿',
            type: 'line',
            data: data_baby
          },
          {
            name: '少年',
            type: 'line',
            data: data_juvenile
          },
          {
            name: '青少年',
            type: 'line',
            data: data_teenagers
          },
          {
            name: '其他',
            type: 'line',
            data: data_other
          }
        ]
      }
      this.myChart = echarts.init(document.getElementById('severeCrowd'))
      window.addEventListener('resize', function() {
        that.chart = echarts.init(document.getElementById('severeCrowd'))
        that.chart.resize()
      })
      that.myChart.setOption(option)
      // this.initCharts(data)
    },
    initCharts(data) {
      const that = this
      var legend = []
      for (var i = 0; i < data.length; i++) {
        legend.push(data[i].name)
      }
      that.myChart = echarts.init(document.getElementById('severeCrowd'))
      const option = {
        tooltip: {},
        title: {
          text: that.title,
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
            hoverAnimation: false,
            z: 1,
            type: 'pie',
            radius: [10, '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              formatter: '{b}',
              color: '#ffffff'
            },
            labelLine: {
              normal: {
                length: 0,
                length2: 0
              }
            },
            data: data
          },
          {
            type: 'pie',
            z: 100,
            radius: [10, '60%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            label: {
              position: 'inner',
              formatter: '{d}%',
              color: '#ffffff'
            },
            data: data
          }
        ]
      }
      window.addEventListener('resize', function() {
        that.chart = echarts.init(document.getElementById('severeCrowd'))
        that.chart.resize()
      })
      that.myChart.setOption(option)
    },
    getqCpopulation() {
      var that = this
      var dataT = [{name:'江苏省',value: 3877, itemStyle:{color: 'rgba(0,206,209)'}},
      {name:'河南省',value: 3021, itemStyle:{color: 'rgba(0,139,139)'}},
      {name:'四川省',value: 2174, itemStyle:{color: 'rgba(95,158,160)'}},
      {name:'福建省',value: 1192, itemStyle:{color: 'rgba(50,149,206)'}},
      {name:'安徽省',value: 973, itemStyle:{color: 'rgba(100,149,237)'}}]
      this.$store.dispatch('datapanel/Turnin', this.getdata).then((dataH) => {
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
.severeCrowd  {
    position: absolute;
    /* width: 100%; */
    width: 400px;
    /* height: 100%; */
    height: 240px;
}
</style>
