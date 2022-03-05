<template>
    <div style="min-height: 600px;" ref="myEchart"></div>
</template>
<script>
    import Chart from 'echarts'
    export default {
        data () {
            return {
                chart: null,
                option: {
                    title: {
                        x: '150',                 // 水平安放位置，默认为左对齐，可选为：
                        // 'center' ¦ 'left' ¦ 'right'
                        // ¦ {number}（x坐标，单位px）
                        y: 'top',
                        //textAlign: null
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderColor: '#ccc',       // 标题边框颜色
                        borderWidth: 0,            // 标题边框线宽，单位px，默认为0（无边框）
                        padding: 5,                // 标题内边距，单位px，默认各方向内边距为5，
                        itemGap: 10,               // 主副标题纵向间隔，单位px，默认为10，
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bolder',
                            color: '#ff6666'          // 主标题文字颜色
                        },
                        text: '全省大中修资金统计'
                    },
                    color: ['#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
                        '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'],
                    tooltip : { trigger: 'axis' },
                    //图例--折线提示提示
                    legend: {
                        x: 'center',
                        y: '30',
                        borderColor: '#6699FF',//边框颜色
                        textStyle: {
                            color: '#1e90ff'          // 图例文字颜色
                        },
                        data:['大修金额','中修沥青砼金额','预防性养护金额','金额总计']
                    },
                    //右上角的工具箱
                    toolbox: {
                        x:'80%',
                        y:'top',
                        show : true,
                        feature : {
                            mark : {show: true},
                            //是否可以保存图片
                            saveAsImage : {show: true},
                            //dataView : '数据视图',
                            dataView:{show: true},
                        }
                    },
                    calculable : true,
                    xAxis:{
                        data:[]
                    },
                    yAxis : [
                        {
                            type : 'value',
                            name:'单位：万元',
                            min:'0',
                            max:'',
                            splitNumber: 20
                        }
                    ],
                    series : [{
                        type:'line',
                        name:'大修金额',
                        data:[]
                    },{
                        type:'line',
                        name:'中修沥青砼金额',
                        data:[]
                    },{
                        type:'line',
                        name:'预防性养护金额',
                        data:[]
                    },{
                        type:'line',
                        name:'金额总计',
                        data:[]
                    },
                    ]
                },
            }
        },
        mounted() {
            this.initChart();
        },
        methods: {
            initChart(){
                for(var i=0;i<this.plan_table.length;i++){
                    this.option.xAxis.data.push(this.plan_table[i].city);
                    //大修金额总计
                    this.option.series[0].data.push(this.plan_table[i].d_money);
                    //中修金额
                    this.option.series[1].data.push(this.plan_table[i].z_money);
                    //预防性养护金额合计
                    this.option.series[2].data.push(this.plan_table[i].y_money);
                    //金额总计
                    this.option.series[3].data.push(this.plan_table[i].sum_money);
                    //Y轴最大值的设置：向上取整并家500
                    this.option.yAxis[0].max=Math.ceil(this.plan_table[0].sum_money)+500;
                }
                this.chart = Chart.init(this.$refs.myEchart);
                // 把配置和数据放这里
                this.chart.setOption(this.option)
            }
        },
        beforeDestroy() {
            if (!this.chart) { return }
            this.chart.dispose();
            this.chart = null;
        },
        props: ['plan_table']
    }
</script>