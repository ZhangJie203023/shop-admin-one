<template>
    <div>
        <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="10">
                <div class="main_el">
                    <p>商品总览</p>
                    <el-row class="min_row">
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="main_el">
                    <p>商品总览</p>
                    <el-row class="min_row">
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                        <el-col :span="6">
                            <div class="main_div">100</div>
                            <div>已下架</div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <div id="main" class="echart">

        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
export default {
    mounted(){
        let myChart=echarts.init(document.getElementById("main"));
        var option = {
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"],
                boundaryGap:false
            },
            yAxis: {
                max:1000,
                min:0
            },
            series: [{
                name: '销量',
                type: 'line',
                data: [500, 200, 300, 100, 100, 200,800]
            }],
            toolbox:{
                feature:{
                    saveAsImage:{

                    }
                }
            }
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
</script>
<style lang="stylus">
    .main_el{
        height 150px
        border 1px solid #000
        p{
            height 50px
            padding 0 20px
            line-height 50px
            background #f2f6fc
        }
        .min_row{
            height 140px
            text-align center
            padding-top 20px
            .main_div{
                color #f56c6c
                font-size 19px
            }
        }
    }
    .echart{
        width 600px
        height 400px
        margin-left 100px
    }
</style>