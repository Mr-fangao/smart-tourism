<template>
  <div id="network">
    <div id="map1" />
    <!-- 查询类型 -->
    <div class="type">
      <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false" @change="scaleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-if="json.where > 0" v-model="mode" placeholder="请选择" :popper-append-to-body="false" @change="scaleChange">
        <el-option
          v-for="item in modeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <selectRegion />
  </div>
</template>
<script>
import shiline from './public/js/shiLine.json'
import shengline from './public/js/shengLine.json'
import SelectRegion from './components/selectRegion'
import eventBum from './public/js/EvebtBus'
export default {
  name: 'Traffickingnetwork',
  components: {
    SelectRegion
  },
  data() {
    return {
      json: {
        name: '中国',
        where: 0,
        code: ''
      },
      // 尺度选择
      options: [{
        value: '省际',
        label: '省际'
      }, {
        value: '市际',
        label: '市际'
      }, {
        value: '区县',
        label: '区县'
      }],
      value: '省际',
      mode: '拐出',
      modeOptions: [{
        value: '拐出',
        label: '拐出'
      }, {
        value: '拐入',
        label: '拐入'
      }],
      // 地图
      map: null,
      // 中国尺度线
      lineData: null,
      MovingData: null,
      countryLineLayer: null,
      MovingLayer: null,
      // 省市尺度线
      textDataSet: null,
      lineDataSet: null,
      pointDataSet: null,
      timeDataSet: null
    }
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off('json')
    document.getElementById('network').style.display = 'none'
  },
  mounted() {
    this.int()
    // 城市名称
    eventBum.$on('json', json => {
      this.json.name = json.name
      this.json.where = json.where
      this.scaleChange()
      // 地图定位
      this.getbianJson(1)
    })
  },
  methods: {
    int() {
      var that = this
      mapboxgl.accessToken = 'pk.eyJ1Ijoid3VqaW5odWkwIiwiYSI6ImNrdDFoZWphNDBhaGszMXBoazZ1dWdwMWkifQ.AX5nvyCpK8yKsCqyz36rsw' // 你的accessToken
      this.map = new mapboxgl.Map({
        container: 'map1', // 地图容器的id
        center: [107.01292828127248, 34.12077517311424], // 中心点
        zoom: 2.75, // 地图初始化时的层级
        style: {
          'version': 8,
          'sources': {
            'raster-tiles': {
              'type': 'raster',
              'tiles': [
                'https://map.geoq.cn/arcgis/rest/services/SimpleFeature/ChinaBoundaryLine/MapServer/tile/{z}/{y}/{x}'
              ],
              'tileSize': 256
            }
          },
          'layers': [
            {
              'id': 'simple-tiles',
              'type': 'raster',
              'source': 'raster-tiles',
              'minzoom': 0,
              'maxzoom': 22
            }
          ],
          'glyphs': 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf'
        }
      })
      that.map.on('load', function() {
        that.addLayer(shengline)
        that.getbianJson(0)
      })
    },
    getbianJson(e) {
      var that = this
      that.$store.dispatch('datapanel/QJson', that.json.name).then((dataz) => {
        that.boundary = dataz
        // 数据
        if (e === 0) {
          that.bian(dataz, 0)
        } else if (e === 1) {
          that.bian(that.boundary, 1) // 清除原始边界
        }
      })
    },
    // 边界
    bian(dataz, e) {
      var that = this
      var bound = []
      if (e === 1) {
        if (that.length !== undefined) {
          for (let i = 0; i < that.length; i++) {
            that.map.removeLayer('maine' + i) // 清除范围
            that.map.removeSource('maine' + i)
          }
        } else if (that.map.getSource('maine') !== undefined) {
          that.map.removeLayer('maine') // 清除范围
          that.map.removeSource('maine')
        }
      }
      if (dataz.json.features.length !== undefined) {
        if (that.json.name !== '中国') {
          for (let i = 0; i < dataz.json.features.length; i++) {
            const ele = dataz.json.features[i].geometry.coordinates
            for (let j = 0; j < ele.length; j++) {
              const element = ele[j][0]
              for (let z = 0; z < element.length; z++) {
                const element3 = element[z]
                bound.push(element3)
              }
            }
            that.map.addLayer({
              'id': 'maine' + i,
              'type': 'fill',
              'source': {
                'type': 'geojson',
                'data': dataz.json.features[i].geometry
              },
              'layout': {},
              'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.2
              }
            })
          }
          var line = turf.lineString(bound)
          var bbox = turf.bbox(line)
          that.map.fitBounds(bbox, {
            padding: { bottom: 30 }
          })
          that.length = dataz.json.features.length
        } else {
          var hball = []
          var features = []
          const hbfeatures = [[dataz.json.features[2].geometry.coordinates[0][0]], [dataz.json.features[2].geometry.coordinates[0][1]], dataz.json.features[2].geometry.coordinates[1]]
          for (let index = 0; index < hbfeatures.length; index++) {
            const element = hbfeatures[index]
            hball.push({ id: 33 + index, type: 'Feature', properties: { name: '河北省' }, geometry: { coordinates: element, type: 'Polygon' }})
          }
          for (let index = 0; index < dataz.json.features.length; index++) {
            const element = dataz.json.features[index]
            if (index === 2) {
              features.push(hball[0])
              features.push(hball[1])
              features.push(hball[2])
            } else {
              features.push(element)
            }
          }
          var qtbian = {
            'type': 'FeatureCollection',
            'features': features
          }
          that.map.addLayer({
            'id': 'maine0',
            'type': 'fill',
            'source': {
              'type': 'geojson',
              'data': qtbian
            },
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.2
            }
          })
          that.length = 1
        }
      } else {
        that.map.addLayer({
          'id': 'maine',
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': dataz.json.features.geometry
          },
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.2
          }
        })
        const line1 = turf.lineString(dataz.json.features.geometry.coordinates[0][0])
        const bbox1 = turf.bbox(line1)
        that.map.fitBounds(bbox1, {
          padding: { bottom: 30 }
        })
        that.length = dataz.json.features.length
      }
    },
    // 切换尺度
    scaleChange() {
      var that = this
      var data = []
      this.destroy()
      if (this.value === '省际') {
        data = shengline
      } else if (this.value === '市际') {
        data = shiline
      } else {
        this.$message({
          message: '暂不支持该尺度！',
          type: 'warning',
          showClose: true
        })
      }
      if (this.json.name === '中国') {
        this.addLayer(data)
      }
      if (this.json.where === 1) {
        var qianxidata = []
        var middata = []
        if (that.mode === '拐出') {
          const map1 = data.reduce((result, item) => {
            result[item.拐出省] = result[item.拐出省] || []
            result[item.拐出省].push(item)
            return result
          }, {})
          const result = Object.values(map1)
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐出省
            if (element === that.json.name) {
              middata = result[index]
              break
            }
          }
        } else {
          const map1 = data.reduce((result, item) => {
            result[item.拐入省] = result[item.拐入省] || []
            result[item.拐入省].push(item)
            return result
          }, {})
          const result = Object.values(map1)
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐入省
            if (element === that.json.name) {
              middata = result[index]
              break
            }
          }
        }
        for (let i = 0; i < middata.length; i++) {
          const element = middata[i]
          qianxidata.push({ from: element.拐出省, fromCenter: { lng: element.拐出经度, lat: element.拐出纬度 }, toCenter: { lng: element.拐入经度, lat: element.拐入纬度 }, count: element.数量, to: element.拐入省 })
        }
        this.addcurveLayer(qianxidata)
      } else if (this.json.where === 2) {
        console.log(2)
      } else if (this.json.where === 3) {
        this.$message({
          message: '暂不支持该尺度！',
          type: 'warning',
          showClose: true
        })
      }
    },
    // 销毁图层
    destroy(e) {
      if (this.countryLineLayer !== null) {
        this.countryLineLayer.destroy()
        this.countryLineLayer = null
        this.MovingLayer.destroy()
        this.MovingLayer = null
      }
    },
    // 添加图层
    addLayer(datas) {
      var that = this
      var data = []
      var timeData = []
      function curive(fromPoint, endPoint, n) {
        var delLng = (endPoint.lng - fromPoint.lng) / n
        var delLat = (endPoint.lat - fromPoint.lat) / n

        for (var i = 0; i < n; i++) {
          var pointNLng = fromPoint.lng + delLng * i
          var pointNLat = fromPoint.lat + delLat * i
          timeData.push({
            geometry: {
              type: 'Point',
              coordinates: [pointNLng, pointNLat]
            },
            count: 1,
            time: i
          })
        }
      }
      for (let index = 0; index < datas.length; index++) {
        const element = datas[index]
        const cityCenter1 = { lng: element.拐出经度, lat: element.拐出纬度 }
        const cityCenter2 = { lng: element.拐入经度, lat: element.拐入纬度 }
        if (Math.random() > 0.7) {
          curive(cityCenter2, cityCenter1, 50)
        }
        data.push({
          geometry: {
            type: 'LineString',
            coordinates: [
              [cityCenter1.lng, cityCenter1.lat],
              [cityCenter2.lng, cityCenter2.lat]
            ]
          },
          count: element.数量
        })
      }
      if (that.countryLineLayer === null) {
        var lineData = new mapv.DataSet(data)
        var options = {
          methods: {
            click: function(item) { }
          },
          context: '2d',
          gradient: {
            0.1: '#0022c8', 0.2: '#2b1ca7', 0.3: '#551785', 0.4: '#801164', 0.5: '#aa0b43', 0.6: '#d50621', 0.7: '#ff0000', 0.8: '#ff3900', 0.9: '#ff7100', 1.0: '#ffaa00'
          },
          lineWidth: 0.5,
          // max: 5,
          draw: 'intensity'
        }
        that.countryLineLayer = new mapboxgl.zondy.MapvLayer(that.map, lineData, options)
        var MovingData = new mapv.DataSet(timeData)
        var options1 = {
          fillStyle: 'rgba(255, 250, 250, 0.9)',
          size: 0.5,
          animation: {
            type: 'time',
            stepsRange: {
              start: 0,
              end: 50
            },
            trails: 1,
            duration: 5
          },
          draw: 'simple'
        }
        that.MovingLayer = new mapboxgl.zondy.MapvLayer(that.map, MovingData, options1)
      }
    },
    // 省市拐卖线路
    addcurveLayer(datas) {
      var that = this
      var qianxi = new mapv.DataSet(datas)
      var qianxiData = qianxi.get()
      var lineData = []
      var pointData = []
      var textData = []
      var timeData = []
      var citys = {}
      for (let i = 0; i < qianxiData.length; i++) {
        var fromCenter = qianxiData[i].fromCenter
        var toCenter = qianxiData[i].toCenter
        if (!fromCenter || !toCenter) {
          continue
        }
        citys[qianxiData[i].from] = qianxiData[i].count
        citys[qianxiData[i].to] = 100
        pointData.push({
          geometry: {
            type: 'Point',
            coordinates: [fromCenter.lng, fromCenter.lat]
          }
        })
        pointData.push({
          geometry: {
            type: 'Point',
            coordinates: [toCenter.lng, toCenter.lat]
          }
        })
        textData.push({
          geometry: {
            type: 'Point',
            coordinates: [fromCenter.lng, fromCenter.lat]
          },
          text: qianxiData[i].from
        })
        textData.push({
          geometry: {
            type: 'Point',
            coordinates: [toCenter.lng, toCenter.lat]
          },
          text: qianxiData[i].to
        })

        var curve = mapv.utilCurve.getPoints([fromCenter, toCenter])
        for (let j = 0; j < curve.length; j++) {
          timeData.push({
            geometry: {
              type: 'Point',
              coordinates: curve[j]
            },
            count: 1,
            time: j
          })
        }
        lineData.push({
          geometry: {
            type: 'LineString',
            coordinates: curve
            // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
          },
          count: 30 * Math.random()
        })
      }
      if (that.textDataSet === null) {
        that.textDataSet = new mapv.DataSet(textData)
        var textOptions = {
          context: '2d',
          draw: 'text',
          font: '14px Arial',
          fillStyle: 'white',
          shadowColor: 'yellow',
          shadowBlue: 10,
          zIndex: 11,
          shadowBlur: 10
        }
        new mapboxgl.zondy.MapvLayer(that.map, that.textDataSet, textOptions)
        that.lineDataSet = new mapv.DataSet(lineData)
        var lineOptions = {
          context: '2d',
          strokeStyle: 'rgba(106, 90, 205, 0.8)',
          shadowColor: 'rgba(106, 90, 205, 1)',
          shadowBlur: 20,
          lineWidth: 2,
          zIndex: 100,
          draw: 'simple'
        }
        new mapboxgl.zondy.MapvLayer(that.map, that.lineDataSet, lineOptions)
        var pointOptions = {
          context: '2d',
          fillStyle: 'rgba(254,175,3,0.7)',
          shadowColor: 'rgba(255,165,0, 0.5)',
          shadowBlur: 10,
          size: 5,
          zIndex: 10,
          draw: 'simple'
        }
        that.pointDataSet = new mapv.DataSet(pointData)
        new mapboxgl.zondy.MapvLayer(that.map, that.pointDataSet, pointOptions)
        that.timeDataSet = new mapv.DataSet(timeData)
        var timeOptions = {
          context: '2d',
          fillStyle: 'rgba(255, 250, 250, 0.5)',
          zIndex: 200,
          size: 2.5,
          animation: {
            type: 'time',
            stepsRange: {
              start: 0,
              end: 50
            },
            trails: 10,
            duration: 2
          },
          draw: 'simple'
        }
        new mapboxgl.zondy.MapvLayer(that.map, that.timeDataSet, timeOptions)
      } else {
        that.timeDataSet.set(timeData)
        that.textDataSet.set(textData)
        that.lineDataSet.set(lineData)
        that.pointDataSet.set(pointData)
      }
    }
  }
}
</script>
<style scoped>
#network {
  position: absolute;
  height: 100%;
  width: 100%;
}
/* 地图 */
#network #map1 {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 0;
}
#network .type {
  position: absolute;
  z-index: 10;
  top: 55px;
  width: 180px;
  right: 410px;
  font-family: KuHei;
  font-size: 14px;
}

#network .type >>> .el-input__inner {
  text-align: center;
  background-color: rgba(18, 18, 18, 0.4);
  border: 1px solid rgba(175, 233, 215, 0.4);
  /* border-bottom: 1px solid #fff; */
  padding-left: 30px !important;
  padding-right: 30px !important;
  color: #fff;
  font-family: KuHei;
  /* letter-spacing: 2px; */
}
#network .type >>> .popper__arrow::after {
  content: none;
}
#network .type >>> .el-select-dropdown {
  background-color: rgba(18, 18, 18, 0.4);
}
#network .type >>> .el-select-dropdown__item {
  text-align: center;
  color: #fff;
}
#network .type >>> .el-select-dropdown__item.hover,
#network .type >>> .el-select-dropdown__item:hover {
  background-color: rgb(31, 33, 44) !important;
}
</style>
