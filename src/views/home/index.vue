<template>
     <el-container class="index-box">
          <el-aside :width="isopen?'200px':'64px'">
               <div class="img-small" :class="{smallLogo:!isopen}"></div>

               <el-menu
                 :default-active="$route.path"
                 background-color="rgb(44, 103, 122)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse="!isopen"
                 :collapse-transition="false"
                 style="border-right:none"
                 router
                 >
                 <el-menu-item class="public" index="/" background-color="rgb(44, 103, 122)">
                   <i class="el-icon-s-home"></i>
                   <span slot="title">首页</span>
                 </el-menu-item>
                  <el-menu-item class="public" index="/article">
                   <i class="el-icon-document"></i>
                   <span slot="title">内容管理</span>
                 </el-menu-item>
                  <el-menu-item class="public" index="/examine">
                   <i class="el-icon-chat-dot-round"></i>
                   <span slot="title">审核管理</span>
                 </el-menu-item>
                  <el-menu-item class="public" index="/report">
                   <i class="el-icon-position"></i>
                   <span slot="title">发表文章</span>
                 </el-menu-item>
                  <el-menu-item class="public" index="/author">
                   <i class="el-icon-s-custom"></i>
                   <span slot="title">作者管理</span>
                 </el-menu-item>
               </el-menu>
          </el-aside>
          <el-container>
               <el-header>
                   <span class="el-icon-s-fold icon" @click="toggleMenu"></span>
                   <span class="font">语文网后台管理系统</span>
                   <span class="el-dropdown">
                      <span class="name">{{userInfo.name}}</span>
                      <el-button type="primary" plain size="medium" round @click="logout">退出</el-button>
                    </span>
               </el-header>
              <el-main><router-view></router-view></el-main>
          </el-container>
     </el-container>
</template>

<script>
import local from '@/utils/local'
export default {
  data () {
    return {
      isopen: true,
      userInfo: {
        name: ''
      }
    }
  },
  created () {
    // 设置用户信息
    const user = local.getUser() || {}
    this.userInfo.name = user.name
  },
  methods: {
    toggleMenu () {
      this.isopen = !this.isopen
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
    .index-box{
         width: 100%;
         height: 100%;
         position: absolute;
         top:0;
         left:0;

         .el-aside{
             background-color: rgb(44, 103, 122);
             .img-small{
                  width: 100%;
                  height: 60px;
                  text-align: center;
                  line-height: 60px;
                  background: #1a5374 url(../../assets/logo-login.jpg) no-repeat center;

             }
             .smallLogo {
               background-image: url(../../assets/logo-1.jpg);
               background-size: 36px auto;
             }

         }
         .el-header{
              line-height: 60px;
              background-color: #6f9fbb;
              color: #EEE;

             .icon {
               font-size: 22px;
               vertical-align: middle;
             }
             .font {
                font-size: 18px;
                vertical-align: middle;
                margin-left: 15px;
                font-family:"楷体"
             }
             .el-dropdown {
                  float:right;

                  .name {
                       margin-right: 10px;
                       color: #eee;
                  }
             }
         }
    }

</style>
