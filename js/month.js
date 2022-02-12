const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

//　選択日
let selectDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

//　タスクの読み込み
let list = sessionStorage.getItem('list');
list = JSON.parse(list);
list.sort((a, b) => {
  if (a.date > b.date) return 1;
  if (a.date < b.date) return -1;
  if (a.time > b.time) return 1;
  if (a.time < b.time) return -1;
  return 0;
})

// 初期表示
window.onload = function () {
  showProcess(today);
  // タスク表示部分の高さの調整
  // カレンダー部分の高さの取得
  const calender_div = document.getElementById('calender');
  const calender_h = calender_div.clientHeight;
  // 画面全体の高さの取得
  const window_h = window.innerHeight;
  // タスク表示部分の高さの設定
  const task_h = window_h * 0.8 - calender_h;
  const task_elem = document.getElementById('task-list');
  task_elem.style.maxHeight = task_h + "px";
};

// 前の月表示
function prev() {
  showDate.setMonth(showDate.getMonth() - 1);
  selectDate.setMonth(selectDate.getMonth() - 1);
  showProcess(showDate);
}

// 次の月表示
function next() {
  showDate.setMonth(showDate.getMonth() + 1);
  selectDate.setMonth(selectDate.getMonth() + 1);
  showProcess(showDate);
}

// 表示
function showProcess(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  // ヘッダーの表示
  document.querySelector('.calender-header').innerHTML = year + "年 " + (month + 1) + "月";

  // カレンダーの表示
  let calendar = createProcess(year, month);
  document.querySelector('.calender-main').innerHTML = calendar;

  // タスクの表示
  const card = renderTask();
  document.querySelector('.day-task').innerHTML = card;
}

// カレンダー作成
function createProcess(year, month) {
  // 曜日
  let calendar = "<table class='table mt-3'><thead><tr>";
  for (let i = 0; i < week.length; i++) {
    calendar += "<th class='text-center'>" + week[i] + "</th>";
  }
  calendar += "</tr></thead>";

  let count = 0;
  let startDayOfWeek = new Date(year, month, 1).getDay();
  let endDate = new Date(year, month + 1, 0).getDate();
  let lastMonthEndDate = new Date(year, month, 0).getDate();
  let row = Math.ceil((startDayOfWeek + endDate) / week.length);

  calendar += "<tbody>";
  // 1行ずつ設定
  for (let i = 0; i < row; i++) {
    calendar += "<tr>";
    // 1colum単位で設定
    for (let j = 0; j < week.length; j++) {
      if (i == 0 && j < startDayOfWeek) {
        // 1行目で1日まで先月の日付を設定
        calendar += "<td><div class='date-disable-style text-muted'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</div></td>";
      } else if (count >= endDate) {
        // 最終行で最終日以降、翌月の日付を設定
        count++;
        calendar += "<td><div class='date-disable-style text-muted'>" + (count - endDate) + "</div></td>";
      } else {
        // 当月の日付を曜日に照らし合わせて設定
        count++;
        const data_date = year + "/" + (month + 1) + "/" + count;
        if (year == selectDate.getFullYear() && month == selectDate.getMonth() && count == selectDate.getDate()) {
          // 選択した日の表示（水色）
          calendar += "<td><div class='date-style bg-info' id='calender_td' data-date='" + data_date + "'>" + count + "</div></td>";
        } else if (list.find((item) => item.date == data_date)) {
          // タスクがある日の表示（薄水色）
          calendar += "<td><div class='date-style bg-info-2' id='calender_td' data-date='" + data_date + "'>" + count + "</div></td>"
        } else {
          // その他の日の表示（白色）
          calendar += "<td><div class='date-style' id='calender_td' data-date='" + data_date + "'>" + count + "</div></td>";
        }
      }
    }
    calendar += "</tr>";
  }
  calendar += "</tbody></table>";
  return calendar;
}

// 日の選択
document.addEventListener("click", function (e) {
  if (e.target.id === 'calender_td') {
    let select_day = e.target.dataset.date;
    select_day = select_day.split('/');
    selectDate.setFullYear(Number(select_day[0]));
    selectDate.setMonth(Number(select_day[1]) - 1);
    selectDate.setDate(Number(select_day[2]));
    showProcess(showDate);
  }
})

// 選択日のタスクの表示
function renderTask() {
  const select_day = selectDate.getFullYear() + '/' + (selectDate.getMonth() + 1) + '/' + selectDate.getDate();
  const day_task = list.filter((item) => item.date === select_day);

  let card = '';

  day_task.forEach((task) => {
    card += '<div class="card mb-3"><div class="card-body">';
    card += '<div class="card-text"><div class="d-flex align-items-center">';
    card += '<h4 class="my-auto me-3">' + task.time + '</h4>';
    card += '<p class="my-auto">' + task.task + '</p>';
    card += '</div></div>';
    card += '</div></div>';
  })

  return card;
}
