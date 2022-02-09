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
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 5px 0"></div>
            <el-checkbox-group
              v-model="checkedLists"
              @change="handleCheckedListChange"
            >
              <el-checkbox
                v-for="item in listData"
                :label="item.sign"
                :key="item.sign"
                class="drag-item"
                border
              >
                <span>{{ item.name }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="pt item2">2
          {{checkedLists}}
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
export default {
  name: "recommend",
  data() {
    return {
      listData: [
        { name: "1号", sign: 1 },
        { name: "2号", sign: 2 },
        { name: "3号", sign: 3 },
        { name: "4号", sign: 4 },
        { name: "5号", sign: 5 },
        { name: "6号", sign: 6 },
        { name: "7号", sign: 7 },
        { name: "8号", sign: 8 },
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
      height: calc(100% - 45px);
      width: 100%;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-template-areas:
        "pt1 pt4 pt5 "
        "pt2 pt4 pt6 "
        "pt3 pt4 pt7 ";
      background-color: transparent;
      .title{
        float: left;
        font-size: 16pt;
        margin-left: 10px;
      }
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
