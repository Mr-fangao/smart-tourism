<template>
  <div class="heat">
    <div id="heat" style="height: 100%;width: 100%;z-index: 1;" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import sheng from '../public/js/shengLine.json'
import eventBum from '../public/js/EvebtBus'
export default {
  name: 'Heat',
  data() {
    return {
      getdata: {
        range: 0, // 区域号
        name: '中华人民共和国' // 地区名称
      },
      myChart: null, // 图表
      data: []
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
      var data = []
      var place_name = []
      if (datas[0] === '流入') {
        this.title = '各地区输入至' + datas[1][0].to + '游客平均游览时长统计'
        for (let index = 0; index < datas[1].length; index++) {
          const element = datas[1][index]
          data.push(element.middata.平均时长)
          place_name.push(element.from)
        }
      } else {
        this.title = datas[1][0].from + '流出至各地区儿童走失平均时长统计'
        for (let index = 0; index < datas[1].length; index++) {
          const element = datas[1][index]
          data.push(element.middata.平均时长)
          place_name.push(element.to)
        }
      }
      const option = {
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 60,
            inRange: {
              color: ['#acdcff', 'rgb(0,206,209)']
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '15%',
          containLabel: true
        },
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
        dataZoom: [
          {
            type: 'slider',
            show: true,
            realtime: true,
            start: 50,
            end: 100,
            bottom: '5%',
            height: '8%'
          }
        ],
        xAxis: {
          type: 'category',
          data: place_name,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          name: '年',
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        series: [
          {
            data: data,
            type: 'line',
            showSymbol: false,
            areaStyle: {},
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 5 // 设置线条粗细
                }
              }
            }, markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            smooth: true
          }
        ]
      }
      that.myChart = echarts.init(document.getElementById('heat'))
      that.myChart.setOption(option)
    },
    initCharts(data) {
      var name = ['江苏省', '广东省', '河南省', '四川省', '福建省', '安徽省', '浙江省', '上海市', '山东省', '山西省', '河北省', '湖北省', '陕西省', '贵州省', '江西省', '湖南省', '辽宁省', '黑龙江省', '内蒙古自治区', '重庆市', '广西壮族自治区', '吉林省', '北京市', '云南省', '甘肃省', '新疆维吾尔自治区', '天津市', '宁夏回族自治区', '海南省', '青海省', '西藏自治区']
      var heatData = []
      for (let index = 0; index < sheng.length; index++) {
        const element = sheng[index]
        heatData.push([element.拐出省, element.拐入省, element.数量])
      }
      const that = this
      var legend = []
      for (var i = 0; i < data.length; i++) {
        legend.push(data[i].name)
      }
      that.myChart = echarts.init(document.getElementById('heat'))
      const option = {
        title: {
          text: '中国各省拐卖路径热力图',
          left: 'center',
          padding: 10,
          textStyle: {
            color: '#ffffff',
            fontSize: '0.22rem',
            fontFamily: 'KuHei'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            var rez = params.data[0] + '->' + params.data[1] + '<br/>' +
              params.marker + '拐卖儿童数' + '：' + '<span style="font-weight: bold">' + params.data[2] + '</span>'
            return rez
          }
        },
        grid: {
          left: '0',
          right: '0%',
          bottom: '0%',
          containLabel: true,
          height: '50%',
          width: '85%'
        },
        yAxis: {
          type: 'category',
          data: name,
          name: '拐出地',
          nameLocation: 'end',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: name,
          nameLocation: 'end',
          name: '拐入地',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: true,
          realtime: false,
          inRange: {
            color: ['#00FFFF', '#008B8B', '#00CED1', '#AFEEEE', '#AFEEEE', '#FAEBD7', '#FFE4C4', '#DEB887', '#F4A460', '#D2691E', '#A0522D']
          },
          right: 0,
          itemWidth: 10,
          itemHeight: 100
        },
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'none'
          },
          {
            type: 'inside',
            yAxisIndex: 0,
            filterMode: 'none'
          }
        ],
        series: [{
          name: '拐卖儿童数',
          type: 'heatmap',
          data: heatData,
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1
            }
          },
          progressive: 1000,
          animation: false
        }]
      }
      window.addEventListener('resize', function() {
        that.chart = echarts.init(document.getElementById('heat'))
        that.chart.resize()
      })
      that.myChart.setOption(option)
    },
    getqCpopulation() {
      var that = this
      this.$store.dispatch('datapanel/Turnin', this.getdata).then((dataH) => {
        for (var i = 0; i < dataH.length; i++) {
          if (that.data.length >= 6) {
            break
          }
          if (dataH[i].name === ' ') {
            continue
          } else {
            that.data.push(dataH[i])
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
.heat {
  position: absolute;
  /* width: 100%;
  height: 100%; */
  width: 350px;
  height: 420px;
}
</style>
