<template>
  <div id="query">
    <div id="map" />
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
                :row-style="getRowClass"
                @row-click="editCurrentApplicationApproval"
                :header-row-style="getRowClass"
                :header-cell-style="getRowClass"
                :height="height"
                style="width: 100%; align: center"
                :data="tableData"
              >
                <el-table-column
                  prop="name"
                  label="景点名称"
                  width="120"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="公司名称"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="message"
                  label="信息"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column prop="x" label="x" v-if="false">
                </el-table-column>
                <el-table-column prop="y" label="y" v-if="false">
                </el-table-column>
                <el-table-column type="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="detail" label="操作" width="120">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="flyToLocation(scope.row.x, scope.row.y)"
                      >定位</el-button
                    >
                    <el-button
                      type="text"
                      @click="flyToLocation(scope.row.x, scope.row.y)"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const mapboxgl = require("mapbox-gl");
import request from "../utils/request";
import areaSelect from "../components/areaSelect.vue";
import wordcloud from "../assets/js/echarts-wordcloud-master/index";
import dialogBar from "../components/dialog.vue";
import poppage from "../components/poppage.vue";
// import dialogPage from "./dialogPage.vue";
export default {
  name: "query",
  components: {
    modalVisible: false,
    areaSelect,
    wordcloud,
    poppage,
    // dialogPage,
    "dialog-bar": dialogBar,
  },
  data() {
    return {
      tableData: [],
      pagecount: 0,
      height: "",
      search: "",
      currentPage: 1,
      total: 0,
      pageSize: 11,
      location: [],
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
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [105, 35],
        zoom: 3.5,
      });
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
    //加载表格数据
    load() {
      request
        .post("/api/data/queryScenic", {
          pageNum: this.currentPage,
          count: this.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.scInfo;
          this.pagecount = res.data.pages;
          this.total = res.data.total;
          // this.total = res.data.total;
        });
    },
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
    editCurrentApplicationApproval(row) {
      console.log(row);
    },
  },
  watch: {},
};
</script>

<style scoped lang="less">
#query {
  position: fixed;
  width: 100%;
  height: 100%;
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
    font-size: 16pt;
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
  width: 40%;
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
      /deep/.el-table .cell {
        text-align: center;
      }
      /deep/.el-table .el-table__cell {
        padding: 2.5px 0 !important;
      }
      /deep/.el-input :nth-child(1) {
        position: relative;
        font-size: 14px;
        // color: rgba(233, 14, 80, 0.781);
        display: inline-block;
        width: 50%;
        margin-top: 2%;
        margin-left: -40%;
      }
      /deep/.el-input--mini .el-input__inner {
        background-color: #6d4c3f2c;
      }
      /deep/.el-table tbody tr:hover > td {
        background-color: #23ece22c !important;
      }
      /deep/.el-table tr {
        color:#FFF;
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
</style>
