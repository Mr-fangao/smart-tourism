<template>
  <div class="com-multimap">
    <div id="map"></div>
<div><span style="background-color: #00FFFF"></span>3.5</div>
<div><span style="background-color: #FFB6C1"></span>3.8</div>
<div><span style="background-color: #00FF7F"></span>4.1</div>
<div><span style="background-color: #FF8C00"></span>4.4</div>
<div><span style="background-color: #FFFF00"></span>4.7</div>
<div><span style="background-color: #9400D3"></span>5.0</div>
    </div>
</template>
<script>
import nanjing from "../../assets/json/nanjingpoint.json";
import njprovince from "../../assets/json/njprovince.json";
export default {
  name: "multimap",
  mounted() {
    this.initmap();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 5,
      });
        map.on("load", () => {
        map.addSource("njmark", {
          type: "geojson",
          data: nanjing,
        });
        map.addSource("njpolygon", {
          type: "geojson",
          data: njprovince,
        });
        map.addLayer({
          id: "fillID",
          type: "fill" /* symbol类型layer，一般用来绘制点*/,
          source: "njpolygon",
          paint: {
            "fill-color": "#74add1",
            "fill-opacity": 0.6 /* 透明度 */,
          },
        });
           map.addLayer({
                'id': 'earthquakes-layer',
                'type': 'circle',
                'source': 'njmark',
                'paint': {
                  "circle-radius": 5,
              "circle-stroke-width": 2,
              'circle-opacity': 0.75,
              "circle-stroke-color": "white",
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get','score'],
                        3.5,
                        '#00FFFF',
                        3.8,
                        '#FFB6C1',
                        4.1,
                        '#00FF7F',
                        4.4,
                        '#FF8C00',
                        4.7,
                        '#FFFF00',
                        5.0,
                        '#9400D3'
                    ],
                }
            }
           );
        // map.addLayer({
        //   id: "earthquakes-layer",
        //   type: "circle",
        //   source: "njmark",
        //   paint: {
        //     "circle-radius": 5,
        //     "circle-stroke-width": 2,
        //     "circle-color": "#06b2fb",
        //     "circle-stroke-color": "white",
        //   },
        // });
        map.addLayer({
          id: "points",
          type: "symbol" /* symbol类型layer，一般用来绘制点*/,
          source: "njmark",
          layout: {
            "text-field": ["get", "name"],
            "text-offset": [1.5, 1.5],
          },
          paint: {
            "text-color": "#FFFFFF",
          },
        });
        const countyLegendEl = document.getElementById('county-legend');
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-multimap {
  height: 100%;
  #map {
    position:relative;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
.map-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}
</style>