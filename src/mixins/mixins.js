
export default {
    data () {
      return {
       pie3Dcolor :['#fc8251', '#5470c6', '#91cd77', '#ef6567', '#f9c956', '#75bedc'],
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