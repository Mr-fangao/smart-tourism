<template>
  <div id="map" />
</template>
<script>

export default {
  name: "Spacetime",
  components: {

  },
  data() {
    return {
      map:null,
    }
  },
  created() {

  },
  destroyed() {

  },
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      var that =this;
      var tiandituKey = "9c157e9585486c02edf817d2ecbc7752";
      /**
       * 地图初始化
       */
      //实例化要加载的source来源对象（世界矢量地图）
      var dark = {
        type: "raster",
        'tiles': [
          //来源请求地址，请求天地图提供的全球矢量地图WMTS服务
          "http://t0" +
          ".tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles"
          + "&TILECOL=" + '{x}' + "&TILEROW=" + '{y}' + "&TILEMATRIX=" + '{z}'
          + "&tk=" + tiandituKey
        ],
        //栅格瓦片的分辨率
        tileSize: 256,
      };
      //实例化Map对象加载地图
      that.map = new mapboxgl.Map({
        crs: "EPSG:4326", //经纬度一定要设置crs参数
        maxBounds: [
          [-180, -90],
          [180, 90],
        ],
        //地图容器div的id
        container: "map",
        //设置地图样式信息
        style: {
          //设置版本号，一定要设置
          version: 8,
          //添加来源
          sources: {
            dark: dark,
          },
          //设置加载并显示来源的图层信息
          layers: [{
            //图层id，要保证唯一性
            id: "dark",
            //图层类型
            type: "raster",
            //连接图层来源
            source: "dark",
            //图层最小缩放级数
            minzoom: 0,
            //图层最大缩放级数
            maxzoom: 22,
          },],
        },
        zoom: 7.5,
        center: [116.39, 40.20]
      });

      let layername ="DirectionalDistribution";
      let layernumber="t0,t1,t2"
      //注册地图加载事件
      that.map.on("load", function () {
        that.map.addLayer({
          id: "wms-layer",
          type: "raster",
          source: {
            type: "raster",
            tiles: [
              "http://124.221.111.73:6163/igs/rest/ogc/doc/"+
              `${layername}`+
              "/WMSServer?" +
              "service=WMS" +
              "&request=GetMap" +
              "&layers=" +
              `${layernumber}` +
              "&styles=" +
              "&format=image/png" +
              "&transparent=true" +
              "&version=1.1.1" +
              "&height=512" +
              "&width=512" +
              "&srs=EPSG:4326" +
              "&bbox={bbox}",
            ],
            tileSize: 512,
          },
          paint: {},
        });
      })
    }
  },
}
</script>

<style lang="less" scoped>

</style>