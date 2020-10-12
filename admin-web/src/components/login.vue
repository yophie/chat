<template>
  <div class="login_form">
    <el-row style="height: 100px"></el-row>
    <el-row type="flex" justify="center" align="middle">
    <el-card style="width: 400px">
      <div slot="header" class="clearfix">
        <span>管理员登录</span>
      </div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item prop="username" required>
          <el-input v-model="form.username" placeholder="用户名" type="string" :maxlength="20">
            <template slot="prepend" ><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" required>
          <el-input v-model="form.password" placeholder="密码"  type="password" :show-password="true" :maxlength="20">
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" style="width: 100%">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    </el-row>
  </div>
</template>

<script>
    import loginApi from '@/api/loginApi.js'
    import {goPath} from '@/api/common.js'
    export default {
        name: "login",
        data() {
          return {
            form: {
              username: '',
              password: '',
            },
            rules: {
              username: [
                {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
                {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
              ],
              password: [
                {required: true, message: '请输入密码', trigger: ['blur', 'change']},
                {min: 0, max: 20, message: '长度不超过 20 个字符', trigger: 'blur'}
              ],
            }
          }
        },
      mounted() {
        if (window.localStorage.getItem('token')) {
          goPath('/withdrawList');
        }
      },
        methods: {
          login() {
            this.$refs['form'].validate((valid) => {
              if (valid) {
                loginApi.login(this.form)
              } else {
                return false;
              }
            })
          }
        }
    }
</script>

<style scoped>
  .login_form {
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
