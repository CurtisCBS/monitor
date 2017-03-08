
<template>
    <div id="main" class="chart-container"></div>
    x轴维度:
    <select class="form-control" v-model="xSelect">
      <option v-for="(field,name) in dimension">{{field}}</option>
    </select>

    <div class="y-container" v-for="index in count">
      y轴量度: {{index}}
      <select class="form-control" v-model="ySelect">
        <option v-for="(field,name) in dimension">{{field}}</option>
      </select>

      操作:
      <select class="form-control" v-model="action">
        <option value="sum">求和</option>
        <option value="avg">平均</option>
        <option value="max">最大</option>
        <option value="min">最小</option>
      </select>
    </div>

    <div class="add-btn" @click="addOne">+</div>
</template>
<script>
import echarts from "echarts";
export default {
  name:'index',
  data:function(){
    return {
      dimension:null,
      xSelect:null,
      ySelect:null,
      action:null,
      chartData:null,
      count:1
    }
  },
  watch:{
    xSelect:function(){
      if(this.xSelect && this.ySelect && this.action){
        this.compute();
      }
    },
    ySelect:function(){
      if(this.xSelect && this.ySelect && this.action){
        this.compute();
      }
    },
    action:function(newValue,oldValue){
      if(this.xSelect && this.ySelect && this.action){
        this.compute();
      }
    },
    chartData:function(newValue,oldValue){
      if(newValue != oldValue){
        this.renderChart();
      }
    }
  },

  ready:function(){
    this.init();
  },

  methods:{
    addOne:function(){

    },

    init:function(){
      var self = this;
      this.$http.get("http://127.0.0.1:3000/dashboard/getXAxis").then((response) => {
        self.dimension = response.data;
      }, (response) => {
      });
    },

    compute:function(){
      var self = this;
      var params = {
        x:self.xSelect,
        y:self.ySelect,
        action:self.action
      };
      this.$http.get("http://127.0.0.1:3000/dashboard/compute",{
        params
      }).then((response) => {
        self.chartData = response.data;
      }, (response) => {
      });
    },

    renderChart:function(){
      var self = this;
      var myChart = echarts.init(document.getElementById('main')),
          x = new Array(),
          y = new Array();
      for( var i = 0; i < self.chartData.length ; i++ ){
        x.push(self.chartData[i]['_id'][self.xSelect]);
        y.push(self.chartData[i]['value']);
      }
      var option = {
          title: {
            text: '排名'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: x
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: y
          }]
        };
        myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
.chart-container{
  min-width:1000px;
  width: 100%;
  height:200px;
}
.y-container{
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.add-btn{
  font-size: 20px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #ccc;
}
</style>
