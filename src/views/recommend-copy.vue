<template>
  <div class="content">
          <div id="map"></div>
      <div class="grid-container">
        <div class="pt item1">
          <div class="title">
            <i class="el-icon-s-claim"></i>
            景点类别选择
          </div>
          <div class="content">
            <el-checkbox
              style="margin: 10px -130px 0px 0px"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              v-model="checkedLists"
              @change="handleCheckedListChange"
            >
              <el-checkbox-button
                size="medium"
                v-for="item in listData"
                :label="item.sign"
                :key="item.sign"
                class="drag-item"
                border
              >
                <div class="text">{{ item.name }}</div>
              </el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
        <div class="pt item2">
          <div class="title">
            <i class="el-icon-s-claim"></i>
            目的地城市情感形象查询
          </div>
          <div class="content">
            <areaSelect></areaSelect>
            <div class="cloud-wrap">
              <div class="cloud-box" ref="cloudEl" />
            </div>
          </div>
        </div>
        <div class="pt item3">
          <div class="title">
            <i class="el-icon-s-claim"></i>
            个性化选择
          </div>
          <div class="content">
            <div class="contentrow">
              <div class="contentspan">旅游时间选择:</div>
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="-"
                size="small"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="contentrow">
              <div class="contentspan" style="margin-right: 3%">
                旅游目的地筛选:
              </div>
              <el-select
                v-model="value"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="contentrow">
              <div class="contentspan">景点星级筛选:</div>
              <el-select v-model="value3" placeholder="请选择">
                <el-option-group
                  v-for="group in data3"
                  :key="group.label"
                  :label="group.label"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </div>
            <div class="contentrow">
              <div class="contentspan" style="margin-right: 3%">
                评论数据源选择:
              </div>
              <el-select v-model="value4" multiple placeholder="请选择">
                <el-option
                  v-for="item in data4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="contentrow">
              <div class="contentspan" style="margin-right: 3%">
                <el-button style="width: 100px">开始推荐</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="item4">
          <i
            class="fa fa-linux fa-5x"
            aria-hidden="true"
            style="position: absolute; left: 26%; bottom: 3%"
            @click="openMask"
          ></i>
          <dialog-bar
            v-model="sendVal"
            type="danger"
            title="智能AI决策助手"
            v-on:cancel="clickCancel()"
            @danger="clickDanger()"
            @confirm="clickConfirm()"
            dangerText="Delete"
          ></dialog-bar>
        </div>
        <div class="pt item5">
          <div class="title">
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            智能推荐
          </div>
          <div class="content">
            <el-table
              border
              @row-click="TableClick"
              :data="tableData"
              style="width: 100%"
              :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <el-table-column type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column type="id" label="id" v-if="false">
              </el-table-column>
              <el-table-column prop="date" label="日期" sortable width="100%">
              </el-table-column>
              <el-table-column prop="name" label="姓名" sortable width="100%">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                sortable
                width="100%"
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import areaSelect from "../components/areaSelect.vue";
import echarts from "echarts";
import wordcloud from "../assets/js/echarts-wordcloud-master/index";
import dialogBar from "../components/dialog.vue";
// import poppage from "../components/poppage.vue";

// import dialogPage from "./dialogPage.vue";
export default {
  name: "recommend",
  components: {
    modalVisible: false,
    areaSelect,
    wordcloud,
    // dialogPage,
    "dialog-bar": dialogBar,
  },
  data() {
    return {
      title: "弹窗标题",
      show: false,
      porpID: "",
      sendVal: false,
      value1: "",
      value3: "",
      value4: "",
      cloudData: [
        { value: 1000, name: "文字" },
        { value: 400, name: "图片" },
        { value: 333, name: "参考" },
        { value: 855, name: "音视频" },
        { value: 343, name: "新媒体" },
        { value: 343, name: "测试1" },
        { value: 43, name: "测试2" },
        { value: 543, name: "测试3" },
        { value: 333, name: "测试4" },
        { value: 323, name: "测试5" },
        { value: 33, name: "测试6" },
        { value: 13, name: "测试7" },
        { value: 543, name: "测试8" },
        { value: 66, name: "测试9" },
        { value: 666, name: "测试10" },
      ],
      listData: [
        { name: "湖泊风景区", sign: 1 },
        { name: "山岳风景区", sign: 2 },
        { name: "森林风景区", sign: 3 },
        { name: "山水风景区", sign: 4 },
        { name: "海滨风景区", sign: 5 },
        { name: "疗养避暑地", sign: 6 },
        { name: "宗教寺庙地", sign: 7 },
        { name: "革命纪念地", sign: 8 },
        { name: "其他风景区", sign: 9 },
      ],
      data3: [
        {
          label: "默认选项",
          options: [
            {
              value: "Shanghai",
              label: "不限制",
            },
          ],
        },
        {
          label: "其他选项",
          options: [
            {
              value: "Chengdu",
              label: "三星",
            },
            {
              value: "Shenzhen",
              label: "四星",
            },
            {
              value: "Guangzhou",
              label: "五星",
            },
          ],
        },
      ],
      data4: [
        {
          value: "选项1",
          label: "携程",
        },
        {
          value: "选项2",
          label: "去哪儿",
        },
        {
          value: "选项3",
          label: "艺龙",
        },
        {
          value: "选项4",
          label: "开心游",
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          id: "1111111111111",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          id: "1111111111111",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          id: "1111111111111",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          id: "1111111111111",
        },
      ],
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      checkedLists: [],
      checkAll: false,
      isIndeterminate: false,
    };
  },
  mounted() {
    this.initmap();
    this.drawCloud(this.$refs.cloudEl, this.cloudData);
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/ckwetfomi0j1014ph4s20wu2x",
        center: [110, 40],
        zoom: 4,
      });
    },
    indexMethod(index) {
      return index + 1;
    },
    hideModal() {
      // 取消弹窗回调
      this.show = false;
    },

    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    // opendialogPage() {
    //   this.modalVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.dialogPage.init();
    //   });
    //   console.log(1234);
    // },
    TableClick(val) {
      let thisRowData = this;
      thisRowData = val;
      console.log(val);
      this.showPop(val);
    },
    showPop(val) {
      this.porpID = val.id;
      this.show = true;
    },
    handleCheckAllChange(val) {
      this.checkedLists = val
        ? this.listData.map((item) => {
            return item.sign;
          })
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.listData.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.listData.length;
    },
    drawCloud(wrapEl, data) {
      let myChart = echarts.init(wrapEl);
      var option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            name: "热词",
            type: "wordCloud",
            sizeRange: [10, 30],
            rotationRange: [-20, 20],
            shape: "circle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            gridSize: 3,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    openMask() {
      this.sendVal = true;
    },
  },
};
</script>

<style scoped lang="less">
.content {
  // height: calc(100% - 45px);
  height: 100%;
  width: 100%;
  .grid-container {
    position: absolute;
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "pt1 pt4 pt5 "
      "pt2 pt4 pt5 "
      "pt3 pt4 pt5 ";
    background-color: transparent;
    .title {
      float: left;
      font-size: 14pt;
      margin-left: 3%;
      margin-top: 2%;
    }
    .el-checkbox-button {
      width: 160px;
      height: 65px;
      margin: 0px 0px 0px 0px;
      .text {
        font-size: 10pt;
        letter-spacing: 0px;
        // padding: 12px 20px;
      }
    }
    // /deep/.el-checkbox-button__inner{
    //   padding: 8px 10px;
    // }

    .pt {
      background-color: rgba(127, 194, 172, 0.3);
      text-align: center;
      outline: 1px dashed rgb(136, 27, 27);
    }
    .item1 {
      grid-area: pt1;
    }
    .item2 {
      grid-area: pt2;
      .content {
        height: 85%;
        .cloud-wrap {
          // margin-bottom: 0%;
          width: 100%;
          height: 80%;
          position: relative;
          bottom: -90px;
          text-align: left;
          .cloud-box {
            // margin-top: 10%;
            width: 100%;
            height: 100%;
            bottom: 35px;
          }
        }
      }
    }
    .item3 {
      grid-area: pt3;
      .content {
        display: flex;
        flex: auto;
        flex-direction: column;
        .contentrow {
          display: flex;
          flex-direction: row;
          .contentspan {
            text-align: center;
            line-height: 40px;
            margin-left: 5%;
            margin-right: 6%;
          }
          .el-range-editor--small.el-input__inner {
            top: 2%;
            margin-left: 0%;
            height: 38px;
            width: 60%;
          }
        }
        .contentrow:nth-child(5) {
          .el-button {
            margin: 14% 12% 11% 28%;
            width: 250px !important;
            border: 2px solid #4caf50; /* Green */
          }
        }
      }
    }
    .item4 {
      grid-area: pt4;
    }
    .item5 {
      grid-area: pt5;
      .content {
        .el-table {
          margin: 10% 5% 0% 0%;
        }
      }
    }
  }
}
</style>
