<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <span class="text">个人面板</span>
        <div class="close-btn" @click="hideModal">
          <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
        </div>
      </div>
      <div class="modal-main">
        <div class="cityselect">
          <div class="provinces" style="overflow-y: scroll; height: 82%">
            <div class="provinceslist" v-for="(item1, i) in provinces" :key="i">
              <span class="provincesname">{{ item1.name }}</span>
              <div class="citycontent">
                <div
                  class="citylist"
                  v-for="(item2, i) in item1.cities"
                  :key="i"
                  @click="hideModal(item2.name)"
                >
                  {{ item2.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="cities">
            <div class="citylist" v-for="(item2, i) in citylist" :key="i">
              <div class="citylist" v-for="(item3, i) in item2" :key="i"></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "../assets/js/bus.js";
import city from "../assets/js/city.json";
export default {
  name: "poppage",
  data() {
    return {
      provinces: [],
      citylist: [],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    cityname: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    hideModal(val) {
      this.$emit("hideModal");
      Bus.$emit("sendCityname", val);
      // console.log(city.provinces);
    },
    submit() {
      this.$emit("submit");
    },
    getData() {
      this.provinces = city.provinces;
      console.log(this.provinces);
      for (var i = 0; i < 34; i++) {
        this.citylist[i] = this.provinces[i].cities;
      }
      console.log(this.citylist);
    },
  },
};
</script>
<style lang="less" scoped>
.modal-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;
}
.modal-container {
  background: url("../assets/img/buttonbg.png");
  background-size: 100% 100%;
  // border-radius: 3%;
  overflow: hidden;
  position: fixed;
  width: 70%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  background: transparent;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  .text {
    position: absolute inherit;
    text-align: center;
  }
  .close-btn {
    position: absolute;
    margin-right: -90% !important;
  }
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-top: 1px solid #ddd;
}
.modal-footer button {
  width: 100px;
}
.modal-main {
  height: 100%;
  padding: 15px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: auto;
  .cityselect {
    height: 100%;
    .provinces {
      display: flex;
      flex-direction: column;
      float: left;
      color: #ddd;
      .provinceslist {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 3%;
        .provincesname {
          flex: 1;
          // padding: 7%;
        }
        .citycontent {
          flex: 7;
          display: flex;
          flex-wrap: wrap;
          .citylist {
            color: rgb(241, 241, 241);
            margin-bottom: 1%;
            margin-left: 1%;
            width: 25%;
            height: 20%;
            cursor: pointer;
            background: rgba(150, 217, 219, 0.747);
            border: 1px solid rgb(4, 152, 238);
            // margin: auto auto;
          }
        }
      }
    }
  }
}
</style>