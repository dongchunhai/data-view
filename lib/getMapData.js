/**
 * 获取订单实时分布数据
 */
const mapChartOpt = {
  title: {
    // text: '订单实时分布地图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false
      }
    },
    zoom: 1.1,
    roam: true,
    itemStyle: {
      normal: {
        areaColor: '#a2a6a8',
        borderColor: '#23295e'
      },
      emphasis: {
        areaColor: '#711d8e'
      }
    }
  },
};
function getMapData(mapChart) {
  $.ajax({
    url: `../data/map-data.json`,
    dataType: "json"
  }).done(function () {
    $("#mapChart").addClass("chart-done");
  }).done(function (data) {
    let chartData = data.mapData;
    if (!chartData.length) {
      return;
    }
    mapChart.setOption({
      ...mapChartOpt,
      visualMap: {
        left: 'left',
        min: 0,
        max: 9711,
        inRange: {
          color: ['#24cbff', '#5986f9', '#6c5bf0', '#4b4ddd', '#5d34b3', '#711d8e']
        },
        itemWidth: 10,
        itemHeight: 100,
        text: ['High', 'Low'],           // 文本，默认为数值文本
        textStyle: {
          color: '#fff'
        },
        calculable: true
      },
      series: [{
        name: 'mapSer',
        type: 'map',
        roam: false,
        geoIndex: 0,
        label: {
            show: false,
        },
        data: chartData
      }]
    });
  }).fail(function (jqXHR) {
    console.log("Ajax Fail: ", jqXHR.status, jqXHR.statusText);
  });
}
