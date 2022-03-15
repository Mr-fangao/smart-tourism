<template>
  <div>
    <el-menu>
      <el-menu-item
      class="mapchange"
        index="1"
        @click="showmap(1)"
        :class="index === 1 ? 'active' : ''"
      >
  <img src="../assets/img/theme/聚合.png" alt="" />
        <span>点聚合图</span>
      </el-menu-item>
      <el-menu-item
        class="mapchange"
        index="2"
        @click="showmap(2)"
        :class="index === 2 ? 'active' : ''"
      >
         <img src="../assets/img/theme/分级.png" alt="" />
        <span>分级色彩</span>
      </el-menu-item>
    </el-menu>

  <el-menu-item
       class="mapchange"
        index="3"
        @click="showmap(3)"
        :class="index === 3 ? 'active' : ''"
      >
            <img src="../assets/img/theme/热力图.png" alt="" />
        <span>热力图</span>
      </el-menu-item>
        <el-menu-item
          class="mapchange"
        index="4"
        @click="showmap(4)"
        :class="index === 4 ? 'active' : ''"
      >
         <img src="../assets/img/theme/时间.png" alt="" />
        <span>时序图</span>
      </el-menu-item>



    <div class="rightbottom-content">
      <div
        class="mapchange"
        index="1"
        @click="showmap(1)"
        :class="index === 1 ? 'active' : ''"
      >
        <img src="../assets/img/theme/聚合.png" alt="" />
        <span>点聚合图</span>
      </div>
      <div
        class="mapchange"
        index="2"
        @click="showmap(2)"
        :class="index === 2 ? 'active' : ''"
      >
        <img src="../assets/img/theme/分级.png" alt="" />
        <span>分级色彩</span>
      </div>
      <div
        class="mapchange"
        index="3"
        @click="showmap(3)"
        :class="index === 3 ? 'active' : ''"
      >
        <img src="../assets/img/theme/热力图.png" alt="" />
        <span>热力图</span>
      </div>
      <div
        class="mapchange"
        index="4"
        @click="showmap(4)"
        :class="index === 4 ? 'active' : ''"
      >
        <img src="../assets/img/theme/时间.png" alt="" />
        <span>时序图</span>
      </div>
      <div class="mapchange"></div>
      <div class="mapchange"></div>
    </div>
  </div>
</template>

