<template>
  <div id="recommend">
    <transition name="fade">
      <loading v-if="isLoading" :state="state"></loading>
    </transition>
    <div class="mapcontent">
      <keep-alive>
        <component :is="comp" v-show="isShow"></component>
      </keep-alive>
    </div>
    <!-- <div class="citychoose" @click="getCity()">
      <div class="iconcontent"><i class="fa fa-map-marker fa-lg"></i></div>
      <div class="cityname">{{ cityname }}</div>
    </div> -->
    <div class="mapcontral">
      <div class="selecttitle">
        <div class="title-img"></div>
        <div class="title-text">专题图选择</div>
      </div>
      <el-menu>
        <el-menu-item style="padding: 1%" @click="showmap(1)" plain>
          <el-radio v-model="mapchange" label="1">&ensp;</el-radio>
          <div class="mapimg map1"></div>
          <span class="tab" slot="title">聚合图</span>
        </el-menu-item>
        <el-menu-item @click="showmap(2)" plain>
          <el-radio v-model="mapchange" label="2">&ensp;</el-radio>
          <div class="mapimg map2"></div>
          <span class="tab" slot="title">分级图</span>
        </el-menu-item>
        <el-menu-item @click="showmap(3)" plain>
          <el-radio v-model="mapchange" label="3">&ensp;</el-radio>
          <div class="mapimg map3"></div>
          <span class="tab" slot="title">热力图</span>
        </el-menu-item>
        <el-menu-item @click="showmap(4)" plain>
          <el-radio v-model="mapchange" label="4">&ensp;</el-radio>
          <div class="mapimg map4"></div>
          <span class="tab" slot="title">时序图</span>
        </el-menu-item>
        <el-menu-item>
          <el-radio v-model="mapchange" label="5">&ensp;</el-radio>
          <span class="tab" slot="title">点数据</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="recommend-left pt">
      <div class="sourceselect">
        <div id="recommend-title">
          <span>数据总览</span>
        </div>
        <div class="datasource">
          <div class="leftpt">数据源:</div>
          <div class="rightpt">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="去哪儿"></el-checkbox>
              <el-checkbox label="马蜂窝"></el-checkbox>
              <el-checkbox label="携程网"></el-checkbox>
              <el-checkbox label="途牛网"></el-checkbox>
              <el-checkbox label="艺龙网"></el-checkbox>
              <el-checkbox label="美团网"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="toppart-content">
          <div class="Lpart toppart-part">
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 景点数 </span>
            <span class="partnumber"> {{ this.alldatacount.scenic }} </span>
          </div>
          <div class="Mpart toppart-part">
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 评论数 </span>
            <span class="partnumber"> {{ this.alldatacount.comment }} </span>
          </div>
          <div class="Rpart toppart-part">
            <div class="partimg">
              <div class="myimg"></div>
            </div>
            <span class="partname"> 游记数 </span>
            <span class="partnumber"> {{ this.alldatacount.travel }} </span>
          </div>
        </div>
        <div class="datatime">数据更新时间:{{ this.datatime }}</div>
      </div>
      <div class="ranktable">
        <div id="recommend-title" class="title">
          <span>排行榜单</span>
        </div>
        <div class="ranktable-content">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="好评榜" name="recommendTab">
              <el-table
                :data="tablescoreRankData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="30"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="180"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.score | rounding }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="热度榜" name="hotTab">
              <el-table
                :data="tableRankData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="30"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="180"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="70"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="推荐榜" name="scenicTab">
              <el-table
                :data="scenicdata"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="rank"
                  label="序号"
                  width="40"
                ></el-table-column>
                <el-table-column
                  prop="name"
                  label="景点"
                  width="120"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="hot"
                  label="热度"
                  width="80"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="分数"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.score | rounding }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="城市榜" name="cityTab">
              <el-table
                :data="tableCityData"
                height="328px"
                stripe
                style="width: 100%"
              >
                <el-table-column
                  prop="hotrank"
                  label="排名"
                  width="50"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="city"
                  label="城市"
                  width="100"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="sccount"
                  label="景点数目"
                  width="70"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="comcount"
                  label="热度"
                  width="70"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  prop="scscore"
                  label="分数"
                  width="60"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.scscore | rounding }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="recommend-right pt">
      <div class="chinahot">
        <div id="recommend-title" class="title">
          <span>旅游热词</span>
        </div>
        <!-- <div class="wordcontent" ref="chartword2"></div> -->
        <div class="wordcontent">
          <word3D
            :height="word3Dheight"
            :width="word3Dwidth"
            :data="wordcloudchina"
          >
          </word3D>
        </div>
      </div>
      <div class="sensicrecommend">
        <div id="recommend-title" class="title">
          <span>景点推荐</span>
        </div>
        <div class="recommend">
          <div class="smalltitle">
            <div class="textcontent">时间选择</div>
          </div>
          <div class="timepickcontent">
            <el-date-picker
              v-model="timevalue"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="smalltitle">
            <div class="textcontent">偏好选择</div>
          </div>
          <div class="perfer">
            <div class="prefercontent">
              <el-input
                v-model="input"
                placeholder=" 输入内容或点击标签"
              ></el-input>
            </div>
            <div class="exampellabel">
              <div class="labelcontent">
                <span>输入示例:</span>
                <div
                  class="chooselabel"
                  v-for="(item, i) in labellist"
                  :key="i"
                  @click="getLabel(item.name)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="smalltitle">
            <div class="textcontent">个人偏好</div>
          </div>
          <div class="person">
            <div class="select">
              <span>考虑评分：</span>
              <el-radio v-model="prferradio" label="score">评分优先</el-radio>
              <el-radio v-model="prferradio" label="hot">热度优先</el-radio>
            </div>
            <div class="select">
              <span>考虑距离：</span>
              <el-radio v-model="distancerange" label="1">本市</el-radio>
              <el-radio v-model="distancerange" label="2">本省</el-radio>
              <el-radio v-model="distancerange" label="3">邻省</el-radio>
            </div>
            <div class="select">
              <span>考虑季节：</span>
              <el-radio v-model="seasonrange" label="1">春</el-radio>
              <el-radio v-model="seasonrange" label="2">夏</el-radio>
              <el-radio v-model="seasonrange" label="3">秋</el-radio>
              <el-radio v-model="seasonrange" label="4">冬</el-radio>
            </div>
            <div class="ageandsex">
              <div class="agept">
                <div class="person-name">年龄:</div>
                <div class="person-inputcontent">
                  <input class="ageinput" v-model="ageinput" type="text" />
                </div>
              </div>
              <div class="sexpt">
                <div class="person-name">性别:</div>
                <div class="person-inputcontent">
                  <el-radio v-model="sexselect" label="1">男</el-radio>
                  <el-radio v-model="sexselect" label="2">女</el-radio>
                </div>
              </div>
            </div>
            <div class="occupationandincome">
              <div class="occupationpt">
                <div class="person-name">职业:</div>
                <div class="person-inputcontent">
                  <input
                    class="ageinput"
                    type="text"
                    v-model="occupationpt"
                    placeholder="输入职业"
                  />
                </div>
              </div>
              <div class="incomept">
                <div class="person-name">收入:</div>
                <div class="person-inputcontent">
                  <el-select
                    v-model="income"
                    clearable
                    placeholder="选择收入范围"
                  >
                    <el-option
                      v-for="item in income"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="buttoncontent">
            <el-button class="startbutton" @click="refeashData()"
              >清除条件</el-button
            >
            <el-button class="startbutton" @click="getRecommend()"
              >开始推荐</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="recommend-bottom">
      <el-tabs
        v-model="activeName2"
        type="border-card"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="城市总览" name="city">
          <div class="chartcontent">
            <div class="title">
              <div class="imgIcon"></div>
              <span>{{ treemapname }}</span>
            </div>
            <div class="content" id="chart1"></div>
          </div>
          <div class="chartcontent">
            <div class="title">
              <div class="imgIcon"></div>
              <span>{{ this.chartname }}特征词云</span>
            </div>
            <div class="content" ref="chartword"></div>
          </div>
          <div class="chartcontent">
            <div class="title">
              <div class="imgIcon"></div>
              <span>{{ this.chartname }}游客来源</span>
            </div>
            <div class="content" id="chart2" ref="piechart"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论数据变化" name="time">
          <div class="timechartcontent">
            <div class="content" id="timechart"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="景点热度变化" name="scenichot">
          <div class="timechartcontent">
            <div class="content" id="timechart1"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="城市热度变化" name="cityhot">
          <div class="timechartcontent">
            <div class="content" id="timechart2"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div
        class="monthselect"
        v-if="this.activeName2 == 'cityhot' || this.activeName2 == 'scenichot'"
      >
        <!-- <div class="monthselsct-span"></div> -->
        <div class="monthselsct-month">
          <el-date-picker
            v-model="monthvalue"
            type="month"
            :placeholder="month"
            :clearable="clearable"
            :picker-options="pickerOptions"
            @change="getCityMonth(monthvalue), getScenicMonth(monthvalue)"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <selectRegion :right="24" />
  </div>
</template>
<script>
import mixins from "../mixins/index.js";
import word3D from "../components/wordcloud3D.vue";

import poppage from "../components/poppageForCity.vue";
import { getPie3D, getParametricEquation } from "../js/chart3d";

import request from "../utils/request";
//vuex
import gradedcolormap from "../components/thememap/gradedcolormap.vue";
import pointgather from "../components/thememap/pointgather.vue";
import heatmap from "../components/thememap/heatmap.vue";
import timemap from "../components/thememap/timemap.vue";
import multimap from "../components/thememap/multimap.vue";
import locmap from "../components/location.vue";

import loading from "../components/loading.vue";

import wordcloud from "../assets/js/echarts-wordcloud-master/index";
import echarts from "echarts";

import eventBum from "../components/cityselect/EvebtBus";
import SelectRegion from "../components/cityselect/newselectRegion.vue";
const color = ["#005aff", "#f8b999", "#555aff", "#f8b551", "#255888"];
export default {
  name: "recommend",
  mixins: [mixins],
  components: {
    poppage,
    gradedcolormap,
    pointgather,
    heatmap,
    timemap,
    multimap,
    locmap,
    loading,
    wordcloud,
    SelectRegion,
    word3D,
  },
  data() {
    return {
      word3Dheight: 200,
      word3Dwidth: 350,
      treemapname: "中国热门城市",
      alldatacount: {
        scenic: "",
        comment: "",
        travels: "",
      },
      //评论数据变化,页面下方
      permonths: 3, //设置数据为几个月之前的数据
      pickerOptions: {
        disabledDate(time) {
          const FullYear = time.getFullYear();
          let myDate = new Date();
          // const Month = time.getMonth() + 1
          if (FullYear < 2021) {
            return true;
          } else {
            let t = myDate.getDate();
            // 如果想包含本月本月 - 8.64e7 * t 就不需要了，
            // 如果想之前的不能选择把 > 换成 <
            return time.getTime() > Date.now() - 8.64e7 * t;
          }
          // return false
        },
      },
      timeflag: true,
      timeflag2: true,
      currentmonth: "",
      daydata: [],
      opts1: [],
      opts2: [],
      clearable: false,
      monthvalue: "",
      commentdata: [],
      month: "",
      isLoading: false,
      isShow: true,
      //区域选择
      selectedcity: "北京",
      selectcity: {
        name: "中国",
        level: 0,
      },
      datatime: "",
      //地图切换
      index: 1,

      //推荐项目
      // tablelabel:'分数',
      citycount: {
        sensic: "34682",
        comment: "2521580",
        tourist: "65536",
      },
      input: "",
      income: [
        {
          value: "五千以下",
          label: "省级",
        },
        {
          value: "两万以下",
          label: "市级",
        },
        {
          value: "两万以上",
          label: "县级",
        },
      ],
      distancechecked: true,
      seasonchecked: false,
      sourcechecked: true,
      personchecked: true,
      timevalue: "",
      prferradio: "score",
      sexselect: "1", //男
      distancerange: "1",
      seasonrange: "",
      incomept: "",
      occupationpt: "学生",
      ageinput: "22",
      labellist: [
        { id: 1, name: "山岳" },
        { id: 2, name: "海滨" },
        { id: 3, name: "历史" },
        { id: 4, name: "文化" },
        { id: 5, name: "园林" },
        { id: 6, name: "划船" },
        { id: 7, name: "红色" },
        { id: 8, name: "艺术" },
        { id: 9, name: "建筑" },
        { id: 10, name: "陵墓" },
      ],
      //数据源选择
      checkList: ["途牛网", "携程网", "马蜂窝", "去哪儿"],
      //数据
      mapchange: "1",
      tableRankData: [],
      tablescoreRankData: [],
      tableCityData: [],
      scenicdata: [],
      //tab切换
      activeName: "recommendTab",
      activeName2: "city",
      comp: "pointgather",
      //echarts数据
      chartname: "北京市",
      startclouddata: [
        { value: 773, name: "故宫" },
        { value: 502, name: "长城" },
        { value: 270, name: "建筑" },
        { value: 212, name: "胡同" },
        { value: 192, name: "天安门" },
        { value: 182, name: "颐和园" },
        { value: 170, name: "博物馆" },
        { value: 158, name: "环球" },
        { value: 154, name: "历史" },
        { value: 138, name: "八达岭" },
        { value: 112, name: "天坛" },
        { value: 105, name: "度假" },
        { value: 104, name: "清华" },
        { value: 100, name: "银杏" },
        { value: 96, name: "北海" },
        { value: 94, name: "王府" },
        { value: 94, name: "皇帝" },
        { value: 93, name: "慕田峪" },
        { value: 92, name: "大学" },
        { value: 88, name: "乾隆" },
        { value: 87, name: "景山公园" },
        { value: 86, name: "八达岭长城" },
        { value: 84, name: "南锣鼓巷" },
        { value: 79, name: "紫禁城" },
        { value: 79, name: "地坛" },
        { value: 75, name: "慕田峪长城" },
      ],
      wordclouddata: [
        { value: 327, name: "亚龙湾" },
        { value: 278, name: "海南" },
        { value: 250, name: "海鲜" },
        { value: 231, name: "海口" },
        { value: 215, name: "三亚湾" },
        { value: 158, name: "沙滩" },
        { value: 137, name: "东海" },
        { value: 134, name: "海棠" },
        { value: 130, name: "西岛" },
        { value: 128, name: "椰子" },
        { value: 117, name: "大东海" },
        { value: 104, name: "天涯海角" },
        { value: 101, name: "大海" },
        { value: 98, name: "海边" },
        { value: 91, name: "热带" },
        { value: 84, name: "海滩" },
        { value: 72, name: "蜈支洲岛" },
        { value: 71, name: "骑楼" },
        { value: 67, name: "鹿回头" },
        { value: 63, name: "老街" },
        { value: 59, name: "千古" },
        { value: 53, name: "椰梦" },
        { value: 52, name: "南山" },
        { value: 51, name: "半岛" },
        { value: 50, name: "森林公园" },
        { value: 50, name: "海景" },
        { value: 44, name: "海岛" },
        { value: 44, name: "帆船" },
        { value: 43, name: "潜水" },
        { value: 40, name: "珊瑚" },
        { value: 38, name: "半山" },
        { value: 37, name: "亚特兰蒂斯" },
        { value: 36, name: "雨林" },
        { value: 35, name: "红树林" },
        { value: 37, name: "椰林" },
        { value: 34, name: "水族馆" },
        { value: 33, name: "渔村" },
        { value: 33, name: "木兰" },
        { value: 32, name: "索菲特" },
        { value: 31, name: "游艇" },
        { value: 29, name: "陵水" },
        { value: 29, name: "石梅湾" },
      ],
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
      njwordcloud: [
        { value: 106, name: "夫子庙" },
        { value: 85, name: "报恩寺" },
        { value: 84, name: "溧水" },
        { value: 80, name: "牛首山" },
        { value: 72, name: "总统府" },
        { value: 68, name: "栖霞山" },
        { value: 60, name: "明孝陵" },
        { value: 56, name: "博物馆" },
        { value: 55, name: "中华门" },
        { value: 55, name: "瞻园" },
        { value: 54, name: "汤山" },
        { value: 49, name: "秦淮河" },
        { value: 45, name: "老门东" },
        { value: 44, name: "瓮城" },
        { value: 41, name: "中山陵" },
        { value: 39, name: "石臼" },
        { value: 36, name: "太平天国" },
        { value: 31, name: "栖霞寺" },
        { value: 27, name: "地质公园" },
        { value: 25, name: "梧桐" },
        { value: 24, name: "东南大学" },
        { value: 23, name: "古都" },
        { value: 23, name: "公馆" },
        { value: 22, name: "梅花" },
        { value: 21, name: "樱花" },
        { value: 20, name: "河海大学" },
        { value: 19, name: "王府" },
        { value: 16, name: "紫金山" },
        { value: 16, name: "银杏" },
      ],
      chartdatatreemap: [],
      piedata: [],
      //3D　Pie data
      optionData: [],
      statusChart: null,
      pieoption: {},
    };
  },
  beforeCreate() {},
  computed: {},
  created() {
    this.getAlldata();
    this.getCityRank();
    eventBum.$off("json");
    eventBum.$on("json", (json) => {
      if (json.where == 2) {
        this.selectcity.name = json.name;
        this.selectcity.level = json.where;
        this.chartname = json.name;
        this.selectedcity = this.selectcity.name.replace("省", "");
        this.selectedcity = this.selectedcity.replace("市", "");
        this.postCityWorldCloud();
        this.postScenicListByCity();
        this.postScenicSourceByCity();
        if (this.selectcity.name == "南京市") {
          this.showmap(5);
          this.mapchange = "5";
        }
      } else if (json.where == 1&& json.name.includes("省")) {
        this.warningForpProvince();
      }
    });
  },
  mounted() {
    this.postScenicSourceByCity();
    const that = this;
    window.onresize = function () {
      that.changeSize();
    };

    this.getTime();
    this.showmap(1);
    this.getRankTable();
    // this.initChart2(this.chartdata2);
    this.postSCT();
    // this.initTimechart();
    this.wordCloudInti(this.$refs.chartword, this.startclouddata);
  },
  filters: {
    rounding(value) {
      return value.toFixed(2);
    },
  },
  methods: {
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = {
          color: color[index],
        };
        item.label = {
          normal: {
            show: true,
            color: color[index],
            formatter: ["{b|{b}}", "{c|{c}}{b|人}", "{d|{d}%}"].join("\n"), // 用\n来换行
            rich: {
              b: {
                color: "#fff",
                lineHeight: 15,
                align: "left",
              },
              c: {
                fontSize: 12,
                color: "#fff",
                textShadowColor: "#1c90a6",
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5,
              },
              d: {
                color: color[index],
                align: "left",
              },
            },
          },
        };
        item.labelLine = {
          normal: {
            lineStyle: {
              width: 1,
              color: "rgba(255,255,255,0.7)",
            },
          },
        };
      });
    },
    // 图表初始化
    init3DPieChart() {
      this.statusChart = this.$echarts.init(this.$refs.piechart);
      // 传入数据生成 pieoption, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.pieoption = getPie3D(this.optionData, 0.8, 240, 28, 26, 0.5);
      this.statusChart.setOption(this.pieoption);
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      this.pieoption.series.push({
        name: "电梯状态", //自己根据场景修改
        backgroundColor: "transparent",
        type: "pie",
        label: {
          opacity: 1,
          fontSize: 10,
          lineHeight: 10,
        },
        startAngle: -40, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["20%", "50%"],
        center: ["50%", "50%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
        },
      });
      this.statusChart.setOption(this.pieoption);
      this.bindListen(this.statusChart);
    },
    bindListen(myChart, optionName = "pieoption") {
      let selectedIndex = "";
      let hoveredIndex = "";
      // 监听点击事件，实现选中效果（单选）
      myChart.on("click", (params) => {
        // 从 pieoption.series 中读取重新渲染扇形所需的参数，将是否选中取反。
        const isSelected =
          !this[optionName].series[params.seriesIndex].pieStatus.selected;
        const isHovered =
          this[optionName].series[params.seriesIndex].pieStatus.hovered;
        const k = this[optionName].series[params.seriesIndex].pieStatus.k;
        const startRatio =
          this[optionName].series[params.seriesIndex].pieData.startRatio;
        const endRatio =
          this[optionName].series[params.seriesIndex].pieData.endRatio;
        // 如果之前选中过其他扇形，将其取消选中（对 pieoption 更新）
        if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
          this[optionName].series[selectedIndex].parametricEquation =
            getParametricEquation(
              this[optionName].series[selectedIndex].pieData.startRatio,
              this[optionName].series[selectedIndex].pieData.endRatio,
              false,
              false,
              k,
              this[optionName].series[selectedIndex].pieData.value
            );
          this[optionName].series[selectedIndex].pieStatus.selected = false;
        }
        // 对当前点击的扇形，执行选中/取消选中操作（对 pieoption 更新）
        this[optionName].series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            this[optionName].series[params.seriesIndex].pieData.value
          );
        this[optionName].series[params.seriesIndex].pieStatus.selected =
          isSelected;
        // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
        selectedIndex = isSelected ? params.seriesIndex : null;
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 pieoption 更新）
          if (hoveredIndex !== "") {
            // 从 pieoption.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected =
              this[optionName].series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio =
              this[optionName].series[hoveredIndex].pieData.startRatio;
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
            k = this[optionName].series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 pieoption 更新）
            this[optionName].series[hoveredIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[hoveredIndex].pieData.value
              );
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 pieoption 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "pie2d"
          ) {
            // 从 pieoption.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio;
            endRatio =
              this[optionName].series[params.seriesIndex].pieData.endRatio;
            k = this[optionName].series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 pieoption 更新）
            this[optionName].series[params.seriesIndex].parametricEquation =
              getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[params.seriesIndex].pieData.value + 60
              );
            this[optionName].series[params.seriesIndex].pieStatus.hovered =
              isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName]);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 pieoption.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = this[optionName].series[hoveredIndex].pieStatus.k;
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 pieoption 更新）
          this[optionName].series[hoveredIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value
            );
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
    },
    // 自适应宽高
    changeSize() {
      this.statusChart.resize();
    },
    postSCT() {
      request.get("/api/data/getSCT").then((res) => {
        this.alldatacount = res.data;
      });
    },
    //下方各类数据
    getScenicMonth(val) {
      this.timeflag = false;
      var year = val.getFullYear();
      var month = val.getMonth() + 1;
      //当前年月
      var currmonth;
      var showmonth = `${year}/${month}`;
      if (month / 10 < 1) {
        currmonth = year.toString() + "-0" + month.toString();
      } else {
        currmonth = year.toString() + "-" + month.toString();
      }
      const currentMonthDays = new Date(year, month, 0).getDate();
      const currentMonthArr = [];
      for (let day = 1; day <= currentMonthDays; day++) {
        var ymd = showmonth + `/${day}`;
        currentMonthArr.push(ymd);
        this.daydata.push(ymd);
      }
      this.daydata = currentMonthArr;
      request
        .post("/api/data/scenicDay", {
          model: currmonth,
        })
        .then((res) => {
          if (res.code == 0) {
            var chartdata = res.data;
            var opts = [];
            for (let day = 0; day < res.data.length; day++)
              opts.push({
                xAxis: [
                  {
                    data: chartdata[day].scenic,
                  },
                ],
                title: {
                  text: chartdata[day].date,
                },
                series: [
                  {
                    data: chartdata[day].count,
                  },
                ],
              });
            if (this.activeName2 == "scenichot") {
              this.initTimechart1(opts);
            }
          }
        });
    },
    getCityMonth(val) {
      this.timeflag2 = false;
      var year = val.getFullYear();
      var month = val.getMonth() + 1;
      //当前年月
      var currmonth;
      var showmonth = `${year}/${month}`;
      if (month / 10 < 1) {
        currmonth = year.toString() + "-0" + month.toString();
      } else {
        currmonth = year.toString() + "-" + month.toString();
      }
      const currentMonthDays = new Date(year, month, 0).getDate();
      const currentMonthArr = [];
      for (let day = 1; day <= currentMonthDays; day++) {
        var ymd = showmonth + `/${day}`;
        currentMonthArr.push(ymd);
        this.daydata.push(ymd);
      }
      this.daydata = currentMonthArr;

      request
        .post("/api/data/cityDay", {
          model: currmonth,
        })
        .then((res) => {
          if (res.code == 0) {
            var chartdata = res.data;
            var opts = [];
            for (let day = 0; day < res.data.length; day++)
              opts.push({
                xAxis: [
                  {
                    data: chartdata[day].city,
                  },
                ],
                title: {
                  text: chartdata[day].date,
                },
                series: [
                  {
                    data: chartdata[day].count,
                  },
                ],
              });
            if (this.activeName2 == "cityhot") {
              this.initTimechart2(opts);
            }
          }
        });
    },
    getAlldata() {
      request.post("/api/data/commentDay").then((res) => {
        if (res.code == 0) {
          this.commentdata = res.data;
        }
      });
    },
    postCityWorldCloud() {
      request
        .post("/api/data/wordCloud", {
          model: this.selectedcity,
        })
        .then((res) => {
          if (res.code == 0) {
            this.$nextTick(() => {
              this.wordCloudInti(this.$refs.chartword, res.data);
            });
          }
        });
    },

    hideModal() {
      // 取消弹窗回调
      this.show = false;
    },
    submit() {
      // 确认弹窗回调
      this.show = false;
    },
    indexMethod(index) {
      return (this.currentPage - 1) * this.intPageSize + index + 1;
    },
    postScenicListByCity() {
      let that = this;
      request
        .post("/api/data/citySH", {
          model: this.selectedcity,
        })
        .then((res) => {
          that.chartdatatreemap = res.data;
          this.$nextTick(() => {
            that.initChart1(that.chartdatatreemap);
          });
        });
    },
    postScenicSourceByCity() {
      let that = this;
      let city = this.selectedcity;
      console.log('当前选择城市:',city);
      request
        .post("/api/data/citySource", {
          model: city,
        })
        .then((res) => {
          that.optionData = res.data;
          this.$nextTick(() => {
            // that.initChart2(that.piedata);
            this.setLabel();
            this.$nextTick(() => {
              this.init3DPieChart();
            });
          });
        });
    },
    getCityRank() {
      request.get("/api/data/cityRank").then((res) => {
        this.tableCityData = res.data;
        var item = {
          name: "",
          value: "",
        };
        var index = 0;
        for (index; index < res.data.length; index++) {
          item.name = res.data[index].city;
          item.value = res.data[index].comcount;
          this.chartdatatreemap.push({
            name: item.name,
            value: item.value,
          });
          for (var key in item) {
            delete item[key];
          }
        }

        this.initChart1(this.chartdatatreemap);
      });
    },
    getRankTable() {
      request
        .post("/api/data/scenicRank", {
          model: "hot",
        })
        .then((res) => {
          this.tableRankData = res.data;
          for (let i = 1; i <= res.data.length; i++) {
            this.tableRankData[i - 1].rank = i;
          }
        });
      request
        .post("/api/data/scenicRank", {
          model: "score",
        })
        .then((res) => {
          this.tablescoreRankData = res.data;
          for (let i = 1; i <= res.data.length; i++) {
            this.tablescoreRankData[i - 1].rank = i;
          }
        });
    },
    getLabel(val) {
      let label = val;
      this.input = this.input + label + "、";
    },
    getCity() {
      this.show = true;
    },
    showmap(value) {
      this.mapchange = value.toString();
      this.activeClass = value;
      if (value === 1) this.comp = "pointgather";
      else if (value === 2) this.comp = "gradedcolormap";
      else if (value === 3) this.comp = "heatmap";
      else if (value === 4) this.comp = "timemap";
      else if (value === 5) this.comp = "multimap";
      else if (value === 6) this.comp = "locmap";
      //   else if (value === 3) this.comp = "density";
    },
    //更新数据动画,清空已选条件
    refeashData() {
      (this.timevalue = ""),
        (this.prferradio = ""),
        (this.sexselect = ""),
        (this.distancerange = ""),
        (this.seasonrange = ""),
        (this.incomept = ""),
        (this.occupationpt = ""),
        (this.distancechecked = false),
        (this.seasonchecked = false),
        (this.sourcechecked = false),
        (this.personchecked = false);
      // this.state = "加载数据中......请稍后";
      // console.log(111);
      // (this.isLoading = true),
      //   // this.getrealtime();
      //   setTimeout(() => {
      //     this.isLoading = false;
      //   }, 1200);
    },
    getRecommend() {
      this.showmap(6);
      var labels;
      labels = this.input.split("、");
      var a = labels.pop();
      this.mapchange = "5";
      // var len =labels.length-1;
      // labels.splice(len,0);
      var prfer = "无";
      if (this.prferradio == "") {
        this.prferradio = prfer;
      }
      // else if(this.prferradio=='hot')
      // {
      //   this.tablelabel=='热度'
      // }

      this.activeName = "scenicTab";
      request
        .post("/api/data/recommend", {
          city: "南京",
          preference: this.prferradio,
          time: "11",
          label: labels,
        })
        .then((res) => {
          this.scenicdata = res.data;
          for (let i = 1; i <= res.data.length; i++) {
            this.scenicdata[i - 1].rank = i;
          }
          // if (this.prferradio == "hot") {
          //   for (let i = 0; i < this.scenicdata.length; i++) {
          //     this.scenicdata[i].score = this.scenicdata[i].hot;
          //   }
          // }
        });
    },
    handleTabClick(tab) {
      if (tab.name == "time") {
        this.$nextTick(() => {
          this.initTimechart(this.commentdata);
        });
      } else if (tab.name == "scenichot") {
        this.$nextTick(() => {
          if (this.timeflag) {
            let pretime = this.getPreMonth(this.currentmonth);
            let time = new Date(pretime);

            this.getScenicMonth(time);
          } else {
            this.getScenicMonth(this.monthvalue);
          }
        });
      } else if (tab.name == "cityhot") {
        this.$nextTick(() => {
          if (this.timeflag2) {
            let pretime = this.getPreMonth(this.currentmonth);
            let time = new Date(pretime);

            this.getCityMonth(time);
          } else {
            this.getCityMonth(this.monthvalue);
          }
        });
      }
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate() - 1; // 日
      //景点热度日变化默认月
      this.currentmonth = `${year}-${month}-${day + 1}`;
      this.datatime = `${year}/${month}/${day}`;
      this.month = `${year}-${month - 3}`; //时间选择器所选择的数据为当前月前三个月
    },
    getPreMonth(date) {
      var arr = date.split("-");
      var year = arr[0]; //获取当前日期的年份
      var month = arr[1]; //获取当前日期的月份
      var day = arr[2]; //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - 3; //设置数据时间为当前的前几个月，需要保证该月有数据
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2 + "-" + day2;
      return t2;
    },
    //矩形树图
    initChart1(data) {
      let myChart1 = this.$echarts.init(document.getElementById("chart1"));
      myChart1.on("click", this.clickFun);
      myChart1.setOption({
        title: {
          textStyle: {
            color: "rgba(255, 255, 255, .8)",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}" + "热度" + ": {c}",
        },
        grid: {
          top: "0%", //距上边距
          left: "0%", //距离左边距
          right: "0%", //距离右边距
          bottom: "0%", //距离下边距
        },
        calculable: false,
        series: [
          {
            name: "矩形图",
            type: "treemap",
            radius: "100%",
            center: ["100%", "100%"],
            breadcrumb: false, //矩形图下的提示显示与否
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}" + ": {c}",
                  fontSize: 10,
                },
                borderWidth: 0,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            data: data,
          },
        ],
      });
    },
    initChart2(data) {
      let myChart1 = this.$echarts.init(document.getElementById("chart2"));
      var option = {
        color: [
          "#5470c6",
          "#91cc75",
          "#fac858",
          "#ee6666",
          "#73c0de",
          "#3ba272",
        ],
        legend: {
          show: false,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "70%",
            data: data,
            itemStyle: {
              normal: {
                labelLine: {
                  //指示线状态
                  show: true,
                  smooth: 0.2,
                  length: 5,
                  length2: 10,
                },
              },
            },
          },
        ],
      };
      myChart1.setOption(option);
    },
    initTimechart1(options) {
      var chartDom = document.getElementById("timechart1");
      var myChart = echarts.init(chartDom);
      var option = {
        baseOption: {
          timeline: {
            //loop: false,
            // backgroundColor: '#64A9EF',
            axisType: "category",
            show: true,
            autoPlay: true, //是否自动播放
            playInterval: 1200, //播放速度
            bottom: "85%", //距离容器下侧的距离
            label: { position: "auto", show: true, color: "#fff" },
            lineStyle: {
              color: "#64A9EF",
            },
            symbol: "circle",
            symbolSize: 10,
            backgroundColor: "rgb(115, 215, 228)",
            emphasis: {
              label: {
                show: true,
                formatter: "{d}日",
                color: "#fff",
                fontSize: 10,
                rotate: 0,
              },
              controlStyle: {
                color: "rgb(115, 215, 228)",
                borderColor: "rgb(115, 215, 228)",
                borderWidth: 1,
              },
              itemStyle: {
                color: "rgb(115, 215, 228)",
              },
            },
            controlStyle: {
              color: "#99B6D4",
              borderColor: "#99B6D4",
              borderWidth: 1,
            },
            progress: {
              label: {
                color: "#Ffff",
              },
            },
            checkpointStyle: {
              symbolSize: 13,
              color: "rgb(115, 215, 228)",
              borderWidth: 0,
              symbol: "circle",
            },
            realtime: true,
            data: this.daydata,
          },
          grid: {
            top: "15.8%", //距上边距
            left: "2%", //距离左边距
            right: "0%", //距离右边距
            bottom: "4%", //距离下边距
            containLabel: true,
          },
          tooltip: {
            show: true,
          },
          label: {
            show: true,
            position: "top",
          },
          xAxis: [
            {
              type: "category",
              // name: "景点",
              axisLine: {
                lineStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "日/条",
              // scale: true,//刻度可随数据变化
              // max: 50000,
              splitLine: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          title: {
            show: true, //false
            right: "60",
            top: "3",
            textStyle: {
              color: "rgb(115, 215, 200)",
              fontSize: 15,
            },
          },
          series: [
            {
              type: "bar",
              itemStyle: {
                normal: {
                  color: "rgb(115, 215, 228)",
                },
              },
            },
          ],
        },
        //变量则写在options中
        options: options,
      };
      option && myChart.setOption(option);
    },
    initTimechart2(options) {
      var chartDom = document.getElementById("timechart2");
      var myChart = echarts.init(chartDom);
      var option = {
        baseOption: {
          timeline: {
            //loop: false,
            // backgroundColor: '#64A9EF',
            axisType: "category",
            show: true,
            autoPlay: true, //是否自动播放
            playInterval: 1200, //播放速度
            bottom: "85%", //距离容器下侧的距离
            label: { position: "auto", show: true, color: "#fff" },
            lineStyle: {
              color: "#64A9EF",
            },
            symbol: "circle",
            symbolSize: 10,
            backgroundColor: "rgb(115, 215, 228)",
            emphasis: {
              label: {
                show: true,
                formatter: "{d}日",
                color: "#fff",
                fontSize: 10,
                rotate: 0,
              },
              controlStyle: {
                color: "rgb(115, 215, 228)",
                borderColor: "rgb(115, 215, 228)",
                borderWidth: 1,
              },
              itemStyle: {
                color: "rgb(115, 215, 228)",
              },
            },
            controlStyle: {
              color: "#99B6D4",
              borderColor: "#99B6D4",
              borderWidth: 1,
            },
            progress: {
              label: {
                color: "#Ffff",
              },
            },
            checkpointStyle: {
              symbolSize: 13,
              color: "rgb(115, 215, 228)",
              borderWidth: 0,
              symbol: "circle",
            },
            realtime: true,
            data: this.daydata,
          },
          grid: {
            top: "15.8%", //距上边距
            left: "2%", //距离左边距
            right: "0%", //距离右边距
            bottom: "4%", //距离下边距
            containLabel: true,
          },
          tooltip: {
            show: true,
          },
          label: {
            show: true,
            position: "top",
          },
          xAxis: [
            {
              type: "category",
              // name: "景点",
              axisLine: {
                lineStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "日/条",
              // scale: true,//刻度可随数据变化
              // max: 50000,
              splitLine: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  color: "#fff",
                },
              },
            },
          ],
          title: {
            show: true, //false
            right: "60",
            top: "3",
            textStyle: {
              color: "rgb(115, 215, 200)",
              fontSize: 15,
            },
          },
          series: [
            {
              type: "bar",
              itemStyle: {
                normal: {
                  color: "rgb(115, 215, 228)",
                },
              },
            },
          ],
        },
        //变量则写在options中
        options: options,
      };
      option && myChart.setOption(option);
    },
    initTimechart(commentdata) {
      var chartDom = document.getElementById("timechart");
      var myChart = echarts.init(chartDom);
      var option;
      var sdata;
      let base = commentdata.startStamp;

      let oneDay = 24 * 3600 * 1000;
      let date = [];
      for (let i = 1; i < 365; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
      }
      for (let i = 1; i < 365; i++) {
        sdata = Math.round((Math.random() - 0.5) * 700);
        if (sdata < 0) {
          sdata = -sdata;
        }
        if (commentdata.favorable[i] >= sdata) {
          commentdata.favorable[i] -= sdata;
        }
      }
      option = {
        legend: {
          right: 100,
          textStyle: {
            fontSize: 12,
            color: "#fft",
          },
          align: "left",
        },
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        grid: {
          left: "2%", //图表距边框的距离
          right: "5%",
          bottom: "14%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            name: "评论/好评数",
            min: "dataMin",
            scale: true,
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
          },
          {
            splitLine: { show: false },
            type: "value",
            name: "游记数",
            min: "dataMin",
            scale: true,
            axisLine: {
              lineStyle: {
                color: "white",
              },
            },
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
            height: 18,
            bottom: 9,
          },
        ],
        series: [
          {
            yAxisIndex: 0,
            name: "评论数",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: commentdata.daycount,
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 70, 131)",
                },
                {
                  offset: 1,
                  color: "#123456",
                },
              ]),
            },
          },
          {
            yAxisIndex: 0,
            name: "好评数",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: commentdata.favorable,
            itemStyle: {
              color: "#D5F19F",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#D5F19F",
                },
                {
                  offset: 1,
                  color: "#123456",
                },
              ]),
            },
          },
          {
            yAxisIndex: 1,
            name: "游记数",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            data: commentdata.travel,
            itemStyle: {
              color: "#1DE278",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#1DE278",
                },
                {
                  offset: 1,
                  color: "#123456",
                },
              ]),
            },
          },
        ],
      };
      option && myChart.setOption(option, true);
    },
    //矩形树图点击事件
    clickFun(param) {
      if (param.type == "click") {
        this.selectedcity = param.name;
        this.postCityWorldCloud();
        this.postScenicSourceByCity();
        this.chartname = param.name + "市";
      }
    },
    wordCloudInti(wrapEl, data) {
      let myChart = echarts.init(wrapEl);
      var option = {
        tooltip: {
          show: true,
        },
        series: [
          {
            name: "热词",
            type: "wordCloud",
            sizeRange: [10, 40],
            rotationRange: [-20, 20],
            shape: "rectangle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            gridSize: 7,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 4,
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                    ].join(",") +
                    ")"
                  );
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            data: data,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  //监听全局变量
  watch: {
    // "$store.state.name": function (val, old) {
    //   console.log(val);
    // },
  },
};
</script>

<style>
.el-picker-panel {
  background: rgba(35, 89, 107, 0.9);
  border: 1px solid #4a8faabd;
  font-size: 8pt;
  text-align: center;
  line-height: 25px;
  border-radius: 5px;
  color: #fff;
}
.el-date-range-picker__content.is-left {
  border-right: 1px solid #909399da;
}
.el-date-table td.next-month,
.el-date-table td.prev-month {
  color: #999290;
}
.el-date-table th {
  color: #fff;
}
.el-date-range-picker__header {
  color: #fff;
}
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: #4a8faabd;
}
.el-picker-panel__icon-btn {
  color: #fff;
}
.el-date-editor .el-range-separator {
  width: 10%;
  color: #fff;
}
.el-date-editor .el-range-input {
  width: 57%;
}
/* .el-icon-date:before{
  content: none;
} */
</style>
<style scoped lang="less">
#recommend {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: url("../assets/img/banner.png") no-repeat;
  background-size: 100% 100%;
}
.mapcontent {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.ageinput {
  width: 100%;
  background: #c3e3e72b;
  border-radius: 4px;
  border: 1px solid #3eb7c738;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: rgba(220, 225, 227, 0.96);
  font-size: 11pt;
  height: 22px;
}
#recommend-title {
  height: 25px;
  background: url(../assets/img/titlebg.png) no-repeat;
  margin-top: 1%;
  background-size: 45% 100%;
  background-position-x: 7%;
  > span {
    float: left;
    margin-left: 15%;
    font-size: 11pt;
    line-height: 24px;
    color: aliceblue;
    text-shadow: 0 0 8px #fff, 0 0 12px #fff,
      0 0 15px rgba(128, 189, 189, 0.712), 0 0 20px #38e9e0bd, 0 0 25px #0cf3f3;
  }
}
.mapcontral {
  position: absolute;
  z-index: 1;
  width: 52.8%;
  height: 4%;
  bottom: 42.3%;
  left: 23.6%;
  background: url("../assets/img/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  .selecttitle {
    float: left;
    width: 15%;
    height: 100%;
    background-color: #12526ea9;
    .title-img {
      width: 23%;
      float: left;
      height: 100%;
      background: url("../assets/img/panelIcon.png");
      background-size: 100% 100%;
    }
    .title-text {
      width: 60%;
      float: left;
      height: 100%;
      color: #dae2e2;
      font-size: 11pt;
      line-height: 32px;
    }
  }
  .el-menu {
    float: left;
    width: 85%;
    height: 100%;
    right: 0%;
    background-color: #12526ea9;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mapimg {
      width: 25%;
      height: 65%;
    }
    .map1 {
      width: 11%;
      height: 95%;
      background: url("../assets/img/theme/聚合.png") no-repeat;
      background-size: 100% 100%;
    }
    .map2 {
      width: 18%;
      background: url("../assets/img/theme/分级.png") no-repeat;
      background-size: 100% 100%;
    }
    .map3 {
      width: 18%;
      background: url("../assets/img/theme/热力图.png") no-repeat;
      background-size: 100% 100%;
    }
    .map4 {
      width: 18%;
      background: url("../assets/img/theme/时间.png") no-repeat;
      background-size: 100% 100%;
    }
    .el-radio {
      margin-right: 0;
      .el-radio__label {
        padding-left: 2px;
      }
    }
    /deep/.el-radio__input.is-checked .el-radio__inner {
      border-color: #5ddaf0;
      background: #32b3b8;
    }
    /deep/.el-radio__label {
      padding-left: 5px;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background: transparent;
    }
    .tab {
      height: 100%;
      width: 50%;
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
  .el-menu-item:hover {
    background: transparent;
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

.recommend-left {
  float: left;
  margin-left: 0.4%;
  background: url("../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  .sourceselect {
    width: 100%;
    flex: 2;
    // background-color: rgba(240, 248, 255, 0.178);
    .datasource {
      height: 24%;
      width: 100%;
      display: flex;
      align-items: center;
      .leftpt {
        flex: 3;
        font-size: 12pt;
        color: rgb(174, 193, 199);
        text-align: right;
      }
      .rightpt {
        flex: 10;
        .el-checkbox-group {
          width: 100%;
          .el-checkbox {
            color: rgb(174, 193, 199);
            color: #aec1c7;
            margin-right: 5%;
            margin-top: 0%;
            margin-bottom: 3%;
            margin-left: 0%;
          }
          /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
            color: #85caca;
          }
          /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
            background-color: #85caca;
          }
        }
      }
    }
    .datatime {
      color: #85caca;
      font-size: 10pt;
      text-align: right;
      margin-top: 2%;
      padding-right: 6%;
    }
    .toppart-content {
      height: 55%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      .toppart-part {
        background: url("../assets/img/组144.png") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        width: 25%;
        display: flex;
        flex-direction: column;
        // margin-bottom: 4%;
        .partname {
          flex: 1;
          font-size: 10pt;
          color: #c0dfda;
          display: block;
        }
        .partnumber {
          font-size: 11pt;
          display: block;
          flex: 1;
        }
        .partimg {
          flex: 3;
          .myimg {
            height: 50%;
            width: 50%;
            margin-left: 28%;
            margin-top: 25%;
          }
        }
      }
      .Lpart {
        color: #46da6b;
        .partimg {
          background: url("../assets/img/recommend/left.png") no-repeat;
          background-size: 85% 90%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/景点.png") no-repeat;
            background-size: 80% 80%;
            background-position-x: 27%;
          }
        }
      }
      .Mpart {
        color: #33dfdf;
        .partimg {
          background: url("../assets/img/recommend/mid.png") no-repeat;
          background-size: 85% 90%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/评论.png") no-repeat;
            background-size: 90% 90%;
          }
        }
      }
      .Rpart {
        color: #a6ad61;
        .partimg {
          background: url("../assets/img/recommend/right.png") no-repeat;
          background-size: 85% 90%;
          background-position-x: 50%;
          .myimg {
            background: url("../assets/img/recommend/人数.png") no-repeat;
            background-size: 80% 80%;
            background-position-x: 17%;
          }
        }
      }
    }
  }
  .ranktable {
    width: 100%;
    flex: 3;
    // background-color: rgba(0, 255, 255, 0.233);
    .title {
      margin-top: 0 !important;
      // height: 6% !important;
    }
    .ranktable-content {
      height: 92%;
      /deep/.el-tabs--border-card {
        height: 96%;
        margin: 1%;
        background: transparent;
        border: none;
      }
      /deep/.el-tabs--border-card > .el-tabs__content {
        padding: 0;
        height: 92%;
      }
      /deep/.el-tabs--border-card > .el-tabs__header {
        background: transparent;
        border: none;
        margin: 0%;
      }
      /deep/.el-tabs__item {
        padding: 0;
        width: 25%;
        border: none;
      }
      /deep/.el-tabs__nav {
        width: 100%;
      }
      /deep/.el-table .cell {
        padding-left: 0%;
        padding-right: 0%;
        text-align: center;
      }
      /deep/.el-tabs--top.el-tabs--border-card
        > .el-tabs__header
        .el-tabs__item:last-child {
        padding: 0;
      }
      /deep/.el-tabs__nav-scroll {
        background: transparent;
        width: 100%;
        background: url(../assets/img/buttonbg.png) no-repeat;
        background-size: 100% 100%;
      }
      /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
        border-left: none;
        border-right: none;
      }
      /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background: #2baccd6e;
        color: #dcdfe6;
        border-left: none;
        border-right: none;
        border-top: 0px solid #0cf3f3;
        // border-bottom: 2px solid #0cf3f3;
      }
      /deep/.el-tabs--border-card > .el-tabs__content {
        padding: 1%;
        height: 90%;
        width: 100%;
        margin-top: 1%;
      }
      /deep/.el-table--fit {
        background: transparent;
      }
      /deep/.el-table--fit {
        background: transparent;
      }
      /deep/.el-table .el-table__header-wrapper tr th {
        background-image: linear-gradient(
          -180deg,
          #bdd9e017 4%,
          #9fdae565 100%
        ) !important;
        background: transparent;
        color: rgb(255, 255, 255);
        border-bottom: 0px solid #1faacd;
      }
      //奇数行背景
      /deep/.el-table tr {
        background: rgba(2, 73, 94, 0.432);
        border-bottom: 1px solid #0cf3f3;
      }
      /deep/.el-table .el-table__row {
        background: #023f5441;
        color: rgb(255, 255, 255);
      }
      /deep/.el-table .el-table__row--striped {
        background: #023f54ce;
        color: rgb(255, 255, 255);
      }
      /deep/.el-table td.el-table__cell {
        border: none;
        padding-left: 0%;
        padding-right: 0%;
      }
      /deep/.el-table .cell {
        padding-left: 0%;
        padding-right: 0%;
        text-align: center;
      }
      /deep/.el-table--striped
        .el-table__body
        tr.el-table__row--striped
        td.el-table__cell {
        background: transparent;
      }
      //头高、行高
      /deep/.el-table__header tr,
      .el-table__header th {
        height: 30px;
        padding: 0;
      }
      /deep/.el-table__body tr,
      .el-table__body td {
        height: 35px;
        padding: 0;
      }
      /deep/.el-table .el-table__cell {
        padding: 0;
      }
      /deep/.el-table th.el-table__cell > .cell {
        padding: 0;
        text-align: center;
      }
      /deep/.el-table .el-table__body tr.current-row > td {
        background-color: #84e6e485 !important;
      }
      /deep/.el-table .el-table__body tr:hover > td {
        background-color: #8eabcc !important;
      }
      /deep/.el-table--scrollable-y .el-table__body-wrapper {
        border: none;
      }
      /* 消除表格标题的下划线 */
      /deep/ .el-table td.el-table__cell {
        border-bottom: 0px transparent !important;
      }
      /* 消除表格内部的下划线 */
      /deep/ .el-table th.el-table__cell.is-leaf {
        border-bottom: 0px transparent !important;
      }
      /deep/ .el-table {
        border-bottom: 0px transparent !important;
      }
      /deep/.el-table--scrollable-y ::-webkit-scrollbar {
        display: none;
      }
      /deep/.el-table__body-wrapper::-webkit-scrollbar {
        /*width: 0;宽度为0隐藏*/
        width: 0px;
      }
    }
  }
}
.recommend-right {
  right: 0%;
  float: right;
  margin-right: 0.4%;
  background: url("../assets/img/side.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #5cc0da;
  }
  .chinahot {
    width: 100%;
    height: 30%;
    flex: 2;
    // .title {
    //   height: 12% !important;
    // }
    .wordcontent {
      width: 100%;
      height: 87%;
    }
  }
  .sensicrecommend {
    width: 100%;
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .title {
      height: 5% !important;
    }
    .recommend {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 93%;
      width: 100%;
      .smalltitle {
        padding: 4px;
        height: 24px;
        width: 100%;
        margin: 1% 0%;
        display: flex;
        .textcontent {
          border-left: 4px solid #1af3f3;
          padding-left: 2%;
          margin-left: 2%;
          height: 100%;
          width: 90%;
          text-align: left;
          color: #35d8e4;
          font-size: 14px;
          line-height: 18px;
        }
      }

      .timepickcontent {
        width: 95%;
        float: left;
        padding: 1%;
        background: url("../assets/img/buttonbg.png") center no-repeat;
        background-size: 97% 97%;
        /deep/.el-date-editor--daterange.el-input,
        .el-date-editor--daterange.el-input__inner,
        .el-date-editor--timerange.el-input,
        .el-date-editor--timerange.el-input__inner {
          border: none;
          width: 90% !important;
        }
        .el-input__inner {
          background-color: transparent;
        }
        .el-range-editor.el-input__inner {
          padding: 5px 0px;
        }
        .el-date-editor .el-range-separator {
          width: 0%;
        }
        /deep/.el-date-editor .el-range-input {
          font-size: 11pt;
          color: #eff1f4;
          background-color: #81cfd25e;
        }
        /deep/.el-date-editor .el-range-input,
        .el-date-editor .el-range-separator {
          font-size: 11pt;
        }
      }
      .perfer {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95%;
        padding: 1%;
        background: url("../assets/img/buttonbg.png") center no-repeat;
        background-size: 97% 97%;
        .prefercontent {
          width: 95%;
          .el-input {
            height: 100%;
          }
          /deep/.el-input__inner {
            // display: inline-block;
            -webkit-appearance: none;
            background: transparent;
            border-radius: 4px;
            border: 1px solid #76c6d187;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: rgba(220, 225, 227, 0.96);
            font-size: inherit;
            height: 32px;
            line-height: 36px;
            width: 100%;
            float: left;
            margin-top: 1%;
            padding-left: 3%;
          }
        }
        .exampellabel {
          color: #d1d7d8f2;
          width: 95%;
          .labelcontent {
            display: flex;
            height: 100%;
            width: 100%;
            flex-wrap: wrap;
            > span {
              font-size: 11pt;
              color: #c5d4e6;
              margin-right: 3%;
              margin-top: 1.5%;
            }
            .chooselabel {
              background: #8ae5e54a;
              margin-left: 2%;
              border: 1px solid #ffffff40;
              font-size: 11pt;
              border-radius: 5px;
              cursor: pointer;
              margin: 1%;
              padding: 1px;
            }
          }
        }
      }

      .person {
        width: 95%;
        margin-bottom: 1%;
        padding-top: 2%;
        padding-bottom: 1%;
        background: url("../assets/img/buttonbg.png") center no-repeat;
        background-size: 97% 97%;
        height: 35%;
        .select {
          width: 95%;
          height: 16%;
          float: left;
          margin-left: 4%;
          margin-bottom: 1%;
          display: flex;
          flex-wrap: nowrap;
          // justify-content: space-evenly;
          align-items: center;
          span {
            color: #fff;
            font-size: 11pt;
            margin-right: 2%;
          }
          .el-radio {
            color: rgb(190, 218, 218);
            margin-right: 6%;
          }
          /deep/.el-radio__input.is-checked + .el-radio__label {
            color: #42e0e0;
          }
          /deep/.el-radio__input.is-checked .el-radio__inner {
            border-color: #94b2bb;
            background: #3fb0d3;
          }
        }
      }

      .ageandsex {
        width: 92%;
        height: 20%;
        margin-bottom: 1%;
        .agept {
          width: 50%;
          height: 100%;
          float: left;
        }
        .sexpt {
          width: 50%;
          height: 100%;
          float: left;
          .person-name {
            width: 28%;
          }
          .el-radio {
            color: rgb(190, 218, 218);
          }
          /deep/.el-radio__input.is-checked + .el-radio__label {
            color: #42e0e0;
          }
          /deep/.el-radio__input.is-checked .el-radio__inner {
            border-color: #94b2bb;
            background: #3fb0d3;
          }
        }
      }

      .occupationandincome {
        width: 92%;
        height: 20%;
        margin-bottom: 1%;
        .incomept {
          width: 50%;
          height: 100%;
          float: left;
          .person-name {
            width: 28%;
          }
        }
        .occupationpt {
          width: 50%;
          height: 100%;
          float: left;
        }
      }
      .buttoncontent {
        height: 8%;
        width: 65%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        /deep/.el-button {
          background: url("../assets/img/框.png");
          background-size: 100% 100%;
          // background: #24bff390;
          border: 0px solid #d80d4a;
          color: #ffffff;
          padding: 12px 20px;
          font-size: 14px;
          border-radius: 5px;
        }
      }
    }
  }
}
.pt {
  position: absolute;
  top: 1.2%;
  z-index: 1;
  width: 23%;
  height: 91%;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  background-color: #15cfee38;
}
.person-name {
  width: 28%;
  margin-left: 3%;
  height: 100%;
  float: left;
  text-align: right;
  font-size: 11pt;
  display: flex;
  color: aliceblue;
  align-items: center;
  flex-direction: row-reverse;
}
.person-inputcontent {
  width: 50%;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 6%;
  /deep/.el-input__inner {
    background: #c3e3e72b;
    border-radius: 4px;
    border: 1px solid #3eb7c738;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: rgba(220, 225, 227, 0.96);
    font-size: 11pt;
    height: 24px;
    width: 127%;
    padding: 0px;
  }
  .el-radio {
    margin-right: 20%;
  }
}
.recommend-bottom {
  width: 53%;
  position: absolute;
  z-index: 1;
  height: 34%;
  bottom: 8%;
  left: 23.5%;
  background: url("../assets/img/长方形.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .el-tabs--border-card {
    background: transparent;
    border: none;
    height: 100%;
    width: 100%;
    .el-tab-pane {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
  /deep/.el-tabs--border-card {
    height: 96%;
    margin: 1%;
    // background: transparent;
    background-color: #15cfee14;
    border: none;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 0;
    height: 92%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header {
    background: transparent;
    border: none;
    margin: 0%;
  }
  /deep/.el-tabs__item {
    padding: 0;
    width: 39%;
    border: none;
    //   background: url(../assets/img/tab.png)no-repeat;
    //   background-size: 100% 100%;
  }

  /deep/.el-table .cell {
    padding-left: 0%;
    padding-right: 0%;
    text-align: center;
  }
  /deep/.el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:last-child {
    padding: 0;
  }
  /deep/.el-tabs__nav-scroll {
    background: transparent;
    width: 60%;
    background: url(../assets/img/buttonbg.png) no-repeat;
    background-size: 100% 100%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border-left: none;
    border-right: none;
    background-color: #85bdbf38;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: #00ecff6e;
    // color: #bb5a00;
    border-left: none;
    border-right: none;
    border-top: 0px solid #0cf3f3;
    // border-bottom: 2px solid #0cf3f3;
  }
  /deep/.el-tabs--border-card > .el-tabs__content {
    padding: 1%;
    height: 90%;
    width: 100%;
    margin-top: 1%;
  }
  /deep/.el-tabs--border-card > .el-tabs__header {
    background: transparent;
    border: none;
    margin: 0%;
  }
  /deep/.el-tabs--border-card > .el-tabs__content {
    padding: 3px;
    height: 86%;
  }
  /deep/.el-tabs--top.el-tabs--border-card
    > .el-tabs__header
    .el-tabs__item:nth-child(2) {
    padding: 0;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item {
    border-left: none;
    border-right: none;
    color: #dcf7f7;
  }
  /deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    background: #00ecff6e;
    color: #ffffff;
    border-left: none;
    border-right: none;
    border-top: 0px solid #0cf3f3;
    // border-bottom: 2px solid #0cf3f3;
  }
  .content {
    width: 100%;
    height: 100%;
  }
  .timechartcontent {
    height: 100%;
    width: 100%;
  }
  .chartcontent {
    height: 100%;
    width: 33.3%;
    .title {
      height: 10%;
      width: 100%;
      margin-top: 1% !important;
      display: flex;
      flex-direction: row;

      > span {
        width: 70%;
        text-align: left;
        height: 100%;
        color: #cfe4e4;
        font-size: 11pt;
      }
      .imgIcon {
        width: 13%;
        height: 100%;
        background: url("../assets/img/panelIcon.png");
        background-size: 100% 100%;
      }
    }
    .content {
      width: 100%;
      height: 85%;
    }
  }
  .monthselect {
    position: absolute;
    height: 15%;
    width: 11%;
    right: 28%;
    top: 2%;
    display: flex;
    flex-direction: row;
    align-items: center;
    //  background: url(../assets/img/buBG.png) no-repeat;
    // background-size: 100% 100%;
    background-color: #85bdbf38;
    border-top: 1px solid #83d0c1dd;
    border-bottom: 1px solid #83d0c1dd;
    // .monthselsct-span{
    //   width: 30%;
    //   height: 100%;
    // }
    .monthselsct-month {
      width: 100%;
      height: 100%;
      background: #29a1a163;
      /deep/.el-input__inner {
        &::placeholder {
          color: rgb(236, 235, 235);
          font-size: 14px;
        }
      }
      /deep/.el-date-editor.el-input {
        width: 100%;
        height: 100%;
        padding-right: 13%;
      }
      /deep/.el-input--prefix .el-input__inner {
        padding-left: 0px;
      }
      /deep/.el-date-picker__header-label {
        color: #dde0e0;
      }
      /deep/.el-month-table td .cell {
        color: #d3d3d3;
      }
      /deep/.el-date-picker table {
        color: #e5eeee;
      }
      // /deep/.el-input__prefix,
      // .el-input__suffix {
      //   // color: #12526e00;
      // }
      /deep/.el-input__prefix {
        .el-input__icon {
          width: 22px;
          line-height: 38px;
        }
      }
      /deep/.el-date-editor .el-range__close-icon {
        width: 20px;
      }
      /deep/.el-input--suffix .el-input__inner {
        padding-right: 0px;
      }
      /deep/.el-input__inner {
        color: #ffffff;
        background: #6d9c9c00;
        height: 100%;
        line-height: 40px;
        outline: 0;
        padding: 0;
        text-align: right;
        border: 0;
        border-radius: 0px;
        border-bottom: 1px solid #89c5ec6e;
      }
    }
  }
}
/deep/.el-icon-date:before {
  content: none;
}
/deep/.el-input__icon:after {
  content: none;
}
</style>
<style>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #3eb7c738;
}
.el-select-dropdown {
  background-color: #0d1f30;
}
.el-select-dropdown__item {
  color: #fff;
}
.names {
  margin-left: 3%;
  padding-right: 0% !important;
}
</style>