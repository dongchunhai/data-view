// 获取销量排行
function getTop10() {
  $.ajax({
    url: `../data/ranking-list.json`,
    dataType: "json"
  }).done(function (data) {
    let thtml = '';
    let jhtml = '';
    for (let i = 0; i < 10; i += 1) {
      thtml += `<tr><td>${data.tmall[i].name}</td><td>${data.tmall[i].sales}</td><td>${data.tmall[i].count}</td></tr>`;
      jhtml += `<tr><td>${data.jd[i].name}</td><td>${data.jd[i].sales}</td><td>${data.jd[i].count}</td></tr>`;
    }
    $("#tmallTop").html(thtml);
    $("#jdTop").html(jhtml);
  }).fail(function (jqXHR, textStatus) {
    console.log("Ajax Error: ", textStatus);
  });
}
