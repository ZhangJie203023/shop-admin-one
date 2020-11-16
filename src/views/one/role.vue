<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="addto">添加</el-button>
    <v-table :tableData="tableData" @editdia="editdia" @gettable1="gettable"></v-table>
    <v-dialog :info="info" ref="diatable" @gettable="gettable" @addto1="addto1"></v-dialog>
  </div>
</template>
<script>
import vTable from './role/table'
import vDialog from './role/dialog'
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
    methods:{
        async gettable(){
            let res=await axios.get("/api/rolelist");
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
        async editdia(id){
            this.info={
                issadd:false,
                isshow:true
            }
            let res=await axios.get("/api/roleinfo",{params:{id}})
            if(res.data.code==200){
                res.data.list.status=res.data.list.status==1?true:false
                this.$refs.diatable.default1=res.data.list.menus.split(",")
                this.$refs.diatable.form={id,...res.data.list}
            }else{
                this.$message.error(res.data.msg)
            }
        },
        addto1(){
            this.info.isshow=false
        },
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