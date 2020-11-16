<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="rolename" label="名称" width="180"> </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editdia(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="deleteel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    tableData: Array,
  },
  methods:{
    editdia(id){
      this.$emit("editdia",id)
    },
    deleteel(id){
      this.$confirm("此操作将永久删除该角色, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then( async () => {
          let res=await axios.post("/api/roledelete",{id})
          if(res.data.code==200){
            this.$emit("gettable1")
            this.$message.success("删除成功")
          }else{
            this.$message.error(res.data.msg)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
};
</script>
<style lang="stylus">
.cell {
  cursor: pointer;

  .el-button {
    margin-top: 0;
  }
}
</style>