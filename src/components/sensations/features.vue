<template>
  <div id="com-features">
    <selectRegion />
    <div id="map" />
    <div class="features-left">
      <div class="row1 left-part">
        <div class="features-title">
          <span>旅游产品特征分析</span>
        </div>
        <div class="content">
          <div class="search">
            <div class="searchinput">
              <el-input
                v-model="selectinput"
                placeholder="输入内容或点击词云标签"
              ></el-input>
            </div>
            <div class="buttoncontent">
              <pbutton :name="buttonname" @click="sd "></pbutton>
            </div>
          </div>
          <div class="chosenlabel">
            <word3D
              :height="word3Dheight"
              :width="word3Dwidth"
              :data="wordcloudchina"
            >
            </word3D>
          </div>
        </div>
      </div>
      <div class="row2 left-part"></div>
      <div class="row3 left-part"></div>
    </div>
  </div>
</template>
<script>
import pbutton from "../button.vue";
import eventBum from "../cityselect/EvebtBus";
import SelectRegion from "../cityselect/newselectRegion.vue";
import word3D from "../wordcloud3D.vue";
import nanjing from "../../assets/json/nanjingpoint.json";
import njprovince from "../../assets/json/njprovince.json";
import echarts from "echarts";
import request from "../../utils/request";

export default {
  name: "city",
  components: {
    SelectRegion,
    pbutton,
    word3D,
    eventBum,
  },

  data() {
    return {
      word3Dheight: 200, //3D词云大小
      word3Dwidth: 350,
      buttonname: "分析", //按钮名称
      selectinput: "",
      placeholder: "",
      selectcity: {
        name: "中国",
        level: 0,
      },
      wordcloudchina: [
        { value: 29434, name: "酒店" },
        { value: 21500, name: "公园" },
        { value: 20010, name: "中国" },
        { value: 17380, name: "旅游" },
        { value: 16933, name: "文化" },
        { value: 16792, name: "博物馆" },
        { value: 16409, name: "历史" },
        { value: 16259, name: "古镇" },
        { value: 13814, name: "风景区" },
        { value: 13705, name: "门票" },
        { value: 13371, name: "城市" },
        { value: 10335, name: "广场" },
        { value: 8753, name: "草原" },
        { value: 8288, name: "拍照" },
        { value: 7507, name: "北京" },
        { value: 6881, name: "自驾游" },
        { value: 6844, name: "自然" },
        { value: 6752, name: "黄河" },
        { value: 6538, name: "瀑布" },
        { value: 5922, name: "成都" },
        { value: 5568, name: "温泉" },
        { value: 5564, name: "湿地" },
        { value: 5249, name: "遗址" },
        { value: 5034, name: "重庆" },
        { value: 4946, name: "新疆" },
        { value: 4923, name: "峡谷" },
        { value: 4493, name: "西安" },
        { value: 4287, name: "老街" },
        { value: 4229, name: "广州" },
        { value: 4075, name: "国家森林公园" },
        { value: 4070, name: "地质公园" },
        { value: 3995, name: "沙漠" },
      ],
    };
  },

  computed: {},

  mounted() {
    this.initmap();
    eventBum.$on("features", (features) => {
      console.log(features);
      this.selectinput += features + "、";
    });
  },

  methods: {
    postFeature(){
      
    },
    handleResize() {
      this.myChart2 && this.myChart2.resize();
    },
    initmap() {
      this.$mapboxgl.accessToken =
        "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
      var map = new this.$mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/chenjq/cl084urgf004014ny2nhu1xre",
      });
    },
  },
  watch: {},
};
</script>

<style scoped lang="less">
#com-features {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
}
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.features-left {
  position: absolute;
  height: 92%;
  width: 22.5%;
  margin-left: 0.4%;
  margin-top: 0.4%;
  background: url("../../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .left-part {
    height: 30%;
    width: 100%;
    .content {
      height: 88%;
      width: 100%;
    }
  }
  .row1 {
    height: 40%;
    .content {
      .search {
        height: 22%;
        width: 100%;
        display: flex;
        align-items: center;
        .searchinput {
          width: 70%;
          height: 55%;
          .el-input {
            height: 100%;
          }
          /deep/.el-input__suffix {
            .el-icon-circle-close:before {
              // margin-top: -100%;
            }
          }
          /deep/.el-input__inner {
            &::placeholder {
              color: rgba(194, 194, 194, 0.815);
              font-size: 14px;
            }
            -webkit-appearance: none;
            background: transparent;
            border-radius: 4px;
            border: 2px solid #1abbf1a6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: rgba(220, 225, 227, 0.96);
            font-size: inherit;

            height: 100%;
            line-height: 36px;
            width: 90%;
          }
        }
        .buttoncontent {
          width: 30%;
          height: 60%;
        }
      }
      .chosenlabel {
        height: 78%;
        width: 100%;
      }
    }
  }
}
.features-title {
  padding-top: 1%;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: url("../../assets/img/titlebg.png") no-repeat;
  background-position: 4% 88%;
  background-size: 50% 82%;
  > span {
    color: #a7e3eb;
    font-size: 14px;
    margin-left: 13%;
  }
}
</style>