function formatNum(num) {
  if (num < 10) {
    return ('0' + num);
  }
  return num;
}
function getCurrentTime() {
  const now = new Date();
  const year = formatNum(now.getFullYear());
  const month = formatNum(now.getMonth() + 1);
  const day = formatNum(now.getDate());
  const hour = formatNum(now.getHours());
  const minute = formatNum(now.getMinutes());
  const second = formatNum(now.getSeconds());
  $("#nowDate").html(year + "年" + month + "月" + day + "日 " + hour + ":" + minute + ":" + second);
}
