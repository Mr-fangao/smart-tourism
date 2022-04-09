<template>
  <div id="network">
    <div id="map1" />
    <!-- 数量 -->
    <div id="Number">
      <ul>
        <li>
          <p class="publis xunt">{{ numbersName }}</p>
          <div class="numbers">
            {{ lose
            }}<span
              style="
                font-size: 20px;
                font-family: 'KuHei';
                padding-left: 5px;
                display: inline-block;
                vertical-align: top;
                color: rgb(180, 180, 180);
              "
              >人</span
            >
          </div>
        </li>
      </ul>
    </div>
    <div id="datasource">
      <div class="leftpt">数据源:</div>
      <div class="rightpt">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="去哪儿"></el-checkbox>
          <el-checkbox label="马蜂窝"></el-checkbox>
          <el-checkbox label="携程网"></el-checkbox>
          <el-checkbox label="途牛网"></el-checkbox>
          <el-checkbox label="艺龙网"></el-checkbox>
          <el-checkbox label="美团网"></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 查询类型 -->
    <div class="type">
      <!-- <el-select v-model="value" placeholder="请选择" :popper-append-to-body="false" @change="scaleChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
      <el-select
        v-if="json.where > 0"
        v-model="mode"
        style=""
        placeholder="请选择"
        :popper-append-to-body="false"
        @change="scaleChange"
      >
        <el-option
          v-for="item in modeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div id="right">
      <zoning />
    </div>
    <div id="monitor">
      <div class="left">
        <turnOut />
      </div>
      <div class="mid">
        <turnIn />
      </div>
      <div class="right">
        <heat />
      </div>
    </div>
    <!-- 城市选择器 -->
    <selectRegion />
  </div>
</template>

<script>
import Zoning from "./components/zoning"; // 区划
import TurnOut from "./components/turnOut"; // 拐出
import TurnIn from "./components/turnIn"; // 拐入
import Heat from "./components/heat"; // 拐入
import shiline from "./public/js/shiLine.json";
import shengline from "./public/js/shengLine.json";
import SelectRegion from "./components/selectRegionAH";
import eventBum from "./public/js/EvebtBus";
export default {
  name: "Traffickingnetwork",
  components: {
    SelectRegion,
    Zoning,
    TurnOut,
    TurnIn,
    Heat,
  },
  data() {
    return {
          checkList: ["途牛网", "携程网", "马蜂窝", "去哪儿"],
      json: {
        name: "中国",
        where: 0,
        code: "",
      },
      numbersName: "已爬取评论总数",
      lose: 35854,
      // 尺度选择
      options: [
        {
          value: "省际",
          label: "省际",
        },
        {
          value: "市际",
          label: "市际",
        },
        {
          value: "区县",
          label: "区县",
        },
      ],
      value: "省际",
      mode: "流出",
      modeOptions: [
        {
          value: "流出",
          label: "流出",
        },
        {
          value: "流入",
          label: "流入",
        },
      ],
      // 地图
      map: null,
      // 中国尺度线
      lineData: null,
      MovingData: null,
      countryLineLayer: null,
      MovingLayer: null,
      // 省市尺度线
      textDataSet: null,
      lineDataSet: null,
      pointDataSet: null,
      timeDataSet: null,
    };
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off("json");
    document.getElementById("network").style.display = "none";
  },
  mounted() {
    this.int();
    this.json.name = "安徽省";
    this.json.where = 1;
    this.scaleChange();
    // 城市名称
    eventBum.$on("json", (json) => {
      this.json.name = json.name;
      this.json.where = json.where;
      this.scaleChange();
      // 地图定位
    });
  },
  methods: {
    int() {
      var that = this;
      var webGlobe = new Cesium.WebSceneControl("map1", {
        terrainExaggeration: 1,
      });
      var blueImage = new Cesium.UrlTemplateImageryProvider({
        url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
        tilingScheme: new Cesium.WebMercatorTilingScheme(),
        maximumLevel: 12,
      });
      webGlobe.viewer.imageryLayers.addImageryProvider(blueImage);
      that.map = webGlobe.viewer;
      var center = Cesium.Cartesian3.fromDegrees(114, 30, 8000000.0);
      that.map.scene.camera.setView({
        destination: center,
      });
      that.addLayer(shengline);
      this.echartsRight(shengline, 0);
    },
    // 切换尺度
    scaleChange() {
      var that = this;
      var data = []; // 省市际数据
      var qianxidata = []; // 最终数据
      var middata = [];
      this.destroy();
      if (this.json.name === "中国") {
        this.addLayer(data);
        document.getElementsByClassName("mid")[0].style.width =
          "calc(20% - 2px)";
        document.getElementsByClassName("right")[0].style.width =
          "calc(60% - 2px)";
      } else {
        document.getElementsByClassName("mid")[0].style.width =
          "calc(40% - 2px)";
        document.getElementsByClassName("right")[0].style.width =
          "calc(40% - 2px)";
      }
      if (this.json.where === 1) {
        data = shengline;
        if (that.mode === "流出") {
          const map1 = data.reduce((result, item) => {
            result[item.拐出省] = result[item.拐出省] || [];
            result[item.拐出省].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          const name = [];
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐出省;
            name.push(element);
            if (element === that.json.name) {
              middata = result[index];
              // break
            }
          }
        } else {
          const map1 = data.reduce((result, item) => {
            result[item.拐入省] = result[item.拐入省] || [];
            result[item.拐入省].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐入省;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        }
        for (let i = 0; i < middata.length; i++) {
          const element = middata[i];
          qianxidata.push({
            middata: element,
            from: element.拐出省,
            fromCenter: { lng: element.拐出经度, lat: element.拐出纬度 },
            toCenter: { lng: element.拐入经度, lat: element.拐入纬度 },
            count: element.数量,
            to: element.拐入省,
          });
        }
      } else if (this.json.where === 2) {
        data = shiline;
        if (that.mode === "流出") {
          const map1 = data.reduce((result, item) => {
            result[item.拐出市] = result[item.拐出市] || [];
            result[item.拐出市].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐出市;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        } else {
          const map1 = data.reduce((result, item) => {
            result[item.拐入市] = result[item.拐入市] || [];
            result[item.拐入市].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].拐入市;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        }
        for (let i = 0; i < middata.length; i++) {
          const element = middata[i];
          qianxidata.push({
            middata: element,
            from: element.拐出市,
            fromCenter: { lng: element.拐出经度, lat: element.拐出纬度 },
            toCenter: { lng: element.拐入经度, lat: element.拐入纬度 },
            count: element.数量,
            to: element.拐入市,
          });
        }
      } else if (this.json.where === 3) {
        this.$message({
          message: "暂不支持该尺度！",
          type: "warning",
          showClose: true,
        });
      }
      // console.log(qianxidata)
      if (qianxidata === []) {
        this.$message({
          message: "暂无数据！",
          type: "warning",
          showClose: true,
        });
      } else {
        qianxidata.sort(function (a, b) {
          return a.count - b.count;
        });
        this.addcurveLayer(qianxidata);
        eventBum.$emit("right", [that.mode, qianxidata, this.json.where]);
      }
      var count = 0;
      for (let y = 0; y < qianxidata.length; y++) {
        const element = qianxidata[y];
        count += element.count;
      }
      that.numbersName = this.json.name.substring(0, 4) + that.mode + "游客数";
      that.lose = count;
    },
    // 销毁图层
    destroy(e) {
      if (this.countryLineLayer !== null) {
        this.countryLineLayer.destroy();
        this.countryLineLayer = null;
        this.MovingLayer.destroy();
        this.MovingLayer = null;
      }
    },
    // 添加图层
    addLayer(datas) {
      var that = this;
      var data = [];
      var timeData = [];

      function curive(fromPoint, endPoint, n) {
        var delLng = (endPoint.lng - fromPoint.lng) / n;
        var delLat = (endPoint.lat - fromPoint.lat) / n;

        for (var i = 0; i < n; i++) {
          var pointNLng = fromPoint.lng + delLng * i;
          var pointNLat = fromPoint.lat + delLat * i;
          timeData.push({
            geometry: {
              type: "Point",
              coordinates: [pointNLng, pointNLat],
            },
            count: 1,
            time: i,
          });
        }
      }
      for (let index = 0; index < datas.length; index++) {
        const element = datas[index];
        const cityCenter1 = { lng: element.拐出经度, lat: element.拐出纬度 };
        const cityCenter2 = { lng: element.拐入经度, lat: element.拐入纬度 };
        if (Math.random() > 0.7) {
          curive(cityCenter2, cityCenter1, 50);
        }
        data.push({
          geometry: {
            type: "LineString",
            coordinates: [
              [cityCenter1.lng, cityCenter1.lat],
              [cityCenter2.lng, cityCenter2.lat],
            ],
          },
          count: element.数量,
        });
      }
      if (that.countryLineLayer === null) {
        var lineData = new mapv.DataSet(data);
        var options = {
          methods: {
            click: function (item) {},
          },
          context: "2d",
          gradient: {
            0.1: "#0022c8",
            0.2: "#2b1ca7",
            0.3: "#551785",
            0.4: "#801164",
            0.5: "#aa0b43",
            0.6: "#d50621",
            0.7: "#ff0000",
            0.8: "#ff3900",
            0.9: "#ff7100",
            1.0: "#ffaa00",
          },
          lineWidth: 0.5,
          // max: 5,
          draw: "intensity",
        };
        that.countryLineLayer = new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          lineData,
          options
        );
        var MovingData = new mapv.DataSet(timeData);
        var options1 = {
          context: "2d", // cesium必须设置画布为2d
          fillStyle: "rgba(255, 250, 250, 0.9)",
          size: 0.5,
          animation: {
            type: "time",
            stepsRange: {
              start: 0,
              end: 50,
            },
            trails: 1,
            duration: 5,
          },
          draw: "simple",
        };
        that.MovingLayer = new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          MovingData,
          options1
        );
      }
    },
    // 省市拐卖线路
    addcurveLayer(datas) {
      var that = this;
      var qianxi = new mapv.DataSet(datas);
      var qianxiData = qianxi.get();
      var lineData = [];
      var pointData = [];
      var textData = [];
      var timeData = [];
      var citys = {};
      for (let i = 0; i < qianxiData.length; i++) {
        var fromCenter = qianxiData[i].fromCenter;
        var toCenter = qianxiData[i].toCenter;
        if (!fromCenter || !toCenter) {
          continue;
        }
        citys[qianxiData[i].from] = qianxiData[i].count;
        citys[qianxiData[i].to] = 100;
        pointData.push({
          geometry: {
            type: "Point",
            coordinates: [fromCenter.lng, fromCenter.lat],
          },
        });
        pointData.push({
          geometry: {
            type: "Point",
            coordinates: [toCenter.lng, toCenter.lat],
          },
        });
        textData.push({
          geometry: {
            type: "Point",
            coordinates: [fromCenter.lng, fromCenter.lat],
          },
          text: qianxiData[i].from,
        });
        textData.push({
          geometry: {
            type: "Point",
            coordinates: [toCenter.lng, toCenter.lat],
          },
          text: qianxiData[i].to,
        });

        var curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);
        for (let j = 0; j < curve.length; j++) {
          timeData.push({
            geometry: {
              type: "Point",
              coordinates: curve[j],
            },
            count: 1,
            time: j,
          });
        }
        lineData.push({
          geometry: {
            type: "LineString",
            coordinates: curve,
            // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
          },
          count: 30 * Math.random(),
        });
      }
      if (that.textDataSet === null) {
        that.textDataSet = new mapv.DataSet(textData);
        var textOptions = {
          context: "2d",
          draw: "text",
          font: "14px Arial",
          fillStyle: "white",
          shadowColor: "yellow",
          shadowBlue: 10,
          zIndex: 11,
          shadowBlur: 10,
        };
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.textDataSet,
          textOptions
        );
        that.lineDataSet = new mapv.DataSet(lineData);
        var lineOptions = {
          context: "2d",
          strokeStyle: "rgba(255, 250, 50, 0.8)",
          shadowColor: "rgba(255, 250, 50, 1)",
          shadowBlur: 20,
          lineWidth: 2,
          zIndex: 100,
          draw: "simple",
        };
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.lineDataSet,
          lineOptions
        );
        var pointOptions = {
          context: "2d",
          fillStyle: "rgba(254,175,3,0.7)",
          shadowColor: "rgba(55, 50, 250, 0.5)",
          shadowBlur: 10,
          size: 5,
          zIndex: 10,
          draw: "simple",
        };
        that.pointDataSet = new mapv.DataSet(pointData);
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.pointDataSet,
          pointOptions
        );
        that.timeDataSet = new mapv.DataSet(timeData);
        var timeOptions = {
          context: "2d",
          fillStyle: "rgba(255, 250, 250, 0.5)",
          zIndex: 200,
          size: 2.5,
          animation: {
            type: "time",
            stepsRange: {
              start: 0,
              end: 50,
            },
            trails: 10,
            duration: 2,
          },
          draw: "simple",
        };
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.timeDataSet,
          timeOptions
        );
      } else {
        that.timeDataSet.set(timeData);
        that.textDataSet.set(textData);
        that.lineDataSet.set(lineData);
        that.pointDataSet.set(pointData);
      }
    },
    echartsRight(datas, e) {},
  },
};
</script>
<style  scoped>
#network {
  position: absolute;
  height: 100%;
  width: 100%;
}
/* 地图 */
#network #map1 {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}
#network .type {
  position: absolute;
  z-index: 10;
  top: 55px;
  width: 180px;
  right: 385px;
  font-family: KuHei;
  font-size: 14px;
}

#network .type >>> .el-input__inner {
  text-align: center;
  background-color: rgba(18, 18, 18, 0.4);
  border: 1px solid rgba(175, 233, 215, 0.4);
  padding-left: 30px !important;
  padding-right: 30px !important;
  color: #fff;
  font-family: KuHei;
}
#network .type >>> .popper__arrow::after {
  content: none;
}
#network .type >>> .el-select-dropdown {
  background-color: rgba(18, 18, 18, 0.4);
}
#network .type >>> .el-select-dropdown__item {
  text-align: center;
  color: #fff;
}
#network .type >>> .el-select-dropdown__item.hover,
#network .type >>> .el-select-dropdown__item:hover {
  background-color: rgb(31, 33, 44) !important;
}
#network ul,
#network p {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
#datasource {
  position: absolute;
  left: 45px;
  top: 100px;
  color: rgb(180, 180, 180);
    width: 220px;
  height: 97px;
  text-align: center;
  z-index: 10;
  background: url("../../assets/img/矩形1718.png") no-repeat;
      background-size: 100% 100%;
  display: flex;
  align-items: center;
}
#datasource .leftpt {
  height: 100%;
  width: 30%;
  padding-left: 7px;
  font-size: 12pt;
  color: rgb(174, 193, 199);
  align-items: center;
  display: flex;
}
#datasource .rightpt {
  width: 70%;
  height: 100%;
}
/* 左侧数量 */
#network #Number {
  position: absolute;
  left: 45px;
  top: 5px;
  color: rgb(180, 180, 180);
    width: 220px;
  height: 97px;
  text-align: center;
  z-index: 10;
  background: url("../../assets/img/矩形1718.png") no-repeat;
    background-size: 100% 100%;
}
#network #Number li {
  /* background-color: rgba(18, 18, 18, 0.4); */
  height: 90px;
  margin: 5px 0;
  position: relative;
}
#network #Number li .publis {
  position: absolute;
  width: 100%;
  top: 10px;
  margin: 0;
  padding: 0;
  height: 25px;
  line-height: 25px;
  letter-spacing: 2px;
  font-family: KuHei;
  cursor: pointer;
  transition: all 1s;
  font-size: 15px;
}
#network #Number li .publis:hover {
  color: rgb(230, 230, 230);
}
#network #Number li .Tspan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
}
#network #Number li .numbers {
  position: absolute;
  top: 35px;
  height: 55px;
  line-height: 55px;
  width: 100%;
  font-family: DIGIT;
  font-size: 28px;
  color: #fff;
}
/* 右侧 */
#network #right {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  padding: 5px;
  background-color: rgba(40, 43, 57, 0.1);
  border: 2px solid rgba(25, 186, 139, 0.2);
  width: 300px;
  height: 90%;
  color: #fff;
  font-family: KuHei;
  font-size: 14px;
  border-radius: 2px;
  background: url("./public/img/bg.png") rgba(18, 18, 18, 0.4);
}
#network #right ::after,
#network #monitor .left ::after,
#network #monitor .mid ::after,
#network #monitor .right ::after {
  position: absolute;
  content: "";
  bottom: -2px;
  right: -2px;
  height: 10px;
  width: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  transition: all 1.5s;
  z-index: 0;
}

#network #right ::before,
#network #monitor .left ::before,
#network #monitor .mid ::before,
#network #monitor .right ::before {
  position: absolute;
  content: "";
  top: -2px;
  left: -2px;
  height: 10px;
  width: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  transition: all 1.5s;
  z-index: 0;
}
/* 下方 */
/* 监测 */
#network #monitor {
  position: absolute;
  width: calc((100% - 20%) - 5px);
  left: 5px;
  bottom: 58px;
  height: 30%;
  font-family: KuHei;
  /* border: 1px solid rgba(25, 186, 139, 0.2); */
  /* background: url("./public/img/bg.png") rgba(255, 255, 255, 0.1); */
  /* background: url("./public/img/bg.png") rgba(18, 18, 18, 0.4); */
}
#network #monitor .left {
  position: absolute;
  width: calc(20% - 2px);
  left: 0px;
  bottom: 0px;
  height: 100%;
  font-family: KuHei;
  border: 1px solid rgba(25, 186, 139, 0.2);
  /* background: url("./public/img/bg.png") rgba(255, 255, 255, 0.1); */
  background: url("./public/img/bg.png") rgba(18, 18, 18, 0.4);
}
#network #monitor .mid {
  position: absolute;
  width: calc(20% - 2px);
  left: calc(20% + 1px);
  bottom: 0px;
  height: 100%;
  font-family: KuHei;
  border: 1px solid rgba(25, 186, 139, 0.2);
  /* background: url("./public/img/bg.png") rgba(255, 255, 255, 0.1); */
  background: url("./public/img/bg.png") rgba(18, 18, 18, 0.4);
}
#network #monitor .right {
  position: absolute;
  width: calc(60% - 2px);
  right: 0;
  bottom: 0px;
  height: 100%;
  font-family: KuHei;
  border: 1px solid rgba(25, 186, 139, 0.2);
  /* background: url("./public/img/bg.png") rgba(255, 255, 255, 0.1); */
  background: url("./public/img/bg.png") rgba(18, 18, 18, 0.4);
}
.el-checkbox-group {
  width: 100%;
      flex-direction: row;
    flex-wrap: wrap;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #85caca;
}
.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #85caca;
}
.el-checkbox {
  color: rgb(174, 193, 199);
  color: #aec1c7;
    margin-right: 2%;
    margin-bottom: 5%;
    margin-top: 5%;
    margin-left: 0%;
}
</style>
