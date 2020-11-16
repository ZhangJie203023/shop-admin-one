<template>
  <el-dialog
    @open="openfn"
    @close="closefn"
    :title="info.isadd ? '新增分类' : '编辑分类'"
    :visible.sync="info.isshow"
  >
    <el-form :model="form" label-width="100px" ref="dialogform" :rules="rules">
      <el-form-item label="上级分类">
        <el-select v-model="form.pid" @change="changecat">
          <el-option label="上级分类" :value="0"></el-option>
          <el-option
            v-for="(item, index) in getdialog"
            :key="index"
            :value="item.id"
            :label="item.catename"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePreview"
          :auto-upload="false"
          :on-change="picchange"
          ref="file"
          v-model="form.pid"
          v-if="form.pid != 0"
          :file-list="Upload.fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="Upload.dialogVisible" append-to-body>
          <img width="100%" :src="Upload.dialogImageUrl" alt="" />
        </el-dialog>
        <el-upload
          v-model="form.pid"
          v-if="form.pid == 0"
          action="#"
          list-type="picture-card"
          :on-preview="handlePreview"
          :auto-upload="false"
          :on-change="picchange"
          ref="file"
          :disabled="true"
        >
          <i class="el-icon-remove"></i>
        </el-upload>
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
  catename: "",
  img: "",
  status: true,
};
export default {
  props: ["info"],
  data() {
    return {
      getdialog: [],
      Upload: {
        dialogVisible: false,
        dialogImageUrl: "",
        fileList:[]
      },
      form: {
        ...obj,
      },
      rules: {
        catename: [
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
    async getdia() {
      let res = await axios.get("/api/catelist", { params: { pid: 0 } });
      if (res.data.code == 200) {
        this.getdialog = res.data.list;
      } else {
        this.$message.error(res.data.msg);
      }
    },
    openfn() {
      this.getdia();
    },
    handlePreview() {
      this.Upload.dialogVisible = true;
    },
    picchange(file, fileList) {
      this.form.img = file.raw;
      this.Upload.dialogImageUrl = file.url;
      console.log(file, fileList);
      console.log(this.Upload.dialogImageUrl);
    },
    closefn(){
      this.form = { ...obj };
      this.$refs.file.clearFiles();
      this.Upload = {
        dialogVisible: false,
        dialogImageUrl: "",
      };
    },
    nofn() {
      this.$emit("nofn");
      this.form = { ...obj };
      this.$refs.file.clearFiles();
      this.Upload = {
        dialogVisible: false,
        dialogImageUrl: "",
      };
    },
    okfn() {
      this.$refs.dialogform.validate(async (value) => {
        if (value) {
          let url = this.info.isadd ? "/api/cateadd" : "/api/cateedit";
          this.form.status = this.form.status ? 1 : 2;
          let formdata=new FormData();
          for(var key in this.form){
            formdata.append(key,this.form[key])
          }
          let res=await axios({
            method:"post",
            url,
            data:formdata,
            headers:{
              "Content-Type": "multipart/form-data"
            }
          })
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
          this.nofn()
        }
      });
    },
    changecat() {
      this.form.catename = "";
      this.form.img = "";
      this.form.status = true;
      this.$refs.file.clearFiles();
      this.Upload = {
        dialogVisible: false,
        dialogImageUrl: "",
      };
    },
  },
};
</script>
<style lang="stylus"></style>