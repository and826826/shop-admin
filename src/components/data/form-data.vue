<template>
    <div id="main" style="width:600px;height:400px"></div>
</template>
<script>
import echarts from 'echarts'
import _ from 'lodash' 
export default {
    data(){
        return{
            options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
        
        }

    },
    async mounted(){
        let myecharts=echarts.init(document.getElementById('main'))
        const {data:d}=await this.$http.get('reports/type/1')
        console.log(d,myecharts)
        if(d.meta.status!=200){
            return this.$message.error('获取数据失败')
        }
        const data=_.merge(d.data,this.options)
        myecharts.setOption(data);
    }

    
}
</script>
<style scoped>


</style>