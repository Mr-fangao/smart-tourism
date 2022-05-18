export default {
    data () {
      return {
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
            duration:2000
          });
      }
    }
  }