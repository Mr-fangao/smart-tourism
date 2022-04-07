<template>
  <div class="com-loc">
    <div id="map"></div>
    <div class="mapcontral">
      <div class="dataselect">
        <div class="selecttitle">
          <div class="title-img"></div>
          <div class="title-text">制图数据选择</div>
        </div>
        <el-menu>
          <el-menu-item
            id="button3"
            index="1"
            :class="index === 1 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="1">&ensp;</el-radio>
            <span class="tab" slot="title">景点数</span>
          </el-menu-item>
          <el-menu-item
            id="button4"
            index="2"
            :class="index === 2 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="2">&ensp;</el-radio>
            <span class="tab" slot="title">游记数</span>
          </el-menu-item>
          <el-menu-item
            id="button5"
            index="3"
            :class="index === 3 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="3">&ensp;</el-radio>
            <span class="tab" slot="title">评论数</span>
          </el-menu-item>
          <el-menu-item
            id="button6"
            index="4"
            :class="index === 4 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="4">&ensp;</el-radio>
            <span class="tab" slot="title">好评数</span>
          </el-menu-item>
           <el-menu-item
            id="button7"
            index="4"
            :class="index === 4 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="5">&ensp;</el-radio>
            <span class="tab" slot="title">推荐数据</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="creatmap">
        <!-- <el-button id="button2">开始制图</el-button> -->
      </div>
    </div>
    <div id="state-legend" class="legend">
      <h4>旅游热度</h4>
      <div><span style="background-color: #acbe21"></span>50人次/日</div>
      <div><span style="background-color: #beb221"></span>100人次/日</div>
      <div><span style="background-color: #be8221"></span>150人次/日</div>
      <div><span style="background-color: #ff8c00"></span>200人次/日</div>
      <div><span style="background-color: #be6321"></span>250人次/日</div>
      <div><span style="background-color: #be4521"></span>300人次/日</div>
    </div>
  </div>
</template>
<script>
import eventBum from "../views/traffickingnetwork/public/js/EvebtBus";
import nanjing from "../assets/json/nanjing.json";
import njprovince from "../assets/json/njprovince.json";
export default {
  name: "loc",

  components: {
    eventBum,
  },

  data() {
    return {
      datachange:"5",
      selectcity: {
        name: "中国",
        level: 0,
      },
    };
  },

  mounted() {
    this.initmap();
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      console.log(this.selectcity);
    });
  },

  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [118.886596, 31.492804],
        zoom: 7.5,
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
              ["get", "hot"],
              50,
              "#ACBE21",
              100,
              "#BEB221",
              150,
              "#BE8221",
              200,
              "#FF8C00",
              250,
              "#ff8c00",
              300,
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
.com-loc {
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
  bottom: 51%;
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
.mapcontral {
  position: absolute;
  z-index: 1;
  width: 75.5%;
  height: 4%;
  bottom: 46.8%;
  left: 23.6%;
  background: url("/assets/img/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .dataselect {
    float: left;
    height: 100%;
    width: 92%;
    .selecttitle {
      float: left;
      width: 15%;
      height: 100%;
      .title-img {
        width: 23%;
        float: left;
        height: 100%;
        background: url("../assets/img/panelIcon.png");
        background-size: 100% 100%;
      }
      .title-text {
        width: 76%;
        float: left;
        height: 100%;
        color: #dae2e2;
        font-size: 11pt;
        line-height: 32px;
      }
    }
    background-color: #12526ea9;
    .el-menu {
      float: left;
      width: 85%;
      height: 85%;
      right: 0%;
      background: transparent;
      // background: url("../../assets/img/buttonbg.png") no-repeat;
      // background-size: 100% 100%;
      border: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /deep/.el-radio {
        margin-right: 0;
        .el-radio__label {
          padding-left: 0px;
        }
      }
      .tab {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
      }
    }
    .el-menu-item.is-active {
      // color: #15c5c5;
      // background: transparent;
      // border-bottom: 3px solid #c6e2ff;
    }
    .el-menu-item {
      width: 20%;
      color: #fff;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background: transparent;
    }
    .el-menu-item:hover {
      background: transparent;
    }
    /deep/.el-radio__input.is-checked .el-radio__inner {
      border-color: #94b2bb;
      background: #3fb0d3;
    }
    .span {
      color: aliceblue;
    }
    ul {
      height: 100%;
      list-style-type: none; /*消除黑点*/
      text-align: center;
      li {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        p {
          color: aqua;
          font-size: 12px;
          font-family: Microsoft YaHei;
          // font-weight: bold;
          text-decoration: none; /*消除下划线*/
          border-radius: 5px;
          padding-bottom: 20px;
        }
      }
    }
  }
  .creatmap {
    height: 100%;
    width: 40%;
  }
}
</style>