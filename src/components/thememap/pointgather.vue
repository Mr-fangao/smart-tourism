<template>
  <div class="com-pointgather">
    <div id="map"></div>
    <div class="mapcontral">
      <div class="dataselect">
        <div class="selecttitle">
          <div class="title-img"></div>
          <div class="title-text">制图数据选择</div>
        </div>
        <el-menu>
          <el-menu-item
            id="button3"
            index="1"
            :class="index === 1 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="1">&ensp;</el-radio>
            <span class="tab" slot="title">景点数</span>
          </el-menu-item>
          <el-menu-item
            id="button4"
            index="2"
            :class="index === 2 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="2">&ensp;</el-radio>
            <span class="tab" slot="title">游记数</span>
          </el-menu-item>
          <el-menu-item
            id="button5"
            index="3"
            :class="index === 3 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="3">&ensp;</el-radio>
            <span class="tab" slot="title">评论数</span>
          </el-menu-item>
          <el-menu-item
            id="button6"
            index="4"
            :class="index === 4 ? 'active' : ''"
            plain
          >
            <el-radio v-model="datachange" label="4">&ensp;</el-radio>
            <span class="tab" slot="title">好评数</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="creatmap">
        <!-- <el-button id="button2">开始制图</el-button> -->
      </div>
    </div>
    <div class="control">
      <div style="padding-top: 10px">
        <el-button id="button1">取消聚类</el-button>
      </div>
      <div style="padding-top: 10px">
        <el-button id="button2">执行聚类</el-button>
      </div>
    </div>
    <div class="my-class"></div>
  </div>
</template>
<script>
import travelimage from "../../assets/img/travel.png";
import heatMapData from "../../assets/json/heatMapData.json";
import testjson from "../../assets/json/point.json";
export default {
  name: "pointgather",
  data() {
    return {
      datachange: "",
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
        style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
        center: [110, 40],
        zoom: 5,
      });
      //添加数据源1
      document.getElementById("button3").addEventListener("click", () => {
        //加载前先移除图层
        if (map.getLayer("points")) map.removeLayer("points");
        if (map.getLayer("clusters")) map.removeLayer("clusters");
        if (map.getLayer("cluster-count")) map.removeLayer("cluster-count");

        if (map.getSource("sensicjson")) {
          const geojsonSource = map.getSource("sensicjson");
          geojsonSource.setData(testjson);
          const geojsonSource1 = map.getSource("sensicjson1");
          geojsonSource1.setData(testjson);
        } else {
          map.addSource("sensicjson", {
            type: "geojson",
            data: testjson,
            cluster: true, //聚合图的数据源需要添加样式
            clusterMaxZoom: 14, //最大缩放到群集点
            clusterRadius: 50,
          });

          map.loadImage(travelimage, (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage("travel", image);
            map.addSource("point", {
              type: "geojson",
              data: heatMapData,
            });
          });
        }
      });
      //添加数据源类型2
      document.getElementById("button4").addEventListener("click", () => {
        //加载前先移除图层
        if (map.getLayer("points")) map.removeLayer("points");
        if (map.getLayer("clusters")) map.removeLayer("clusters");
        if (map.getLayer("cluster-count")) map.removeLayer("cluster-count");
        // if(map.getSource('testjson'))map.setData('heatMapData');
        // if(map.getSource('testjson'))map.removeSouce('testjson'); debugger;
        //首先判断数据源是否存在，存在的使用setdata方法
        if (map.getSource("sensicjson")) {
          const geojsonSource = map.getSource("sensicjson");
          geojsonSource.setData(heatMapData);
          const geojsonSource1 = map.getSource("sensicjson1");
          geojsonSource1.setData(heatMapData);
        } //不存在使用addSource方法
        else {
          map.addSource("sensicjson", {
            type: "geojson",
            data: heatMapData,
            cluster: true, //聚合图的数据源需要添加样式
            clusterMaxZoom: 14, //最大缩放到群集点
            clusterRadius: 50,
          });
          map.loadImage(travelimage, (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage("travel", image);
            map.addSource("point", {
              type: "geojson",
              data: heatMapData,
            });
          });
        }
      });
      //添加数据源类型3
      document.getElementById("button5").addEventListener("click", () => {});

      document.getElementById("button2").addEventListener("click", () => {
        //加载图层前需要清除所有图层，防止图层加载重叠。
        if (map.getLayer("points")) map.removeLayer("points"); //填写需要清除图层的ID，每次只能清除一个。有几个图层就使用几次。

        map.setLayoutProperty("points", "visibility", "none");
        map.setLayoutProperty("clusters", "visibility", "visible");
        map.setLayoutProperty("cluster-count", "visibility", "visible");
        map.setLayoutProperty("unclustered-point", "visibility", "visible");

        //添加圆形聚合图层
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "sensicjson",
          filter: ["has", "point_count"],
          paint: {
            //使用步骤表达式(https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            //用三个步骤实现三种类型的循环:
            // *蓝色，20px圆，点计数小于100
            // *黄色，30px的圆圈，点计数在100和750之间
            // *粉红色，40px的圆圈，当点数大于等于750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#fff591",
              100,
              "#ff8a5c",
              750,
              "#e41749",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
          //"source-layer": "button2"
        });

        //添加数字图层
        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "sensicjson",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          //"source-layer": "button2"
        });

        //添加未聚合图层
        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "sensicjson",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#f5587b",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
          //"source-layer": "button2"
        });
        map.fitBounds([
          [90, 45], // 边界的西南角
          [120, 30], // 边界的东北角
        ]);
      });

      document.getElementById("button1").addEventListener("click", () => {
        map.setLayoutProperty("points", "visibility", "visible");
        map.setLayoutProperty("clusters", "visibility", "none");
        map.setLayoutProperty("cluster-count", "visibility", "none");
        map.setLayoutProperty("unclustered-point", "visibility", "none");
        //添加数据
        //添加点图层
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "point", // reference the data source
          layout: {
            "icon-image": "travel", // reference the image
            "icon-size": 0.15,
          },
        });
      });

      map.on("load", function () {
        //从我们的GeoJSON数据中添加一个新的数据源，并设置
        // 'cluster'选项为true。GL-JS将向源数据添加point_count属性。
        map.on("load", () => {
          jsonCallback;
        });
        function jsonCallback(err, data) {
          if (err) {
            throw err;
          }
          data.features = data.features.map((d) => {
            d.properties.month = new Date(d.properties.time).getMonth();
            // d.properties.coordinates = new location(d.properties.geometry).getElementById("coordinates");
            return d;
          });
        }

        map.on("click", "unclustered-point", (e) => {
          // Copy coordinates array.
          const coordinates = e.features[0].geometry.coordinates.slice();
          const name = e.features[0].properties.name;

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup().setLngLat(coordinates).setHTML(name).addTo(map);
        });
        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on("mouseenter", "unclustered-point", () => {
          map.getCanvas().style.cursor = "pointer";
        });

        // Change it back to a pointer when it leaves.
        map.on("mouseleave", "unclustered-point", () => {
          map.getCanvas().style.cursor = "";
        });

        //检查集群单击（点击聚合图层地图级别中心点变化）
        map.on("click", "clusters", function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          var clusterId = features[0].properties.cluster_id;
          map
            .getSource("sensicjson")
            .getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
      });
    },
  },
  // destroyed(){
  //   this.map.removeLayer("")
  // }
};
</script>

<style scoped lang="less">
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.mapcontral {
  position: absolute;
  z-index: 1;
  width: 75.5%;
  height: 4%;
  bottom: 46.8%;
  left: 23.6%;
  background: url("../../assets/img/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  .dataselect {
    float: left;
    height: 100%;
    width: 92%;
    .selecttitle {
      float: left;
      width: 15%;
      height: 100%;
      .title-img {
        width: 23%;
        float: left;
        height: 100%;
        background: url("../../assets/img/panelIcon.png");
        background-size: 100% 100%;
      }
      .title-text {
        width: 76%;
        float: left;
        height: 100%;
        color: #dae2e2;
        font-size: 11pt;
        line-height: 32px;
      }
    }
    background-color: #12526ea9;
    .el-menu {
      float: left;
      width: 85%;
      height: 85%;
      right: 0%;
      background: transparent;
      // background: url("../../assets/img/buttonbg.png") no-repeat;
      // background-size: 100% 100%;
      border: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /deep/.el-radio {
        margin-right: 0;
        .el-radio__label {
          padding-left: 0px;
        }
      }
      .tab {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: row;
      }
    }
    .el-menu-item.is-active {
      // color: #15c5c5;
      // background: transparent;
      // border-bottom: 3px solid #c6e2ff;
    }
    .el-menu-item {
      width: 20%;
      color: #fff;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background: transparent;
    }
    .el-menu-item:hover {
      background: transparent;
    }
        /deep/.el-radio__input.is-checked .el-radio__inner {
      border-color: #94b2bb;
      background: #3fb0d3;
    }
    .span {
      color: aliceblue;
    }
    ul {
      height: 100%;
      list-style-type: none; /*消除黑点*/
      text-align: center;
      li {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        p {
          color: aqua;
          font-size: 12px;
          font-family: Microsoft YaHei;
          // font-weight: bold;
          text-decoration: none; /*消除下划线*/
          border-radius: 5px;
          padding-bottom: 20px;
        }
      }
    }
  }
  .creatmap {
    height: 100%;
    width: 40%;
  }
}
.com-pointgather {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  background: transparent;
  .control {
    position: absolute;
    z-index: 9999;
    left: 66%;
    top: 8%;
    width: 8%;

    height: 14%;
    // #button1 {
    //   background: url("../../assets/img/框.png");
    //   z-index: 9999;
    // }
    // #button2 {
    //   z-index: 9999;
    // }
  }
}
/deep/.el-button {
  background: url("../../assets/img/框.png");
  background-size: 100% 100%;
  // background: #24bff390;
  border: 0px solid #d80d4a;
  color: #ffffff;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 5px;
}
/deep/.el-button:focus,
.el-button:hover {
  color: #75f8ed;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.mapboxgl-popup {
  max-width: 200px;
}
</style>