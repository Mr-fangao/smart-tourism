<template>
  <div id="com-features">
    <selectRegion />
    <div id="map" />
    <div class="features-left">
      <div class="row1 left-part">
        <div class="features-title">
          <span>景点特征查询</span>
        </div>
        <div class="content">
          <div class="search">
            <div class="searchinput">
              <el-input
                v-model="selectinput"
                placeholder=" 输入内容或点击标签"
              ></el-input>
            </div>
            <div class="buttoncontent">
              <pbutton :name="name"></pbutton>
            </div>
          </div>
          <div class="chosenlabel"></div>
        </div>
      </div>
      <div class="row2 left-part"></div>
      <div class="row2 left-part"></div>
    </div>
  </div>
</template>
<script>
import pbutton from "../button.vue";
import SelectRegion from "../cityselect/newselectRegion.vue";
import nanjing from "../../assets/json/nanjingpoint.json";
import njprovince from "../../assets/json/njprovince.json";
import echarts from "echarts";
import request from "../../utils/request";

export default {
  name: "city",
  components: {
    SelectRegion,
    pbutton,
  },

  data() {
    return {
      name:"查询",
      selectinput: "",
      placeholder: "",
      selectcity: {
        name: "中国",
        level: 0,
      },
    };
  },

  computed: {},

  mounted() {
    // console.log(this.$route.path);
    this.initmap();
  },

  methods: {
    handleResize() {
      this.myChart2 && this.myChart2.resize();
    },
    initmap(val) {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
      });
      map.on("load", () => {
        if (val == "北京") {
          map.flyTo({
            center: [118.77949013671878, 32.04501247139361],
            // center: [116.40811432812498, 39.90388639121686],
            zoom: 10.5, // 缩放比例
            pitch: 45, // 倾斜度
          });
        }
        // else if (val == "北京") {
        //   map.flyTo({
        //     center: [116.40811432812498, 39.90388639121686], // 中心点
        //     zoom: 10.5, // 缩放比例
        //     pitch: 45, // 倾斜度
        //   });
        // }
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
  watch: {},
};
</script>

<style scoped lang="less">
#com-features {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.features-left {
  position: absolute;
  height: 92%;
  width: 22.5%;
  margin-left: 0.4%;
  margin-top: 0.4%;
  background: url("../../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .left-part {
    height: 33.3%;
    width: 100%;
    .content {
      height: 88%;
      width: 100%;
    }
  }
  .row1 {
    .content {
      .search {
        height: 30%;
        display: flex;
        align-items: center;
        .searchinput {
          width: 70%;
          height: 55%;
          .el-input {
            height: 100%;
          }
          /deep/.el-input__inner {
            -webkit-appearance: none;
            background: transparent;
            border-radius: 4px;
            border: 2px solid #1abbf1a6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: rgba(220, 225, 227, 0.96);
            font-size: inherit;

            height: 100%;
            line-height: 36px;
            width: 90%;
          }
        }
        .buttoncontent {
          width: 30%;
          height: 60%;
        }
      }
    }
  }
}
.features-title {
  padding-top: 1%;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url("../../assets/img/titlebg.png") no-repeat;
  background-position: 4% 88%;
  background-size: 50% 82%;
  > span {
    color: #a7e3eb;
    font-size: 14px;
    margin-left: 13%;
  }
}
</style>