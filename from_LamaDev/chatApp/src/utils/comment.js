export const timesFun = function (timesData) {
  //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
  let dateBegin = timesData; //将-转化为/，使用new Date
  let dateEnd = Date.now(); //获取当前时间
  let dateDiff = dateEnd - dateBegin; //时间差的毫秒数
  let yearDiff = Math.floor(dateDiff / (24 * 3600 * 1000 * 365)); //相差年数
  let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  let subDayMilliseconds = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  let hours = Math.floor(subDayMilliseconds / (3600 * 1000)); //计算出小时数
  //计算相差分钟数
  let subHourMilliseconds = subDayMilliseconds % (3600 * 1000); //计算小时数后剩余的毫秒数
  let minutes = Math.floor(subHourMilliseconds / (60 * 1000)); //计算相差分钟数
  //计算相差秒数
  let subMinuteMilliseconds = subHourMilliseconds % (60 * 1000); //计算分钟数后剩余的毫秒数
  let seconds = Math.round(subMinuteMilliseconds / 1000);
  let timesString = "";
  if (yearDiff !== 0) {
    timesString = yearDiff + "年前";
  } else if (yearDiff === 0 && dayDiff !== 0) {
    timesString = dayDiff + "天" + hours + "小时" + minutes + "分钟前";
  } else if (dayDiff === 0 && hours !== 0) {
    timesString = hours + "小时" + minutes + "分钟前";
  } else if (hours === 0 && minutes !== 0) {
    timesString = minutes + "分钟前";
  } else if (minutes === 0 && seconds < 60) {
    timesString = "刚刚";
  }
  return timesString;
};
