<template>
  <!-- 全屏容器 -->
  <div class="container" >
      <el-card class="login-card">
         <div slot="header" class="clearfix">
           <span style="padding: 0 80px; font-size:20px; color:#409EFF; " >语文网后台管理</span>
         </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :model="LoginForm" status-icon :rules="LoginRules">
        <el-form-item prop="username">
          <el-input v-model="LoginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="LoginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" style="margin:0 90px 0 40px" >登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      LoginForm: {
        username: '123',
        password: '123'
      },

      LoginRules: {
        username: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            const { data: { returnObject } } = await this.$http.post('user/login.do', this.LoginForm)
            console.log(returnObject)
            local.setUser(returnObject)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或密码错误')
          }
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
   .container{
      width: 100%;
      height: 100%;
      background: url(../../assets/bg1.jpg) no-repeat center / cover;
      position: absolute;
      top: 0;
      left: 0;
   }
   .login-card {
      width: 350px;
      height: 280px;
      position: absolute;
      top: 50%;
      left:50%;
      transform: translate(-50%,-50%);

   }
</style>
