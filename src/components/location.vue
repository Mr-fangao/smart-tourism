<template>
  <div class="com-loc">
    <div id="map"></div>
  </div>
</template>
<script>
import eventBum from "../views/traffickingnetwork/public/js/EvebtBus";
import nanjing from "../assets/json/nanjing.json";
import njprovince from "../assets/json/njprovince.json";
export default {
  name: "loc",
  data() {
    return {
      selectcity: {
        name: "中国",
        level: 0,
      },
    };
  },
  components: {
    eventBum,
  },
  mounted() {
    this.initmap();
    eventBum.$on("json", (json) => {
      this.selectcity.name = json.name;
      this.selectcity.level = json.where;
      console.log(this.selectcity);
    });
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
      map.on('load', () => {
        map.addSource('njmark',{
          type: "geojson",
          data: nanjing
        });
        	map.addSource('njpolygon', {
				type: "geojson",
				data: njprovince
			});
      	map.addLayer({
				id: "fillID",
				type: 'fill'/* symbol类型layer，一般用来绘制点*/,
				source: "njpolygon",
				paint: {
				"fill-color":"#FC4E2A",
				"fill-opacity": 0.6 /* 透明度 */
				},
		});
       	map.addLayer({
            'id': 'earthquakes-layer',
            'type': 'circle',
            'source': 'njmark',
            'paint': {
              'circle-radius': 5,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
                }
          });
		  map.addLayer({
				id: "points",
				type: 'symbol'/* symbol类型layer，一般用来绘制点*/,
				source: "njmark",
				layout: {
					'text-field': ['get', 'name'],
					'text-offset': [1.5, 1.5] 
				},
       'paint': {
         'text-color':"#FFFFFF"
       }
       });
	
      });
    },
  },
};
</script>

<style scoped lang="less">
.com-loc {
  height: 100%;
  #map {
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
.map-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  margin-right: 20px;
  font-family: Arial, sans-serif;
  overflow: auto;
  border-radius: 3px;
}
</style>
