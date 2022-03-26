<template>
  <div style="position: absolute;width: 100%;height: 100%">
    <div id="MapSanJ1" />
    <el-button id="select">{{ msg }}</el-button>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'XinXing',
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
      // eslint-disable-next-line no-unused-vars
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
        var WH_Water1 = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/analyst/MapServer/6',
          renderer: backrenderer,
          legendEnabled: false
        })
        var WH_Water = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/BabyHome/TimeSpaceHotSpots/MapServer/0',
          title: '中国丢失儿童新兴冷热点分析'
          // popupTemplate: popupTemplate
        })
        const map = new Map({
          basemap: customBasemap,
          layers: [WH_Water1, WH_Water]
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
          })
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
