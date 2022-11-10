const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getBodyBgColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function handleBtnStart() {
  timerId = setInterval(() => {
    getBodyBgColor();
  }, 1000);
  startBtnRef.disabled = true;
}

function handleBtnStop() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
}

startBtnRef.addEventListener('click', handleBtnStart);
stopBtnRef.addEventListener('click', handleBtnStop);
