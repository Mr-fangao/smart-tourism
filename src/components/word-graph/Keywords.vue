<template>
  <div class="container" id="chartscontent">
    <svg class="keywords" @mousemove="listener($event)">
      <a
        href="javascript:void(0)"
        v-for="(tag, index) in tags"
        :key="index"
        @click="nodeClick(tag)"
      >
        <text
          class="text"
          :x="tag.x"
          :y="tag.y"
          :font-size="20 * (600 / (600 - tag.z))"
          :fill-opacity="(400 + tag.z) / 600"
          :fill="tag.color"
        >
          {{ tag.text }}
        </text>
      </a>
    </svg>
  </div>
</template>
<script>
// import { categarys } from "./mock";
export default {
  name: "Keywords",
  components: {},
  mixins: [],
  props: {
    keywordslist: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tags: [],
      RADIUS: 150,
      ZRADIUS: 200,
      CX: 600,
      CY: 300,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
    };
  },
  computed: {},
  methods: {
    /**
     * 标签点击
     */
    async nodeClick(tag) {
      this.$emit("searchData", tag.text);
      // this.$emit("dfvjdfi hdknf ewlkfne ", tag.text);
      // this.$emit("");
    },
    /**
     * 初始化标签数据
     */
    initTags() {
      const tagNames = this.keywordslist;
        //  const tagNames = [...categarys];
      //初始化标签位置
      let tags = [];
      const length = tagNames.length;
      for (let i = 0; i < length; i++) {
        let tag = {};
        let k = -1 + (2 * (i + 1) - 1) / length;
        let a = Math.acos(k);
        let b = a * Math.sqrt(length * Math.PI);
        tag.text = tagNames[i];
        tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b);
        tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
        tag.z = this.ZRADIUS * Math.cos(a);
        tag.color =
          "rgb(" +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          ")";
        tags.push(tag);
      }
      this.tags = [].concat(tags);
    },
    /**
     * 自动滚动效果,计算滚动位置
     */
    rotateX(speedX) {
      var cos = Math.cos(speedX);
      var sin = Math.sin(speedX);
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
        var z1 = tag.z * cos + (tag.y - this.CY) * sin;
        tag.y = y1;
        tag.z = z1;
      }
    },
    /**
     * 自动滚动效果,计算滚动位置
     */
    rotateY(speedY) {
      var cos = Math.cos(speedY);
      var sin = Math.sin(speedY);
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
        var z1 = tag.z * cos + (tag.x - this.CX) * sin;
        tag.x = x1;
        tag.z = z1;
      }
    },
    /**
     * 响应鼠标移动
     */
    listener(event) {
      //
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX =
        x * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, x * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, x * 0.0001);
      this.speedY =
        y * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00002, y * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    },
    /**
     * 监听窗体大小变化
     */
    resizeWindow() {
      var height = $("#chartscontent").height();
      //获取宽度
      var width = $("#chartscontent").width();
      console.log(height);
      console.log(width);
      height = height * 1.1;
      this.CX = width / 3;
      this.CY = height / 2;
      let radius = Math.min(this.CY, this.CX) / 4;
      if (height > 500) {
        radius = Math.min(this.CY, this.CX) / 8;
      }
      if (radius > 30) {
        this.RADIUS = radius;
      }
      this.initTags();
      this.$emit("windowResize");
    },
  },
  created() {},
  mounted() {
    this.resizeWindow();
    window.addEventListener("resize", this.resizeWindow);
    this.initTags();
    //使球开始旋转
    const interval = setInterval(() => {
      this.rotateX(this.speedX);
      this.rotateY(this.speedY);
    }, 18);
    this.$once("hook:beforedestroy", () => {
      interval && clearInterval(interval);
      window.removeEventListener("resize", this.resizeWindow);
    });
  },
  beforeDestroy() {},
  watch: {
    keywordslist: {
      handler(val) {
        this.initTags();
      },
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
.keywords {
  width: 100%;
  height: 100%;
}
.keywords .text:hover {
  font-size: 200%;
}
</style>