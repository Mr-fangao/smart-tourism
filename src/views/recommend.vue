<template>
  <div style="position: absolute;width: 100%;height: 100%">
    <div id="MapSanJ1"></div>
    <div id="MapSanJ2"></div>
  </div>

</template>

<script>
import {loadModules} from 'esri-loader';

export default {
  name: "GWR",
  data() {
    return {
      MapSanJ1: null,
      MapSanJ2: null
      }
  },
  mounted() {
    this._Init()
  },
  methods: {
    _Init: function () {
      const _self = this;
      const option = {
        url: 'http://js.arcgis.com/4.18/dojo/dojo.js',
        css: 'https://js.arcgis.com/4.18/esri/themes/dark-blue/main.css',
      };
      //通过loadModules来做衔接
      loadModules(
        [
          'esri/layers/TileLayer',
          "esri/Map",
          "esri/views/MapView",
          "esri/Basemap",
          "esri/views/SceneView",
          "esri/Camera",
          'esri/layers/FeatureLayer',
          "esri/widgets/Legend",
          "esri/widgets/Sketch/SketchViewModel",
          "esri/layers/GraphicsLayer",
          "dgrid/OnDemandGrid",
          "dgrid/extensions/ColumnHider",
          "dgrid/Selection",
          "esri/layers/MapImageLayer",
        ],
        option
      ).then(([TileLayer, Map, MapView, Basemap, SceneView, Camera, FeatureLayer, Legend, SketchViewModel, GraphicsLayer, OnDemandGrid, ColumnHider,Selection,MapImageLayer]) => {

        const layer = new TileLayer({
          url:
            "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
        });
        const customBasemap = new Basemap({
          baseLayers: [layer],
          title: "Custom Basemap",
          id: "myBasemap"
        });

        var WH_Water = new FeatureLayer({
        //   url: 'http://114.98.239.36:6080/arcgis/rest/services/CIDW/MapServer'
            url: 'http://114.98.239.36:6080/arcgis/rest/services/BZCTY/BZCTY1/MapServer'
        })

        var WH_Water2 = new FeatureLayer({
          url: 'http://114.98.239.36:6080/arcgis/rest/services/COVID/WuHan_Water/MapServer/0'
        })

        _self.MapSanJ1 = new Map({
          basemap: customBasemap,
          layers: [WH_Water]
        });

        _self.MapSanJ2 = new Map({
          basemap: customBasemap,
          layers: [WH_Water2]
        });

        var view = new MapView({
          container: 'MapSanJ1',
          map: _self.MapSanJ1,
          zoom: 8,
          center: [114.31,30.52]
        });

        var view2 = new MapView({
          container: 'MapSanJ2',
          map: _self.MapSanJ2,
          zoom: 8,
          center: [114.31,30.52]
        });
        _self.MapSanJ1.layers.items[0].visible = true;

        _self.MapSanJ2.layers.items[0].visible = true;
      })
    },
  }
}
</script>

<style scoped>
#MapSanJ1  {
  float: left;
  width: 53%;
  height: 100%;
}

#MapSanJ2 {
  float: left;
  width: 47%;
  height: 100%;
}
</style>
