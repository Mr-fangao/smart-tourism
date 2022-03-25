<template>
<div>

  <div class="CityChooseTitle">城市选择（点击下方选择城市）</div>

  <el-input id="ChooseInput" class="InputChoose" type="search" v-model="search" placeholder="请输入分析的城市"></el-input>

  <div class="ChooseTable">
    <el-table
      stripe
      size="mini"
      :data="tables"
      style="width: 570px;"
      @row-click="getValue"
      max-height="540"
      :header-cell-style="{color:'rgba(255,255,255,.75)',fontWeight:'bold',fontSize:'17px',fontFamily:'KuHei',height: '10px',lineHeight: '15px'}"
      :cell-style="TableStyle"
      :default-sort="{prop:'confirmd', order: 'descending'}"
    >

      <el-table-column sortable label="确诊人数" width="105" prop="confirmd"></el-table-column>
      <el-table-column label="城市" width="70" prop="city"></el-table-column>
      <el-table-column label="省份" width="70" prop="province"></el-table-column>
      <el-table-column sortable label="疑似" width="68" prop="uncertain"></el-table-column>
      <el-table-column sortable label="治愈" width="85" prop="removed"></el-table-column>
      <el-table-column sortable label="死亡" width="85" prop="dead"></el-table-column>
    </el-table>

  </div>


</div>
</template>

<script>
import {loadModules} from "esri-loader";
import axios from "axios";

export default {
  name: "ChCity",
  data() {
    return {
      city: "",
      ArcGISView: "",
      ArcGISMap: "",
      search: "",
      tableData: "",
      loading:""
    }
  },
  mounted: function () {
  },
  computed: {
    // 实时监听表格
    tables: function () {
      const search = this.search;
      if (search) {
        return this.tableData.filter(dataNews => {
          return Object.keys(dataNews).some(key => {
            return (
              String(dataNews[key]).toLowerCase().indexOf(search) > -1
            );
          });
        });
      }
      return this.tableData;
    },
    ValueDate: function () {
      return this.DayValue.toString().substring(1, 2);
    },
    ValueDay: function () {
      return this.DayValue.toString().substring(2, 4);
    }
  },
  methods: {
    getData() {
      axios.get("../../assets/json/ChinaCity.json").then((res) => {
        this.tableData = res.data;
      });
    },
    getValue(row) {
      this.city = row.city
      const h = this.$createElement;
      this.$msgbox({
        title: '消息',
        message: h('p', null, [
          h('span', {style: 'color: rgba(255,255,255,.7);font-size: 16px;font-family: KuHei'}, '您选择分析的城市是 '),
          h('i', {style: 'color: rgba(234, 80, 6, 0.86);font-family: KuHei;font-size: 25px;font-weight: bold;margin-left: 3px;'}, this.city + '市')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'CityChooseConfirmButton',
        cancelButtonClass: 'CityChooseCancelButton',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
                if (this.city == '武汉') {

                  const option = {      //定义一个包含有JS API中js开发包和css样式文件的对象
                    url: 'http://js.arcgis.com/4.18/dojo/dojo.js',
                    css: 'https://js.arcgis.com/4.18/esri/themes/dark-blue/main.css',
                  };
                  //通过loadModules来做衔接
                  loadModules(['esri/Map',
                    'esri/Basemap',
                    'esri/layers/TileLayer',
                    'esri/views/SceneView',
                    'esri/Camera'], option)
                    .then(([Map, Basemap, TileLayer, SceneView, Camera]) => {
                        this.ISTABLESHOW = false;
                        $('#CityChooseMap').css({'width': '100%'});
                        this.ArcGISMap.layers.removeAll()
                        this.ArcGISView.goTo(
                          {
                            position: {
                              latitude: 30.496430212030372,
                              longitude: 114.33775168144918,
                              z: 27834.256962249056
                            },
                            tilt: 0, // looking from a bird's eye view
                            heading: 359.1667296195927
                          },
                          {
                            speedFactor: 0.5
                          })

                      }
                    )

                  // this.$router.push({ path: '/CityMap' })
                } else {
                  this.$notify({
                    title: '警告',
                    message: '系统暂不支持' + this.city + '市',
                    type: 'warning'
                  });
                }
              }, 100);
            }, 1000);
          } else {
            done();
          }
        }
      });
      // $("#echartsData").remove();
    },
    showDate(val) {
      val = val + "";
      if (val.indexOf(this.search) !== -1 && this.search !== "") {
        return val.replace(
          this.search,
          '<font color="#409EFF">' + this.search + "</font>"
        );
      } else {
        return val;
      }
    },
    TableStyle(column) {
      if (column.columnIndex === 0) {
        return "color: rgba(230, 53, 0, 0.89);fontWeight: bold;fontSize: 22px;fontFamily:Orbitron; position:relative;padding-top: 7px;"
      }
      ;
      if (column.columnIndex === 1) {
        return "color: rgb(171, 166, 166);fontWeight: bold;fontSize: 18px;fontFamily:KuHei"
      }
      ;
      if (column.columnIndex === 2) {
        return "color: rgb(171, 166, 166);fontWeight: bold;fontSize: 18px;fontFamily:Orbitron"
      }
      ;
      if (column.columnIndex === 3) {
        return "color: rgb(171, 166, 166);fontWeight: bold;fontSize: 18px;fontFamily:Orbitron"
      }
      ;
      if (column.columnIndex === 4) {
        return "color: rgb(171, 166, 166);fontWeight: bold;fontSize: 18px;fontFamily:Orbitron"
      }
      ;
      if (column.columnIndex === 5) {
        return "color: rgb(171, 166, 166);fontWeight: bold;fontSize: 18px;fontFamily:Orbitron"
      }
      ;

    },
  },
  created() {
    this.getData();
    this.arr = Array.from(new Array(20), (v, k) => {
      return k + 1;
    });
    // 表格显示5行数据，此处复制开头的5条数据实现无缝
    this.arr = this.arr.concat(this.arr.slice(0, 5));
  },
}
</script>

<style scoped>

</style>
