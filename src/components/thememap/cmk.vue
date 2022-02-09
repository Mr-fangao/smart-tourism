<template>
  <div class="com-cmk">
    <div id="map"></div>
    <div class="map-overlay" id="features">
      <h2>求职人数统计</h2>
      <div id="pd">
        <p>Hover over a state!</p>
      </div>
    </div>
    <div class="map-overlay" id="legend">
      <h3 align="center">图 例</h3>
    </div>
  </div>
</template>
<script>
import chinajson from "../../assets/json/china.json";

export default {
  name: "cmk",
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
      map.on("load", function () {
        map.addSource("fillSourceID", {
          type: "geojson" /* geojson类型资源 */,
          data: chinajson /* geojson数据 */,
        });
        map.addLayer({
          id: "fillID",
          type: "fill" /* fill类型一般用来表示一个面，一般较大 */,
          source: "fillSourceID",
          paint: {
            "fill-color": {
              property: "confirmed", // this will be your density property form you geojson
              stops: [
                [1000, "#FED976"],
                [2000, "#FEB24C"],
                [3000, "#FD8D3C"],
                [4000, "#FC4E2A"],
                [5000, "#E31A1C"]
              ],
            },
            "fill-opacity": 0.7 /* 透明度 */,
          },
        });
        const layers = [
          "不满意",
          "不太满意",
          "比较满意",
          "满意",
          "非常满意"
        ];
        const colors = [
          "#FED976",
          "#FEB24C",
          "#FD8D3C",
          "#FC4E2A",
          "#E31A1C"
        ];

        //添加数据
        const legend = document.getElementById("legend");
        layers.forEach((layer, i) => {
          const color = colors[i];
          const item = document.createElement("div");
          const key = document.createElement("span");
          key.className = "legend-key";
          key.style.backgroundColor = color;

          const value = document.createElement("span");
          value.innerHTML = `${layer}`;
          item.appendChild(key);
          item.appendChild(value);
          legend.appendChild(item);
        });
        // change info window on hover
        map.on("mousemove", (event) => {
          const states = map.queryRenderedFeatures(event.point, {
            layers: ["fillID"],
          });
          document.getElementById("pd").innerHTML = states.length
            ? `<h3>${states[0].properties.name}</h3><p><strong><em>${states[0].properties.confirmed}</strong>个景点</em></p>`
            : `<p>没有数据</p>`;
        });
      });
      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-cmk {
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


 body {
            margin: 0;
            padding: 0;
        }

        h2,
        h3 {
            margin: 10px;
            font-size: 18px;
        }

        h3 {
            font-size: 16px;
        }

        p {
            margin: 10px;
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

        #features {
            top: 0;
            height: 115px;
            margin-top: 20px;
            width: 180px;
        }

        #legend {
            padding: 10px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            line-height: 18px;
            height: 150px;
            margin-bottom: 40px;
            width: 100px;
        }

        .legend-key {
            display: inline-block;
            border-radius: 20%;
            width: 10px;
            height: 10px;
            margin-right: 5px;
        }

</style>
