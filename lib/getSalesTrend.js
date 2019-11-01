/**
			 * 获取实时订单
			 * salesTrend
			 */
const salesTrendOpt = {
  title: {
    text: '订单走势',
    show: false,
  },
  legend: {
    data: ['订单量', '支付金额'],
    align: 'left',
    textStyle: {
      color: '#b0c2f9'
    }
  },
  textStyle: {
    color: '#b0c2f9'
  },
  tooltip: {},
  animationEasing: 'elasticOut',
  animationDelayUpdate: function (idx) {
    return idx * 5;
  }
}
function getSalesTrend(salesTrendChart) {
  $.ajax({
    url: `../data/order-data.json`,
    dataType: "json"
  }).done(function () {
    $("#salesTrend").addClass("chart-done");
  }).done(function (data) {
    let temp = data.data;
    let xAxisData = temp.categories;

    salesTrendChart.setOption({
      ...salesTrendOpt,
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#b0c2f9'
          }
        },
      },
      yAxis: [
        {
          name: '订单量',
          type: 'value',
          position: 'left',
          axisLine:
          { // Y轴线...颜色
            // onZero: false,
            lineStyle:
            {
              color: '#c490bf'
            },
          },
          splitLine: {
            show: false     //去掉网格线
          },
          data: [],
          nameLocation: 'end',
          nameTextStyle:
          {
            color: '#b0c2f9',
          },
          animationDelay: function (idx) {
            return idx * 10;
          }
        }, {
          name: '支付金额',
          type: 'value',
          position: 'right',
          axisLine:
          { // Y轴线...颜色
            // onZero: false,
            lineStyle:
            {
              color: '#c490bf'
            },
          },
          splitLine: {
            show: false     //去掉网格线
          },
          data: [],
          nameLocation: 'end',
          nameTextStyle:
          {
            color: '#b0c2f9',
          },
          animationDelay: function (idx) {
            return idx * 10 + 100;
          }
        }
      ],
      series: [{
        name: '订单量',
        type: 'bar',
        barMaxWidth: 2,
        yAxisIndex: '0',
        smooth: true,
        data: temp.series[0].data,
        animationDelay: function (idx) {
          return idx * 10;
        },
        itemStyle: {
          normal: {
            color: '#5c4ac9',  //柱子颜色
            borderType: 'dashed',
          }
        },
      }, {
        name: '支付金额',
        type: 'bar',
        barMaxWidth: 2,
        yAxisIndex: '1',
        smooth: true,
        data: temp.series[1].data,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        },
        itemStyle: {
          normal: {
            color: '#24c6fa',
          }
        },
      }],
    });
  }).fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
}
