<template>
  <div class="com-heatmap">
    <div id="map"></div>
    <div class="map-overlay-inner">
      <h2>2021年旅游变化情况</h2>
      <label id="month"></label>
      <input id="slider" type="range" min="0" max="11" step="1" value="0" />
    </div>
  </div>
</template>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
import heatMapData from "../../assets/json/heatMapData.json";
export default {
  name: "heatmap",
  mounted() {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://d3js.org/d3.v3.min.js";
    document.body.appendChild(oScript);
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
      document.getElementById("slider").addEventListener("input", (e) => {
        const month = parseInt(e.target.value, 10);
        filterBy(month);
      });
     const months = [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
        ];

        function filterBy(month) {
            const filters = ['==', 'month', month];
            map.setFilter('earthquake-circles', filters);
            map.setFilter('earthquake-labels', filters);

            // Set the label to the month
            document.getElementById('month').textContent = months[month];
        }

        map.on('load', () => {
            d3.json(
                'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
                jsonCallback
            );
        });

        function jsonCallback(err, data) {
            if (err) {
                throw err;
            }

            // Create a month property value based on time
            // used to filter against.
            data.features = data.features.map((d) => {
                d.properties.month = new Date(d.properties.time).getMonth();
                // d.properties.coordinates = new location(d.properties.geometry).getElementById("coordinates");
                return d;
            });

            map.addSource('earthquakes', {
                'type': 'geojson',
                data: data
            });

            map.addLayer({
                'id': 'earthquake-circles',
                'type': 'circle',
                'source': 'earthquakes',
                'paint': {
                    'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        6,
                        '#FCA107',
                        8,
                        '#7F3121'
                    ],
                    'circle-opacity': 0.75,
                    'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['get', 'mag'],
                        6,
                        20,
                        8,
                        40
                    ]
                }
            }
            );

            map.addLayer({
                'id': 'earthquake-labels',
                'type': 'symbol',
                'source': 'earthquakes',
                'layout': {
                    'text-field': ['concat', ['to-string', ['get', 'mag']], 'm'],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12
                },
                'paint': {
                    'text-color': 'rgba(0,0,0,0.5)'
                }
            });

            // Set filter to first month of the year
            // 0 = January
            filterBy(0);
            // Create a popup, but don't add it to the map yet.
            // create the popup
            const popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true
            })
            map.on('click', 'earthquake-circles', (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const place = e.features[0].properties.place;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(place)
                    .addTo(map);

            });
            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'earthquake-circles', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'earthquake-circles', () => {
                map.getCanvas().style.cursor = '';
            });
        }
    },
  },
};
</script>

<style scoped lang="less">
.com-heatmap {
  position: fixed;
  height: 100%;
  width: 100%;
}
body {
  margin: 0;
  padding: 0;
}

#map {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
}
.map-overlay-inner {
  position: absolute;
  z-index: 99999999;
  margin-left: 30%;
  top: 0;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay h2 {
  line-height: 24px;
  display: block;
  margin: 0 0 10px;
}

.map-overlay .legend .bar {
  height: 10px;
  width: 100%;
  background: linear-gradient(to right, #fca107, #7f3121);
}

.map-overlay input {
  background-color: transparent;
  display: inline-block;
  width: 100%;
  position: relative;
  margin: 0;
  cursor: ew-resize;
}
#marker {
  background-image: url("https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}

</style>
