<template>
  <el-dialog
    @open="openfn"
    @close="closefn"
    :title="info.isadd ? '新增角色' : '编辑角色'"
    :visible.sync="info.isshow"
  >
    <el-form :model="form" label-width="100px" :rules="rules" ref="dialogform">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-tree
          :data="getdialog"
          :props="{
            label: 'title',
            children: 'children',
          }"
          show-checkbox
          node-key="id"
          check-strictly
          ref="tree"
          :default-checked-keys="default1"
        >
        </el-tree>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.status"> </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onfn">取 消</el-button>
      <el-button type="primary" @click="okfn">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from "axios";
let obj = {
  rolename: "",
  menus: "",
  status: true,
};
export default {
  props: ["info"],
  data() {
    return {
      default1:[],
      getdialog: [],
      form: {
        ...obj,
      },
      rules: {
        rolename: [
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
    async gettable() {
      let res = await axios.get("/api/menulist", { params: { istree: true } });
      if (res.data.code == 200) {
        this.getdialog = res.data.list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    openfn() {
      this.gettable();
    },
    okfn(){
      this.$refs.dialogform.validate(async (value)=>{
        if(value){
          let url=this.info.isadd?"/api/roleadd":"/api/roleedit";
          this.form.menus=this.$refs.tree.getCheckedKeys().join(",")
          this.form.status=this.form.status==true?1:2
          let res=await axios.post(url,this.form)
          if(res.data.code==200){
            this.$emit("gettable")
            if(this.info.isadd){
              this.$message.success("添加成功")
            }else{
              this.$message.success("修改成功")
            }
          }else{
            this.$message.error(res.data.msg)
          }
          this.form={...obj}
          this.$emit("addto1")
          this.default1=[]
        }
      })
    },
    onfn(){
      this.$emit("addto1")
      this.form={...obj}
      this.default1=[]
    },
    closefn(){
      this.form={...obj}
      this.default1=[]
    }
  },
};
</script>
<style lang="stylus"></style>