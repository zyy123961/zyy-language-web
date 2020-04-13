<template>
  <div>
    <el-card class="box-card article-card">
      <div slot="header" class="clearfix">
        <my-head>作者管理</my-head>
      </div>
       <el-form ref="form" :inline="true" label-width="80px" size="small">
            <el-form-item label="姓名" style="width: 300px;">
                <el-input v-model="reqParams.selectKey"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="search">筛选</el-button>
            </el-form-item>
       </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询到{{total}}个作者</span>
      </div>
      <el-table :data="authors" style="width: 100%;">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="手机号" prop="tel"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 30px;"
        background
        layout="prev, pager, next"
        :page-size="reqParams.size"
        :current-page="reqParams.pageNum"
        :total="total"
        @current-change ="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        selectKey: null,
        pageNum: 1,
        size: 10
      },
      total: 0,
      authors: []
    }
  },
  created () {
    this.getAuthor()
  },
  methods: {
    async getAuthor () {
      console.log(this.reqParams)
      const data = await this.$http.get('author/findAll.do', { params: this.reqParams })
      console.log(data)
      this.authors = data.data.returnObject
      this.total = data.data.totalCount
    },
    pager (newPage) {
      this.reqParams.pageNum = newPage
      this.getAuthor()
    },

    search () {
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      this.getAuthor()
    }
  }

}
</script>

<style scoped lang='less'></style>
