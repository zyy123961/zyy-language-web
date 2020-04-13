<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option
      v-for="item in channelOptions"
      :key="item.categoryid"
      :label="item.categoryname"
      :value="item.categoryid"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // value: null,
      channelOptions: [
        { value: 1, label: '诗词鉴赏' }, { value: 2, label: '古代文学' },
        { value: 3, label: '汉语百科' }, { value: 4, label: '名著导读' },
        { value: 5, label: '经典故事' }, { value: 6, label: '散文' },
        { value: 7, label: '小小说' }]
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 频道改变函数
    fn (channelId) {
      // 清空值是'' 改成null
      if (channelId === '') channelId = null
      // 把ID提交给父组件
      this.$emit('input', channelId)
    },
    // 获取频道选项数据
    async getChannelOptions () {
      // 获取数据
      const data = await this.$http.get('cagtegory/findAll.do')
      // 赋值 channelOptions
      this.channelOptions = data.data
    }
  }
}
</script>

<style scoped lang='less'></style>
