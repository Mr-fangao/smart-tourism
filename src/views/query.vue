<template>
  <div id="query">
    <div id="map" />
    <transition name="fade">
      <loading v-if="isLoading"></loading>
    </transition>
    <div class="container">
      <div class="left-part">
        <div class="pt pt1">
          <div class="head title">
            <span>景点查询</span>
          </div>
          <div class="sorttable">
            <el-card shadow="hover" class="teble_card">
              <el-input prefix-icon="el-icon-search" size="mini" v-model="search" placeholder="输入关键字搜索" />
              <el-button size="mini" id="button1" @click="Search(search)">查询</el-button>
              <el-button size="mini" id="button2" @click="Realize()">清除搜索</el-button>
              <el-table @row-click="clickData" :header-row-style="getRowClass" :header-cell-style="getRowClass"
                :height="tableheight" style="width: 100% align: center" :data="tableData">
                <el-table-column prop="name" label="名称" width="120" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="city" label="城市" width="50" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="score" label="评分" width="50" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score | rounding }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="hot" label="热度" width="60" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="address" label="地址" width="80" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="x" label="x" v-if="false">
                </el-table-column>
                <el-table-column prop="y" label="y" v-if="false">
                </el-table-column>
                <el-table-column type="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="detail" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" @click.stop="flyToLocation(scope.row.x, scope.row.y)">定位</el-button>
                    <el-button type="text" @click.stop="getDetail(scope.row.id)">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination @current-change="handleCurrentChange" background layout="total,prev, pager, next,jumper"
                :total="total" :pager-count="5" :page-count="pagecount" small :page-size="pageSize"
                :current-page="currentPage" id="pagination">
              </el-pagination>
            </el-card>
            <detail :show="show" :porpID="porpID" @hideModal="hideModal" @submit="submit">
            </detail>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text">
      <span class="text1">区域查询</span>
      <span>清除查询</span>
    </div> -->
  </div>
</template>

<script>
// import * as turf from "@turf/turf";
// import MapboxDraw from "@mapbox/mapbox-gl-draw";

const mapboxgl = require("mapbox-gl");

// import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
// import "mapbox-gl/dist/mapbox-gl.css";
import request from "../utils/request";
import Bus from "../assets/js/bus.js";
// import areaSelect from "../components/areaSelect.vue";
import wordcloud from "../assets/js/echarts-wordcloud-master/index";
// import dialogBar from "../components/dialog.vue";
import detail from "../components/detail.vue";
import loading from "../components/loading.vue";
// import dialogPage from "./dialogPage.vue";
export default {
  name: "query",
  components: {
    // modalVisible: false,
    // areaSelect,
    wordcloud,
    // MapboxDraw,
    detail,
    loading,
    // "dialog-bar": dialogBar,
  },
  data() {
    return {
      //
      isLoading: false,
      tableData: [],
      pagecount: 0,
      tableheight: "",
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 12,
      location: [],
      //弹窗字段
      show: false,
      porpID: "",
      points: [{ lng: "10", lat: "10" }],
      pointsdata: [{ lng: "0", lat: "0" }],
      pointsflag: 0,

      //三维地图相关
      map: null,

    };
  },
  created() {
    this.getHeight();
  },
  mounted() {
    let that = this;
    // this.initmap1();
    this.init();
    this.load();
    window.onresize = function () {
      that.getHeight();
    };
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  beforeCreate() {
    // this.load();
  },
  methods: {
    init() {
      let that = this;
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      that.map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
      });
    },
    // initmap1() {
    //   // const viewer = new Cesium.Viewer("map", {
    //   //   infoBox: false,
    //   //   selectionIndicator: false,
    //   //   shadows: true,
    //   //   shouldAnimate: true,
    //   // });

    //   // var position = Cesium.Cartesian3.fromDegrees(118.2932880, 32.2888299, 6.0);
    //   // var heading = Cesium.Math.toRadians(45);
    //   // var pitch = 0;
    //   // var roll = 0;
    //   // var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    //   // var orientation = Cesium.Transforms.headingPitchRollQuaternion(
    //   //   position,
    //   //   hpr
    //   // );
    //   // var model_entity = viewer.entities.add({
    //   //   id: "build",
    //   //   position: position,
    //   //   orientation: orientation,
    //   //   model: {
    //   //     show: true,
    //   //     uri: '../../static/model.gltf',//注意是uri 不是url
    //   //   },
    //   // });
    //   // viewer.zoomTo(model_entity);

    //   //构造三维视图对象（视图容器div的id，三维视图设置参数）
    //   var webGlobe = new Cesium.WebSceneControl('map', {});

    //   //构造视图功能管理对象（视图）
    //   var sceneManager = new CesiumZondy.Manager.SceneManager({
    //     viewer: webGlobe.viewer
    //   });

    //   //构造第三方图层对象
    //   var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
    //     viewer: webGlobe.viewer
    //   });
    //   //加载天地图
    //   var tdtLayer = thirdPartyLayer.appendTDTuMap({
    //     //天地图经纬度数据
    //     url: 'http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}',
    //     //开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
    //     token: "9c157e9585486c02edf817d2ecbc7752",
    //     //地图类型 'vec'矢量 'img'影像 'ter'地形
    //     ptype: "img"
    //   });

    //   // sceneManager.flyToEx(118.2932880, 32.2888299, {
    //   //   height: 570,
    //   //   heading: -27,
    //   //   pitch: -25,
    //   //   roll: 0
    //   // });

    //   const position = Cesium.Cartesian3.fromDegrees(
    //     118.2932880, 32.2888299,
    //     100.0
    //   );
    //   const heading = Cesium.Math.toRadians(135);
    //   const pitch = 0;
    //   const roll = 0;
    //   const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    //   const orientation = Cesium.Transforms.headingPitchRollQuaternion(
    //     position,
    //     hpr
    //   );

    //   const entity = webGlobe.viewer.entities.add({
    //     name: "../../static/model.gltf",
    //     position: position,
    //     orientation: orientation,
    //     model: {
    //       uri: "../../static/model.gltf",
    //       minimumPixelSize: 128,
    //       maximumScale: 20000,
    //     },
    //   });
    //   webGlobe.viewer.trackedEntity = entity;

    //   // const options = [
    //   //   {
    //   //     text: "Aircraft",
    //   //     onselect: function () {
    //   //       createModel(
    //   //         "../../static/model.gltf",
    //   //         5000.0
    //   //       );
    //   //     },
    //   //   },

    //   // ];

    //   // Sandcastle.addToolbarMenu(options);

    // },
    initmap() {
      var that = this;
      //地图视图
      // var webGlobe = new Cesium.WebSceneControl("map", {
      //   terrainExaggeration: 1,
      // });
      // //表面底图
      // var blueImage = new Cesium.UrlTemplateImageryProvider({
      //   url: "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",

      //   tilingScheme: new Cesium.WebMercatorTilingScheme(),
      //   maximumLevel: 12,
      // });
      // webGlobe.viewer.imageryLayers.addImageryProvider(blueImage);
      // that.map = webGlobe.viewer;
      // var center = Cesium.Cartesian3.fromDegrees(114, 30, 8000000.0);
      // that.map.scene.camera.setView({
      //   destination: center,
      // });
      // var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      //   viewer: webGlobe.viewer
      // });
      // that.webGlobe = new Cesium.WebSceneControl('map', {});
      // //构造第三方图层对象
      // var thirdPartyLayer = new CesiumZondy.Layer.ThirdPartyLayer({
      //   viewer: that.webGlobe.viewer
      // });
      // //加载天地图
      // var tdtLayer = thirdPartyLayer.appendTDTuMap({
      //   //天地图经纬度数据
      //   url: 'http://t0.tianditu.com/DataServer?T=vec_c&X={x}&Y={y}&L={l}',
      //   //开发token （请到天地图官网申请自己的开发token，自带token仅做功能验证随时可能失效）
      //   token: "3b4ce3e89ce946fff2bf31ff2b20375c",
      //   //地图类型 'vec'矢量 'img'影像 'ter'地形
      //   ptype: "img"
      // });

      // // 视点跳转（经度，纬度，视角高度，方位角，俯仰角，翻滚角）
      // sceneManager.flyToEx(118.2932880, 32.2888299, {
      //   height: 570,
      //   heading: -27,
      //   pitch: -25,
      //   roll: 0
      // });

      // //构造通用数据管理对象
      // var commonDataManager = new CesiumZondy.Manager.CommonDataManager({
      //   viewer: that.webGlobe.viewer
      // });

      // //添加模型（gltf文件）
      // var model = commonDataManager.appendModel(
      //   //模型id
      //   'model',
      //   //模型文件URL路径
      //   '../../static/model.gltf',
      //   //模型经度、纬度、高度
      //   118.2932880, 32.2888299,
      //   400,
      //   //缩放比
      //   200
      // );
    },
    flyToLocation(x, y) {
      // this.map=null;
      // console.log("111");
      console.log(x, y);
      this.map.flyTo({
        center: [x, y], // 中心点
        zoom: 16.5, // 缩放比例
        pitch: 45, // 倾斜度
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
      if (this.search != null) {
        request
          .post("/api/data/searchScenic", {
            pageNum: this.currentPage,
            count: this.pageSize,
            search: this.search,
          })
          .then((res) => {
            console.log(res);
            this.tableData = res.data.scInfo;
            this.pagecount = res.data.pages;
            this.total = res.data.total;
          });
      } else {
        request
          .post("/api/data/queryScenic", {
            pageNum: val,
            count: this.pageSize,
          })
          .then((res) => {
            console.log(res, val);
            this.tableData = res.data.scInfo;
            this.pagecount = res.data.pages;
          });
      }
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#FFF;height:30px";
    },
    keyDown(e) {
      //如果是回车则执行查询方法
      if (e.keyCode == 13) {
        document.getElementById("button").click();
      }
    },
    getHeight() {
      this.tableheight = window.innerHeight - 190 + "px";
    },
    // 加载表格数据
    load() {
      request
        .post("/api/data/queryScenic", {
          pageNum: this.currentPage,
          count: this.pageSize,
        })
        .then((res) => {
          // if(tableData == null)
          // loading();
          console.log(res);
          this.tableData = res.data.scInfo;
          this.tableData[7].x = 106.60201626611412;
          this.tableData[7].y = 26.619924752919862;
          this.pagecount = res.data.pages;
          this.total = res.data.total;
          if (this.tableData == null) {
            this.isLoading = false;
          }
          // this.total = res.data.total;
        });
    },
    hideModal() {
      // 取消弹窗回调
      this.show = false;
    },

    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    // loading() {
    //   this.bus.$emit("loading", true);
    // },
    Search() {
      this.currentPage = 1;
      request
        .post("/api/data/searchScenic", {
          pageNum: this.currentPage,
          count: this.pageSize,
          search: this.search,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.scInfo;
          this.pagecount = res.data.pages;
          this.total = res.data.total;
        });
    },
    clickData(val) {
      Bus.$emit("myevent", val.id);
      this.$router.push({ name: "details" });
    },
    getDetail(val) {
      this.porpID = val.toString();
      this.show = true;
    },
    Realize() {
      this.search = "";
      this.load();
    },
    // startDraw(){
    //   draw.changeMode('draw_point')
    // },
  },
  watch: {},
};
</script>

<style scoped lang="less">
// @import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css");
#query {
  position: fixed;
  width: 100%;
  height: 100%;
  // .text {
  //   position: relative;
  //   display: flex;
  //   flex-direction: column;
  //   width: 70px;
  //   height: 60px;
  //   width: 70px;
  //   bottom: 82.6%;
  //   left: 34.3%;
  //   z-index: 0;
  //   color: #fff;
  //   .text1 {
  //     margin-bottom: 20px;
  //   }
  // }
}

#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}

// /deep/#isearch {
//   margin-top: 10%;
//   margin-left: 10%;
// }
.pt {
  flex: 1;
  //  background-size: 100% 100%;
  // background: url(../assets/img/titlebg.png) no-repeat;
}

.draw {
  width: 50px;
  height: 50px;
}

.head {
  height: 5%;
  width: 40%;
  position: relative;
  left: 2%;
  background: url(../assets/img/titlebg.png) no-repeat;
  background-size: 70% 91%;

  >span {
    float: left;
    margin-left: 18%;
    font-size: 12pt;
    line-height: 30px;
    color: aliceblue;
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #38e9e0,
      0 0 70px #0cf3f3;
  }
}

.left-part {
  position: absolute;
  top: 3px;
  left: 0.5%;
  bottom: 0px;
  height: 92%;
  width: 33%;
  float: left;
  display: flex;
  flex-direction: column;
  padding: 6px;
  background: url(../assets/img/side.png) no-repeat;
  opacity: 1;
  background-size: 100% 100%;

  .pt1 {
    .sorttable {
      height: 95%;
      width: 100%;

      // background-color: #0cf3f3;
      .el-pagination {
        bottom: 1.5%;
        position: relative;
      }

      .teble_card {
        background-color: transparent;
        height: 100%;
        width: 100%;
        border: none;

        #button1 {
          background-color: #225e81e3;
          border-color: #1edaeb;
          color: #fff;
          width: 77px;
        }

        #button2 {
          margin-left: 16%;
          background-color: #225e81e3;
          border-color: #1edaeb;
          color: #fff;
        }

        /deep/.el-card__body {
          padding: 6px !important;
          height: 100%;
        }

        /deep/.el-overlay {
          background-color: rgba(255, 255, 255, 0.02);
        }

        .el-table,
        .el-table__expanded-cell {
          margin-top: 3%;
          background: #3f5c6d2c;
        }

        /deep/ .el-button--mini,
        .el-button--mini.is-round {
          padding: 7px 20px;
          position: absolute;
          left: 60%;
          top: 8.5%;
        }

        /deep/.el-icon-search {
          height: 0px;
        }

        /deep/.el-table .cell {
          text-align: center;
        }

        /deep/.el-table .el-table__cell {
          padding: 2px 0 !important;
        }

        // /deep/.el-button--mini :nth-child(1){
        //           background-color: #225e81e3;
        //   border-color: #1edaeb;
        //   color: #fff;
        // }
        /deep/.el-input :nth-child(1) {
          position: relative;
          font-size: 14px;
          // color: rgba(233, 14, 80, 0.781);
          display: inline-block;
          width: 50%;
          margin-top: 2%;
          margin-left: -40%;
          background-image: url("../assets/img/bg9.png");
          background-size: 100% 100%;
          border: none;
        }

        /deep/.el-input--mini .el-input__inner {
          background-color: #6d4c3f2c;
        }

        /deep/.el-table tbody tr:hover>td {
          background-color: #23ece22c !important;
        }

        /deep/.el-table tr {
          color: #fff;
          // background-color: rgb(2, 64, 86, 0.1);
          background-color: #6d4c3f2c;
        }

        /deep/ .el-table th.gutter {
          display: table-cell !important;
          background: #3f5c6d2c; //因为我改了我的默认表格背景颜色，所以要跟着改
        }

        /deep/.el-table::before {
          background-color: transparent;
        }

        /deep/.el-input__prefix {
          left: 38px;
          top: 26%;
        }

        /deep/.el-pagination .el-pager li {
          background-color: transparent;
          color: #fff;
          margin: 0 2px;
        }

        /deep/.el-pagination .btn-prev {
          background-color: transparent;
          color: #fff;
        }

        /deep/.el-pagination .btn-next {
          background-color: #00a2ff2c;
          color: #fff;
        }

        /deep/.el-table td.el-table__cell,
        /deep/.el-table th.el-table__cell.is-leaf {
          border-bottom: transparent !important;
        }
      }
    }
  }
}

.detail {
  position: relative;
  z-index: 9999999999;
  height: 100%;
  width: 100%;
  background: #0cf3f3;
}

/deep/.el-input__inner {
  color: #ccd8ef;
}

/deep/.el-pagination__total {
  color: #ccd8ef;
}

/deep/.el-pagination__jump {
  margin-left: 8px;
  color: #ccd8ef;
}

// position: absolute;
// bottom: 1%;
// #pagination{
//   /deep/.el-input{
//     width: 50%;
//       /deep/.el-input__inner :nth-child(2){
//     width: 100%;

//   }
//   }
// }
</style>
