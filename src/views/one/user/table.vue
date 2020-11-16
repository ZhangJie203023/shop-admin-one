<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-tag effect="dark" type="success" v-if="scope.row.status == 1"
            >启用</el-tag
          >
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editfn(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="deletefn(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    tableData: Array,
  },
  methods: {
    deletefn(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios.post("/api/userdelete", { id });
          if (res.data.code == 200) {
            this.$emit("get");
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editfn(uid){
        this.$emit("edit",uid)
    }
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