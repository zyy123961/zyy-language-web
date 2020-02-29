<template>
   <div class="container" >
      <el-card class="login-card">
         <div slot="header" class="clearfix">
           <span style="padding: 0 80px; font-size:20px; color:#409EFF; " >语文网后台管理</span>
         </div>
         <el-form ref="loginForm" status-icon :rules="loginRules" :model="loginForm">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
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
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },

      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          //  { validator: checkAge, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }

    }
  },

  methods: {
    login () {
      this.$refs.loginForm.validate(async valid => {
        // if (valid) {
        //   // 发请求 校验手机号和验证码  后台
        //   try {
        //     const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
        //     local.setUser(data)
        //     this.$router.push('/')
        //   } catch (e) {
        //     this.$message.error('手机号或验证码错误')
        //   }
        // }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}

</script>

<style>
   .container{
      width: 100%;
      height: 100%;
      background: url(../../assets/bg.jpg) no-repeat center / cover;
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
