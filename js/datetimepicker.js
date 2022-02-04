// datetimepickerの設定
$(function () {
  $('#inputDate').datetimepicker({
    dayViewHeaderFormat: 'YYYY年 MMMM',
    tooltips: {
      close: '閉じる',
      selectMonth: '月を選択',
      prevMonth: '前月',
      nextMonth: '次月',
      selectYear: '年を選択',
      prevYear: '前年',
      nextYear: '次年',
      selectTime: '時間を選択',
      selectDate: '日付を選択',
      prevDecade: '前期間',
      nextDecade: '次期間',
      selectDecade: '期間を選択',
      prevCentury: '前世紀',
      nextCentury: '次世紀',
    },
    format: 'YYYY/M/D',
    locale: 'ja',
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar-alt',
      up: 'fas fa-arrow-up',
      down: 'fas fa-arrow-down',
    },
    buttons: {
      showClose: true,
    },
  });
});

$('#inputTime').datetimepicker({
  tooltips: {
    close: '閉じる',
    pickHour: '時間を取得',
    incrementHour: '時間を増加',
    decrementHour: '時間を減少',
    pickMinute: '分を取得',
    incrementMinute: '分を増加',
    decrementMinute: '分を減少',
    pickSecond: '秒を取得',
    incrementSecond: '秒を増加',
    decrementSecond: '秒を減少',
    togglePeriod: '午前/午後切替',
    selectTime: '時間を選択',
  },
  format: 'LT',
  locale: 'ja',
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar-alt',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
  },
  buttons: {
    showClose: true,
  },
});