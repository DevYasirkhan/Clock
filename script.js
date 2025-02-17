'use strict';

////////////////////////////////////////
const wrapper = document.querySelector('.wrapper');
const clock = document.querySelector('.clock');
const clockAmPm = document.querySelector('.clock-text');
const dateContainer = document.querySelector('.date-container');
const btnsFont = document.querySelector('.buttons');
let colorPicker = document.querySelector('.colorPicker');
let alphaSlider = document.querySelector('.alphaSlider');

////////////////////////////////////////
// Date and Time
const options = {
  hour12: true,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  weekday: 'short',
};

const getDateHtml = dateTime => {
  const { weekday, month, date, year } = dateTime;
  const html = `
      <div class="day">${weekday},</div>
      <div class="date">${date}</div>
      <div class="month">${month}</div>
      <div class="year">${year}</div>`;
  return html;
};

const initFunc = function () {
  const date = new Date();
  const [weekday, time, dayPeriod] = date
    .toLocaleDateString('en-US', options)
    .split(' ');
  const month = date.toLocaleDateString('en-US', { month: 'long' });

  clock.innerHTML = time;
  clockAmPm.textContent = dayPeriod;

  const dateHtml = getDateHtml({
    weekday,
    month,
    date: date.getDate(),
    year: date.getFullYear(),
  });

  dateContainer.innerHTML = '';
  dateContainer.innerHTML = dateHtml;
};
initFunc();

setInterval(() => initFunc(), 1000);

////////////////////////////////////////
// Clock AM PM button
let btnAmPm = false;

function clockF() {
  if (!btnAmPm && clockAmPm.textContent === 'PM') {
    clockAmPm.textContent = 'AM';
    btnAmPm = true;
  } else {
    clockAmPm.textContent = 'PM';
    btnAmPm = false;
  }
}
clockAmPm.addEventListener('click', clockF);

////////////////////////////////////////
// Font size func
let fontS;

function getFontSize() {
  return parseFloat(getComputedStyle(clock).fontSize);
}

function updateFontSize() {
  clock.style.fontSize = `${fontS}px`;
}

document.addEventListener('DOMContentLoaded', () => {
  fontS = getFontSize();
});

window.addEventListener('resize', () => {
  clock.style.fontSize = '';
  fontS = getFontSize();
});

btnsFont.addEventListener('click', function (e) {
  if (e.target.closest('.btn-p')) {
    fontS += 1;
  } else if (e.target.closest('.btn-m')) {
    fontS -= 1;
  }

  updateFontSize();
});

////////////////////////////////////////
// Color picker
function percentToHex(p) {
  return `0${Math.round((255 / 100) * p).toString(16)}`.slice(-2).toUpperCase();
}

document.addEventListener('DOMContentLoaded', function () {
  function updateBackground() {
    let color = colorPicker.value;
    let alpha = alphaSlider.value;

    wrapper.style.backgroundColor = `${color}${percentToHex(alpha * 100)}`;
  }
  colorPicker.addEventListener('input', updateBackground);
  alphaSlider.addEventListener('input', updateBackground);
});
