<template>
  <el-dialog
    :title="info.isadd ? '新增管理员' : '编辑管理员'"
    :visible.sync="info.isshow"
    @open="openfn"
    @close="closefn"
  >
    <el-form :model="form" :rules="rules" label-width="100px" ref="dialogform">
      <el-form-item label="角色">
        <el-select v-model="form.roleid">
          <el-option
            v-for="(item, index) in rolelist"
            :label="item.rolename"
            :key="index"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"> </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelfn">取 消</el-button>
      <el-button type="primary" @click="okfn">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from "axios";
let obj = {
  roleid: "",
  username: "",
  password: "",
  status: true,
};
export default {
  props: ["info"],
  data() {
    return {
      form: {
        ...obj,
      },
      rolelist: [],
      rules: {
        username: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
          {
            min: 4,
            max: 8,
            message: "请输入4-8位的名字",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            pattern: /^\d{4,8}$/,
            message: "请输入4-8位数字",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async getrolelist() {
      let res = await axios.get("/api/rolelist");
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    openfn() {
      this.getrolelist();
    },
    cancelfn() {
      this.$emit("cancel");
      this.form = { ...obj };
      this.rolelist = [];
    },
    closefn() {
      this.form = { ...obj };
      this.rolelist = [];
    },
    okfn() {
        this.$refs.dialogform.validate(async (value)=>{
            if(value){
                let url = this.info.isadd ? "/api/useradd" : "/api/useredit";
                this.form.status = this.form.status == true ? 1 : 2;
                let res = await axios.post(url, this.form);
                if (res.data.code == 200) {
                  this.$emit("get");
                  if (this.info.isadd) {
                    this.$message.success("添加成功");
                  } else {
                    this.$message.success("修改成功");
                  }
                } else {
                  this.$message.error(res.data.msg);
                }
                this.form = { ...obj };
                this.rolelist = [];
                this.$emit("cancel");
            }
        })
      
    },
  },
};
</script>
<style lang="stylus"></style>