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
              <span>旅游正面情感热搜</span>
            </div>
            <div class="btmCht" id="btmChart1"></div>
          </div>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>旅游负面情感热搜</span>
            </div>
            <div class="btmCht" id="btmChart2"></div>
          </div>
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>实时旅游情感关键词</span>
            </div>
            <div class="btmCht" id="btmChart3"></div>
          </div>
        </el-row>
        <el-row style="margin-left: 1px; margin-right: 1px">
          <div class="echartbottom">
            <div class="echartbottomTitle">
              <img src="../../assets/img/panelIcon.png" alt="" />
              <span>景点关注度年变化图</span>
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
        tooltip: { trigger: "axis" },
        //图例--折线提示提示
        legend: {
          x: "center",
          y: "30",
          borderColor: "#6699FF", //边框颜色
          textStyle: {
            color: "#1e90ff", // 图例文字颜色
          },
          data: ["大修金额", "中修沥青砼金额", "预防性养护金额", "金额总计"],
        },
        calculable: true,
        xAxis: {
          data: [],
        },
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            name: "单位:万元",
            min: "0",
            max: "",
            splitNumber: 20,
          },
        ],
        series: [
          {
            type: "line",
            name: "大修金额",
            data: [],
          },
          {
            type: "line",
            name: "中修沥青砼金额",
            data: [],
          },
          {
            type: "line",
            name: "预防性养护金额",
            data: [],
          },
          {
            type: "line",
            name: "金额总计",
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
    this.initChart5();
    let myChart5 = this.$echarts.init(this.$refs.chart5);
    myChart5.setOption(this.option5);
    let myChart1 = this.$echarts.init(document.getElementById("chart1"));
    myChart1.setOption({
      title: {
        text: "    总评率随热词分布中,最高为肺炎,最低为症状",
        textStyle: {
          color: "rgba(255, 255, 255, .8)",
          fontSize: 12,
        },
      },
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
            {
              name: "肺炎",
              value: 9.06,
            },
            {
              name: "疫情",
              value: 7.74,
            },
            {
              name: "微博",
              value: 7.25,
            },
            {
              name: "病例",
              value: 6.95,
            },
            {
              name: "新冠",
              value: 6.88,
            },
            {
              name: "确诊",
              value: 6.59,
            },
            {
              name: "武汉",
              value: 5.2,
            },
            {
              name: "视频",
              value: 4.86,
            },
            {
              name: "冠状病毒",
              value: 4.34,
            },
            {
              name: "口罩",
              value: 4.28,
            },
            {
              name: "新型",
              value: 3.49,
            },
            {
              name: "患者",
              value: 3.05,
            },
            {
              name: "防控",
              value: 2.92,
            },
            {
              name: "感染",
              value: 2.81,
            },
            {
              name: "医院",
              value: 2.73,
            },
            {
              name: "新增",
              value: 2.43,
            },
            {
              name: "隔离",
              value: 2.19,
            },
            {
              name: "出院",
              value: 2.17,
            },
            {
              name: "湖北",
              value: 2.1,
            },
            {
              name: "病毒",
              value: 1.79,
            },
            {
              name: "累计",
              value: 1.79,
            },
            {
              name: "加油",
              value: 1.6,
            },
            {
              name: "哈哈哈",
              value: 1.53,
            },
            {
              name: "韩国",
              value: 1.39,
            },
            {
              name: "医护人员",
              value: 1.35,
            },
            {
              name: "治愈",
              value: 1.3,
            },
            {
              name: "人员",
              value: 1.28,
            },
            {
              name: "死亡",
              value: 1.23,
            },
            {
              name: "投票",
              value: 1.2,
            },
            {
              name: "武汉市",
              value: 1.19,
            },
            {
              name: "工作",
              value: 1.18,
            },
            {
              name: "科比",
              value: 1.39,
            },
            {
              name: "复工",
              value: 1.17,
            },
            {
              name: "密切接触者",
              value: 1.16,
            },
            {
              name: "抗疫",
              value: 1.15,
            },
            {
              name: "疑似病例",
              value: 1.14,
            },
            {
              name: "中国",
              value: 1.23,
            },
            {
              name: "防疫",
              value: 1.13,
            },
            {
              name: "治疗",
              value: 1.12,
            },
            {
              name: "检测",
              value: 1.1,
            },
            {
              name: "目前",
              value: 1.09,
            },
            {
              name: "物资",
              value: 1.08,
            },
            {
              name: "医学观察",
              value: 1.07,
            },
            {
              name: "例新冠状",
              value: 1.06,
            },
            {
              name: "发热",
              value: 1.05,
            },
            {
              name: "时间",
              value: 1.04,
            },
            {
              name: "大家",
              value: 1.03,
            },
            {
              name: "一线工作者",
              value: 1.02,
            },
            {
              name: "央视",
              value: 1.01,
            },
            {
              name: "医疗",
              value: 1.0,
            },
            {
              name: "在家",
              value: 0.98,
            },
            {
              name: "开学",
              value: 0.96,
            },
            {
              name: "放舱",
              value: 0.95,
            },
            {
              name: "救治",
              value: 0.94,
            },
            {
              name: "战役",
              value: 0.92,
            },
            {
              name: "核酸检测",
              value: 0.91,
            },
            {
              name: "卫健委",
              value: 0.88,
            },
            {
              name: "火神山",
              value: 0.87,
            },
            {
              name: "美国",
              value: 0.86,
            },
            {
              name: "消毒",
              value: 0.85,
            },
            {
              name: "乘客",
              value: 0.84,
            },
            {
              name: "留学生",
              value: 0.83,
            },
            {
              name: "英雄回归",
              value: 0.82,
            },
            {
              name: "境外输入",
              value: 0.8,
            },
            {
              name: "塞尔维亚",
              value: 0.79,
            },
            {
              name: "马云",
              value: 0.78,
            },
            {
              name: "大学生返校",
              value: 0.76,
            },
            {
              name: "高三",
              value: 0.75,
            },
            {
              name: "高考",
              value: 0.74,
            },
            {
              name: "高考延期",
              value: 0.73,
            },
            {
              name: "高三开学",
              value: 0.72,
            },
            {
              name: "初三",
              value: 0.71,
            },
            {
              name: "小学",
              value: 0.68,
            },
            {
              name: "李兰娟",
              value: 0.65,
            },
            {
              name: "钟南山",
              value: 0.64,
            },
            {
              name: "拐点",
              value: 0.63,
            },
            {
              name: "疫情",
              value: 0.62,
            },
            {
              name: "地图",
              value: 0.61,
            },
            {
              name: "舆情",
              value: 0.6,
            },
            {
              name: "脱贫",
              value: 0.59,
            },
            {
              name: "江苏",
              value: 0.58,
            },
            {
              name: "安徽",
              value: 0.57,
            },
            {
              name: "电影",
              value: 0.56,
            },
            {
              name: "隔离",
              value: 0.55,
            },
            {
              name: "意大利",
              value: 0.54,
            },
            {
              name: "塞尔维亚",
              value: 0.53,
            },
            {
              name: "英国",
              value: 0.52,
            },
            {
              name: "退税",
              value: 0.51,
            },
            {
              name: "大学生开学",
              value: 0.5,
            },
            {
              name: "英国首相",
              value: 0.49,
            },
            {
              name: "日本",
              value: 0.48,
            },
            {
              name: "韩国",
              value: 0.47,
            },
            {
              name: "西藏",
              value: 0.46,
            },
            {
              name: "南京开学",
              value: 0.45,
            },
            {
              name: "宿管阿姨",
              value: 0.44,
            },
          ],
        },
      ],
    });
  },
  methods: {
    initChart5() {
      for (var i = 0; i < this.plan_table.length; i++) {
        this.option5.xAxis.data.push(this.plan_table[i].xxx);
        //大修金额总计
        this.option5.series[0].data.push(this.plan_table[i].d);
        //中修金额
        this.option5.series[1].data.push(this.plan_table[i].z);
        //预防性养护金额合计
        this.option5.series[2].data.push(this.plan_table[i].y);
        //金额总计
        this.option5.series[3].data.push(this.plan_table[i].sum);
        //Y轴最大值的设置：向上取整并家500
        this.option5.yAxis[0].max = Math.ceil(this.plan_table[0].sum) + 500;
      }
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
