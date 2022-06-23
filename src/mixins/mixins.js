
import china from "../../src/assets/json/中华人民共和国.json";
import nanjing from "../../src/assets/json/nanjing.json"
export default {
    data () {
      return {
       pie3Dcolor :['#fc8251', '#5470c6', '#91cd77', '#ef6567', '#f9c956', '#75bedc'],
       china,
       nanjing,
      }
    },
    created () {
      //钩子函数
    },
    methods: {
     //弹窗提示
      warningForpProvince () {
        this.$notify({
            title: '警告',
            message: '暂不支持省份选择，请选择城市',
            type: 'warning',
            position: 'top-left',
            duration:3000
          });
      }
    }
  }