<template>
  <div class="com-OD">
    <div class="Heat" ref="Heat" id="Heat"></div>
  </div>
</template>
<script>
<<<<<<< HEAD
import * as echarts from 'echarts';
import "echarts-gl";
import world from "../../assets/json/worlds.json";
=======
// import echarts from "echarts";
// import "echarts-gl";
import world from '../../assets/json/worlds.json';
>>>>>>> ce55d8ce8698b565675cae6685e0e55ed710ef8f

export default {
  name: "odfx",
  mounted() {
    this.map();
    window.addEventListener("resize", function () {
      mapsChart.resize();
    });
  },
  methods: {
    // initmap() {
    //   this.$mapboxgl.accessToken =
    //     "pk.eyJ1IjoibXItZmFuZ2FvIiwiYSI6ImNreW4yYzNidjBsdDQyb3JwbDdwYXR2cjcifQ.F5ecEIp6x8gJ1svcfz-qeQ";
    //   var map = new this.$mapboxgl.Map({
    //     container: "map",
    //     style: "mapbox://styles/mapbox/streets-v11",
    //     center: [104.07, 30.67],
    //     zoom: 5,
    //     // pitch: 60, //视野倾斜，0-60
    //     // bearing: -17.6,//视野旋转角度
    //   });
    //   map.on("click", function (e) {
    //     console.log("点击");
    //   });
    map() {
      this.$nextTick(() => {
        let maps = this.$refs.Heat;
        let mapsChart = this.$echarts.init(maps);
        this.$echarts.registerMap("world", WorldJson);
        let canvas = document.createElement("canvas");
        let mapChart = echarts.init(canvas, null, {
          width: 4096,
          height: 2048,
        });
        //航线终点位置
        const coord = [
          [61.210817, 35.650072],
          [16.326528, -5.87747],
        ];
        //航线起点终点位置
        const lines_coord = [
          {
            coords: [
              [2.691702, 6.258817],
              [61.210817, 35.650072],
            ],
          },
          {
            coords: [
              [2.691702, 6.258817],
              [16.326528, -5.87747],
            ],
          },
        ];
        //航线飞机模型
        var planePath =
          "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
        mapChart.setOption({
          geo: {
            name: "地图",
            // type: 'map',  //地图种类、
            map: "world", //地图类型。
            zlevel: 0,
            show: true,
            layoutCenter: ["50%", "50%"],
            roam: false,
            layoutSize: "90%",
            zoom: 1,

            label: {
              normal: {
                show: false,
                textStyle: {
                  fontSize: 14,
                  // 文字顔色
                  color: "#43D0D6",
                },
              },
            },
            itemStyle: {
              //地图区域的多边形 图形样式。
              emphasis: {
                //高亮状态下的样试
                label: {
                  show: true,
                },
                areaColor: "#FFB800",
              },
              normal: {
                areaColor: "#1b579c",
                borderWidth: 1, //设置外层边框
                borderColor: "#1ECEF4",
              },
            },
          },
          viewControl: {
            autoRotate: false,
          },
          series: [
            {
              // effectScatter画散点【起点】
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              symbolSize: 6,
              rippleEffect: {
                period: 3,
                brushType: "stroke",
                scale: 2,
              },
              itemStyle: {
                color: "#FFB800",
                opacity: 0.7,
              },
              data: coord.slice(2),
            },
            {
              // 画中心散点【终点】,这里是为了区分起点终点不同样式，所以分开写，如果二者样式一样那就直接合在一起写就好了
              type: "effectScatter",
              coordinateSystem: "geo",
              zlevel: 2,
              symbolSize: 10,
              rippleEffect: {
                period: 4,
                brushType: "stroke",
                scale: 4,
              },
              itemStyle: {
                color: "#FF5722",
                opacity: 1,
              },
              data: coord.slice(0, 2),
            },
            //这里设了2条不同效果的飞线是为了讲他们叠加起来，满足飞机后面白色的喷气动画效果
            {
              type: "lines",
              zlevel: 1,
              effect: {
                show: true,
                period: 5,
                trailLength: 0.7,
                color: "#fff",
                symbolSize: 3,
              },
              lineStyle: {
                normal: {
                  color: "#FFB800",
                  width: 0,
                  curveness: 0.2,
                },
              },
              data: lines_coord,
            },
            {
              // lines画线
              type: "lines",
              coordinateSystem: "geo",
              zlevel: 2,
              symbol: ["none", "arrow"], //设置飞线的起点终点处的绘制图形
              symbolSize: 12,
              effect: {
                show: true,
                period: 5, //箭头指向速度，值越小速度越快
                trailLength: 0, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: planePath, //飞机图标
                symbolSize: 15, //图标大小
                color: "#01AAED",
              },
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  lineStyle: {
                    type: "solid",
                    shadowBlur: 10,
                  },
                },
              },
              lineStyle: {
                //飞线的样式
                normal: {
                  width: 1.2,
                  opacity: 0.6,
                  curveness: 0.2,
                  color: "#FFB800",
                },
              },
              data: lines_coord,
            },
          ],
        });

        let option = {
          globe: {
            globeRadius: 100,
            globeOuterRadius: 150,
            silent: true,
            shading: "color",
            environment: "#000",
            baseTexture: mapChart,
            viewControl: {
              autoRotate: true,
            },
            light: {
              main: {
                color: "#fff",
                intensity: 1,
                shadow: false,
                alpha: 55,
                beta: 10,
              },
              ambient: {
                color: "#fff",
                intensity: 1,
              },
              postEffect: {
                enable: true,
                SSAO: {
                  enable: true,
                  radius: 10,
                },
              },
            },
          },
        };

        mapsChart.setOption(option);
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-OD {
  #Heat {
    height: 500px;
    // border: 1px solid red;
  }

  height: 300px;
  background: red;
}
</style>
