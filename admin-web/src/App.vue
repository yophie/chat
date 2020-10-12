<template>
    <el-container>
    <el-header v-if="this.$route.path != '/' && this.$route.path != '/login'" style="width: 100%">
      <el-menu
        default-active="/withdrawList"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
        <el-menu-item index="/withdrawList">提现管理</el-menu-item>
        <el-menu-item index="/setting">设置</el-menu-item>
        <el-menu-item @click="dialogVisible = true">退出</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定退出登录吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logout">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
</template>

<script>
  import loginApi from '@/api/loginApi.js'

  export default {
  name: 'App',
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    logout() {
      this.dialogVisible = false
      loginApi.logout()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
