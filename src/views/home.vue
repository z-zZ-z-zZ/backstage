<template>
  <div>
    <h1>首页</h1>
    <div id="box"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let chart = this.$eh.init(document.getElementById("box"));
    let options = {
      title: {
        text: "本系统的周访问量",
        textStyle: {
          color: "red",
          fontSize: 30,
        },
        textAlign: "auto",
      },
      xAxis: {
        type: "category",
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [66, 500, 999, 1400, 800, 500, 1500],
          type: "line",
        },
      ],
    };
    //设置创建好的配置项
    chart.setOption(options);
  },
};
</script>

<style lang="" scoped>
#box{
  width:850px;
  height: 550px;
  margin: 0 auto;
}
</style>
