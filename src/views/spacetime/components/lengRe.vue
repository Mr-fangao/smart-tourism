<template>
  <div style="position: absolute;width: 100%;height: 100%">
    <div id="MapSanJ1" />
    <el-button id="select">{{ msg }}</el-button>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'LengRe',
  props: {
    pjson: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      msg: {}
    }
  },
  watch: {
    'pjson.c'() {
      this.msg = this.pjson
      var button = document.getElementById('select')
      button.click()
    }
  },
  mounted() {
    this._Init()
  },
  methods: {
    _Init: function() {
      const that = this
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
          'esri/layers/MapImageLayer'
        ],
        option
      ).then(([TileLayer, Map, MapView, Basemap, SceneView, Camera, FeatureLayer, Legend, SketchViewModel, GraphicsLayer, OnDemandGrid, ColumnHider, Selection, MapImageLayer]) => {
        const customBasemap = new Basemap({
          portalItem: {
            id: '4886f04424b44f64a11507ec6faae445' // WGS84 Streets Vector webmap
          }
        })
        // eslint-disable-next-line no-unused-vars
        var popupTemplate = {
          title: '{Name}', // 全国矢量（省、市、县）
          content: [
            {
              type: 'fields',
              fieldInfos: [
                { fieldName: '总病例', label: '总病例' }
              ]
            }
          ]
        }
        var WH_Water = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/analyst/MapServer/6',
          title: '中国省际丢失儿童冷热点分析'
          // popupTemplate: popupTemplate
        })
        var WH_Water1 = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/analyst/MapServer/7',
          title: '中国市际丢失儿童冷热点分析'
          // popupTemplate: popupTemplate
        })
        var WH_Water2 = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/analyst/MapServer/8',
          title: '中国区县丢失儿童冷热点分析'
          // popupTemplate: popupTemplate
        })
        WH_Water1.visible = false
        WH_Water2.visible = false
        const map = new Map({
          basemap: customBasemap,
          layers: [WH_Water, WH_Water1, WH_Water2]
        })
        var view = new MapView({
          container: 'MapSanJ1',
          map: map,
          zoom: 3,
          center: [107.87964452462774, 33.42404758483424]
        })
        view.on('drag', function(evt) {
          // console.log(1111)
          if (evt.action === 'end') {
            // console.log(view.center)
          }
        })
        view.when(function() {
          document.getElementById('select').addEventListener('click', function name(params) {
            view.popup.close()
            if (that.msg.space === '县级') {
              WH_Water.visible = false
              WH_Water1.visible = true
              WH_Water2.visible = false
            } else if (that.msg.space === '街道') {
              WH_Water.visible = false
              WH_Water1.visible = false
              WH_Water2.visible = true
            } else if (that.msg.space === '市级') {
              WH_Water.visible = true
              WH_Water1.visible = false
              WH_Water2.visible = false
            }
            WH_Water.refresh()
            WH_Water1.refresh()
            WH_Water2.refresh()
          })
        })
        view.on('drag', function(evt) {
          // console.log(1111)
          if (evt.action === 'end') {
            console.log(view)
          }
        })
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
</style>
