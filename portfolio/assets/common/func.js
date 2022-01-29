import { i18Obj, translateTo } from '../ruEng/translate.js';
export const burger = document.querySelector('.burger');
export const container = document.querySelector('.container-nav');
export const buttons = document.querySelectorAll('.btn.btn-season');
export let active_season = getSeason();
export const themes = document.querySelector('.svg-theme');
export const btn_languages = document.querySelectorAll('.btn.btn-language');
export const images = document.querySelector('.portfolio-box-photos').children;
export const photos = [...images];
export const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('href', './assets/styles/white-style.css');

export function openBurger() {
  if (!this.classList.contains('is-active')) {
    this.classList.add('is-active');
    container.style.right = '0px';
    container.style.opacity = '1';
    container.style.boxShadow = '-138px 0px 26px 28px rgba(0,0,0,0.44)';
  } else {
    this.classList.remove('is-active');
    container.style.right = '-620px';
    container.style.opacity = '0';
    container.style.boxShadow = '';
  }
}

export function uploadPhotoForSeason(season) {
  localStorage.setItem('season', season);
  photos.forEach(
    (el, index) =>
      (el.style.backgroundImage = `url("./assets/img/seasons-img/img/${season}/${
        index + 1
      }.jpg`)
  );
}

export function getThemes() {
  if (this.classList.contains('dark')) {
    link.remove();
    this.classList.remove('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    changeTheme();
    this.classList.add('dark');
    localStorage.setItem('theme', 'white');
  }
}
export function getEnTranslate() {
  translateTo(i18Obj.en);
  btn_languages[0].classList.add('active-lang');
  btn_languages[1].classList.remove('active-lang');
  localStorage.setItem('language', 'en');
}

export function getRuTranslate() {
  translateTo(i18Obj.ru);
  btn_languages[0].classList.remove('active-lang');
  btn_languages[1].classList.add('active-lang');
  localStorage.setItem('language', 'ru');
}
export function closeHiddenContainer(e) {
  if (e.target.classList.contains('li-hidden')) {
    this.style.right = '-620px';
    this.style.opacity = `0`;
    burger.classList.remove('is-active');
    this.style.boxShadow = '';
  }
}

export function changeTheme() {
  let lk = document.getElementById('theme');
  lk.insertAdjacentElement('afterend', link);
}

export function getSeason() {
  let month = new Date().getMonth();
  let seasonInYear;
  if (month == 0 || month == 1 || month == 11) {
    seasonInYear = 'winter';
  } else if (month >= 2 || month <= 4) {
    seasonInYear = 'spring';
  } else if (month >= 5 || month <= 7) {
    seasonInYear = 'summer';
  } else if (month >= 8 || month <= 10) {
    seasonInYear = 'autumn';
  }
  return seasonInYear;
}
const imgs = [];
function preloadImg() {
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  seasons.forEach((season) => {
    for (var i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/seasons-img/img/${season}/${i}.jpg`;
      imgs.push(img);
    }
  });
}
preloadImg();
