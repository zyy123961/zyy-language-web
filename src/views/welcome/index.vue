<template>
  <!-- <div>欢迎欢迎</div> -->
  <div id="echart" ref="dom" style="width: 1000px;height:500px;"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      datad: [],
      option: {
        title: {
          text: '文章数据',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '文章个数',
            type: 'pie',
            radius: ['20%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [{ name: '11', value: 11 }]
          }
        ]
      }
    }
  },
  created () {
    this.getChanel()
  },
  mounted () {
    this.$nextTick(function () {
      this.initEachart()
    })
  },
  watch: {
    datad: function () {
      setTimeout(() => {
        this.initEachart()
      }, 10)
    }
  },
  methods: {
    async initEachart () {
      const dom = this.$refs.dom
      const myEcharts = echarts.init(dom)
      myEcharts.setOption(this.option)
    },
    async getChanel () {
      // console.log(this.datas)
      const dataz = await this.$http.get('article/findEchars.do')
      // const dataz = await this.$http.get('article/findEchars.do')
      // console.log(dataz.data)
      this.option.series[0].data = dataz.data
      this.datad = dataz.data
      console.log(this.datad)
      // this.total = data.data.totalCount
    }
  }
  // mounted () {
  // }
}
</script>
<style scoped>

</style>
