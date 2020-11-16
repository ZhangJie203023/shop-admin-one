<template>
  <div class="login_bg">
    <div class="login_wrapper">
        <h2>登录</h2>
      <el-form :model="into" :rules="rules" ref="loginform">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="into.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="into.password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="loginfn">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            into:{
                username:"",
                password:""
            },
            rules:{
                username:[
                    {
                        required:true,
                        message:"请输入账号",
                        trigger:"blur"
                    },
                    {
                        min:4,
                        max:8,
                        message:"请输入4-8位的账号",
                        trigger:"blur"
                    }
                ],
                password:[
                    {
                        required:true,
                        message:"请输入密码",
                        trigger:"blur"
                    },
                    {
                        pattern:/^\d{4,8}$/,
                        message:"请输入4-8位数字",
                        trigger:"blur"
                    }
                ]
            }
        }
    },
    methods: {
        ...mapActions(["login"]),
        loginfn(){
            this.$refs.loginform.validate((value)=>{
                if(value){
                    this.login(this.into)
                }
            })
        }
    },
};
</script>
<style lang="stylus">
.login_bg {
  height: 100%;
  background: -webkit-linear-gradient(left, #563443, #413a53, #2f3d60);

  .login_wrapper {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    h2{
        text-align center
        color #ffffff
        margin 20px auto
    }
    .el-button{
        width 100%
    }
  }
}
</style>