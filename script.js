
const form = document.querySelector('#main-form');
const breakIndicator = document.querySelector(".break")
const result = document.querySelector('#result');
const resetBtn = document.querySelector("#reset-btn");
const formatTime = (num) => num.toString().length < 2 ? '0' + num : num;
let timer = null;
let timeNow = 0;
const options = {
  25: {seconds: 1500, pause: 300},
  50: {seconds: 3000, pause: 600}
}
// usign driver to guide the user
const driver = window.driver.js.driver;

console.log(document.querySelector('#main-form input[type="radio"]').value)
console.log(document.querySelector('#main-form input'))

const driverObj = driver({
  showProgress: true,
  steps: [
    { element: '#box-25-minutes', popover: { title: '25 Minutes Selector', description: 'Initializes a timer with 25 minutes of focus and 5 minutes of rest.' } },
    { element: '#box-50-minutes', popover: { title: '50 Minutes Selector', description: 'Initializes a timer with 50 minutes of focus and 10 minutes of rest.' } },
    { element: '.break', popover: { title: 'Indicator "Break"', description: 'If it is lit, it indicates that it is time to take a break.'}},
    { element: '.display-time', popover: { title: 'Tempo restante', description: 'Indicates remaining focus time or pause time.' } },
    { element: '#reset-btn', popover: { title: 'Reset Button', description: 'Reset the timer.' } },
    { element: '#play-btn', popover: { title: 'Play Button', description: 'Start counting.' } },
    { popover: { title: 'Notice', description: 'As the objective of the pomodoro is to do the sequence without pausing, there is no pause button.' } },
  ]
});

driverObj.drive();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let option = null;
 
  for(let entries of data) {
    option = options[entries[1]];
  }

  if(!option || !option && timer) return;
  reset();
  timer = setInterval(()=> updateTime(option), 1000);
});

resetBtn.addEventListener('click', reset)

function updateTime({seconds, pause}) {
  let missingTime = seconds - timeNow;

  if(missingTime === 0) {
    breakIndicator.classList.add("active");
    reset();
    timer = setInterval(()=> setBreak(pause), 1000);
  }

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

function setBreak(seconds){
  let missingTime = seconds - timeNow;
  updateDisplay(missingTime);
  timeNow += 1;
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