<template>
  <div class="com-heatmap">
    <div id="map"></div>
    <div class="map-overlay-inner">
            <h2>2021年旅游变化情况</h2>
            <label id="month"></label>
            <input id="slider" type="range" min="0" max="11" step="1" value="0">
        </div>
  </div>
</template>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
import heatMapData from "../../assets/json/heatMapData.json";
export default {
  name: "heatmap",
  mounted() {
    const oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.src = 'https://d3js.org/d3.v3.min.js';
    document.body.appendChild(oScript);
    this.initmap();
  },
 methods: {
    initmap() {
      this.$mapboxgl.accessToken =
         "pk.eyJ1IjoiY2hlbmpxIiwiYSI6ImNrcWFmdWt2bjBtZGsybmxjb29oYmRzZzEifQ.mnpiwx7_cBEyi8YiJiMRZg";
        var map = new this.$mapboxgl.Map({
            container: 'map',
             style: "mapbox://styles/chenjq/cl010ychv001214pdpa5xyq5a",
            center: [110, 40],
            zoom: 5,
        })
        document.getElementById('slider').addEventListener('input', (e) => {
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
            // Data courtesy of http://earthquake.usgs.gov/
            // Query for significant earthquakes in 2015 URL request looked like this:
            // http://earthquake.usgs.gov/fdsnws/event/1/query
            //    ?format=geojson
            //    &starttime=2015-01-01
            //    &endtime=2015-12-31
            //    &minmagnitude=6'
            //
            // Here we're using d3 to help us make the ajax request but you can use
            // Any request method (library or otherwise) you wish.
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
                .setLngLat(e.lngLat)
                .setPopup(popup) // sets a popup on this marker
                .addTo(map);
            map.on('click', 'earthquake-circles', (e, a) => {
                console.log(e, a)
                const width = 10;
                const height = 20;
                const features = map.queryRenderedFeatures(
                    [[e.point.x - width / 2, e.point.y - height / 2],
                    [e.point.x + width / 2, e.point.y + height / 2]],
                    { layers: ['earthquake-circles'] }
                );
                console.log(features)
                if (features.length <= 1) return;
                // console.log(features)
                // const popup = new mapboxgl.Popup({ offset: 25 }).setText(
                //     'Construction on the Washington Monument began in 1848.'
                // );
                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
                const properties = features[0].properties;
                [{
                    label: "标题",
                    value: "title",
                }, {
                    label: "网址",
                    value: "url",
                }].forEach(header => {
                    const p = document.createElement('p')
                    p.innerHTML = header.label + ":" + properties[header.value]
                    el.appendChild(p)
                })

                // create the marker
                new mapboxgl.Marker(el)
                    .setLngLat(e.lngLat)
                    .setPopup(popup) // sets a popup on this marker
                    .addTo(map);
            })

            map.on('mouseenter', 'places', (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'circle';

                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup.setLngLat(coordinates).setHTML(description).addTo(map);
            });

            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        }
    //   map.on("load", function () {
    //    map.addSource('heatDataSource', {
    //       "type": "geojson",
    //       // "data": "./data/heatMapData.json",
    //       "data": heatMapData,
    //     });
    //     map.addLayer({
    //       //此id可随意设置，但是要唯一
    //       "id": "testdatalayer",
    //       //指定类型为热力图
    //       "type": "heatmap",
    //       //指定数据来源，要和addSource中的id保持一致
    //       "source": "heatDataSource",
    //       //最大显示等级
    //       "maxzoom": 12,
    //       //设置绘制效果
    //       "paint": {
    //         //通过mag属性的值来设置每一个点对热力图强度的贡献
    //         //数值在0~6之间线性变化时,热力图的强度从0~1进行线性变化
    //         "heatmap-weight": [
    //           "interpolate",
    //           ["linear"],
    //           ["get", "AVG_SALARY"],
    //           3, 0,
    //           35, 1
    //         ],
    //         //根据地图的缩放级别来设置热力图的强度
    //         //缩放级别在0~9之间进行线性变化的时候，热力图的强度从1~3进行线性变化
    //         "heatmap-intensity": [
    //           "interpolate",
    //           ["linear"],
    //           ["zoom"],
    //           0, 1,
    //           12, 3
    //         ],
    //         //根据密度来设置热力图颜色
    //         //密度在0~1之间线性变换时，颜色也跟随变换
    //         "heatmap-color": [
    //           "interpolate",
    //           ["linear"],
    //           ["heatmap-density"],
    //           0, "rgba(33,102,172,0)",
    //           0.3, "rgb(103,169,207)",
    //           0.6, "rgb(209,229,240)",
    //           0.9, "rgb(253,219,199)",
    //           1, "rgb(239,138,98)",
    //         ],
    //         //根据地图的缩放级别来设置热力图的半径
    //         //缩放级别在0~9之间进行线性变化的时候，热力图的半径从2~20进行线性变化
    //         "heatmap-radius": [
    //           "interpolate",
    //           ["linear"],
    //           ["zoom"],
    //           0, 1,
    //           12, 20
    //         ],
    //         //设置热力图的透明度，在zoom处于7~9间将热力图逐渐的透明，在zoom大于9的时候完全透明
    //         "heatmap-opacity": [
    //           "interpolate",
    //           ["linear"],
    //           ["zoom"],
    //           10, 1,
    //           12, 0
    //         ]
    //       }
    //     });
    //   });  
    //   var navigationControl = new mapboxgl.NavigationControl();
    //   map.addControl(navigationControl, "top-left");
    //   map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    //   function checkFullscreenSupport() {
    //     return !!(
    //       window.document.fullscreenEnabled ||
    //       window.document.mozFullScreenEnabled ||
    //       window.document.msFullscreenEnabled ||
    //       window.document.webkitFullscreenEnabled
    //     );
    //   };
    //  var scale = new mapboxgl.ScaleControl({
    //     "maxWidth": 100,
    //     "unit": "metric"
    //   });
    //   map.addControl(scale, "bottom-left");
    //   map.on("click", function (e) {
    //     console.log("点击");
    //   });
    },
  },
};
</script>

<style scoped lang="less">
.com-heatmap {
  #map {
    height: 100%;
    // border: 1px solid red;
  }
  height: 100%;
}
       body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }

        .map-overlay {
            font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
            position: absolute;
            width: 25%;
            top: 0;
            left: 0;
            padding: 10px;
        }

        .map-overlay .map-overlay-inner {
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
            background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg');
            background-size: cover;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
        }

        .mapboxgl-popup {
            max-width: 200px;
             font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        }
</style>
