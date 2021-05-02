const askSection = document.querySelector(".before-input-name"),
      afterAskSection = document.querySelector(".after-input-name"),
      form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings"),
      clock = document.querySelector(".js-clock");

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  //event 발생 시 페이지가 새로고침되는걸 막아줌
  event.preventDefault();

  const currentValue = input.value;
  saveName(currentValue);
  paintGreeting(currentValue);
}

function askForName() {
  askSection.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
  input.focus();
}

function paintGreeting(text) {
  askSection.classList.remove(SHOWING_CN);
  afterAskSection.classList.add(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);

  const hour = Number(clock.innerText.split(":")[0]);
  
  if (hour >= 5 && hour < 12) {
    greeting.innerText = `Good morning, ${text}`;
  } else if (hour >= 12 && hour < 18) {
    greeting.innerText = `Good afternoon, ${text}`;
  } else if (hour >= 18 && hour < 22) {
    greeting.innerText = `Good evening, ${text}`;
  } else {
    greeting.innerText = `Good night, ${text}`;
  }

  const toDoBtn = document.querySelector(".js-toDo");
  toDoBtn.style.display = "block";
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
