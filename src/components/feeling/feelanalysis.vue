<template>
  <div class="com-feelanalysis">
    <div class="left">
      <div class="title">
        <img src="../../assets/img/panelIcon.png" alt="" />
        <span>景点热搜Top5</span>
      </div>
      <div class="content">
        <el-timeline hide-timestamp="false">
          <el-timeline-item>
            <el-card>
              <h4>{{ leftdata[0].name }}</h4>
              <p>{{ leftdata[0].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ leftdata[1].name }}</h4>
              <p>{{ leftdata[1].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ leftdata[2].name }}</h4>
              <p>{{ leftdata[2].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ leftdata[3].name }}</h4>
              <p>{{ leftdata[3].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ leftdata[4].name }}</h4>
              <p>{{ leftdata[4].content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-timeline hide-timestamp="false">
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[0].name }}</h4>
              <p>{{ rightdata[0].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[1].name }}</h4>
              <p>{{ rightdata[1].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[2].name }}</h4>
              <p>{{ rightdata[2].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[3].name }}</h4>
              <p>{{ rightdata[3].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[4].name }}</h4>
              <p>{{ rightdata[4].content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="main">
      <div class="header"></div>
      <div class="maincontent">
        <el-row>
          <div class="echartsTitle">
            <img src="../../assets/img/panelIcon.png" alt="" />
            <span>高频热词分布</span>
          </div>
          <div class="echartsContent" id="chart1"></div>
        </el-row>
        <el-row>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>旅游正面热搜</span>
            </div>
            <div class="btmCht" id="btmChart1"></div>
          </div>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>旅游负面热搜</span>
            </div>
            <div class="btmCht" id="btmChart2"></div>
          </div>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>实时旅游情感分布</span>
            </div>
            <div class="btmCht" id="btmChart3"></div>
          </div>
        </el-row>
        <el-row style="margin-left: 1px; margin-right: 1px">
          <div
            class="echartbottom"
            style="background-position: 60% 10%; background-size: 98% 95%"
          >
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>景点关注度月变化图</span>
            </div>
            <div class="btmCht" id="btmChart5" ref="chart5"></div>
          </div>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img
                id="fifthTitle"
                src="../../assets/img/panelIcon.png"
                alt=""
              />
              <span>地区评价情感分布</span>
            </div>
            <div class="btmCht" id="btmChart6"></div>
          </div>
        </el-row>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <img src="../../assets/img/panelIcon.png" alt="" />
        <span>城市热搜Top5</span>
      </div>
      <div class="content">
        <el-timeline hide-timestamp="false">
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[0].name }}</h4>
              <p>{{ rightdata[0].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[1].name }}</h4>
              <p>{{ rightdata[1].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[2].name }}</h4>
              <p>{{ rightdata[2].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[3].name }}</h4>
              <p style="text-indent: 2em">{{ rightdata[3].content }}</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>{{ rightdata[4].name }}</h4>
              <p>{{ rightdata[4].content }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feelanalysis",
  data() {
    return {
      currenttime: "",
      citydata1: [633, 929, 1213, 513, 308, 203, 177, 193, 187, 147, 194, 259],
      citydata2: [499, 158, 202, 103, 74, 349, 420, 670, 511, 1036, 914, 139],
      citydata3: [14, 9, 8, 18, 17, 6, 6, 6, 5, 325, 1828, 323],
      citydata4: [75, 13, 28, 37, 100, 184, 1431, 2102, 167, 221, 550, 92],
      xdata: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      leftdata: [
        {
          name: "#10万多株樱花沿路浪漫盛放#",
          content:
            "春意渐浓，福建漳平茶园樱花盛开，10万多株樱花沿路绽放，“花墙”淡粉，花瓣飘落，景象唯美烂漫。",
        },
        {
          name: "#2021年全年国内游客32.5亿人次#",
          content:
            "国家统计局28日发布的中华人民共和国#2021年国民经济和社会发展统计公报#显示，2021年末全国文化和旅游系统共有艺术表演团体2044个，博物馆3671个。全国共有公共图书馆3217个，总流通72898万人次；文化馆3317个。全年全国规模以上文化及相关产业企业营业收入119064亿元，按可比口径计算，比2020年增长16.0%。全年国内游客32.5亿人次，比2020年增长12.8%。其中，城镇居民游客23.4亿人次，增长13.4%；农村居民游客9.0亿人次，增长11.1%。国内旅游收入29191亿元，增长31.0%。其中，城镇居民游客花费23644亿元，增长31.6%；农村居民游客花费5547亿元，增长28.4%。",
        },
        {
          name: "#乐山大佛#",
          content:
            "【为什么乐山大佛以前免费现在要门票了？】大家有没有发现，相隔百年，四川乐山大佛越活越年轻了，不过还有一个大变化，大家发现了吗？就是以前进去不要门票，现在要门票了。还有一个区别是，以前眼睛原来是圆的，现在是修长的，以前是天然形成的，现在是人造的，就是化妆了。以前那个才是古人的遗迹，现在是为了旅游和美观做的整形，去翻翻书，历史上的乐山大佛根本不是这样的 。以前没化妆是素妆，现在是化妆美颜了，这也是与时俱进，化妆品涨价了，所以现在值钱了，就要收费了。",
        },
        {
          name: "#南京七大赏梅地美如仙境#",
          content:
            "近日，南京梅花山、梅岗、梅花岛、梅花隧道、梅岭等7大赏梅胜地的梅花全面盛放，漫山遍野，灿若云霞。放眼望去，花海如潮，浪漫至极。",
        },
        {
          name: "#焦作青天河#",
          content:
            "焦作青天河位于河南省焦作市西北部博爱县境内，系世界地质公园、国家重点风景名胜区、国家AAAAA级旅游区、国家水利风景区、太行山国家级猕猴自然保护区、中国青少年科学考察探险基地、河南省最具魅力的十佳风景名胜区、河南省十大旅游热点景区。",
        },
      ],
      rightdata: [
        {
          name: "#哈尔滨旅行#",
          content:
            "寒冬的时候去一次东北，对于南方人而言是一种完全不同的人生体验。无论是寒冷，还是遥远，我们都怀揣一个关于冰雪的梦想。哈尔滨是这个冬天去过最冷的城市。酒店里的空间是温暖富足而充实的，酒店外的世界是寒冷空旷而安静的。好像拥有了全世界。",
        },
        {
          name: "#接下来的三月南京市这样的#",
          content:
            "近日，大地回暖，万物复苏，南京的大街小巷即将充满春天的气息。接下来的三月，一起看看鸡鸣寺的樱花、吹吹玄武湖的晚风、走走颐和路的老街……感受一下人间春天里的恣意与浪漫。不到南京，不知金陵美。",
        },
        {
          name: "#春意融融！“赏花经济”带火乡村旅游#",
          content:
            "踏青赏花是春季出游的热点，眼下成都周边的多个村镇，也迎来了赏花旺季，由此衍生的“赏花经济”也逐渐成为了旅游产业的亮丽名片与促进乡村振兴的重要抓手。今天，大伙儿就跟着咱们的记者一起来赏花！",
        },
        {
          name: "#上海旅游#",
          content:
            "早春的上海天微冷，正是赏梅好时节。白的，粉的，红的，黄的……在沪郊的很多公园、景区，“梅”好如期而至，暗香浮动，沁人心脾。",
        },
        {
          name: "#北京旅游#",
          content:
            "【颐和园昆明湖变身“天鹅湖”】浅山如黛，碧波粼粼，几十只白色天鹅悠然飞翔。眼下正是候鸟迁徙季节，优雅的天鹅翩翩降临颐和园昆明湖，与黑天鹅同框呈现别样风景。 ​",
        },
      ],
      option5: {
        color: [
          "#ff7f50",
          "#87cefa",
          "#da70d6",
          "#32cd32",
          "#6495ed",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c",
          "#ffa500",
          "#40e0d0",
        ],
        grid: {
          top: "5%", //距上边距
          left: "10%", //距离左边距
          right: "10%", //距离右边距
          bottom: "30%", //距离下边距
        },
        tooltip: { trigger: "axis" },
        //图例--折线提示提示
        legend: {
          x: "center",
          y: "5",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#1e90ff", // 图例文字颜色
          },
          data: ["珠江南田温泉", "云台山", "长隆野生动物园", "华山"],
        },
        calculable: true,
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              // 设置x、y轴颜色
              color: "#989DA1",
            },
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            name: "单位:万元",
            // min: "0",
            // max: "",
            splitNumber: 20,
            axisLine: {
              lineStyle: {
                // 设置x、y轴颜色
                color: "#989DA1",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            name: "珠江南田温泉",
            data: [],
          },
          {
            type: "line",
            name: "云台山",
            data: [],
          },
          {
            type: "line",
            name: "长隆野生动物园",
            data: [],
          },
          {
            type: "line",
            name: "华山",
            data: [],
          },
        ],
      },
      plan_table: [
        {
          xxx: "1",
          d: "200",
          z: "300",
          y: "400",
          sum: "500",
        },
        {
          xxx: "2",
          d: "100",
          z: "400",
          y: "50",
          sum: "500",
        },
        {
          xxx: "3",
          d: "150",
          z: "410",
          y: "250",
          sum: "500",
        },
        {
          xxx: "4",
          d: "200",
          z: "450",
          y: "350",
          sum: "500",
        },
      ],
    };
  },
  mounted() {
    this.getTime();
    this.initChart5();
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.initChart4();

    let myChart5 = this.$echarts.init(this.$refs.chart5);
    myChart5.setOption(this.option5);
    let myChart1 = this.$echarts.init(document.getElementById("chart1"));
    // myChart1.on("click", this.clickFun);
    myChart1.setOption({
      // title: {
      //   text: "",
      //   textStyle: {
      //     color: "rgba(255, 255, 255, .8)",
      //     fontSize: 12,
      //   },
      // },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}%",
      },
      grid: {
        top: "25%", //距上边距
        left: "15%", //距离左边距
        right: "55%", //距离右边距
        bottom: "20%", //距离下边距
      },
      calculable: false,
      series: [
        {
          name: "矩形图",
          type: "treemap",
          radius: "85%",
          center: ["50%", "50%"],
          breadcrumb: false, //矩形图下的提示显示与否
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b}:{c}%",
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
          data: [
            { value: 4.67, name: "感觉" },
            { value: 3.46, name: "不错" },
            { value: 3.14, name: "特别" },
            { value: 3.06, name: "喜欢" },
            { value: 2.3, name: "推荐" },
            { value: 2.13, name: "方便" },
            { value: 1.92, name: "自然" },
            { value: 1.88, name: "好吃" },
            { value: 1.77, name: "终于" },
            { value: 1.59, name: "美丽" },
            { value: 1.47, name: "疫情" },
            { value: 1.27, name: "最好" },
            { value: 1.26, name: "值得" },
            { value: 1.25, name: "阳光" },
            { value: 1.12, name: "欣赏" },
            { value: 1.05, name: "留下" },
            { value: 1.01, name: "可惜" },
            { value: 0.94, name: "享受" },
            { value: 0.94, name: "最美" },
            { value: 0.92, name: "心情" },
            { value: 0.83, name: "不好" },
            { value: 0.77, name: "遗憾" },
            { value: 0.7, name: "开心" },
            { value: 0.64, name: "期待" },
            { value: 0.62, name: "没什么" },
            { value: 0.61, name: "没想到" },
            { value: 0.6, name: "最佳" },
            { value: 0.59, name: "神秘" },
            { value: 0.58, name: "直奔" },
            { value: 0.58, name: "还好" },
            { value: 0.58, name: "惊喜" },
            { value: 0.55, name: "赶紧" },
            { value: 0.52, name: "震撼" },
            { value: 0.51, name: "新鲜" },
            { value: 0.51, name: "精神" },
            { value: 0.51, name: "简直" },
            { value: 0.5, name: "不得不" },
            { value: 0.5, name: "完美" },
            { value: 0.49, name: "幸福" },
            { value: 0.43, name: "美味" },
            { value: 0.41, name: "兴奋" },
            { value: 0.38, name: "好玩" },
            { value: 0.37, name: "兴趣" },
            { value: 0.36, name: "温暖" },
            { value: 0.36, name: "感谢" },
            { value: 0.34, name: "奇观" },
            { value: 0.33, name: "特意" },
            { value: 0.31, name: "失望" },
            { value: 0.23, name: "忍不住" },
            { value: 0.23, name: "感兴趣" },
            { value: 0.22, name: "雄伟" },
            { value: 0.2, name: "喜爱" },
          ],
        },
      ],
    });
  },
  methods: {
    getScenicdata() {
      for (var i = 0; i < this.idlist.length; i++) {}
      // request
      //   .post("/api/data/comMonth", {
      //     model: name,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     // setTimeout(() => {
      //     //   this.initChart(this.com, this.score);
      //     // }, 50);
      //   });
    },
    initChart1() {
      let myChart = this.$echarts.init(document.getElementById("btmChart1"));
      myChart.setOption({
        // title: {
        //   text: "总热搜讨论数随热搜分布中,主要集中在新冠疫苗",
        //   textStyle: {
        //     fontSize: 12,
        //     color: "rgba(255, 255, 255, .8)",
        //   },
        //   padding: [20, 0, 0, 20], //标题位置
        // },
        //grid区域
        grid: {
          top: "5%", //距上边距
          left: "65%", //距离左边距
          right: "5%", //距离右边距
          bottom: "15%", //距离下边距
        },
        yAxis: {
          show: true, //是否显示
          type: "",
          name: "",
          nameLocation: "end",
          nameTextStyle: {
            //坐标轴名称样式
            color: "rgba(255, 255, 255, .8)",
            padding: [5, 0, 0, -5], //坐标轴名称相对位置
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "rgba(255, 255, 255, .8)",
            },
          },
          data: [
            "传递两会声音凝聚发展能量",
            "800年玉兰花王绽放美如雪",
            "华山桃花有多美",
            "美丽的草原旅行，放飞自我",
            "敦煌鸣沙山月牙泉雪后太美了",
          ],
        },
        xAxis: {
          show: true, //是否显示
          axisTick: {
            //坐标轴 刻度
            show: true, //是否显示
            inside: true, //是否朝内

            lineStyle: {
              type: "solid",
            },
          },

          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "rgba(255, 255, 255, .8)",
            },
            //坐标轴 标签
            show: true, //是否显示
            inside: false, //是否朝内
            margin: 8, //刻度标签与轴线之间的距离
          },
          splitLine: {
            //grid 区域中的分隔线
            show: true, //是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              color: "rgba(255, 255, 255, .8)",
              width: 1,
              type: "dashed", //类型
            },
          },
        },

        //内容数据
        series: [
          {
            name: "", //系列名称
            type: "bar", //类型
            legendHoverLink: true, //是否启用图例 hover 时的联动高亮
            label: {
              //图形上的文本标签
              show: true,
              position: "inside", //相对位置
              rotate: 0, //旋转角度
              color: "#eee",
            },
            itemStyle: {
              //图形形状
              color: "#CC9900",
              barBorderRadius: [0, 100, 100, 0],
            },
            barWidth: "15", //柱形宽度
            barCategoryGap: "5%", //柱形间距

            data: [1535.22, 1591.75, 1599.25, 1633.55, 1840.33],
          },
        ],
      });
    },
    initChart2() {
      let myChart = this.$echarts.init(document.getElementById("btmChart2"));
      myChart.setOption({
        // title: {
        //   text: "总热搜讨论数随热搜分布中,主要集中在新冠疫苗",
        //   textStyle: {
        //     fontSize: 12,
        //     color: "rgba(255, 255, 255, .8)",
        //   },
        //   padding: [20, 0, 0, 20], //标题位置
        // },
        //grid区域
        grid: {
          top: "5%", //距上边距
          left: "65%", //距离左边距
          right: "5%", //距离右边距
          bottom: "15%", //距离下边距
        },
        yAxis: {
          show: true, //是否显示
          type: "",
          name: "",
          nameLocation: "end",
          nameTextStyle: {
            //坐标轴名称样式
            color: "rgba(255, 255, 255, .8)",
            padding: [5, 0, 0, -5], //坐标轴名称相对位置
          },
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "rgba(255, 255, 255, .8)",
            },
          },
          data: [
            "全国现有7地高风险81地中风险",
            "搜救人员向遇难飞机方向默哀3分钟",
            "威尼斯景区“中国制造”商品被禁",
            "硬性捆绑销售引争议",
            "48小时核酸成多地出行标配",
          ],
        },
        xAxis: {
          show: true, //是否显示
          axisTick: {
            //坐标轴 刻度
            show: true, //是否显示
            inside: true, //是否朝内

            lineStyle: {
              type: "solid",
            },
          },

          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "rgba(255, 255, 255, .8)",
            },
            //坐标轴 标签
            show: true, //是否显示
            inside: false, //是否朝内
            margin: 8, //刻度标签与轴线之间的距离
          },
          splitLine: {
            //grid 区域中的分隔线
            show: true, //是否显示，'category'类目轴不显示，此时我的y轴为类目轴，splitLine属性是有意义的
            lineStyle: {
              color: "rgba(255, 255, 255, .8)",
              width: 1,
              type: "dashed", //类型
            },
          },
        },

        //内容数据
        series: [
          {
            name: "", //系列名称
            type: "bar", //类型
            legendHoverLink: true, //是否启用图例 hover 时的联动高亮
            label: {
              //图形上的文本标签
              show: true,
              position: "inside", //相对位置
              rotate: 0, //旋转角度
              color: "#eee",
            },
            itemStyle: {
              //图形形状
              color: "#CC9900",
              barBorderRadius: [0, 100, 100, 0],
            },
            barWidth: "15", //柱形宽度
            barCategoryGap: "5%", //柱形间距

            data: [1535.22, 1591.75, 1599.25, 1633.55, 1840.33],
          },
        ],
      });
    },
    initChart3() {
      let myChart = this.$echarts.init(document.getElementById("btmChart3"));
      myChart.setOption({
        title: {
          text: "   热搜数量随话题情绪分类分布中,最高位正面，最低为负面",
          subtext: "    数据更新时间:" + this.currenttime,
          textStyle: {
            color: "rgba(255, 255, 255, .8)",
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}%",
        },
        // legend: {
        //   orient: "horizontal",
        //   x: "center",
        //   y: "top",
        //   padding: [25, 50, 0, 0],
        //   data: ["中性", "正面", "负面"],
        //   textStyle: {
        //     color: "rgba(255, 255, 255, .8)",
        //   },
        // },
        grid: {
          top: "5%", //距上边距
          left: "-10%", //距离左边距
          right: "5%", //距离右边距
          bottom: "5%", //距离下边距
        },
        calculable: true,
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: 0,
            top: 50,
            bottom: 60,
            width: "100%",
            height: "50%",
            // height: {totalHeight} - y - y2,
            min: 10,
            max: 100,
            // minSize: '0%',
            // maxSize: '100%',
            minSize: "10%", //每一块的最小宽度
            maxSize: "55%", //每一块的最大快递,一次去除掉尖角
            sort: "descending",
            gap: 0, //每一块之间的间隔
            // label: {            //设置每一块的名字是显示在图里面还是外面
            //     show: true,
            //     position: 'inside'
            // },
            labelLine: {
              length: 20, //设置每一块的名字前面的线的长度
              lineStyle: {
                width: 1, //设置每一块的名字前面的线的宽度
                type: "solid", //设置每一块的名字前面的线的类型
              },
            },
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b}:{c}",
                },
                borderColor: "rgba(255, 255, 255, .8)", //每一块的边框颜色
              },
            },
            emphasis: {
              label: {
                fontSize: 20,
              },
            },
            data: [
              { value: 156.2, name: "正面", barHeight: 100 },
              { value: 36.67, name: "中性" },
              { value: 23.59, name: "负面" },
            ],
          },
        ],
      });
    },
    initChart4() {
      var chartDom = document.getElementById("btmChart6");
      var myChart = this.$echarts.init(chartDom);
      var option;

      option = {
        legend: {
          textStyle: {
            //图例文字的样式
            color: "#ccc",
            fontSize: 12,
          },
        },
        tooltip: {},
        dataset: {
          source: [
            ["product", "积极", "中性", "消极"],
            ["北京", 73.3, 85.8, 63.7],
            ["上海", 83.1, 73.4, 65.1],
            ["广州", 86.4, 75.2, 82.5],
            ["深圳", 72.4, 53.9, 39.1],
          ],
        },
        grid: {
          top: "10%", //距上边距
          left: "12%", //距离左边距
          right: "10%", //距离右边距
          bottom: "10%", //距离下边距
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              // 设置x、y轴颜色
              color: "#989DA1",
            },
          },
        },
        yAxis: {
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              // 设置x、y轴颜色
              color: "#989DA1",
            },
          },
        },
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };

      option && myChart.setOption(option);
    },
    //     clickFun(param) {
    //     if (typeof param.seriesIndex == 'undefined') {
    //         return;
    //     }
    //     if (param.type == 'click') {
    //         alert(param.name);
    //     }
    // },
    initChart5() {
      for (var i = 0; i < this.citydata1.length; i++) {
        this.option5.xAxis.data.push(this.xdata[i]);
        //大修金额总计
        this.option5.series[0].data.push(this.citydata1[i]);
        //中修金额
        this.option5.series[1].data.push(this.citydata2[i]);
        //预防性养护金额合计
        this.option5.series[2].data.push(this.citydata3[i]);
        //金额总计
        this.option5.series[3].data.push(this.citydata4[i]);
        //Y轴最大值的设置：向上取整并家500
        // this.option5.yAxis[0].max = Math.ceil(this.citydata1[i]);
      }
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate() - 1; // 日
      let hour = date.getHours() - 3; // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes() - 1; // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.currenttime =
        `${year}/${month}/${day}` + ` ${hour}:${minute}:${second}`;
    },
  },
};
</script>

<style scoped lang="less">
.com-feelanalysis {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: url("../../assets/img/banner.png") no-repeat;
  background-size: 100% 100%;
  .title {
    color: aliceblue;
    height: 6%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    > img {
      height: 70%;
      width: 10%;
      margin-left: 5%;
    }
    > span {
      color: rgb(115, 215, 228);
      font-size: 12pt;
    }
  }
  .content {
    width: 100%;
    height: 87%;
  }
  .left {
    height: 98%;
    width: 20%;
    background: url("../../assets/img/side.png") no-repeat;
    background-size: 100% 93%;
  }
  .main {
    height: 100%;
    width: 57%;
    .maincontent {
      height: 100%;
      width: 100%;
      margin-top: 1%;
      .el-row {
        margin-bottom: 10px;
        height: 29.5%;
        // background-color: #99a9bf;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-row:nth-child(1) {
        .echartsTitle {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > img {
            height: 90%;
            width: 4%;
            margin-left: 2%;
          }
          > span {
            color: rgb(115, 215, 228);
            font-size: 12pt;
          }
        }
        .echartsContent {
          height: 90%;
          width: 100%;
        }
      }
      .el-row:nth-child(2) {
        display: flex;
        .echartbottomTitle {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > img {
            height: 90%;
            width: 12%;
            margin-left: 7%;
          }
          > span {
            color: rgb(115, 215, 228);
            font-size: 12pt;
          }
        }
        .echartbottom {
          height: 100%;
          width: 100%;
          .btmCht {
            height: 80%;
            width: 100%;
          }
        }
      }
      .el-row:nth-child(3) {
        display: flex;
        .echartbottomTitle {
          height: 15%;
          width: 100%;
          color: aliceblue;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          > img {
            height: 92%;
            width: 12%;
            margin-left: 8%;
          }
          > span {
            color: rgb(115, 215, 228);
            font-size: 12pt;
          }
        }
        .echartbottom {
          height: 100%;
          width: 100%;
          .btmCht {
            height: 80%;
            width: 100%;
            color: #d3dce6;
          }
        }
        .echartbottomTitle:nth-child(1) {
          > img {
            height: 90%;
            width: 6%;
            margin-left: 4%;
          }
        }
        .echartbottom:nth-child(1) {
          flex: 2;
        }
        .echartbottom:nth-child(2) {
          flex: 1;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    }
  }
  .right {
    height: 98%;
    width: 20%;
    background: url("../../assets/img/side.png") no-repeat;
    background-size: 100% 93%;
  }
}
#fifthTitle {
  height: 92%;
  width: 12%;
  margin-left: 8%;
}
#btmChart5 {
  height: 100%;
  width: 100%;
}
.echartbottom {
  background: url("../../assets/img/buttonbg.png") no-repeat;
  background-size: 95% 95%;
  background-position: 64% 10%;
}
/deep/.el-card__body {
  padding: 0px;
  height: 20%;
  height: 105px;
  background: url("../../assets/img/buttonbg.png") no-repeat;
  background-size: 100% 100%;
  color: #d3dce6;
  // background: rgba(202, 73, 73, 0.185);
  border: none;
  .p {
    text-indent: 2em;
  }
}
/deep/.el-timeline-item__wrapper {
  right: 4px;
}
/deep/.el-card.is-always-shadow {
  background: transparent;
  border: none;
}
/deep/.el-timeline-item__tail {
  right: 4px;
}
/deep/.el-card__body {
  p {
    text-indent: 2em;
    text-align: left;
    padding: 1% 3%;
    font-size: 10pt;
    color: #d3dce6;
    height: 74%;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 0px; /*高宽分别对应横竖滚动条的尺寸 */
    height: 0px;
    background-color: rgba(135, 175, 221, 0.055);
  }
}
/deep/.el-card__body {
  h4 {
    text-align: left;
    padding: 0.9%;
    font-size: 10pt;
    color: #99b6d8c0;
  }
}
</style>
