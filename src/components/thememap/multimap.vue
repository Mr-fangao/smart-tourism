<template>
  <div class="com-multimap">
    <div id="map"></div>
    <div id="state-legend" class="legend">
      <h4>景点评分</h4>
      <div><span style="background-color: #acbe21"></span>3.5</div>
      <div><span style="background-color: #beb221"></span>3.8</div>
      <div><span style="background-color: #be8221"></span>4.1</div>
      <div><span style="background-color: #ff8c00"></span>4.4</div>
      <div><span style="background-color: #be6321"></span>4.7</div>
      <div><span style="background-color: #be4521"></span>5.0</div>
    </div>
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
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [119, 31.2],
        zoom: 7.2,
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
          id: "earthquakes-layer",
          type: "circle",
          source: "njmark",
          paint: {
            "circle-radius": 5,
            "circle-stroke-width": 2,
            "circle-opacity": 0.75,
            "circle-stroke-color": "white",
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "score"],
              3.5,
              "#ACBE21",
              3.8,
              "#BEB221",
              4.1,
              "#BE8221",
              4.4,
              "#FF8C00",
              4.7,
              "#BE6321",
              5.0,
              "#BE4521",
            ],
          },
        });
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
        const countyLegendEl = document.getElementById("county-legend");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-multimap {
  height: 100%;
  #map {
    position: relative;
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
.legend {
  background-color: #348ea894;
  color: aliceblue;
  border-radius: 3px;
  bottom: 47%;
  height: 21%;
  width: 7%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 10px;
  position: absolute;
  right: 23.5%;
  z-index: 1;
}

.legend h4 {
  margin: 0 0 6px;
  font-size: 10pt;
}

.legend div span {
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-right: 5px;
  width: 10px;
}
</style>