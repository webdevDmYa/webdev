import './module/audio.js';
import { i18n } from './module/translate.js';
var checkQueryParam = document.querySelector('.queryParam');
const allCheckImg = document.querySelectorAll('input[name="img"]');
let apiGet = '' || 'github';
let queryParam = 'fun';

if (localStorage.getItem('apiget')) {
  apiGet = localStorage.getItem('apiget');
  if (localStorage.getItem('query')) {
    queryParam = localStorage.getItem('query');
    checkQueryParam.value = queryParam;
  }
  allCheckImg.forEach((input) => {
    if (input.dataset.img === apiGet) {
      if (input.dataset.img === 'github') {
        checkQueryParam.style.visibility = 'hidden';
        input.checked = true;
      } else {
        checkQueryParam.style.visibility = 'visible';
        input.checked = true;
      }
    }
  });
}

let languages = 'en';

const date = new Date();
const data = document.querySelector('.date');
const time = document.querySelector('.time');
const greeting = document.querySelector('.greeting');
const options = { month: 'long', weekday: 'long', day: 'numeric' };
let currentDate;
const greetingTranslateTo = () => {
  if (languages === 'ru') {
    currentDate = date.toLocaleDateString('ru-RU', options);
  } else if (languages === 'en') {
    currentDate = date.toLocaleDateString('en-EN', options);
  }
  data.textContent = currentDate;
  data.style.textTransform = 'capitalize';
};
greetingTranslateTo();
function greetingShow() {
  const hours = date.getHours();
  if (hours >= '00' && hours < '06') {
    if (languages === 'en') {
      return (greeting.textContent = 'Good night');
    } else {
      return (greeting.textContent = 'Доброй ночи');
    }
  } else if (hours >= '06' && hours < '12') {
    if (languages === 'en') {
      return (greeting.textContent = 'Good morning');
    } else {
      return (greeting.textContent = 'Доброе утро');
    }
  } else if (hours >= '12' && hours < '18') {
    if (languages === 'en') {
      return (greeting.textContent = 'Good afternoon');
    } else {
      return (greeting.textContent = 'Доброго дня');
    }
  } else if (hours >= '18' && hours < '24') {
    if (languages === 'en') {
      return (greeting.textContent = 'Good evening');
    } else {
      return (greeting.textContent = 'Добрый вечер');
    }
  }
}
greetingShow();

const showTime = () => {
  const date = new Date();
  let currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
};
showTime();

const userName = document.querySelector('.name');
if (localStorage.getItem('user')) {
  userName.value = localStorage.getItem('user');
} else {
  userName.value = '';
}
const getUserName = (e) => {
  let name = e.target.value;
  userName.value = name;
  localStorage.setItem('user', name);
};
userName.addEventListener('input', getUserName);

const buttonRight = document.querySelector('.slide-next');
const buttonLeft = document.querySelector('.slide-prev');

let body = document.querySelector('body');
let times;
let img = new Image();
let randomNum = Math.floor(Math.random() * 10) + 1;
if (randomNum >= 1 && randomNum < 10) {
  randomNum = '0' + randomNum;
}

function slide() {
  if (this === buttonRight) {
    randomNum++;
    if (randomNum == 11) {
      randomNum = 1;
    }
  }
  if (this === buttonLeft) {
    randomNum--;
    if (randomNum == 0) {
      randomNum = 10;
    }
  }
  if (randomNum >= 1 && randomNum < 10) {
    randomNum = '0' + randomNum;
  } else if (randomNum == 10) {
    randomNum = randomNum.toString();
  }
  getStartBg(randomNum);
}

const getPeriod = () => {
  const period = document.querySelector('.greeting');
  if (
    period.textContent === 'Good morning' ||
    period.textContent === 'Доброе утро'
  ) {
    return (times = 'morning');
  } else if (
    period.textContent === 'Good afternoon' ||
    period.textContent === 'Доброго дня'
  ) {
    return (times = 'afternoon');
  } else if (
    period.textContent === 'Good evening' ||
    period.textContent === 'Добрый вечер'
  ) {
    return (times = 'evening');
  } else if (
    period.textContent === 'Good night' ||
    period.textContent === 'Доброй ночи'
  ) {
    return (times = 'night');
  }
};
async function getStartBg() {
  let url;
  let response;
  let data;
  if (apiGet === 'pexel') {
    try {
      url = `https://api.pexels.com/v1/search?orientation=landscape&query=${queryParam}`;
      response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization:
            '563492ad6f91700001000001cbf0e2d802304768be9776115087b31a',
        },
      });
      data = await response.json();
      img.onload = function () {
        img.src = `data.photos[${Number(
          randomNum.toString().slice(1, 2)
        )}].src.landscape`;
      };
      body.style.backgroundImage = `url(${
        data.photos[Number(randomNum.toString().slice(1, 2))].src.landscape
      })`;
      clearErrorText();
    } catch (error) {
      errorBg();
      ErrorText();
      throw Error('error in pexel');
    }
  } else if (apiGet === 'unsplash') {
    try {
      url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${queryParam}&client_id=k83LU__iP3YnzSrMKYiCJBZIRO-0ziAikVznE9Rnv6U`;
      response = await fetch(url);
      data = await response.json();
      img.onload = function () {
        img.src = data.urls.regular;
      };

      body.style.backgroundImage = `url(${data.urls.regular})`;
      clearErrorText();
    } catch (error) {
      errorBg();
      ErrorText();
      throw Error('error in unsplash');
    }
  } else if (apiGet === 'github') {
    try {
      url = `https://raw.githubusercontent.com/webdevDmYa/momentum-files/main/images/${times}/${randomNum}.webp`;
      response = await fetch(url);
      data = response.url;
      img.onload = function () {
        img.src = data;
      };
      body.style.backgroundImage = `url(${data})`;
      clearErrorText();
    } catch (error) {
      errorBg();
      ErrorText();
      throw Error('error in github');
    }
  } else {
    body.style.backgroundColor = 'black';

    throw Error();
  }
}
async function errorBg() {
  let url = `https://raw.githubusercontent.com/webdevDmYa/momentum-files/main/images/${times}/${randomNum}.webp`;
  let response = await fetch(url);
  let data = response.url;
  img.onload = function () {
    img.src = data;
  };
  body.style.backgroundImage = `url(${data})`;
}
function ErrorText() {
  checkQueryParam.style.border = '1px solid red';
  checkQueryParam.style.color = 'red';
}
function clearErrorText() {
  checkQueryParam.style.border = 'none';
  checkQueryParam.style.color = '';
}
getPeriod();
getStartBg();
buttonLeft.addEventListener('click', slide);
buttonRight.addEventListener('click', slide);

const nextQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let quoteNum = 0;
function getQuotes() {
  quoteNum++;
  if (quoteNum == 30) {
    quoteNum = 1;
  }
  quote.setAttribute('data-quote', `quote-${quoteNum}`);
  author.setAttribute('data-author', `author-${quoteNum}`);
  if (languages === 'ru') {
    getQuotesLangRu();
  }
  if (languages === 'en') {
    getQuotesLangEn();
  }
}

const getQuotesLangRu = () => {
  quote.textContent = `"${i18n.ru[quote.dataset.quote]}"`;
  author.textContent = `"${i18n.ru[author.dataset.author]}"`;
};
const getQuotesLangEn = () => {
  quote.textContent = `"${i18n.en[quote.dataset.quote]}"`;
  author.textContent = `"${i18n.en[author.dataset.author]}"`;
};
getQuotes();
nextQuote.addEventListener('click', getQuotes);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let nameCity = document.querySelector('.city');
if (localStorage.getItem('city')) {
  nameCity.value = localStorage.getItem('city');
} else {
  nameCity.value = 'Dnipro';
}
async function getWeatherAPI() {
  const API_KEY = '2468c40358c51b0f36e4322143ac0553';
  const URL = `https://api.openweathermap.org/data/2.5/weather?&q=${nameCity.value}&units=metric&lang=${languages}&appid=${API_KEY}`;
  let data = await fetch(URL);
  data = await data.json();
  if (data.cod === '404' || data.cod === '400') {
    weatherError.innerHTML = data.message;
    weatherIcon.style.visibility = 'hidden';
    temperature.style.visibility = 'hidden';
    weatherDescription.style.visibility = 'hidden';
    wind.style.visibility = 'hidden';
    humidity.style.visibility = 'hidden';
  } else {
    weatherIcon.style.visibility = 'visible';
    temperature.style.visibility = 'visible';
    weatherDescription.style.visibility = 'visible';
    wind.style.visibility = 'visible';
    humidity.style.visibility = 'visible';
    weatherError.innerHTML = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
  if (languages === 'ru') {
    wind.textContent = `скорость ветра: ${Math.floor(data.wind.speed)}м/с`;
    humidity.textContent = `давление: ${data.main.humidity}%`;
  } else {
    wind.textContent = `wind speed: ${Math.floor(data.wind.speed)}m/s`;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
  }
}

getWeatherAPI();
const getCityName = (e) => {
  let cityToLocal = e.target.value;
  nameCity.value = cityToLocal;
  localStorage.setItem('city', cityToLocal);
};
nameCity.addEventListener('input', getCityName);
nameCity.addEventListener('change', getWeatherAPI);

const seting = document.querySelector('.setting');
const todo = document.querySelector('.todo');
const sb = document.querySelector('.setting-box');
const tb = document.querySelector('.todo-box');
const btnConfirm = document.querySelector('.btn-confirm');
const btnConfirm2 = document.querySelector('.btn-confirm2');
seting.addEventListener('click', function () {
  if (
    !this.classList.contains('active') &&
    !todo.classList.contains('active')
  ) {
    this.classList.add('active');
    fadeIn(sb, 1);
  }
});
todo.addEventListener('click', function () {
  if (
    !this.classList.contains('active') &&
    !seting.classList.contains('active')
  ) {
    this.classList.add('active');
    fadeIn(tb, 1);
  }
});
btnConfirm2.addEventListener('click', function () {
  todo.classList.remove('active');
  fadeOut(tb, 1);
});
btnConfirm.addEventListener('click', function () {
  seting.classList.remove('active');
  fadeOut(sb, 1);
});
function fadeOut(elem, iterations) {
  var keyframes = [
    { opacity: '1', visibility: 'visible' },

    { opacity: '0', visibility: 'hidden' },
  ];
  var timing = { duration: 500, iterations: iterations, fill: 'forwards' };
  return elem.animate(keyframes, timing);
}
function fadeIn(elem, iterations) {
  var keyframes = [
    { opacity: '0', visibility: 'hidden' },

    { opacity: '1', visibility: 'visible' },
  ];
  var timing = { duration: 500, iterations: iterations, fill: 'forwards' };
  return elem.animate(keyframes, timing);
}
const changeLanguages = () => {
  if (languages === 'ru') {
    languages = 'en';
    userName.setAttribute('placeholder', '[Enter name]');
    nameCity.setAttribute('placeholder', 'Dnipro');
    getQuotesLangEn();
  } else {
    languages = 'ru';
    getQuotesLangRu();
    userName.setAttribute('placeholder', '[Введите имя]');
    nameCity.setAttribute('placeholder', 'Днепр');
  }
  greetingShow();
  greetingTranslateTo();
  getWeatherAPI();
};
const checkLang = document.getElementById('checkbox');

checkQueryParam.addEventListener('input', function () {
  queryParam = this.value;
  localStorage.setItem('query', queryParam);
});
checkQueryParam.addEventListener('change', getStartBg);

allCheckImg.forEach((input) => {
  input.onclick = function () {
    if (this.dataset.img === 'github') {
      checkQueryParam.style.visibility = 'hidden';
    } else {
      checkQueryParam.style.visibility = 'visible';
    }

    apiGet = this.dataset.img;

    localStorage.setItem('apiget', apiGet);
  };
});
let langName = document.querySelector('.langName');
let settingsName = document.querySelector('.setting-box > h2');
checkLang.addEventListener('click', function () {
  if (checkLang.checked) {
    languages = 'en';
    settingsName.innerHTML = 'Настройки';
    langName.innerHTML = 'Ру';
    localStorage.setItem('lang', 'ru');
    changeLanguages();
  } else {
    languages = 'ru';
    langName.innerHTML = 'En';
    settingsName.innerHTML = 'Settings';
    localStorage.setItem('lang', 'en');
    changeLanguages();
  }
});

if (localStorage.getItem('lang')) {
  if (localStorage.getItem('lang') === 'ru') {
    settingsName.innerHTML = 'Настройки';
    langName.innerHTML = 'Ру';
    checkLang.checked = true;
    changeLanguages();
    getWeatherAPI();
  } else {
    settingsName.innerHTML = 'Settings';
    langName.innerHTML = 'En';
  }
}
let hidElem = document.querySelectorAll('[data-hid]');
let viElem = document.querySelectorAll('[data-vi]');
viElem.forEach((el) => {
  el.addEventListener('change', function () {
    let param = this.dataset.vi;

    hidBlock(param);
  });
});

function hidBlock(param) {
  hidElem.forEach((elem) => {
    if (elem.dataset.hid === param) {
      if (!elem.classList.contains('hiden')) {
        elem.classList.add('hiden');
        localStorage.setItem(`${elem.dataset.hid}`, 'hiden');
        fadeOut(elem, 1);
      } else {
        elem.classList.remove('hiden');
        localStorage.setItem(`${elem.dataset.hid}`, 'visible');
        fadeIn(elem, 1);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  let hidElem = document.querySelectorAll('[data-hid]');
  let viElem = document.querySelectorAll('[data-vi]');
  hidElem.forEach((el) => {
    if (localStorage.getItem(`${el.dataset.hid}`) === 'hiden') {
      el.classList.add('hiden');
      fadeOut(el, 1);
      viElem.forEach((elem) => {
        if (elem.dataset.vi === el.dataset.hid) {
          elem.children[0].checked = true;
        }
      });
    } else if (localStorage.getItem(`${el.dataset.hid}`) === 'visible') {
      el.classList.remove('hiden');
      fadeIn(el, 1);
      viElem.forEach((elem) => {
        if (elem.dataset.vi === el.dataset.hid) {
          elem.children[0].checked = false;
        }
      });
    }
  });

  document.querySelector('#submit').disabled = true;

  document.getElementById('task').onkeyup = function () {
    let childrens = document.querySelectorAll('#tasks > li').length;
    if (this.value.length > 0 && childrens < 9) {
      document.querySelector('#submit').disabled = false;
    } else {
      document.querySelector('#submit').disabled = true;
    }
  };
  let id = 0;

  document.querySelector('form').addEventListener('submit', (event) => {
    document.querySelector('#submit').disabled = true;
    event.preventDefault();
    let task = document.querySelector('#task').value;
    let taskUl = document.querySelector('#tasks');
    let li = document.createElement('li');

    li.setAttribute('data-id', `${id}-task`);
    li.innerHTML = `<span data-star="${id}" class="star"></span><span data-task="${id}" class="li-task">${task}</span><span data-done="${id}" class="done"></span><span data-delete="${id}" class="delete"></span><span data-refresh="${id}" class="refresh hiden"></span>`;
    taskUl.append(li);
    document.querySelector('#task').value = '';
    localStorage.setItem(`${id}-task`, `${task}`);
    localStorage.setItem('todo', 'true');
    id++;

    //by default , submit button is disabled

    // document.getElementById('task').onkeyup = function () {
    //   document.querySelector('#submit').disabled = false;
    // };
    //stop submit forms
  });

  document.querySelector('#tasks').addEventListener('click', function (e) {
    if (e.target.classList.contains('done')) {
      document
        .querySelector(`[data-star="${e.target.dataset.done}"]`)
        .classList.add('star-done');
      document
        .querySelector(`[data-done="${e.target.dataset.done}"]`)
        .classList.add('completed');
      document
        .querySelector(`[data-task="${e.target.dataset.done}"]`)
        .classList.add('li-task-through');
      document
        .querySelector(`[data-refresh="${e.target.dataset.done}"]`)
        .classList.remove('hiden');
      localStorage.setItem(
        `${e.target.dataset.done}-task-done`,
        `${e.target.dataset.done}`
      );
    }
    if (e.target.classList.contains('delete')) {
      localStorage.removeItem(`${e.target.dataset.delete}-task`);
      localStorage.removeItem(`${e.target.dataset.delete}-task-done`);
      let childrens = document.querySelectorAll('#tasks > li').length;
      if (childrens === 1) {
        localStorage.removeItem('todo');

        for (let i = 10; i >= 0; i--) {
          localStorage.removeItem(`${i}-task-done`);
        }

        id = 0;
      }
      e.target.parentNode.remove();
    }
    if (e.target.classList.contains('refresh')) {
      document
        .querySelector(`[data-star="${e.target.dataset.refresh}"]`)
        .classList.remove('star-done');
      document
        .querySelector(`[data-done="${e.target.dataset.refresh}"]`)
        .classList.remove('completed');
      document
        .querySelector(`[data-task="${e.target.dataset.refresh}"]`)
        .classList.remove('li-task-through');
      document
        .querySelector(`[data-refresh="${e.target.dataset.refresh}"]`)
        .classList.add('hiden');
      localStorage.removeItem(`${e.target.dataset.refresh}-task-done`);
    }
  });

  const getTodoListOfLocalStorage = () => {
    const countOfMaxTodoList = 10;
    for (let i = 0; i <= countOfMaxTodoList; i++) {
      if (localStorage.getItem(`${i}-task`)) {
        let task = localStorage.getItem(`${i}-task`);
        let taskUl = document.querySelector('#tasks');
        let li = document.createElement('li');
        li.setAttribute('data-id', `${i}-task`);
        li.innerHTML = `<span data-star="${i}" class="star"></span><span data-task="${i}" class="li-task">${task}</span><span data-done="${i}" class="done"></span><span data-delete="${i}" class="delete"></span><span data-refresh="${i}" class="refresh hiden"></span>`;
        taskUl.append(li);
      }
    }

    let childrens = document.querySelectorAll('#tasks > li');
    for (let i = 10; i >= 0; i--) {
      childrens.forEach((el) => {
        let p = el.dataset.id.split('-');
        if (p[0] === localStorage.getItem(`${i}-task-done`)) {
          el.children[0].classList.add('star-done');
          el.children[1].classList.add('li-task-through');
          el.children[2].classList.add('completed');
          el.children[4].classList.remove('hiden');
        }

        // el.setAttribute('data-id', `${index}-task`);
      });
    }
  };
  const getCount = () => {
    let ulTaskId = document.querySelector('#tasks');

    let count;
    let index;
    let sl;

    count = ulTaskId.lastElementChild.dataset.id.split('');
    index = count.indexOf('-');
    sl = count.slice(0, index);

    id = +sl + 1;
  };

  if (localStorage.getItem('todo')) {
    getTodoListOfLocalStorage();
    getCount();
  }
});
