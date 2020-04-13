<template>
  <div>
    <el-card class="box-card article-card">
      <div slot="header" class="clearfix">
        <my-head>审核管理</my-head>
      </div>
      <el-form ref="form" label-width="80px" size="small">
        <el-form-item label="频道">
           <my-channel v-model="reqParams.categoryId"></my-channel>
        </el-form-item>
        <el-form-item label="标题" style="width: 300px;">
            <el-input v-model="reqParams.selectKey"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px">
      <div slot="header" class="clearfix">
        <span>共{{total}}条结果</span>
      </div>
      <el-table :data="articles" style="width: 100%;">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="频道" prop="categoryName"></el-table-column>
        <el-table-column label="来源" prop="fromperson"></el-table-column>
        <el-table-column label="操作">
         <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-message"  plain circle></el-button>
            <el-button @click="pass(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
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
        categoryId: null,
        pageNum: 1,
        size: 10,
        state: 0
      },
      articleIds: {
        articleId: null,
        state: 1
      },
      total: 0,
      channelOptions: [],
      articles: []
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      // console.log(this.reqParams)
      const data = await this.$http.get('article/findAll.do', { params: this.reqParams })
      this.articles = data.data.returnObject
      console.log(data.data.returnObject)
      this.total = data.data.totalCount
    },
    pager (newPage) {
      this.reqParams.pageNum = newPage
      this.getArticles()
    },
    async search () {
      if (this.reqParams.channel_id === '') {
        this.reqParams.channel_id = null
      }
      this.reqParams.page = 1
      this.getArticles()
    },
    toEdit (id) {
      this.$router.push({ path: '/look', query: { id } })
    },
    pass (id) {
      this.articleIds.articleId = id
      console.log(this.articleIds)
      this.$http.get('article/updateArticle.do', { params: this.articleIds })
      this.getArticles()
    },

    async del (id) {
      this.articleIds.articleId = id
      await this.$http.get('article/deleteArticle.do', { params: this.articleIds })
      // 提示
      this.$message.success('删除文章成功')
      // 更新列表
      this.getArticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
