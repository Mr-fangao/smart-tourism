<template>
  <div class="content">
    <div id="map">
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
          </div>
        </div>
        <div class="pt item3">3</div>
        <div class="item4">4</div>
        <div class="pt item5">5</div>
        <div class="pt item6">6</div>
        <div class="pt item7">7</div>
      </div>
    </div>
  </div>
</template>

<script>
import areaSelect from "../components/areaSelect.vue";
export default {
  name: "recommend",
  components: {
    areaSelect,
  },
  data() {
    return {
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
      checkedLists: [],
      checkAll: false,
      isIndeterminate: false,
    };
  },
  mounted() {
    this.initmap();
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
  },
};
</script>

<style scoped lang="less">
.content {
  // height: calc(100% - 45px);
  height: 100%;
  width: 100%;
  #map {
    position: relative;
    .grid-container {
      position: absolute;
      display: grid;
      height: 100%;
      width: 100%;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "pt1 pt4 pt5 "
        "pt2 pt4 pt6 "
        "pt3 pt4 pt7 ";
      background-color: transparent;
      .title {
        float: left;
        font-size: 14pt;
        margin-left: 10px;
        margin-top: 5px;
      }
      .el-checkbox-button {
        width: 120px;
        height: 55px;
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
      // div {
      //   text-align: center;
      //   outline: 1px dashed rgb(136, 27, 27);
      // }
      .pt {
        background-color: rgba(127, 194, 172, 0.3);
      }
      .item1 {
        grid-area: pt1;
      }
      .item2 {
        grid-area: pt2;
      }
      .item3 {
        grid-area: pt3;
      }
      .item4 {
        grid-area: pt4;
      }
      .item5 {
        grid-area: pt5;
      }
      .item6 {
        grid-area: pt6;
      }
      .item7 {
        grid-area: pt7;
      }
    }
  }
}
</style>
