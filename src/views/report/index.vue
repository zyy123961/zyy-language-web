<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-head>{{$route.query.id?'修改':'发布'}}文章</my-head>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.chanelid"></my-channel>
        </el-form-item>
        <el-form-item label="来源：">
          <el-input v-model="articleForm.fromperson" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="success" @click="update">修改</el-button>
          <el-button @click="stop">关闭</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="create">发表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入富文本组件
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 提交文章表单
      articleForm: {
        title: null,
        content: null,
        fromperson: null,
        chanelid: null,
        id: null
      },
      articleIds: {
        articleId: null
      },
      // 富文本配置对象
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    '$route.query.id': function () {
      this.togggleArticleStatus()
    }
  },
  created () {
    this.togggleArticleStatus()
  },
  methods: {
    togggleArticleStatus () {
      const articleid = this.$route.query.id
      if (articleid) {
        this.getArticle(articleid)
      } else {
      // 重置数据不能为空对象
        this.articleForm = {
          title: null,
          content: null,
          fromperson: null,
          chanelid: null
        }
      }
    },
    // 获取文章详情
    async getArticle (id) {
      this.articleIds.articleId = id
      const data = await this.$http.get('article/findById.do', { params: this.articleIds })
      console.log(data.data.returnObject)
      this.articleForm = data.data.returnObject
    },
    // 发表文章
    async create () {
      console.log(this.articleForm)
      await this.$http.post('article/addArticle.do', this.articleForm)
      // 成功
      this.$message.success('发表成功')
      this.$router.push('/examine')
    },
    async stop () {
      this.$router.push('/article')
    },
    // 修改
    async update () {
      console.log(this.articleForm)
      await this.$http.post('article/update.do', this.articleForm)
      // 成功
      this.$message.success('修改成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'></style>
