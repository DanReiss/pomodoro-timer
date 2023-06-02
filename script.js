const form = document.querySelector('#main-form');
const result = document.querySelector('#result');
const resetBtn = document.querySelector("#reset-btn");
const formatTime = (num) => num.toString().length < 2 ? '0' + num : num;
let timer = null;
let timeNow = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);
  let minutes = null;
 
  for(let entries of data) {
    minutes = Number(entries[1]);
  }

  if(!minutes) return;
  reset();
  timer = setInterval(()=> updateTime(minutes), 1000);
});

resetBtn.addEventListener('click', reset)

function updateTime(seconds) {
  let missingTime = seconds - timeNow;

  if(missingTime === 0) return reset();

  updateDisplay(missingTime);
  timeNow += 1;
}

function updateDisplay(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  result.innerHTML = `${formatTime(minutes)}:${formatTime(seconds)}`
}

function reset() {
  clearInterval(timer);
  updateDisplay(0);
  timeNow = 0;
}

// animações dos botões

const timeButtons = document.querySelectorAll('input[type="radio"]')

timeButtons.forEach(button =>{
  button.addEventListener('click', ()=> toogleClass(button.parentElement, "circle-btn-pressed"))
})

function toogleClass(element, name){
  const toRemoveClass = document.querySelector(`.${name}`)
  toRemoveClass?.classList.remove(name)

  element.classList.add(name)
} 