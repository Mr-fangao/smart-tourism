<template>
  <div class="com-pointgather">
    <div id="map"></div>
    <div class="control">
      <div style="padding-top: 10px">
        <el-button id="button1">取消聚类</el-button>
      </div>
      <div style="padding-top: 10px">
        <el-button id="button2">执行聚类</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pointgather",
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

      document.getElementById("button2").addEventListener("click", () => {
        map.setLayoutProperty("points", "visibility", "none");
        map.setLayoutProperty("clusters", "visibility", "visible");
        map.setLayoutProperty("cluster-count", "visibility", "visible");
        map.setLayoutProperty("unclustered-point", "visibility", "visible");
        map.fitBounds([
          [25, -8], // 边界的西南角
          [-97, 67], // 边界的东北角
        ]);
      });
      document.getElementById("button1").addEventListener("click", () => {
        map.setLayoutProperty("points", "visibility", "visible");
        map.setLayoutProperty("clusters", "visibility", "none");
        map.setLayoutProperty("cluster-count", "visibility", "none");
        map.setLayoutProperty("unclustered-point", "visibility", "none");
        //添加数据
        map.addSource("earthquake", {
          type: "geojson",
          //指向GeoJSON数据。这个例子显示了所有的M1.0+地震
          // 15年12月22日至16年1月21日。
          data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        });

        //添加点图层
        map.addLayer({
          id: "points",
          type: "circle" /* symbol类型layer，一般用来绘制点*/,
          source: "earthquake",
          paint: {
            "circle-radius": 2,
            "circle-color": "#080",
          },
        });
      });

      map.on("load", function () {
        //从我们的GeoJSON数据中添加一个新的数据源，并设置
        // 'cluster'选项为true。GL-JS将向源数据添加point_count属性。
        map.addSource("earthquakes", {
          type: "geojson",
          //指向GeoJSON数据。这个例子显示了所有的M1.0+地震
          // 15年12月22日至16年1月21日。
          data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, //每个集群点的半径(默认为50)
        });

        //添加圆形聚合图层
        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "earthquakes",
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
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
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
          source: "earthquakes",
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
          source: "earthquakes",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
          //"source-layer": "button2"
        });

        //检查集群单击（点击聚合图层地图级别中心点变化）
        map.on("click", "clusters", function (e) {
          var features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          var clusterId = features[0].properties.cluster_id;
          map
            .getSource("earthquakes")
            .getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) return;
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        //聚合图层鼠标移入样式
        map.on("mouseenter", "clusters", function () {
          map.getCanvas().style.cursor = "pointer";
        });
        //聚合图层鼠标移出鼠标样式
        map.on("mouseleave", "clusters", function () {
          map.getCanvas().style.cursor = "";
        });
        let popup = new mapboxgl.Popup({ className: "my-class" });
        // 未聚合图层鼠标移入pop框显示
        map.on("mouseenter", "unclustered-point", function (e) {
          console.log(e);
          // 改变鼠标样式
          map.getCanvas().style.cursor = "pointer";
          let features = e.features[0].properties;
          popup.setLngLat(e.lngLat);
          popup.setHTML(
            `<h3>id: ${features.id}</h3><h3>time: ${features.time}</h3>`
          );
          popup.setMaxWidth("300px");
          popup.addTo(map);
        });
        // 未聚合图层鼠标移出pop框隐藏
        map.on("mouseleave", "unclustered-point", function () {
          // 改变鼠标样式
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
#map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.com-pointgather {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  background: red;
  .control {
    position: absolute;
    left: -30px;
    top: 3%;
    width: 14%;
    height: 38%;
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
</style>
