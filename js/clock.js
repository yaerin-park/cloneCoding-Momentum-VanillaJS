const clockTitle = document.querySelector(".js-clock");

let format = "minute";

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  switch(format) {
    case "minute":
      clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
      break;
    case "second":
      clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
      break;
  }
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
