<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="addto">添加</el-button>
    <v-table :tableData="tableData" @edit="editfn" @gettable1="gettable"></v-table>
    <v-dialog :info="info" @addto1="addto1" @gettable="gettable" ref="dialog"></v-dialog>
  </div>
</template>
<script>
import vTable from './menu/table'
import vDialog from './menu/dialog'
import axios from 'axios'
export default {
    components:{
        vTable,
        vDialog
    },
    data() {
        return {
            tableData:[],
            info:{
                isshow:false,
                isadd:true
            }
        }
    },
    methods: {
        async gettable(){
            let res=await axios.get("/api/menulist",{params:{istree:true}})
            if(res.data.code==200){
                this.tableData=res.data.list
            }else{
                this.$message.error(res.data.msg)
            }
        },
        addto(){
            this.info.isshow=true
            this.info.isadd=true
        },
        addto1(){
            this.info.isshow=false
        },
        async editfn(id){
            this.info.isshow=true
            this.info.isadd=false
            let res=await axios.get("/api/menuinfo",{params:{id}})
            if(res.data.code==200){
                res.data.list.status=res.data.list.status==1?true:false
                this.$refs.dialog.form={id,...res.data.list}
            }else{
                this.$message.error(res.data.msg)
            }
        }
    },
    mounted() {
        this.gettable()
    },
}
</script>
<style lang="stylus">
    .el-button{
        margin-top 20px
    }
</style>