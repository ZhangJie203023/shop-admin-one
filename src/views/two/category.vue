<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="addto">添加</el-button>
    <v-table :tableData="tableData" @gettable1="gettable" @edit="edit"></v-table>
    <v-dialog :info="info" ref="dialog" @nofn="nofn" @gettable="gettable"></v-dialog>
  </div>
</template>
<script>
import vTable from './category/table'
import vDialog from './category/dialog'
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
            let res=await axios.get("/api/catelist",{params:{istree:true}})
            if(res.data.code==200){
                this.tableData=res.data.list
            }else{
                this.$message.error(res.data.msg)
            }
        },
        addto(){
            this.info={
                isshow:true,
                isadd:true
            }
        },
        nofn(){
            this.info={
                isshow:false
            }
        },
        async edit(id){
            this.info={
                isshow:true,
                isadd:false
            }
            let res=await axios.get("/api/cateinfo",{params:{id}})
            if(res.data.code==200){
                res.data.list.status=res.data.list.status==1?true:false
                this.$refs.dialog.form={id,...res.data.list}
                this.$refs.dialog.Upload.fileList = [{name:"",url:"http://localhost:8888"+res.data.list.img}]
                console.log(this.$refs.dialog.form);
                console.log(this.$refs.dialog.Upload.fileList);
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