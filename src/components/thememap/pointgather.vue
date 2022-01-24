<template>
  <div class="com-pointgather">
    <div id="map"></div>
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
        'pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg'; 
        var map = new this.$mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [-103.59179687498357, 40.66995747013945],
            zoom: 2
        })
        map.on('load', function () {
            map.addSource("fillSourceID", {
                type: "geojson" /* geojson类型资源 */,
                data: "../../../public/json/china.json" /* geojson数据 */
            });
            map.addLayer({
                id: "fillID",
                type: "fill" /* fill类型一般用来表示一个面，一般较大 */,
                source: "fillSourceID",
                paint: {
                    "fill-color": {
                        property: "confirmed", // this will be your density property form you geojson
                        stops: [
                            [0, '#FFEDA0'],
                            [1000, '#FED976'],
                            [2000, '#FEB24C'],
                            [3000, '#FD8D3C',],
                            [4000, '#FC4E2A'],
                            [5000, '#E31A1C'],
                            [20000, '#BD0026']
                        ]
                    },
                    "fill-opacity": 1 /* 透明度 */
                }
            });
            const layers = [
                '0-1000',
                '1000-2000',
                '2000-3000',
                '3000-4000',
                '4000-5000',
                '5000以上'
            ];
            const colors = [
                '#FFEDA0',
                '#FED976',
                '#FEB24C',
                '#FD8D3C',
                '#FC4E2A',
                '#E31A1C'
            ];

            //添加数据
            const legend = document.getElementById('legend');
            layers.forEach((layer, i) => {
                const color = colors[i];
                const item = document.createElement('div');
                const key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;

                const value = document.createElement('span');
                value.innerHTML = `${layer}`;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            });
            // change info window on hover
            map.on('mousemove', (event) => {
                const states = map.queryRenderedFeatures(event.point, {
                    layers: ['fillID']
                });
       

                document.getElementById('pd').innerHTML = states.length
                    ? `<h3>${states[0].properties.name}</h3><p><strong><em>${states[0].properties.confirmed}</strong>个工作岗位</em></p>`
                    : `<p>没有数据</p>`;
            });
        });

      map.on("click", function (e) {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-pointgather {
  #map {
    height: 100%;
    // border: 1px solid red;
  }
  height: 100%;
  background: red;
}
</style>
