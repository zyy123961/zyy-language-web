import MyHead from '@/components/my-head'
import MyChannel from '@/components/my-channel'

export default {
  install (Vue) {
    // 基于Vue做任何事情（注册全局组件，指令，过滤器，挂载原型函数）
    Vue.component(MyHead.name, MyHead)
    Vue.component(MyChannel.name, MyChannel)
  }
}
