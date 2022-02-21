<template>
  <div class="content">
    <div class="grid-container">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
// import areaSelect from "../components/areaSelect.vue";
// import echarts from "echarts";
// import wordcloud from "../assets/js/echarts-wordcloud-master/index";
// import dialogBar from "../components/dialog.vue";
// import poppage from "../components/poppage.vue";
// import dialogPage from "./dialogPage.vue";
export default {
  name: "recommend",
  data() {
    return {};
  },
  mounted() {
    this.initmap();
    // this.drawCloud(this.$refs.cloudEl, this.cloudData);
    // this.list = this.states.map((item) => {
    //   return { value: `value:${item}`, label: `label:${item}` };
    // });
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
    // indexMethod(index) {
    //   return index + 1;
    // },
    // hideModal() {
    //   // 取消弹窗回调
    //   this.show = false;
    // },

    // submit() {
    //   // 确认弹窗回调
    //   this.show = false;
    // },
    // // opendialogPage() {
    // //   this.modalVisible = true;
    // //   this.$nextTick(() => {
    // //     this.$refs.dialogPage.init();
    // //   });
    // //   console.log(1234);
    // // },
    // TableClick(val) {
    //   let thisRowData = this;
    //   thisRowData = val;
    //   console.log(val);
    //   this.showPop(val);
    // },
    // showPop(val) {
    //   this.porpID = val.id;
    //   this.show = true;
    // },
    // handleCheckAllChange(val) {
    //   this.checkedLists = val
    //     ? this.listData.map((item) => {
    //         return item.sign;
    //       })
    //     : [];
    //   this.isIndeterminate = false;
    // },
    // handleCheckedListChange(value) {
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.listData.length;
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.listData.length;
    // },
    // drawCloud(wrapEl, data) {
    //   let myChart = echarts.init(wrapEl);
    //   var option = {
    //     tooltip: {
    //       show: true,
    //     },
    //     series: [
    //       {
    //         name: "热词",
    //         type: "wordCloud",
    //         sizeRange: [10, 30],
    //         rotationRange: [-20, 20],
    //         shape: "circle",
    //         left: "center",
    //         top: "center",
    //         width: "100%",
    //         height: "100%",
    //         gridSize: 3,
    //         textPadding: 0,
    //         autoSize: {
    //           enable: true,
    //           minSize: 6,
    //         },
    //         textStyle: {
    //           normal: {
    //             color: function () {
    //               return (
    //                 "rgb(" +
    //                 [
    //                   Math.round(Math.random() * 250),
    //                   Math.round(Math.random() * 250),
    //                   Math.round(Math.random() * 250),
    //                 ].join(",") +
    //                 ")"
    //               );
    //             },
    //           },
    //           emphasis: {
    //             shadowBlur: 10,
    //             shadowColor: "#333",
    //           },
    //         },
    //         data: data,
    //       },
    //     ],
    //   };
    //   myChart.setOption(option);
    // },
    // remoteMethod(query) {
    //   if (query !== "") {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       this.options = this.list.filter((item) => {
    //         return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
    //       });
    //     }, 200);
    //   } else {
    //     this.options = [];
    //   }
    // },
    // openMask() {
    //   this.sendVal = true;
    // },
  },
};
</script>

<style scoped lang="less">
.content {
  height: calc(100% - 45px);
  width: 100%;
  .grid-container {
    position: absolute;
    display: grid;
    height: 100%;
    width: 100%;
    // grid-template-columns: 1fr 2fr 1fr;
    // grid-template-rows: repeat(3, 1fr);
    // grid-template-areas:
    //   "pt1 pt4 pt5 "
    //   "pt2 pt4 pt5 "
    //   "pt3 pt4 pt5 ";
    // background-color: transparent;
    // .title {
    //   float: left;
    //   font-size: 14pt;
    //   margin-left: 3%;
    //   margin-top: 2%;
    // }
    // .el-checkbox-button {
    //   width: 160px;
    //   height: 65px;
    //   margin: 0px 0px 0px 0px;
    //   .text {
    //     font-size: 10pt;
    //     letter-spacing: 0px;
    //     // padding: 12px 20px;
    //   }
    // }
    // /deep/.el-checkbox-button__inner{
    //   padding: 8px 10px;
    // }

    .pt {
      text-align: center;
      outline: 1px dashed rgb(136, 27, 27);
    }
  }
}
</style>
