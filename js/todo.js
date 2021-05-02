const toDoPop = document.querySelector(".js-popup"),
      toDoBtn = document.querySelector(".js-toDo"),
      toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList"),
      toDoFilter = document.querySelectorAll("input[name='filter']");

const TODOS_LS = "toDos";

let toDos = [];
let index = 1;
let curFilterOption = "All";

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function checkToDo(event) {
  const li = event.target.parentNode;
  const id = Number(li.id);
  
  toDos.forEach(function(toDo) {
    if (toDo.id === id) {
      toDo.isDone = event.target.checked.toString();
    }
  })
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(id, text, isDone, isFiltering) {
  
  if (id === null) {
    id = index++;
  }
  // "Done"으로 필터링 중일 경우 Todo 추가 시 화면에 표출X
  // "All" 또는 "Active" 일 경우에만 화면에 리스트 바로 추가.
  if (isFiltering || curFilterOption !== "Done") {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.addEventListener("click", checkToDo);
    if (isDone === "true") {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.id = id;
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
  }

  const toDoObj = {
    text: text,
    id: id,
    isDone: isDone
  };
  // 필터링 아닐 경우에만 toDo 리스트 추가
  if (!isFiltering) {
    toDos.push(toDoObj);
    saveToDos();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(null, currentValue, "false", false);
  toDoInput.value = "";
  toDoInput.focus();
}

function handleClickBtn() {
  toDoPop.classList.toggle("showing");
  toDoInput.focus();
}

function handleChangeRadio(event) {
  const optionId = event.target.id;
  const filterOption = document.querySelector(`label[for=${optionId}]`).innerText;
  curFilterOption = filterOption;
  const filteredList = toDos.filter(function (toDo) {
    if (filterOption === "Active") {
      return toDo.isDone === "false";
    } else if (filterOption === "Done") {
      return toDo.isDone === "true";
    } else {
      return toDo;
    }
  });
  toDoList.innerHTML = "";
  filteredList.forEach(function(toDo) {
    paintToDo(toDo.id, toDo.text, toDo.isDone, true);
  })
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(null, toDo.text, toDo.isDone, false);
    });
  } else {
  }
}

function init() {
  const user = localStorage.getItem("currentUser");
  if (user !== null) {
    toDoBtn.style.display = "block";
  }
  loadToDos();
  toDoBtn.addEventListener("click", handleClickBtn);
  toDoForm.addEventListener("submit", handleSubmit);
  toDoFilter.forEach(function(option) {
    option.addEventListener("change", handleChangeRadio);
  });
  
}

init();
