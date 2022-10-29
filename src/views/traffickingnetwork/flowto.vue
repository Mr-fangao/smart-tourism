<template>
  <div id="network">
    <div id="map1" />
    <div class="network-right network-pt">
      <div class="right-title">
        <span>分析条件</span>
      </div>
      <div class="right-content">
        <div class="smalltitle">
          <div class="textcontent">数据源选择</div>
        </div>
        <div class="datasource">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="去哪儿"></el-checkbox>
            <el-checkbox label="马蜂窝"></el-checkbox>
            <el-checkbox label="携程网"></el-checkbox>
            <el-checkbox label="途牛网"></el-checkbox>
            <el-checkbox label="艺龙网"></el-checkbox>
            <el-checkbox label="美团网"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="smalltitle">
          <div class="textcontent">分析路径</div>
        </div>
        <div class="pathselect">
          <div class="selectcontent">
            <el-select
              v-if="json.where > 0"
              v-model="mode"
              style=""
              placeholder="流出"
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
        </div>
      </div>
      <div class="right-title">
        <span>{{ wherename }}游客{{ mode }}统计</span>
        <div class="chartselect">
          <el-radio-group
            v-model="isCollapse"
            @change="changeChartTab"
            style="margin-bottom: 20px"
          >
            <el-radio-button :label="false">热度榜</el-radio-button>
            <el-radio-button :label="true">评价榜</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="chart-content" id="chart1"></div>
    </div>
    <div class="network-bottom network-pt">
      <div class="network-bottom-content">
        <div class="right-title">
          <span>{{ wherename }}{{ mode }}游客景点选择排行</span>
        </div>
        <div class="chart" id="chart2"></div>
      </div>
      <div class="network-bottom-content">
        <div class="right-title">
          <span>{{ wherename }}{{ mode }}游客日变化</span>
        </div>
        <div class="chart" id="chart3"></div>
      </div>
    </div>

    <selectRegion :right="320" />
  </div>
</template>

<script>
import request from "../../utils/request";
import shiline from "./public/js/shiLine.json";
import shengline from "./public/js/shengLine.json";
import SelectRegion from "../cityselect/newselectRegion.vue";
import eventBum from "../cityselect/EvebtBus";
export default {
  name: "Traffickingnetwork",
  components: {
    SelectRegion,
  },
  data() {
    return {
      //图表数据
      isCollapse: false,
      data1x: [],
      data1y: [],
      checkList: ["途牛网", "携程网", "马蜂窝", "去哪儿"],
      wherename: "安徽",
      json: {
        name: "安徽",
        where: 1,
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
      zommflag: false,
      map: null,
      // 中国尺度线
      lineData: null,
      MovingData: null,
      countryLineLayer: null,
      MovingLayer: null,
      // 省市尺度线
      numberDataSet: null,
      textDataSet: null,
      lineDataSet: null,
      pointDataSet: null,
      timeDataSet: null,
    };
  },
  beforeDestroy() {
    // 关闭传值
    eventBum.$off("json");
  },
  mounted() {
    this.int();
    this.json.name = "安徽省";
    this.json.where = 1;
    this.scaleChange();
    // 城市名称
    eventBum.$on("json", (json) => {
      this.wherename = json.name;
      this.json.name = json.name;
      this.json.where = json.where;
      this.scaleChange();
      // 地图定位
    });
  },
  methods: {
    postScenicChange(mode) {
      var name = this.json.name;
      name = name.replace("省", "");
      name = name.replace("市", "");
      let that = this;
      request
        .post("/api/data/opScenic", {
          model: name,
          type: (this.json.where == "1" ? 0 : 1).toString(),
          path: (mode == "流出" ? 0 : 1).toString(),
        })
        .then((res) => {
          this.renderChart2(res.data);
        });
    },
    postDayChange(mode) {
      var name = this.json.name;
      name = name.replace("省", "");
      name = name.replace("市", "");
      let that = this;
      request
        .post("/api/data/opDay", {
          model: name,
          type: (this.json.where == "1" ? 0 : 1).toString(),
          path: (mode == "流出" ? 0 : 1).toString(),
        })
        .then((res) => {
          this.renderChart3(res.data.count);
        });
    },
    postPathData(mode) {
      var name = this.json.name;
      name = name.replace("省", "");
      name = name.replace("市", "");
      let that = this;
      request
        .post("/api/data/outPut", {
          model: name,
          type: (this.json.where == "1" ? 0 : 1).toString(),
          path: (mode == "流出" ? 0 : 1).toString(),
        })
        .then((res) => {
          var i = 20;
          this.data1x.length = 0;
          this.data1y.length = 0;
          for (i; i >= 0; i--) {
            this.data1x.push(res.data[i].destination);
            this.data1y.push(res.data[i].count);
          }
          this.renderChart1();
        });
    },
    postPathDataScore(mode) {
      var name = this.json.name;
      name = name.replace("省", "");
      name = name.replace("市", "");
      let that = this;
      request
        .post("/api/data/opScore", {
          model: name,
          type: (this.json.where == "1" ? 0 : 1).toString(),
          path: (mode == "流出" ? 0 : 1).toString(),
        })
        .then((res) => {
          var i = 20;
          this.data1x.length = 0;
          this.data1y.length = 0;
          for (i; i >= 0; i--) {
            this.data1x.push(res.data[i].destination);
            if (res.data[i].score != 5) {
              res.data[i].score = res.data[i].score.toFixed(2);
            }
            this.data1y.push(res.data[i].score);
          }
          this.renderChart1();
        });
    },
    renderChart1() {
      let myChart = this.$echarts.init(document.getElementById("chart1"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          x: 45,
          y: 15,
          x2: 25,
          y2: 20,
          // containLabel: true,
        },
        xAxis: {
          type: "value",
          min: "dataMin",
          splitNumber: 4,
          splitLine: {
            show: false,
          },
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              // color: " #999999",
              color: "#fff",
            },
          },
          boundaryGap: [0, 0],
        },
        yAxis: {
          type: "category",

          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              // color: " #999999",
              color: "#fff",
            },
          },
          data: this.data1x,
        },
        series: [
          {
            barWidth: 13,
            type: "bar",
            data: this.data1y,
            showBackground: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: "#30A0A9" },
                { offset: 0.5, color: "#43DEEB" },
                { offset: 1, color: "#43DEEB" },
              ]),
            },
            label: {
              show: true,
              position: "right",
              color: "white",
            },
          },
        ],
      });
    },
    renderChart2(data) {
      let myChart = this.$echarts.init(document.getElementById("chart2"));
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        grid: {
          left: "2%", //图表距边框的距离
          right: "2%",
          bottom: "10%",
          top: "8%",
          containLabel: true,
        },
        dataZoom: [
          {
            type: "slider",
            show: true,
            startValue: 0,
            endValue: 17,
            height: "15",
            bottom: "1%",
            zoomLock: true,
          },
        ],
        xAxis: {
          axisLabel: {
            formatter: function (data) {
              let valueTxt = "";
              if (data.length > 4) {
                valueTxt = data.substring(0, 5) + "..";
              } else {
                valueTxt = data;
              }
              return valueTxt;
            },
            textStyle: {
              fontSize: "12",
              fontFamily: "PingFangSC-Regular",
              color: "#E1E5E9", // 坐标值的具体的颜色
            },
            // 设置字体的倾斜角度
            interval: 0,
            rotate: 30,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
          data: data.scenic,
        },
        yAxis: {
          splitLine: { show: false },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        }, //显示为整数 最小间距1
        series: [
          {
            type: "bar",
            name: "数量",
            data: data.count,
            barWidth: 15,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#527395" },
                { offset: 0.5, color: "#77bef7" },
                { offset: 1, color: "#77bef7" },
              ]),
            },
            label: {
              show: true,
              position: "top",
              color: "white",
            },
          },
        ],
      });
    },
    renderChart3(data) {
      let base = 1577846440000;
      let oneDay = 24 * 3600 * 1000;
      let date = [];
      for (let i = 1; i < 1200; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
      }
      let myChart = this.$echarts.init(document.getElementById("chart3"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: date,
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        grid: {
          left: "2%", //图表距边框的距离
          right: "2%",
          bottom: "10%",
          top: "8%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
            height: "15",
            bottom: "1%",
          },
          {
            start: 0,
            end: 10,
            height: "15",
            bottom: "1%",
          },
        ],
        series: [
          {
            data: data,
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "#F2597F",
            },
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(213,72,120,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(213,72,120,0.3)",
                },
              ]),
            },
          },
        ],
      });
    },
    changeChartTab(val) {
      if (!val) {
        this.postPathData(this.mode);
      } else {
        this.postPathDataScore(this.mode);
      }
    },
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
    

    //解决迁徙线不刷新的问题，在这里使用手动变更缩放比例，强制线渲染
    changeZoom() {
      var that = this;
      // 获取当前镜头位置的笛卡尔坐标
      let cameraPos = that.map.scene.camera.position;

      // 获取当前坐标系标准
      let ellipsoid = that.map.scene.globe.ellipsoid;

      // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
      let cartographic = ellipsoid.cartesianToCartographic(cameraPos);

      // 获取镜头的高度
      let height = cartographic.height;

      let centerLon = parseFloat(
        Cesium.Math.toDegrees(cartographic.longitude).toFixed(8)
      );
      let centerLat = parseFloat(
        Cesium.Math.toDegrees(cartographic.latitude).toFixed(8)
      );
      if (this.zommflag) {
        that.map.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            centerLon,
            centerLat,
            height / 1.1
          ),
          duration: 1.0,
        });
      } else if (this.zommflag <= 0.5) {
        // 镜头拉远
        that.map.scene.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            centerLon,
            centerLat,
            height * 1.1
          ),
          duration: 1.0,
        });
      }
      this.zommflag = true;
    },
    // 切换尺度
    scaleChange() {
      var that = this;
      var data = []; // 省市际数据
      var qianxidata = []; // 最终数据
      var middata = [];
      this.destroy();
      this.postPathData(that.mode);
      this.postDayChange(that.mode);
      this.postScenicChange(that.mode);
      if (this.json.name === "中国") {
        this.addLayer(data);
      }
      if (this.json.where === 1) {
        data = shengline;
        if (that.mode === "流出") {
          const map1 = data.reduce((result, item) => {
            result[item.流出省] = result[item.流出省] || [];
            result[item.流出省].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          const name = [];
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].流出省;
            name.push(element);
            if (element === that.json.name) {
              middata = result[index];
              // break
            }
          }
        } else {
          const map1 = data.reduce((result, item) => {
            result[item.流入省] = result[item.流入省] || [];
            result[item.流入省].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].流入省;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        }
        for (let i = 0; i < middata.length; i++) {
          const element = middata[i];
          console.log(element);
          qianxidata.push({
            middata: element,
            from: element.流出省,
            fromCenter: { lng: element.流出经度, lat: element.流出纬度 },
            toCenter: { lng: element.流入经度, lat: element.流入纬度 },
            count: element.数量,
            to: element.流入省,
            number: element.数量,
          });
        }
      } else if (this.json.where === 2) {
        data = shiline;
        if (that.mode === "流出") {
          const map1 = data.reduce((result, item) => {
            result[item.流出市] = result[item.流出市] || [];
            result[item.流出市].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].流出市;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        } else {
          const map1 = data.reduce((result, item) => {
            result[item.流入市] = result[item.流入市] || [];
            result[item.流入市].push(item);
            return result;
          }, {});
          const result = Object.values(map1);
          for (let index = 0; index < result.length; index++) {
            const element = result[index][0].流入市;
            if (element === that.json.name) {
              middata = result[index];
              break;
            }
          }
        }
        for (let i = 0; i < middata.length; i++) {
          const element = middata[i];
          console.log(element);
          qianxidata.push({
            middata: element,
            from: element.流出市,
            fromCenter: { lng: element.流出经度, lat: element.流出纬度 },
            toCenter: { lng: element.流入经度, lat: element.流入纬度 },
            count: element.数量,
            to: element.流入市,
            number: element.数量,
          });
        }
      } else if (this.json.where === 3) {
        this.$message({
          message: "暂不支持该尺度！",
          type: "warning",
          showClose: true,
        });
      }
      if (qianxidata === []) {
        this.$message({
          message: "暂无数据！",
          type: "warning",
          showClose: true,
        });
      } else {
        console.log("qianxidata"+qianxidata);
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
      that.changeZoom();
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
        const cityCenter1 = { lng: element.流出经度, lat: element.流出纬度 };
        const cityCenter2 = { lng: element.流入经度, lat: element.流入纬度 };
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
    // 省市流动线路
    addcurveLayer(datas) {

      var that = this;
      var qianxi = new mapv.DataSet(datas);
      var qianxiData = qianxi.get();
      console.log(qianxiData);
      var lineData = [];
      var pointData = [];
      var textData = [];
      var timeData = [];
      var numberData = [];
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
        numberData.push({
          geometry: {
            type: "Point",
            coordinates: [fromCenter.lng, fromCenter.lat],
          },
          text: qianxiData[i].number,
        });
        numberData.push({
          geometry: {
            type: "Point",
            coordinates: [toCenter.lng, toCenter.lat],
          },
          text: qianxiData[i].number,
        });

        var curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);
        for (let j = 0; j < curve.length; j++) {
          timeData.push({
            geometry: {
              type: "Point",
              coordinates: curve[j],
            },
            count: j,
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
        that.timeDataSet = new mapv.DataSet(timeData);
        var timeOptions = {
          context: "2d",
          zIndex: 200,
          size: 2.5,
          animation: {
            type: "time",
            stepsRange: {
              start: 0,
              end: 50,
            },
            trails: 10,
            duration: 5,
          },
          draw: "heatmap",
          size: 20, // 每个热力点半径大小
          gradient: {
            // 热力图渐变色
            0.25: "rgb(0,0,255)",
            0.55: "rgb(0,255,0)",
            0.85: "yellow",
            1.0: "rgb(255,0,0)",
          },
          max: 150, // 最大权重值
        };
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.timeDataSet,
          timeOptions
        );
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
        that.numberDataSet = new mapv.DataSet(numberData);
        var numberOptions = {
          context: "2d",
          draw: "text",
          font: "16px Arial",
          fillStyle: "white",
          shadowColor: "yellow",
          shadowBlue: 10,
          zIndex: 11,
          shadowBlur: 10,
                    offset: { // 文本便宜值
        x: 0,
        y: -15    }
        };
        new CesiumZondy.Overlayer.MapvLayer(
          that.map,
          that.numberDataSet,
          numberOptions
        );
        that.lineDataSet = new mapv.DataSet(lineData);
        var lineOptions = {
          context: "2d",
          strokeStyle: "rgba(255, 250, 50, 0.8)",
          shadowColor: "rgba(255, 250, 50, 1)",
          shadowBlur: 20,
          lineWidth: 2,
          zIndex: 150,
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
        this.$forceUpdate();
      } else {
        that.timeDataSet.set(timeData);
        that.textDataSet.set(textData);
        that.lineDataSet.set(lineData);
        that.pointDataSet.set(pointData);
                that.numberDataSet.set(numberData);
      }
    },
    echartsRight(datas, e) {},
  },
};
</script>
<style  scoped>
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
<style lang="less" scoped>
#network {
  position: fixed;
  width: 100%;
  height: 100%;
}
#map1{
  height: 100%;
  width: 100%;
}
.network-pt {
  padding: 5px;
}
.network-right {
  position: absolute;
  z-index: 9999999;
  right: 0.4%;
  top: 0.6%;
  width: calc(20vw);
  height: 98.5%;
  background: url("../../assets/img/side.png")no-repeat;
  background-size: 100% 100%;
  .right-title {
    height: 4%;
    width: 100%;
    background: url("../../assets/img/titlebg.png") no-repeat;
    background-size: 60% 100%;
    > span {
      color: #e2ebeb;
      display: block;
      padding-left: 14%;
      font-size: 15px;
      line-height: 28px;
      text-align: left;
      text-shadow: 0 0 8px #fff, 0 0 10px #fff,
        0 0 12px rgba(48, 218, 218, 0.397);
    }
  }
  .right-content {
    height: 33%;
    width: 100%;
    padding-top: 1%;
    .smalltitle {
      padding: 4px;
      height: 24px;
      width: 100%;
      margin: 2% 0% 2% 0%;
      display: flex;
      .textcontent {
        border-left: 4px solid #1af3f3;
        padding-left: 2%;
        height: 100%;
        width: 90%;
        text-align: left;
        color: #35d8e4;
        font-size: 14px;
        line-height: 18px;
      }
    }
    .datasource {
      height: 35%;
      width: 100%;
      display: flex;
      align-items: center;
      background: url("../../assets/img/buttonbg.png") center no-repeat;
      background-size: 97% 97%;
      .el-checkbox-group {
        width: 100%;
        .el-checkbox {
          color: rgb(174, 193, 199);
          color: #aec1c7;
          margin-left: 4%;
          margin-right: 4%;
          margin-top: 1%;
          margin-bottom: 1%;
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #85caca;
        }
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #85caca;
        }
        /deep/.el-checkbox__label {
          padding-left: 7px;
        }
      }
    }
    .pathselect {
      height: 30%;
      width: 100%;
      .selectcontent {
        height: 100%;
        width: 100%;

        display: flex;
        align-items: center;
        .el-select {
          margin: auto;
        }
      }
      /deep/.el-input__inner {
        text-align: center;
        background-color: rgba(18, 18, 18, 0.4);
        border: 1px solid rgba(175, 233, 215, 0.4);
        padding-left: 30px !important;
        padding-right: 30px !important;
        color: #fff;
        font-family: KuHei;
      }
      /deep/.popper__arrow::after {
        content: none;
      }
      /deep/.el-popper {
        border: 1px solid #41d6e263 !important;
      }
      /deep/.el-select-dropdown {
        background-color: rgba(18, 18, 18, 0.4);
      }
      /deep/.el-select-dropdown__item {
        text-align: center;
        color: #fff;
      }
      /deep/.el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background-color: rgb(31, 33, 44) !important;
      }
    }
  }
  .chart-content {
    width: 100%;
    height: 60%;
  }
}
.chartselect {
  width: 100px;
  height: 28px;
  top: 37.5%;
  right: 4%;
  background-color: transparent;
  position: absolute;
  display: flex;
  /deep/.el-radio-button__inner {
    padding: 6px 5px;
    font-size: 13px;
    border: none;
    background-color: transparent;
  }
  /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    border: none;
    background: url("../../assets/img/tabchosenBG.png") no-repeat center center;
  }
  /deep/.el-radio-button__inner {
    color: white;
    border: none;
    background: url("../../assets/img/tabBG.png") no-repeat center center;
  }
  /deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
    -webkit-box-shadow: 0px 0 0 0 #409eff;
    box-shadow: 0px 0 0 0 #409eff;
  }
}
.network-bottom {
  position: absolute;
  z-index: 999;
  left: 0.4%;
  bottom: 1%;
  width: calc(79vw);
  height: calc(35vh);
  background: url("../../assets/img/长方形.png");
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  .network-bottom-content {
    height: 100%;
    width: 50%;
    .right-title {
      height: 11%;
      width: 60%;
      background: url("../../assets/img/titlebg.png") no-repeat;
      background-size: 60% 100%;
      > span {
        color: #e2ebeb;
        display: block;
        padding-left: 14%;
        font-size: 15px;
        line-height: 26px;
        text-align: left;
        text-shadow: 0 0 8px #fff, 0 0 10px #fff,
          0 0 12px rgba(48, 218, 218, 0.397);
      }
    }
    .chart {
      height: 89%;
      width: 100%;
    }
  }
}
</style>