<template>
  <div class="com-gradedcolormap">
    <div id="map"></div>
    <div class="map-overlay" id="features">
      <!-- <h2>游客满意度平均值</h2> -->
      <div id="pd">
        <p>Hover over a state!</p>
      </div>
    </div>
    <div class="map-overlay" id="legend">
      <div id="state-legend" class="state-legend">
        <h4>游客满意度</h4>
        <div><span style="background-color: #723122"></span>25,000,000</div>
        <br />
        <div><span style="background-color: #8b4225"></span>10,000,000</div>
        <br />
        <div><span style="background-color: #a25626"></span>7,500,000</div>
        <br />
        <div><span style="background-color: #b86b25"></span>5,000,000</div>
        <br />
        <div><span style="background-color: #ca8323"></span>2,500,000</div>
        <br />
        <div><span style="background-color: #da9c20"></span>1,000,000</div>
        <br />
        <div><span style="background-color: #e6b71e"></span>750,000</div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import chinajson from "../../assets/json/china.json";

export default {
  name: "gradedcolormap",
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
                [5000, "#E31A1C"],
              ],
            },
            "fill-opacity": 0.7 /* 透明度 */,
          },
        });
        const layers = ["不满意", "不太满意", "比较满意", "满意", "非常满意"];
        const colors = ["#FED976", "#FEB24C", "#FD8D3C", "#FC4E2A", "#E31A1C"];

        //添加数据
        // const legend = document.getElementById("legend");
        // layers.forEach((layer, i) => {
        //   const color = colors[i];
        //   const item = document.createElement("div");
        //   const key = document.createElement("span");
        //   key.className = "legend-key";
        //   key.style.backgroundColor = color;

        //   const value = document.createElement("span");
        //   value.innerHTML = `${layer}`;
        //   item.appendChild(key);
        //   item.appendChild(value);
        //   legend.appendChild(item);
        // });
        // change info window on hover
        map.on("mousemove", (event) => {
          const states = map.queryRenderedFeatures(event.point, {
            layers: ["fillID"],
          });
          document.getElementById("pd").innerHTML = states.length
            ? `<p style="color: #cfedff;font-size:14pt;padding: 5%;float: right;    margin-right: 3%;">景点游客满意度</p>
            <p id="toppart" style="color: #cfedff;position: absolute;
    margin-left: 42%;
    margin-top: 24%;"</p>
            ${states[0].properties.name}:
            <p id="bottompart" style="color: #41ff5c;
    margin-top: 25%;
    margin-left: 68%;
    position: absolute;"><strong><em>${states[0].properties.confirmed}</em></strong></p>`
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
.com-gradedcolormap {
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

body {
  margin: 0;
  padding: 0;
}

h2 {
  color: #cfedff;
  margin: 10px;
  font-size: 18px;
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
#toppart {
  color: #cfedff;
}
#bottompart {
  color: #cfedff;
}
#pd {
  p,
  h3 {
    color: #cfedff;
    margin: 10px;
  }
}
#features {
  background: url("../../assets/img/theme/themeBG.png") no-repeat;
  background-size: 100% 100%;
  top: 2%;
  left: 1%;
  height: 14%;
  width: 15%;
}

#legend {
  padding: 10px;
  background: url("../../assets/img/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  line-height: 18px;
  height: 26%;
  margin-bottom: 3.5%;
  margin-right: 3.2%;
  width: 10%;
}
.state-legend {
  background-color: transparent;
  border-radius: 3px;
  bottom: 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  padding: 0px;
  position: absolute;
  right: 0px;
  z-index: 1;
  height: 100%;
  width: 100%;
}
.state-legend h4 {
  margin: 0 0 0px;
  color: #73fdff;
  margin: 8% 0;
  font-size: 14pt;
}

.state-legend div {
    margin-left: 20%;
  float: left;
  // line-height: 40px;
  // margin-left: 15%;
  color: #fff;
}
.state-legend div span {
  color: #fff;
  display: inline-block;
  height: 14px;
  margin-right: 5px;
  // margin-left: 10%;
  width: 30px;
}
</style>
