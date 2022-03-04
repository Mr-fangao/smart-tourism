<template>
  <div class="com">
    <div class="left">
      <div class="title">景点热搜Top5</div>
      <div class="content">
        <el-timeline hide-timestamp="false">
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="main">
      <div class="header"></div>
      <div class="maincontent">
        <el-row>
          <div class="echartsTitle">11</div>
          <div class="echartsContent"></div>
        </el-row>
        <el-row> </el-row>
        <el-row style="margin-left: 1px; margin-right: 1px">
          <div class="echartbottom" id="btmChart1"></div>
                    <div class="echartbottom" id="btmChart1"></div>
                              <div class="echartbottom" id="btmChart1"></div>
        </el-row>
      </div>
    </div>
    <div class="right">
      <div class="title">城市热搜Top10</div>
      <div class="content">
        <el-timeline hide-timestamp="false">
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/3 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item>
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/2 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "kdxfx",
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.com {
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
        background-color: #99a9bf;
        &:last-child {
          margin-bottom: 0;
        }
        .echartbottom{
          width: 33.3%;
          height: 100%;
        }
      }
      .el-row:nth-child(1) {
        .echartsTitle {
          height: 15%;
          width: 100%;
          background-color: aqua;
        }
        .echartsContent {
          height: 85%;
          width: 100%;
          background-color: antiquewhite;
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

/deep/.el-card__body {
  padding: 0px;
  height: 20%;
  height: 105px;
}
/deep/.el-timeline-item__wrapper {
  right: 4px;
}
</style>
