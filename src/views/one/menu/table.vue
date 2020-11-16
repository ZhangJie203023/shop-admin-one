<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="名称" width="180"> </el-table-column>
      <el-table-column prop="" label="图标" width="180">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 1">目录</el-tag>
          <el-tag v-else type="success">菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单url" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editfn(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="deletetr(scope.row.id)"
            >删除</el-button
          >
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
  methods: {
    editfn(id) {
      this.$emit("edit",id);
    },
    deletetr(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then( async () => {
          let res=await axios.post("/api/menudelete",{id})
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
    },
  },
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