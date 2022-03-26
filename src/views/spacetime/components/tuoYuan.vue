<template>
  <div style="position: absolute;width: 100%;height: 100%">
    <div id="Querymodule">
      <div id="top" @mousedown.prevent="mousedown"><span>≡</span></div>
      <div>
        <el-table
          :data="formdate"
          style="width: 100%"
          height="300"
        >
          <el-table-column
            prop="OBJECTID"
            label="时间"
          />
          <el-table-column
            prop="CenterX"
            label="中心点x"
          />
          <el-table-column
            prop="CenterY"
            label="中心点y"
          />
          <el-table-column
            prop="Rotation"
            label="旋转角度"
          />
          <el-table-column
            prop="XStdDist"
            label="标准距离长轴"
          />
          <el-table-column
            prop="YStdDist"
            label="标准距离短轴"
          />
        </el-table>
      </div>
    </div>
    <el-button id="queding1">分析</el-button>
    <div id="MapSanJ1" />
    <div id="zhegai">
      <i class="jia el-icon-loading" />
      <div class="font">正在加载中，已完成{{ jindu }}/{{ shijian }}</div>
    </div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  name: 'TuoYuan',
  props: {
    pjson: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      lineGraphic: [],
      graphicall: [],
      linecolor: ['#FF729F', '#56CBF9', '#736CED', '#AAFAC8', '#FAA381', '#BC4B51', '#8B85C1', '#FCA17D', '#F9A620'],
      jieguo: [],
      jindu: 0,
      shijian: 0,
      fdate: [],
      formdate: [
      ],
      times: 0
    }
  },
  watch: {
    'pjson.c'() {
      this.msg = this.pjson
      var button = document.getElementById('queding1')
      button.click()
    }
  },
  mounted() {
    this._Init()
  },
  methods: {
    mousedown(event) {
      var that = this
      const Querymodule = document.getElementById('Querymodule')
      const x = event.pageX - Querymodule.offsetLeft
      const y = event.pageY - Querymodule.offsetTop
      this.canMove = true
      document.onmouseup = function() {
        that.canMove = false
        document.onmousemove = null
        document.onmouseup = null
      }
      document.onmousemove = function(e) {
        if (that.canMove) {
          var left = e.clientX - x
          var top = e.clientY - y
          if (left < 0) left = 0
          if (top < 0) top = 0
          var maxLeft = window.innerWidth - Querymodule.offsetWidth
          var maxTop = window.innerHeight - Querymodule.offsetHeight
          if (left > maxLeft) left = maxLeft
          if (top > maxTop) top = maxTop
          Querymodule.style.left = left + 'px'
          Querymodule.style.top = top + 'px'
        }
      }
    },
    _Init: function() {
      var that = this
      const option = {
        url: 'http://js.arcgis.com/4.18/dojo/dojo.js',
        css: 'https://js.arcgis.com/4.18/esri/themes/dark-blue/main.css'
      }

      // 通过loadModules来做衔接
      loadModules(
        [
          'esri/layers/TileLayer',
          'esri/Map',
          'esri/views/MapView',
          'esri/Basemap',
          'esri/views/SceneView',
          'esri/Camera',
          'esri/layers/FeatureLayer',
          'esri/widgets/Legend',
          'esri/widgets/Sketch/SketchViewModel',
          'esri/layers/GraphicsLayer',
          'dgrid/OnDemandGrid',
          'dgrid/extensions/ColumnHider',
          'dgrid/Selection',
          'esri/renderers/DotDensityRenderer',
          'esri/layers/MapImageLayer',
          'esri/tasks/Geoprocessor',
          'esri/tasks/QueryTask',
          'esri/tasks/support/Query',
          'esri/Graphic'
        ],
        option
      ).then(([TileLayer, Map, MapView, Basemap, SceneView, Camera, FeatureLayer, Legend, SketchViewModel, GraphicsLayer, OnDemandGrid, ColumnHider, Selection, DotDensityRenderer, MapImageLayer, Geoprocessor, QueryTask, Query, Graphic]) => {
        const customBasemap = new Basemap({
          portalItem: {
            id: '4886f04424b44f64a11507ec6faae445' // WGS84 Streets Vector webmap
          }
        })
        var backrenderer = {
          type: 'simple', // autocasts as new SimpleRenderer()
          symbol: {
            type: 'simple-fill', // autocasts as new SimpleFillSymbol()
            style: 'none',
            outline: { // autocasts as new SimpleLineSymbol()
              type: 'simple-line',
              width: 1,
              color: '#F3DFA2'
              // style: 'long-dash'
            }
          }
        }
        var WH_Water = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/analyst/MapServer/6',
          title: '中国丢失儿童标准椭圆差分析',
          renderer: backrenderer,
          legendEnabled: false
        })
        const map = new Map({
          basemap: customBasemap,
          layers: [WH_Water]
        })
        var view = new MapView({
          container: 'MapSanJ1',
          map: map,
          zoom: 3,
          center: [107.87964452462774, 33.42404758483424]
        })
        view.when(function() {
          // 标准差椭圆
          document.getElementById('queding1').addEventListener('click', function name(params) {
            that.formdate = []
            that.times = 0
            map.removeAll()
            map.add(WH_Water)
            that.graphicall = []
            document.getElementById('zhegai').style.display = 'block'
            const datestart = new Date(that.msg.STime)
            var datestarts = datestart.getFullYear()
            const dateend = new Date(that.msg.ETime)
            const dateends = dateend.getFullYear()
            // 时间间隔
            that.shijian = dateends - datestarts
            for (let index = 0; index < that.shijian; index++) {
              const color = that.linecolor[index]
              chaTuoYuan('editor', datestarts + '-01-01 00:00:00', dateends + '-01-01 00:00:00', color)
              datestarts++
            }
          })
        })
        function chaTuoYuan(params1, i, y, color) {
          // gp服务
          const gpUrl = 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/StandardDeviationEllipse/GPServer/StandardDeviationEllipse'
          const gp = new Geoprocessor(gpUrl)
          gp.outSpatialReference = {
            wkid: 102100
          }
          var params = {
            表达式: '失踪时间 >= ' + "'" + i + "'" + ' AND 失踪时间 <= ' + "'" + y + "'",
            椭圆大小: that.msg.Type
          }
          console.log(params)
          gp.submitJob(params).then((jobInfo) => {
            var options = {
              interval: 1500,
              statusCallback: function(j) {
                // // console.log('Job Status: ', j.jobStatus)
              }
            }
            // 监听执行结束
            gp.waitForJobCompletion(jobInfo.jobId, options).then((jobInfo2) => {
              for (let index = 0; index < that.shijian; index++) {
                that.jindu = index
              }
              // 加载地图方法
              // 添加要素
              drawResultData(jobInfo2)
            })
          })
          function maopao(params) {
          // 冒泡排序
            var temp = 0
            var swap = false
            for (let i = params.length - 1; i > 0; i--) { // 每次需要排序的长度
              swap = false
              for (let j = 0; j < i; j++) { // 从第一个元素到第i个元素
                if (params[j].attributes.开始时间 > params[j + 1].attributes.开始时间) {
                  temp = params[j]
                  params[j] = params[j + 1]
                  params[j + 1] = temp
                  swap = true
                }
              }// loop j
              if (swap === false) {
                break
              }
            }// loop i
            const zhi = params
            return zhi
          }
          var linerenderer = {
            type: 'simple', // autocasts as new SimpleRenderer()
            symbol: {
              type: 'simple-fill', // autocasts as new SimpleFillSymbol()
              style: 'none',
              outline: { // autocasts as new SimpleLineSymbol()
                type: 'simple-line',
                width: 2,
                color: color,
                style: 'long-dash'
              }
            }
          }
          const lineSymbol = {
            type: 'simple-line', // autocasts as SimpleLineSymbol()
            color: color,
            width: 2,
            marker: { // autocasts from LineSymbolMarker
              placement: 'end',
              style: 'arrow'
            }
          }
          function drawResultData(result) {
            var jobId = result.jobId
            var mapUrl = 'http://114.98.239.36:6080/arcgis/rest/services/ShaanXiDisease/StandardDeviationEllipse/MapServer/jobs/' + jobId
            const resultImglayer = new MapImageLayer({
              title: '标准差椭圆',
              url: mapUrl,
              sublayers: [
                {
                  id: 0,
                  title: i,
                  renderer: linerenderer,
                  visible: true,
                  outFields: ['*']
                }
              ]
            })
            resultImglayer.opacity = 0.7
            map.add(resultImglayer)
            var markerSymbol = {
              type: 'simple-marker',
              size: 4,
              color: color
            }
            // 查询属性字段
            var queryTask = new QueryTask({
              url: mapUrl + '/0'
            })
            var query = new Query({
              returnGeometry: true,
              outFields: ['*']
            })
            query.where = 'CenterX <> 0'
            queryTask.execute(query).then(function(response) {
              // console.log(that.times)
              // console.log(that.formdate)
              // that.times = that.times + 1
              response.features[0].attributes.OBJECTID = i.substring(0, 11)
              that.formdate.push(response.features[0].attributes)
              that.jieguo = response.features[0].attributes
              const point1 = response.features[0].attributes
              const point = {
                type: 'point', // autocasts as new Point()
                longitude: point1.CenterX,
                latitude: point1.CenterY
                // spatialReference: { wkid: 3395 }
              }
              // console.log(point)
              const graphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
              })
              graphic.attributes = {
                '开始时间': i
              }
              graphic.popupTemplate = {
                title: '{开始时间}'
              }
              that.graphicall.push(graphic)
              console.log(graphic)
              view.graphics.add(graphic)

              if (that.graphicall.length === that.shijian) {
                // 结束
                document.getElementById('Querymodule').style.top = '50px'
                document.getElementById('Querymodule').style.left = '50px'
                document.getElementById('Querymodule').style.left = null
                document.getElementById('Querymodule').style.display = 'block'
                document.getElementById('zhegai').style.display = 'none'
                maopao(that.graphicall)

                // 投影有问题导致线出不来
                for (let index = 0; index < that.graphicall.length; index++) {
                  that.lineGraphic.push([that.graphicall[index].geometry.x, that.graphicall[index].geometry.y])
                }
                for (let index = 0; index < that.lineGraphic.length - 1; index++) {
                  const polyline = {
                    type: 'polyline', // autocasts as new Polyline()
                    paths: [that.lineGraphic[index], that.lineGraphic[index + 1]]
                  }
                  const polylineGraphic = new Graphic({
                    geometry: polyline,
                    symbol: lineSymbol,
                    spatialReference: { wkid: 3395 }
                  })
                  view.graphics.add(polylineGraphic)
                }
              }
            })
          }
        }
        const legend = new Legend({
          view: view
        })
        view.ui.add(legend, 'bottom-left')
      })
    }
  }
}
</script>

<style scoped>
#MapSanJ1  {
  float: left;
  width: 100%;
  height: 100%;
}
#queding1 {
  display: none;
}
#zhegai {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(204, 204, 204, 0.8);
  z-index: 101;
  top: 0;
  display: none;
}
#zhegai .jia {
  position: absolute;
  left: 48%;
  top: 45.5%;
  font-size: 80px;
}
#zhegai .font {
  position: absolute;
  position: absolute;
  left: 40%;
  top: 57%;
  font-size: 30px;
}
#Querymodule {
  text-align: center;
  width: 600px;
  border-radius: 5px;
  height: 310px;
  border: 1px solid rgb(39,45,57);
  background-color: rgba(40, 43, 57, 0.8);
  z-index: 100;
  top: 250px;
  position: fixed;
  user-select: none;
  left: 50px;
  top: 50px;
  display: none;
}
#top {
  background-color: rgb(40, 43, 57);
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid #fff;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 100%;
  height: 22px;
  line-height: 22px;
  cursor: move;
  user-select: none;
}
</style>
