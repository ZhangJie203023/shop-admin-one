<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="addto">添加</el-button>
    <v-table :tableData="tableData" @get="get" @edit="edit"></v-table>
    <v-dialog :info="info" @cancel="cancel" @get="get" ref="dialog"></v-dialog>
    <el-pagination
      :page-size="size"
      :current-page.sync="page"
      background
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import vTable from "./user/table";
import vDialog from "./user/dialog";
import axios from "axios";
export default {
  components: {
    vTable,
    vDialog,
  },
  data() {
    return {
      tableData: [],
      info: {
        isshow: false,
        isadd: true,
      },
      page: 1,
      size: 10,
      total: 0,
    };
  },
  methods: {
    // async gettable() {
    //   let res = await axios.get("/api/userlist", {
    //     params: { page: this.page, size: this.size },
    //   });
    //   if (res.data.code == 200) {
    //     this.tableData = res.data.list;
    //   } else {
    //     this.$message.error(res.data.msg);
    //   }
    // },
    gettable() {
      return axios.get("/api/userlist", {
        params: { page: this.page, size: this.size },
      });
    },
    gettotal() {
      return axios.get("/api/usercount");
    },
    get() {
      axios.all([this.gettable(), this.gettotal()]).then(
        axios.spread((tableData, total) => {
          if (tableData.data.code == 200 && total.data.code == 200) {
            this.tableData = tableData.data.list;
            this.total = total.data.list[0].total;
          }
        })
      );
    },
    addto() {
      this.info = {
        isshow: true,
        isadd: true,
      };
    },
    cancel() {
      this.info.isshow = false;
    },
    async edit(uid){
      this.info={
        isshow:true,
        isadd:false
      }
      let res=await axios.get("/api/userinfo",{params:{uid}})
      if(res.data.code==200){
        res.data.list.status=res.data.list.status==1?true:false
        this.$refs.dialog.form=res.data.list
      }else{
        this.$message.error(res.data.msg)
      }
    }
  },
  mounted() {
    this.get();
  },
};
</script>
<style lang="stylus">
.el-button {
  margin-top: 20px;
}
</style>