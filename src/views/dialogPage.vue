<template>
  <div>
    <el-dialog title="检测项目" :visible.sync="modalShow" width="60%" :before-close="modalClose">
      弹窗内容
    </el-dialog>
  </div>

</template>

<script>
    export default {
        name: "dialogPage",
        data() {
            return {
                modalShow:false,
            }
        },
        methods:{
            init(){
                this.modalShow = true
            },
            modalClose(){
                this.modalShow = false;
            }
        },
    }

</script>

<style scoped>

</style>