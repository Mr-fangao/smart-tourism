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
              /><el-button size="mini" id="button" @click="Search()"
                >查询</el-button
              >
              <el-table
                border
                style="width: 100%; align: center"
                :row-style="getRowClass"
                :header-row-style="getRowClass"
                :header-cell-style="getRowClass"
                :data="tableData"
                :height="getheight"
              >
                <el-table-column prop="name" label="景点名称" width="120">
                </el-table-column>
                <el-table-column prop="address" label="公司名称">
                </el-table-column>
                <el-table-column prop="message" label="信息"> </el-table-column>
                <el-table-column prop="X" label="x" v-if="false">
                </el-table-column>
                <el-table-column prop="Y" label="y" v-if="false">
                </el-table-column>
                <el-table-column type="id" label="id" v-if="false">
                </el-table-column>
                <el-table-column prop="detail" label="详细信息" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" @click="checkDetail(scope.row.phone)"
                      >查看详情</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin: 10px 0">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="9"
                  layout="total ,prev, pager, next, jumper"
                  :total="total"
                  @click="Click"
                  background
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
      total: 0,
      currentPage: 1,
      search: "",
    };
  },
  mounted() {
    this.initmap();
    this.load();
    this.getHeight();
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [105, 35],
        zoom: 3.5,
      });
    },
    checkDetail(val) {
      console.log(val);
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
      this.getheight = window.innerHeight - 230 + "px";
    },
    //加载表格数据
    load() {
      request
        .post("/api/data/queryScenic", {
          pageNum: this.currentPage,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.ScInfo;
          this.total = res.data.total1· ;
        });
      // request
      //   .post("/api/data/queryScenic", {
      //     // pageSize: this.pageSize,
      //     // search: this.search,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     this.tableData = res.data.ScInfos;
      //     this.total = res.data.total;
      //   });
    },
    //获取当前页面数据
    // Click() {
    //   request
    //     .post("/api/data/queryForm", {
    //       pageNum: this.currentPage,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       this.tableData = res.data.jobInfos;
    //       this.total = res.data.total;
    //     });
    // },
    //查询
    Search() {
      request
        .post("/api/data/queryAny", {
          search: this.search,
          pageNum: this.currentPage,
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.jobInfos;
          this.total = res.data.total;
        });
    },
    handleCurrentChange(val) {
      //页码切换
      console.log("当前页:${val}");
      this.currentPage = val;
    },
    //分页方法（重点）
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tableData = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableData.push(list[from]);
        }
      }
    },
  },
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
      .tebale_card {
        background-color: transparent;
        height: 100%;
        border: none;
      }
      /deep/.el-overlay {
        background-color: rgba(255, 255, 255, 0.02);
      }
      .el-table,
      .el-table__expanded-cell {
        background-color: #3f5c6d2c;
      }
      /deep/.el-table .cell {
        text-align: center;
      }

      // .el-pagination {
      //   margin: 10px 0px 0px 520px;
      // }
      /deep/.el-input--mini .el-input__inner {
        background-color: #6d4c3f2c;
      }
      /deep/.el-table tbody tr:hover > td {
        background-color: #ec63232c !important;
      }
      /deep/.el-table tr {
        background-color: #3f5c6d2c;
        color: #fff;
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
    }
  }
}
</style>
