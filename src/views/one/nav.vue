<template>
  <div class="nav">
    <el-menu
      unique-opened
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>后台管理系统</h3>
      <el-menu-item>
        <router-link to="/main" index="/main">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </router-link>
      </el-menu-item>
      <el-submenu v-for="(item,index) in menus" :index="index.toString()+1" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="item1 in item.children" :index="item1.url" :key="item1.id">
            <router-link :to="item1.url">{{item1.title}}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(["menus"])
    }
}
</script>
<style lang="stylus">
    .nav{
        height 100%
        background-color #545c64
        h3{
            color #ffffff
            margin 20px auto
            text-align center
        }
        .el-menu-item{
            .router-link-exact-active{
                color #ffd04b
                i{
                    color #ffd04b
                }
            }
            a{
                color #ffffff
                text-decoration none
            }
        }
        
    }
</style>