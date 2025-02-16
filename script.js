'use strict';

////////////////////////////////////////
const wrapper = document.querySelector('.wrapper');
const clock = document.querySelectorAll('.clock');
const clockHour = document.querySelector('.clock-hour');
const clockMin = document.querySelector('.clock-min');
const clockSec = document.querySelector('.clock-sec');
const clockText = document.querySelector('.clock-text');

const clockDay = document.querySelector('.day');
const clockDate = document.querySelector('.date');
const clockMonth = document.querySelector('.month');
const clockYear = document.querySelector('.year');

const btnFont = document.querySelector('.buttons');

let colorPicker = document.querySelector('.colorPicker');
let alphaSlider = document.querySelector('.alphaSlider');

////////////////////////////////////////
// Date and Time
const options = {
  hour12: true,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  year: 'numeric',
  day: '2-digit',
  month: 'long',
  weekday: 'short',
};

const dateTime = Intl.DateTimeFormat('en-US', options);

const initFunc = function () {
  const date = new Date();

  clockHour.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'hour').value;
  clockMin.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'minute').value;
  clockSec.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'second').value;
  clockText.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'dayPeriod').value;
  clockDay.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'weekday').value;
  clockDate.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'day').value;
  clockMonth.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'month').value;
  clockYear.textContent = dateTime
    .formatToParts(date)
    .find(p => p.type === 'year').value;
};
initFunc();

setInterval(() => initFunc(), 1000);

////////////////////////////////////////
// Clock AM PM button
let btnAmPm = false;

function clockF() {
  if (!btnAmPm && clockText.textContent === 'PM') {
    clockText.textContent = 'AM';
    btnAmPm = true;
  } else {
    clockText.textContent = 'PM';
    btnAmPm = false;
  }
}
clockText.addEventListener('click', clockF);

////////////////////////////////////////
// Font size func
let num = 80;
function updateNum() {
  if (window.matchMedia('(max-width: 580px)').matches) {
    num = 45;
  } else if (window.matchMedia('(max-width: 768px)').matches) {
    num = 50;
  } else if (window.matchMedia('(max-width: 992px)').matches) {
    num = 60;
  } else if (window.matchMedia('(max-width: 1200px)').matches) {
    num = 70;
  } else {
    num = 80;
  }
  updateFontSize();
}
updateNum();

// Update fontSize
function updateFontSize() {
  console.log('Updated num', num);
  clock.forEach(cl => {
    cl.style.fontSize = `${num}px`;
  });
}

window.addEventListener('resize', updateNum);

btnFont.addEventListener('click', function (e) {
  if (e.target.closest('.btn-p')) {
    num += 1;
  } else if (e.target.closest('.btn-m')) {
    num -= 1;
  }
  updateFontSize();
});

////////////////////////////////////////
// Color picker

// Color picker
// colorPicker.addEventListener('input', () => {
//   wrapper.style.background = colorPicker.value;
// });

document.addEventListener('DOMContentLoaded', function () {
  function updateBackground() {
    let color = colorPicker.value;
    let alpha = alphaSlider.value;

    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);

    wrapper.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  colorPicker.addEventListener('input', updateBackground);
  alphaSlider.addEventListener('input', updateBackground);
});
