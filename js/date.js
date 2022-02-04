
// 初期設定
const today = new Date();
let showDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let inputElem = document.getElementById('inputDate');

let list = [];

window.onload = function () {
  list = sessionStorage.getItem('list');
  list = JSON.parse(list);
  list.sort((a, b) => {
    if (a.date > b.date) return 1;
    if (a.date < b.date) return -1;
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    return 0;
  })

  renderSKD();
}

// 前の日表示
function prev() {
  showDate.setDate(showDate.getDate() + -1);
  renderSKD();
}

// 次の日表示
function next() {
  showDate.setDate(showDate.getDate() + 1);
  renderSKD();
}

// 日の選択
const input = document.querySelector('input');

input.onchange = function () {
  const inputDate = input.value;
  let data = inputDate.split(' ');
  data = data.map((item) => {
    return item.slice(0, -1);
  })
  showDate.setFullYear(Number(data[0]));
  showDate.setMonth(Number(data[1]) - 1);
  showDate.setDate(Number(data[2]));
  renderSKD();
}

// 1日のスケジュールの表示
function renderSKD() {
  inputElem.value = showDate.getFullYear() + '年 ' + (showDate.getMonth() + 1) + '月 ' + showDate.getDate() + '日';
  showTask();
}

// タスクの表示用のカードの作成
function createCard(task) {
  let card = '<div class="d-flex">'
  card += '<div class="w-10"></div>'
  card += '<div class="card w-90 ms-3"><div class="card-body p-2">';
  card += '<div class="card-text"><div class="d-flex align-items-center">';
  card += '<h6 class="my-auto me-3">' + task.time + '</h6>';
  card += '<p class="my-auto">' + task.task + '</p>';
  card += '</div></div>';
  card += '</div></div>';
  card += '</div>';

  return card;
}

// タスクの表示
function showTask() {
  const selectDay = showDate.getFullYear() + '/' + (showDate.getMonth() + 1) + '/' + showDate.getDate();
  const day_task = list.filter((item) => item.date === selectDay);
  let skd = '';
  for (let i = 0; i < 24; i++) {
    const time = ('00' + i).slice(-2) + ':00';
    const next_time = ('00' + (i + 1)).slice(-2) + ':00';
    const hour_task = day_task.filter((item) => item.time >= time && item.time < next_time);
    skd += '<div class="hour-skd">';
    skd += '<div class="time-border"><div class="w-10">' + i + ':00' + '</div></div>';
    skd += '<div class="hour-task">';
    hour_task.forEach((task) => {
      skd += createCard(task);
    })
    skd += '</div></div>';
  }
  skd += '<div class="time-border"><div class="w-10">' + 24 + ':00' + '</div></div>';
  document.querySelector('.day-task-main').innerHTML = skd;
}

// datetimepickerの設定
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
  format: 'YYYY年 M月 D日',
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
  defaultViewDate: { year: showDate.getFullYear(), month: showDate.getMonth() + 1, day: showDate.getDate() }
});