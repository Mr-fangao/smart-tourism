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
            <el-card shadow="hover" class="tebale_card">
              <el-input
                prefix-icon="el-icon-search"
                size="mini"
                v-model="search"
                placeholder="输入关键字搜索"
              /><el-button size="mini" id="button" @click="Search(search)"
                >查询</el-button
              >
              <el-table
                @row-click="clickData"
                :row-style="getRowClass"
                :header-row-style="getRowClass"
                :header-cell-style="getRowClass"
                :height="height"
                style="width: 100%; align: center"
                :data="tableData"
              >
                <el-table-column
                  prop="name"
                  label="名称"
                  width="130"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="评分"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column prop="x" label="x" v-if="false">
                </el-table-column>
                <el-table-column prop="y" label="y" v-if="false">
                </el-table-column>
                <el-table-column type="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="detail" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click.stop="flyToLocation(scope.row.x, scope.row.y)"
                      >定位</el-button
                    >
                    <el-button type="text" @click.stop="getDetail(scope.row.id)"
                      >详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 0px 0">
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="total,prev, pager, next,jumper"
                  :total="total"
                  :pager-count="5"
                  :page-count="pagecount"
                  small
                  :page-size="pageSize"
                  :current-page="currentPage"
                >
                </el-pagination>
              </div>
            </el-card>
            <!-- <poppage
              :show="show"
              :porpID="porpID"
              @hideModal="hideModal"
              @submit="submit"
            >
              <p>这里放弹窗的内容</p>
            </poppage> -->
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
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const mapboxgl = require("mapbox-gl");
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
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
    Bus,
    MapboxDraw,
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
      height: "",
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 11,
      location: [],
      //弹窗字段
      // show: false,
      // porpID: "",
      points: [{ lng: "10", lat: "10" }],
      pointsdata: [{ lng: "0", lat: "0" }],
      pointsflag: 0,
    };
  },
  mounted() {
    this.getHeight();
    this.initmap();
    this.load();
  },
  beforeCreate() {
    // this.load();
  },
  methods: {
    initmap() {
      var that = this;
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
        center: [105, 35],
        zoom: 3.5,
      });
      this.map.on("click", function (e) {});
      // var nav = new mapboxgl.NavigationControl();
      // this.map.addControl(nav, "top-right");
      var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });
      this.map.addControl(draw, "top-right");
      this.map.on("draw.create", updateArea);
      function updateArea(e) {
        var data = draw.getAll();
        if (data.features.length > 0) {
          console.log(data);
        } else {
          console.log("no data");
        }
      }
    },
    flyToLocation(x, y) {
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
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      return "background:#3f5c6d2c;color:#FFF;";
    },
    keyDown(e) {
      //如果是回车则执行查询方法
      if (e.keyCode == 13) {
        document.getElementById("button").click();
      }
    },
    getHeight() {
      this.height = window.innerHeight - 230 + "px";
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
      console.log(this.points);
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
    clickData(row) {
      console.log(row.name);
      this.isShow = true;
    },
    getDetail(val) {
      this.porpID = val.name;
      this.show = true;
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
  > span {
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
  padding: 10px;
  background: url(../assets/img/side.png) no-repeat;
  opacity: 1;
  background-size: 100% 100%;
  .pt1 {
    .sorttable {
      height: 95%;
      width: 100%;
      // background-color: #0cf3f3;
      .el-pagination {
        left: 12%;
        bottom: 2%;
        position: absolute;
      }
      .tebale_card {
        background-color: transparent;
        height: 100%;
        border: none;
        #button {
          background-color: #225e81e3;
          border-color: #1edaeb;
          color: #fff;
        }
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
        // background: linear-gradient(
        //   rgba(2, 89, 113, 0.9),
        //   rgba(2, 62, 82, 0.4)
        // );
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
        padding: 2.5px 0 !important;
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
      /deep/.el-table tbody tr:hover > td {
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
.detail {
  position: relative;
  z-index: 9999999999;
  height: 100%;
  width: 100%;
  background: #0cf3f3;
}
/deep/.mapboxgl-ctrl-group:not(:empty) {
  background: #8fcef1;
}
/deep/.mapbox-gl-draw_ctrl-draw-btn {
  width: 85px;
  height: 40px;
  margin-bottom: 8%;
  border: none;
  // background-color: #042d42;
  // background-repeat: no-repeat;
  // background-position: center;
  // background-image: none;
  // background: url(../assets/img/qc.png) no-repeat;
  // background-size: 100% 100%;
  z-index: 0;
}

/deep/.mapboxgl-ctrl-group:not(:empty) {
  background: transparent;
  box-shadow: none;
  z-index: 0;
}
/deep/.mapbox-gl-draw_polygon {
  background: url(../assets/img/fw.png) no-repeat;
  background-size: 100% 100%;
}

/deep/.mapbox-gl-draw_trash {
  background: url(../assets/img/qc.png) no-repeat;
  background-size: 100% 100%;
}
/deep/.mapboxgl-ctrl-top-right .mapboxgl-ctrl {
  margin: 30px 10px 0 0;
  position: relative;
  display: block;
  right: 977%;
  z-index: 0;
}
/deep/.mapboxgl-ctrl button:not(:disabled):hover {
  background-color: #042d42;
}
</style>
