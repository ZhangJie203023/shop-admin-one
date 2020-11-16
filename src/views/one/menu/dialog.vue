<template>
  <el-dialog
    @open="openfn"
    @close="nofn"
    :title="info.isadd ? '新增菜单' : '编辑菜单'"
    :visible.sync="info.isshow"
  >
    <el-form :model="form" label-width="100px" :rules="rules" ref="dialogform">
      <el-form-item label="菜单名称">
        <el-select @change="changemenu" v-model="form.pid">
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="(item, index) in getdialog"
            :key="index"
            :value="item.id"
            :label="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="菜单图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type == 2" label="菜单地址">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio v-model="form.type" :disabled="form.type == 2" :label="1"
          >目录</el-radio
        >
        <el-radio v-model="form.type" :disabled="form.type == 1" :label="2"
          >菜单</el-radio
        >
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"> </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="nofn">取 消</el-button>
      <el-button type="primary" @click="okfn">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from "axios";
let obj = {
  pid: 0,
  title: "",
  icon: "",
  type: 1,
  url: "",
  status: true,
};
export default {
  props: ["info"],
  data() {
    return {
      getdialog: [],
      form: {
        ...obj,
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async gettop() {
      let res = await axios.get("/api/menulist", { params: { pid: 0 } });
      if (res.data.code == 200) {
        this.getdialog = res.data.list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    openfn() {
      this.gettop();
    },
    changemenu(pid) {
      this.form.type = pid == 0 ? 1 : 2;
      this.form.title = "";
      this.form.icon = "";
      this.form.url = "";
    },
    nofn() {
      this.$emit("addto1");
      this.form = { ...obj };
    },
    okfn() {
      this.$refs.dialogform.validate(async (value) => {
        if (value) {
          let url = this.info.isadd ? "/api/menuadd" : "/api/menuedit";
          this.form.status = this.form.status == true ? 1 : 2;
          let res = await axios.post(url, this.form);
          if (res.data.code == 200) {
            this.$emit("gettable");
            if (this.info.isadd) {
              this.$message.success("添加成功");
            } else {
              this.$message.success("修改成功");
            }
          } else {
            this.$message.error(res.data.msg);
          }
          this.form = { ...obj };
          this.$emit("addto1");
        }
      });
    },
  },
};
</script>
<style lang="stylus"></style>