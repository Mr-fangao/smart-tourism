<template>
  <div>
    <div>
      <div class="panel-container">
        <div class="panel-side esri-widget">
          <h3>COVID</h3>
          <ul id="nyc_graphics">
            <li>Loading&hellip;</li>
          </ul>
        </div>
      </div>

      <div id="ToolContainer" v-if="$route.meta.title = 'Skanalysis'">
        <transition name="el-fade-in">
          <div class="TOOLC">
            <div class="Item">
                <el-tooltip class="item" content="标准差椭圆分析" effect="dark" placement="right" :offset="35">
                <div class="Button1" @click="toCircle">
                  <i class="el-icon-discover" id="ICON1"></i>
                  <i class="Title">椭圆</i>
                </div>
              </el-tooltip>
              <el-tooltip class="item" content="城市冷热点分析" effect="dark" placement="right" :offset="35">
                <div class="Button2" @click="toHot">
                  <i class="el-icon-position" id="ICON2"></i>
                  <i class="Title">冷热</i>
                </div>
              </el-tooltip>

              <el-tooltip class="item" content="聚类与异常值分析" effect="dark" placement="right" :offset="35">
                <div class="Button3" @click="toBin">
                  <i class="el-icon-user" id="ICON3"></i>
                  <i class="Title">异常</i>
                </div>
              </el-tooltip>

              
            </div>

          </div>
        </transition>
      </div>

      <div id="sceneDiv"></div>

      <div id="toolBG"></div>

      <div id="mapTool1">
        <div id="IDW">标准差椭圆分析</div>
        <div class="DayPicContainer">
          <div class="DayPicTitle">数据日期</div>
          <el-date-picker class="DayPic" v-model="DateValue" type="date" placeholder="选择日期"></el-date-picker>
        </div>

        <div class="IDWtoolContainer">
          <div class="GVa" id="GetMapValue1" @click="GetValue1">请求数据</div>
          <div id="AnaMapValue2" @click="AnaValue2">开始分析</div>
        </div>


        <div id="chartShow">
          <h1 class="IDWChartTitle"><span style="font-size: 40px;margin-right: 7px;position: relative;bottom: 1px">{{CityName}}</span>&nbsp;<span>旅游情况</span></h1>
          <div id="IDWChart" v-show="ChartShow"></div>
          <div id="ChinaData" v-show="ChinaDShow">
            <div style="color:rgba(247, 76, 49, .8);">流动数量：<span style="color:rgba(247, 76, 49, .8);font-family: Orbitron">{{Q}}</span></div>
            <div style="color:rgba(233, 199, 60, .8);">火热景点数量：<span style="color:rgba(233, 199, 60, .8);font-family: Orbitron">{{X}}</span></div>
            <div style="color:rgba(40, 183, 163, .8);">跨省流动数量：<span style="color:rgba(40, 183, 163, .8);font-family: Orbitron">{{Z}}</span></div>
            <div style="color:rgba(119,140,179,0.8);">省内流动数量：<span style="color:rgba(119,140,179,0.8);font-family: Orbitron">{{S}}</span></div>
          </div>
        </div>
      </div>

      <div id="mapTool2">
        <div id="Hot">城市冷热点分析</div>
        <div id="AnaMapValue3" @click="AnaValue3">开始分析</div>
      </div>

      <div id="mapTool3">
        <div id="Bin">聚类与异常值分析</div>
        <div id="AnaMapValue4" @click="AnaValue4">开始分析</div>
      </div>


      <div id="mapTool4"></div>


    </div>
  </div>


</template>

<script>
import {loadModules} from "esri-loader";
import axios from "axios";
import HosNews from "./HosNews";
import ChCity from "./ChCity.vue";

export default {
  name: "density",
  components:{
    ChCity
  },
  data() {
    return {
      DateValue: new Date(),
      CityName: '中国',
      ChartShow: false,
      ChinaDShow: true,
      Confirmed: 1175,
      Removed: 0,
      MayBe: 1135,
      Dead: 40,
      BaseData: null,
      IDW: null,
      Hot: null,
      Cluster: null,
      Center: null,
      Circle: null,
      date: '',
      Q: '92648',
      X: '578',
      Z: '87321',
      S: '4749',
      ObjA: []
    };
  },
  mounted: function () {
    this.getData();
    // let a1 = ($('.timeH').html().split(" ")[0] || '').split("-")
    // let a2 = ($('.timeH').html().split(" ")[1] || '').split("-")
    // let a3 = ($('.timeH').html().split(" ")[2] || '').split("-")
    // this.date = a1+'年'+a2+'月'+a3+'日'
    
if ($(".timeH").html()) {
      this.date =
        $(".timeH").html().split("-")[0] +
        "年" +
        $(".timeH").html().split("-")[1] +
        "月" +
        $(".timeH").html().split("-")[2].split(" ")[0] +
        "日";
    }
    const _self = this; //定义一个_self防止后续操作中this丢失
    const option = {
      //定义一个包含有JS API中js开发包和css样式文件的对象
      url: "http://js.arcgis.com/4.18/dojo/dojo.js",
      css: "https://js.arcgis.com/4.18/esri/themes/dark-blue/main.css"
    };
    //通过loadModules来做衔接
    loadModules(
      [
        "esri/Map",
        "esri/Basemap",
        "esri/layers/TileLayer",
        "esri/views/MapView",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/layers/MapImageLayer",
        "esri/widgets/Legend",
        "esri/views/layers/FeatureLayerView",
        "dojo/domReady"
      ],
      option
    ).then(([Map, Basemap, TileLayer, MapView, SceneView, FeatureLayer, MapImageLayer, Legend, FeatureLayerView]) => {

      const layer = new TileLayer({
        url:
          "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
      });
      const customBasemap = new Basemap({
        baseLayers: [layer],
        title: "Custom Basemap",
        id: "myBasemap"
      });

      var template = {
        title: 'COVID-19城市疫情情况',
        content: "<p>截至" + _self.date + ", <b>{NAME99}</b> 新型冠状病毒疫情情况</p>" +
          "<ul><li>确诊人数：{确诊人数} 人</li>" +
          "<li>治愈人数：{治愈人数} 人</li>" +
          "<li>死亡人数：{死亡人数} 人</li></ul>"
      }

      var templateHot = {
        title: 'COVID-19城市冷热点分析',
        content: "<p>截至" + _self.date + ", <b>{城市}</b> 冷热点分析得分为 {GiZScore}</p>" +
          "<ul><li>热点显著性：{GiPValue} </li>" +
          "<li>GizScore得分：{GiZScore} </li>"+
          "<li>Gi_Bin等级：{Gi_Bin} </li></ul>"
      }

      var templateCluster = {
        title: 'COVID-19城市冷热点分析',
        content: "<p>截至" + _self.date + ", <b>{city}</b> 表现为<b>{detail}</b> </p>" +
          "<ul><li>LMiIndex：{LMiIndex} </li>" +
          "<li>LMiZScore：{LMiZScore} </li>" +
          "<li>LMiPValue：{LMiPValue} </li>" +
          "<li>CoType：{COType} </li>" +
          "<li>NNeighbors：{NNeighbors} </li></ul>"
      }


      const AreaLine = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/G/MapServer/3"
      });
      const CountryLine = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/G/MapServer/8"
      });

      _self.BaseData = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/SuddenDiease/MapServer/0",
        outFields: ["NAME99", "确诊人数", "疑似人数", "治愈人数", "死亡人数"],
        popupTemplate: template
      });
      _self.IDW = new MapImageLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/IDW/MapServer?f=jsapi"
      })

      _self.Center = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/SPaF/MapServer/0"
      })
      _self.Circle = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/SPaF/MapServer/3"
      })
      _self.Hot = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/SPaF/MapServer/1",
        outFields: ["城市", "GiPValue", "GiZScore", "Gi_Bin"],
        popupTemplate: templateHot
      })
      _self.Cluster = new FeatureLayer({
        url: "http://114.98.239.36:6080/arcgis/rest/services/COVID/SPaF/MapServer/2",
        outFields: ["city", "LMiIndex", "LMiZScore", "LMiPValue", "LMiPValue", "COType", "NNeighbors"],
        popupTemplate: templateCluster
      })
      //地图实例化
      const map = new Map({
        basemap: customBasemap,
        layers: [
          _self.BaseData,
          _self.IDW,
          _self.Center,
          _self.Circle,
          _self.Hot,
          _self.Cluster
        ]
      });
      map.layers.items[0].visible = false;
      map.layers.items[1].visible = false;
      map.layers.items[2].visible = false;
      map.layers.items[3].visible = false;
      map.layers.items[4].visible = false;
      map.layers.items[5].visible = false;
      var view = new MapView({
        center: [85, 41],
        container: 'sceneDiv',
        map: map,
        zoom: 3
      });
      view.when(disableZooming);

      function disableZooming(view) {
        view.ui.components = ["attribution"];
        return view;
      }



      //数据请求
      $("#GetMapValue1").click(function () {
        //图例实例化
        const DataLegend = new Legend({
          view: view,
          layerInfos: [
            {
              layer: _self.BaseData,
              title: "旅游人员数量",
              style: "classic"
            },{
              layer: _self.Center,
              title: "旅游参考中心",
              style: "classic"
            },{
              layer: _self.Circle,
              title: "旅游情况扩散",
              style: "classic"
            }, {
              layer: _self.Hot,
              title: "城市冷热点分析",
              style: "classic"
            }, {
              layer: _self.Cluster,
              title: "聚类与异常值分析",
              style: "classic"
            }
          ]
        });
        view.ui.add(DataLegend, "bottom-right");
        map.layers.items[0].visible = true;
        map.layers.items[1].visible = false;
        map.layers.items[2].visible = false;
        map.layers.items[3].visible = false;
        map.layers.items[4].visible = false;
        map.layers.items[5].visible = false;

      })
      $("#AnaMapValue1").click(function () {
        map.layers.items[0].visible = false;
        map.layers.items[1].visible = true;
        map.layers.items[2].visible = false;
        map.layers.items[3].visible = false;
        map.layers.items[4].visible = false;
        map.layers.items[5].visible = false;
      })
      $("#AnaMapValue2").click(function () {
        map.layers.items[0].visible = false;
        map.layers.items[1].visible = false;
        map.layers.items[2].visible = true;
        map.layers.items[3].visible = true;
        map.layers.items[4].visible = false;
        map.layers.items[5].visible = false;
      })
      $("#AnaMapValue3").click(function () {
        map.layers.items[0].visible = false;
        map.layers.items[1].visible = false;
        map.layers.items[2].visible = false;
        map.layers.items[3].visible = false;
        map.layers.items[4].visible = true;
        map.layers.items[5].visible = false;
      })
      $("#AnaMapValue4").click(function () {
        map.layers.items[0].visible = false;
        map.layers.items[1].visible = false;
        map.layers.items[2].visible = false;
        map.layers.items[3].visible = false;
        map.layers.items[4].visible = false;
        map.layers.items[5].visible = true;
      })


      //选中要素，读取信息
      view.on("click", function (event) {
        view.hitTest(event).then(function (response) {
          _self.ChinaDShow = false;
          const feature = response.results[0].graphic.attributes;
          _self.CityName = feature['NAME99'];
          _self.Confirmed = feature['确诊人数'];
          _self.MayBe = feature['疑似人数'];
          _self.Removed = feature['治愈人数'];
          _self.Dead = feature['死亡人数'];
          _self.initChart();
        });
      });


    })
  },
  methods: {
    getData: function () {
      let that = this;
      axios.get('https://lab.isaaclin.cn/nCoV/api/area?latest=1&province=%E4%B8%AD%E5%9B%BD').then((res) => {
        let ResData = res.data.results[0]
        that.Q = ResData.confirmedCount;
        that.X = ResData.currentConfirmedCount.toString();
        that.Z = ResData.curedCount;
        that.S = ResData.deadCount.toString();
      });
    },
    initChart: function () {
      $('#IDWChart').css('visibility', 'visible')
      var idwChart = echarts.init(document.getElementById('IDWChart'));
      var plantCap = [
        {
          name: '确诊人数',
          value: this.Confirmed
        }, {
          name: '治愈人数',
          value: this.Removed
        }, {
          name: '死亡人数',
          value: this.Dead
        }];
      var datalist = [
        {
          offset: [63.5, 50],
          symbolSize: 100,
          opacity: .95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#e86016'
          }, {
            offset: 1,
            color: '#dbc42f'
          }]),
        }, {
          offset: [38, 70],
          symbolSize: 95,
          opacity: .95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#35d17e'
          }, {
            offset: 1,
            color: '#49ddb2'
          }]),
        }, {
          offset: [23, 43],
          symbolSize: 90,
          opacity: .95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#e5d273'
          }, {
            offset: 1,
            color: '#e4a37f'
          }]),
        }, {
          offset: [46, 22],
          symbolSize: 90,
          opacity: .95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#6188ba'
          }, {
            offset: 1,
            color: '#2e424c'
          }]),
        }, {
          offset: [38, 20],
          symbolSize: 65,
          opacity: .95,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#e54948'
          }, {
            offset: 1,
            color: '#f08456'
          }]),
        }, {
          offset: [56, 15],
          symbolSize: 68,
          opacity: .7,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#11c46e'
          }, {
            offset: 1,
            color: '#f08456'
          }]),
        }, {
          offset: [65, 75],
          symbolSize: 65,
          opacity: .68,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#ff4141'
          }, {
            offset: 1,
            color: '#ff8989'
          }]),
        }];
      var datas = [];
      for (var i = 0; i < plantCap.length; i++) {
        var item = plantCap[i];
        var itemToStyle = datalist[i];
        datas.push({
          name: item.name + '\n' + item.value,
          value: itemToStyle.offset,
          symbolSize: itemToStyle.symbolSize,
          label: {
            normal: {
              textStyle: {
                fontSize: 13,
                lineHeight: 17,
              }
            }
          },
          itemStyle: {
            normal: {
              color: itemToStyle.color,
              opacity: itemToStyle.opacity
            }
          },
        })
      }
      var chartOption = {
        grid: {
          show: false,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: [{
          gridIndex: 0,
          type: 'value',
          show: false,
          min: 0,
          max: 100,
          nameLocation: 'middle',
          nameGap: 5
        }],
        yAxis: [{
          gridIndex: 0,
          min: 0,
          show: false,
          max: 100,
          nameLocation: 'middle',
          nameGap: 3
        }],
        series: [{
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 120,
          label: {
            normal: {
              show: true,
              formatter: '{b}',
              color: '#fff',
              textStyle: {
                fontSize: '20',
                fontFamily: 'KuHei'
              }
            },
          },
          itemStyle: {
            normal: {
              color: '#00acea'
            }
          },
          data: datas
        }]
      };
      idwChart.setOption(chartOption, true);
    },
    GetValue1: function () {
      this.ChinaDShow = true;
      this.CityName = '中国'
      this.ChartShow = true;
      const loading = this.$loading({
        lock: true,
        text: '请求数据中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    AnaValue1: function () {
      this.ChartShow = false;
      this.ChinaDShow = true;
      this.CityName = '中国';
      const loading = this.$loading({
        lock: true,
        text: '插值分析中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    AnaValue2: function () {
      const loading = this.$loading({
        lock: true,
        text: '标准差椭圆分析中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    AnaValue3: function () {

      const loading = this.$loading({
        lock: true,
        text: '城市冷热点分析中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    GetDataAPP: function () {
      let _self = this;
      axios.get('https://api.tianapi.com/txapi/ncovcity/index?key=6848bf141edb09a1ebfd4162bc84c624').then((res) =>{{
        for (var i=0;i<15;i++){
          var CityN = {cityName:'',lat:'',lon:'',now:''}
          CityN.cityName = res.data.newslist[i].provinceShortName
          CityN.now = res.data.newslist[i].currentConfirmedCount
          _self.ObjA.push(CityN)
        }
        for (let i=0;i<15;i++){

          // console.log(_self.ObjA[i].cityName)

          // axios.get('/BaiDuAPI/geocoding/v3/?address='+_self.ObjA[i].cityName+'&output=json&ak=TOPze4m1nu13pkifQwZaPdCLhfzQAALZ&callback=showLocation').then((res) =>{{
          //   console.log(res.data)
          // }});
          let arr = []

          async function get(){
            await getcity(_self.ObjA[i].cityName,i)
          }

          function getcity(name,i){

            var geoCood = [
// 23省
              {name:'甘肃', geoCoord:[103.73, 36.03]},
              {name:'青海', geoCoord:[101.74, 36.56]},
              {name:'四川', geoCoord:[104.06, 30.67]},
              {name:'河北', geoCoord:[114.48, 38.03]},
              {name:'云南', geoCoord:[102.73, 25.04]},
              {name:'贵州', geoCoord:[106.71, 26.57]},
              {name:'湖北', geoCoord:[114.31, 30.52]},
              {name:'河南', geoCoord:[113.65, 34.76]},
              {name:'山东', geoCoord:[117, 36.65]},
              {name:'江苏', geoCoord:[118.78, 32.04]},
              {name:'安徽', geoCoord:[117.27, 31.86]},
              {name:'浙江', geoCoord:[120.19, 30.26]},
              {name:'江西', geoCoord:[115.89, 28.68]},
              {name:'福建', geoCoord:[119.3, 26.08]},
              {name:'广东', geoCoord:[113.23, 23.16]},
              {name:'湖南', geoCoord:[113, 28.21]},
              {name:'海南', geoCoord:[110.35, 20.02]},
              {name:'辽宁', geoCoord:[123.38, 41.8]},
              {name:'吉林', geoCoord:[125.35, 43.88]},
              {name:'黑龙江', geoCoord:[126.63, 45.75]},
              {name:'山西', geoCoord:[112.53, 37.87]},
              {name:'陕西', geoCoord:[108.95, 34.27]},
              {name:'台湾', geoCoord:[121.30, 25.03]},
// 4直辖市
              {name:'北京', geoCoord:[116.46, 39.92]},
              {name:'上海', geoCoord:[121.48, 31.22]},
              {name:'重庆', geoCoord:[106.54, 29.59]},
              {name:'天津', geoCoord:[117.2, 39.13]},
// 5自治区
              {name:'内蒙古', geoCoord:[111.65, 40.82]},
              {name:'广西', geoCoord:[108.33, 22.84]},
              {name:'西藏', geoCoord:[91.11, 29.97]},
              {name:'宁夏', geoCoord:[106.27, 38.47]},
              {name:'新疆', geoCoord:[87.68, 43.77]},
// 2特别行政区
              {name:'香港', geoCoord:[114.17, 22.28]},
              {name:'澳门', geoCoord:[113.54, 22.19]}
            ]

            let a = geoCood.find(value =>{
              return value.name === name
            })


            _self.ObjA[i].lat = a.geoCoord[1]
            _self.ObjA[i].lon = a.geoCoord[0]

            if(name == '新疆'){
              _self.ObjA[i].cityName = '乌鲁木齐'
            }
            if(name == '内蒙古'){
              _self.ObjA[i].cityName = '境外输入'
            }
            if(name == '河南'){
              _self.ObjA[i].cityName = '境外输入'
            }
            if(name == '四川'){
              _self.ObjA[i].cityName = '成都'
            }
            if(name == '广东'){
              _self.ObjA[i].cityName = '广州'
            }
            if(name == '江苏'){
              _self.ObjA[i].cityName = '境外输入'
            }
            if(name == '湖北'){
              _self.ObjA[i].cityName = '武汉'
            }
            if(name == '陕西'){
              _self.ObjA[i].cityName = '西安'
            }
            if(name == '福建'){
              _self.ObjA[i].cityName = '福州'
            }

          }
          get()
        }
      }})
    },
    PostAPP: function () {
      console.log(this.ObjA)
      axios({
        method:"post",
        url:"http://49.234.228.14:3000/add",
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials:false,
        data:this.ObjA
      }).then((res)=>{
        console.log(res);
      });
    },
    AnaValue4: function () {
      let _self = this;
      _self.GetDataAPP();
      setTimeout(function(){
        _self.PostAPP();
      }, 600)

      const loading = _self.$loading({
        lock: true,
        text: '聚类与异常值分析中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },


    toCircle: function () {
      this.ChinaDShow = true;
      $(".Button1").css("color", "#ef5b09");
      $(".Button2").css("color", "#FFFFFF");
      $(".Button3").css("color", "#FFFFFF");
      $("#mapTool1").css("display", "block");
      $("#mapTool2").css("display", "none");
      $("#mapTool3").css("display", "none");
      $("#mapTool4").css("display", "none");
    },
    toHot: function () {
      $(".Button1").css("color", "#FFFFFF");
      $(".Button2").css("color", "#ef5b09");
      $(".Button3").css("color", "#FFFFFF");
      $("#mapTool1").css("display", "none");
      $("#mapTool2").css("display", "block");
      $("#mapTool3").css("display", "none");
      $("#mapTool4").css("display", "none");
    },
    toBin: function () {
      $(".Button1").css("color", "#FFFFFF");
      $(".Button2").css("color", "#FFFFFF");
      $(".Button3").css("color", "#ef5b09");
      $("#mapTool1").css("display", "none");
      $("#mapTool2").css("display", "none");
      $("#mapTool3").css("display", "block");
      $("#mapTool4").css("display", "none");
    },

  },
  created() {

  }
}
</script>

<style scoped>
#sceneDiv {
  position: absolute;
  width: 100%;
  height: 100%;
  background: black;
}

#mapTool1 {
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 360px;
  left: 0;
  background: rgba(26, 24, 24, 0.58)!important;
}

#mapTool2 {
  position: absolute;
  z-index: 1000;
  height: 16%;
  width: 239px;
  left: 2.5%;
  top: 85px;
  display: none;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 18px;
}

#mapTool3 {
  position: absolute;
  z-index: 1000;
  height: 16%;
  width: 239px;
  left: 2.5%;
  top: 85px;
  display: none;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 18px;
}

#mapTool4 {
  position: absolute;
  z-index: 1000;
  height: 16%;
  width: 239px;
  left: 2.5%;
  top: 85px;
  display: none;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 18px;
}

#mapTool5 {
  position: absolute;
  z-index: 1000;
  display: none;
}



#IDW {
  color: #ffffffc9;
  position: absolute;
  top: 95px;
  height: 37px;
  line-height: 36px;
  left: 80px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 25px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#Circle {
  color: #ffffffc9;
  position: absolute;
  top: 15px;
  width: 198px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 19px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 21px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#Hot {
  color: #ffffffc9;
  position: absolute;
  top: 15px;
  width: 198px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 19px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 21px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#Bin {
  color: #ffffffc9;
  position: absolute;
  top: 15px;
  width: 198px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 19px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 21px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#GetMapValue1 {
  color: rgba(255, 255, 255, 0.6);
  background: linear-gradient(to bottom, #5a85ab54 0, #3c3b7854 100%);
  position: relative;
  top: 0px;
  width: 85px;
  text-align: center;
  height: 33px;
  line-height: 33px;
  left: 20px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#GetMapValue1:hover {
  color: white;
}

#AnaMapValue1:hover {
  color: white;
}

#GetMapValue2 {
  color: #ffffffc9;
  background: linear-gradient(to bottom, #5a85ab66 0, #3c3b7866 100%);
  position: relative;
  top: 137px;
  width: 85px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 37px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#AnaMapValue2 {
  color: rgba(255, 255, 255, 0.6);
  background: linear-gradient(to bottom, #5a85ab54 0, #3c3b7854 100%);
  position: relative;
  top: 0px;
  width: 85px;
  text-align: center;
  height: 33px;
  line-height: 33px;
  left: 40px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#GetMapValue3 {
  color: #ffffffc9;
  background: linear-gradient(to bottom, #5a85ab66 0, #3c3b7866 100%);
  position: relative;
  top: 137px;
  width: 85px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 37px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#AnaMapValue3 {
  color: #ffffffc9;
  background: linear-gradient(to bottom, #5a85ab66 0, #3c3b7866 100%);
  position: relative;
  top: 63px;
  width: 85px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 72px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#GetMapValue4 {
  color: #ffffffc9;
  background: linear-gradient(to bottom, #5a85ab66 0, #3c3b7866 100%);
  position: relative;
  top: 137px;
  width: 85px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 37px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#AnaMapValue4 {
  color: #ffffffc9;
  background: linear-gradient(to bottom, #5a85ab66 0, #3c3b7866 100%);
  position: relative;
  top: 63px;
  width: 85px;
  text-align: center;
  height: 37px;
  line-height: 36px;
  left: 72px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  text-align: center;
  font-family: KuHei;
  float: left;
}

#ToolContainer {
  height: 100%;
  width: 2.5%;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 999;
}

li a:hover,
.active {
  color: #03d8da;
  border-bottom: #03d8da 2px solid;
}

.TOOLF {
  height: 7%;
  width: 41px;
  background: none;
  position: absolute;
  top: 3px;
  left: -2px;
  z-index: 999;
  font-size: 29px;
  color: rgba(255, 255, 255, .5);
  text-align: center;
  line-height: 59px;
}

.Button1 {
  color: #ef5b09;
}

.TOOLF:hover {
  color: #ef5b09 !important;
  cursor: pointer;
}

.Button1:hover {
  color: #ef5b09 !important;
  cursor: pointer;
}

.Button2:hover {
  color: #ef5b09 !important;
  cursor: pointer;
}

.Button3:hover {
  color: #ef5b09 !important;
  cursor: pointer;
}


.Button5:hover {
  color: #ef5b09 !important;
  cursor: pointer;
}

.HotLengend {
  display: none;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: #857a7a;
  z-index: 9999;
  padding: 11px 5px 3px 20px;
  border-radius: 10px;
}

.TOOLC {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .5);
  position: relative;
  bottom: 0px;
  z-index: 998;
}

.item {
  outline: none !important;
}

.Item {
  height: 7%;
  width: 100%;
  color: #ffffffcc;
  position: relative;
  font-size: 31px;
  top: 34%;
  margin-bottom: 38px;
  left: 4px;
}

.Item:hover {
  cursor: pointer;
}

#ICON1 {
  position: relative;
  top: -12px;
}

#ICON2 {
  position: relative;
  top: -12px;
}

#ICON3 {
  position: relative;
  top: -12px;
}


#ICON5 {
  position: relative;
  top: -12px;
}

.Title {
  font-family: KuHei;
  font-style: normal;
  font-size: 12px;
  left: 3px;
  position: relative;
  text-align: center;
  top: -36px;
}

.router-link-exact-active.router-link-active {
  color: #ef5b09 !important;
}

.DayPicContainer {
  float: left;
  position: absolute;
  top: 172px;
  width: 100%;
  height: 42px;
  padding: 0 0 0 20px;
}

.IDWtoolContainer {
  float: left;
  position: absolute;
  top: 250px;
  width: 100%;
  height: 30px;
  padding: 0 0 0 20px;
}

.IDWChartTitle {
  float: left;
  position: absolute;
  bottom: 48%;
  width: 100%;
  height: 6%;
  color: #ffffffad;
  font-size: 24px;
  left: 10%;
  font-weight: normal;
}

#IDWChart {
  float: left;
  position: absolute;
  bottom: 34px;
  width: 100%;
  height: 46%;
  padding: 0 0 0 34px;
  visibility: hidden;
}

#ChinaData{
  color: rgba(255,255,255,.8);
  top: 54%;
  position: absolute;
  font-size: 27px;
  left: 55px;
  line-height: 57px;
}

.DayPic {
  float: left;
  width: 150px;
  position: relative;
  left: 40px;
}

.DayPicTitle {
  color: #ffffffad;
  position: relative;
  float: left;
  font-size: 21px;
  left: 18px;
  line-height: 39px;
}

.DayPicContainer >>> .el-input__inner {
  -webkit-appearance: none;
  background: #3c3b787d;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: rgba(220, 225, 227, 0.96);
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 0 0 35px;
}

.panel-container {
  display: none;
  position: absolute;
  width: 10%;
  height: 92%;
  z-index: 999;
  right: 0;
  bottom: 0;
}

.panel-side {
  padding: 2px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  right: 0;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  overflow: auto;
  z-index: 60;
}

.panel-side h3 {
  padding: 0 20px;
  margin: 20px 0;
}

.panel-side ul {
  list-style: none;
  margin: 0;
  line-height: 35px;
  font-size: 19px;
  font-family: KuHei;
  padding: 0 0 0 16px;
  color: #ffffffd1;
}

.panel-side li {
  list-style: none;
  padding: 10px 20px;
  color: yellow !important;
}

.panel-result {
  cursor: pointer !important;
  margin: 2px 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.panel-result:hover,
.panel-result:focus {
  color: orange;
  background-color: rgba(0, 0, 0, 0.75);
}

</style>
