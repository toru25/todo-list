"use strict";

// 初期データ
const initialTask = { id: 1, task: "HI課題", date: "2022/1/21", time: "16:20" };
const initialTask2 = [
  { id: 11, task: "HI課題1-1", date: "2022/1/21", time: "01:20" },
  { id: 12, task: "HI課題1-2", date: "2022/1/21", time: "05:20" },
  { id: 13, task: "HI課題1-3", date: "2022/1/21", time: "07:20" },
  { id: 14, task: "HI課題1-4", date: "2022/1/21", time: "08:20" },
  { id: 15, task: "HI課題1-5", date: "2022/1/21", time: "10:20" },
  { id: 16, task: "HI課題1-6", date: "2022/1/21", time: "13:20" },
  { id: 17, task: "HI課題1-7", date: "2022/1/21", time: "16:20" },
  { id: 18, task: "HI課題1-8 長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。長いとこうなります。", date: "2022/1/21", time: "16:50" },
  { id: 2, task: "HI課題2", date: "2022/1/22", time: "16:21" },
  { id: 3, task: "HI課題3", date: "2022/1/23", time: "16:22" },
  { id: 4, task: "HI課題4", date: "2022/1/24", time: "16:23" },
  { id: 5, task: "HI課題5", date: "2022/1/25", time: "16:24" },
  { id: 6, task: "HI課題6", date: "2022/1/26", time: "16:25" }
];
let list = initialTask2;
let currentNum = 19;
let editId = -1;

// 初期設定
const inputTodo = document.getElementById("inputTask");
const inputDate = document.getElementById("inputDate");
const inputTime = document.getElementById("inputTime");
const todoLists = document.getElementById("todoLists");

window.onload = function () {
  // storageにあればリストを読み込む
  const data = sessionStorage.getItem('list');
  if (data !== null) {
    const newList = JSON.parse(data);
    list = newList;
  }
  renderList();
}

// 入力フォーム
const forms = document.getElementsByClassName("needs-validation");
const form = forms[0];

// 追加ボタン
function handleAdd(e) {
  if (!form.checkValidity()) {
    e.preventDefault()
    e.stopPropagation()
    form.classList.add('was-validated')
  } else {
    form.classList.remove('was-validated')
    addTask();

    // 編集している場合、編集先のタスクを削除
    if (editId !== -1) {
      rmTask(editId);
      editId = -1;
    }

    renderList();
    inputDate.value = "";
    inputTime.value = "";
    inputTodo.value = "";
  }
}

// キャンセルボタン
function handleCancel() {
  form.classList.remove('was-validated');
  inputDate.value = "";
  inputTime.value = "";
  inputTodo.value = "";
  editId = -1;
}

// タスクの追加
function addTask() {
  list.push({
    id: currentNum,
    task: inputTodo.value,
    date: inputDate.value,
    time: inputTime.value
  })
  currentNum++;
}

// タスクの削除
function rmTask(id) {
  const index = list.findIndex((task) => task.id === id);
  list.splice(index, 1);
  renderList();
}

// 既存のタスクの編集
function editTask(id) {
  const item = list.find((task) => task.id === id);
  inputDate.value = item.date;
  inputTime.value = item.time;
  inputTodo.value = item.task;
  editId = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// タスクの表示
function renderList() {
  // sessionStorageにデータを保存
  sessionStorage.setItem('list', JSON.stringify(list));

  let card = '';
  list.forEach((task) => {
    card += '<div class="card mb-3"><div class="card-body">';
    card += '<div class="card-title mb-3"><div class="d-flex align-items-center flex-wrap">';
    card += '<h3 class="my-auto me-3">' + task.date + '</h3>';
    card += '<h3 class="my-auto me-auto">' + task.time + '</h3>';
    card += '<button type="button" class="btn btn-outline-primary me-2" id="editBtn" onClick="editTask(' + task.id + ')"><i class="fas fa-pen "></i></button>';
    card += '<button type="button" class="btn btn-outline-dark" id="rmBtn" onClick="rmTask(' + task.id + ')"><i class="fas fa-trash "></i></button>';
    card += '</div></div>';
    card += '<p class="card-text">' + task.task + '</p>';
    card += '</div></div>';
  })
  document.querySelector('#todoLists').innerHTML = card;
}