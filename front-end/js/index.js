var calendar = document.getElementById("tableContainer");
var gridTable = document.getElementById("tableBody");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;

function createCalendar(date, side) {
  var currentDate = date;
  var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  var yearTitle = document.getElementById("year-name");
  var monthTitle = document.getElementById("month-name");

  var monthName = currentDate.toLocaleString("en-US", {
    month: "short"
  });
  var yearNum = currentDate.toLocaleString("en-US", {
    year: "numeric"
  });
  yearTitle.innerHTML = `${yearNum}`;
  monthTitle.innerHTML = `${monthName}`;

  if (side == "left") {
    gridTable.className = "animated fadeOutRight";
  } else {
    gridTable.className = "animated fadeOutLeft";
  }

  gridTable.innerHTML = "";

  var newTr = document.createElement("div");
  newTr.className = "row";
  var currentTr = gridTable.appendChild(newTr);

  for (let i = 1; i < startDate.getDay(); i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  }

  var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  lastDay = lastDay.getDate();

  for (let i = 1; i <= lastDay; i++) {
    if (currentTr.getElementsByTagName("div").length >= 7) {
      currentTr = gridTable.appendChild(addNewRow());
    }
    let currentDay = document.createElement("div");
    currentDay.className = "col";
    if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
      selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

      document.getElementById("selectedDay").innerHTML = selectedDate.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      selectedDayBlock = currentDay;
      setTimeout(() => {
        currentDay.classList.add("activeDay");
        currentDay.classList.add("dayHover");
      }, 900);
    }
    currentDay.innerHTML = i;
    currentTr.appendChild(currentDay);
  }

  for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
    let emptyDivCol = document.createElement("div");
    emptyDivCol.className = "col empty-day";
    currentTr.appendChild(emptyDivCol);
  }

  setTimeout(() => {
    if (side == "left") {
      gridTable.className = "animated fadeInLeft";
    } else if (side == "right") {
      gridTable.className = "animated fadeInRight";
    } else {
      gridTable.className = "animated fadeIn";
    }
  }, 270);

  function addNewRow() {
    let node = document.createElement("div");
    node.className = "row";
    return node;
  }
}

createCalendar(currentDate);

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "short"
});

var prevMonthButton = document.getElementById("prevMonth");
var nextMonthButton = document.getElementById("nextMonth");

var prevYearButton = document.getElementById("prevYear");
var nextYearButton = document.getElementById("nextYear");

prevMonthButton.onclick = changeMonthPrev;
nextMonthButton.onclick = changeMonthNext;

prevYearButton.onclick = changeYearPrev;
nextYearButton.onclick = changeYearNext;

function changeMonthPrev() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
  createCalendar(currentDate, "left");
}

function changeMonthNext() {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
  createCalendar(currentDate, "right");
}

function changeYearPrev() {
  currentDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth());
  createCalendar(currentDate, "down");
}

function changeYearNext() {
  currentDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth());
  createCalendar(currentDate, "up");
}

gridTable.onclick = function (e) {

  if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
    return;
  }

  if (selectedDayBlock) {
    if (selectedDayBlock.classList.contains("activeDay") && selectedDayBlock.classList.contains("dayHover")) {
      selectedDayBlock.classList.remove("activeDay");
      selectedDayBlock.classList.remove("dayHover");
    }
  }
  selectedDayBlock = e.target;
  selectedDayBlock.classList.add("activeDay");
  selectedDayBlock.classList.add("dayHover");

  selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));
  document.getElementById("selectedDay").innerHTML = selectedDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

}