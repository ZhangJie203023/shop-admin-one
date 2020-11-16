<template>
  <div class="index">
    <el-container>
      <el-aside width="200px"><v-nav></v-nav></el-aside>
      <el-container>
        <el-header class="index_header">
          <v-header></v-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>
<script>
import vNav from '@/views/one/nav.vue'
import vHeader from '@/views/one/header.vue'
export default {
    components:{
        vNav,
        vHeader,
    }
};
</script>
<style lang="stylus">
    .index{
      height 100%
      .el-container{
        height 100%
      }
      .el-container{
        min-width 1000px
        .index_header{
          background #b3c0d1
        }
        .el-main{
          background #e5e5e5
        }
      }
      
    }
</style>