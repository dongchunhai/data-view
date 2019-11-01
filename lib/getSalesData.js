function number_format(number, decimals, dec_point, thousands_sep) {
  /*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * dec_point：小数点符号
   * thousands_sep：千分位符号
   * var num=number_format(1234567.089, 2, ".", ","); //1,234,567.09
   * */
  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

const channelSalesOpt = {
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {c} ({d}%)"
  },
  visualMap: {
    show: false,
    min: 500,
    max: 600,
    inRange: {
      //colorLightness: [0, 1]
    }
  },
}

function getSalesData(channelSales) {
  $.ajax({
    url: `../data/sales-data.json`,
    dataType: "json"
  }).done(function (data) {
    let html = '<span class="total-sale-num-unit font-num">&yen;</span>'
    let total = number_format(data.total, 2);

    for (let i = 0, len = total.length; i < len; i++) {
      if (isNaN(total[i])) {
        html += `<span class="total-sale-num-unit font-num">${total[i]}</span>`
      } else {
        html += `<span class="total-sale-num-item font-num">${total[i]}</span>`
      }
    }
    $("#total").html(html);
    $("#orderCound").html(number_format(data.orderCound));
    $("#salesVol").html(number_format(data.salesVol, 2));
    $("#prePay").html(number_format(data.prePay, 2));
    $("#ratio").html(`${data.ratio} %`);

    channelSales.setOption({
      ...channelSalesOpt,
      series: [{
        name: '渠道支付金额',
        type: 'pie',
        radius: '50%',
        center: ['50%', '70%'],
        color: ['#24cbff', '#7760f6', '#484cdc'],
        data: [{
          value: data.tmall,
          name: '天猫'
        },
        {
          value: data.jd,
          name: '京东'
        },{
          value: data.pindd,
          name: '拼多多'
        }],
        // roseType: 'radius',
        label: {
          normal: {
            formatter: ['{c|{c}元}  {d|{d}%}','{b|{b}}'].join('\n'),
            rich: {
              c: {
                color: 'rgb(154, 168, 212)',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 3
              },
              d: {
                color: 'rgb(154, 168, 212)',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 3
              },
              b: {
                color: 'rgb(154, 168, 212)',
                fontSize: 12,
                height: 30
              },
            },
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgb(98,137,169)',
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
    
          }
        },
        itemStyle: {
          normal: {
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowBlur: 50,
          }
        }
      }]
    });
  }).fail(function (jqXHR, textStatus) {
    console.log("Ajax Error: ", textStatus);
  });
}
