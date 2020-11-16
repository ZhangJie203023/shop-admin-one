<template>
  <div class="header">
    <el-dropdown trigger="click" @command="commandfn">
      <span class="el-dropdown-link">
        {{username}}<i class="el-icon-user-solid el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
    computed:{
        ...mapGetters(["username"])
    },
    methods: {
        ...mapMutations(["logout"]),
        commandfn(){
            this.logout()
        }
    },
}
</script>
<style lang="stylus">
    .header{
        text-align right
        .el-dropdown{
            height 60px
            line-height 60px
            .el-dropdown-link{
                cursor pointer
            }
        }
    }
    
</style>