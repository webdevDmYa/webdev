console.log(
  '\nВёрстка, дизайн, UI +10\nКнопка Play/Pause на панели управления +10\nЕсть прогресс-бар ползунок которого перемещается отображая прогресс проигрывания видео. При перемещении ползунка вручную меняется текущее время проигрывания видео +10\nЕсть кнопка Volume/Mute при клике по которой можно включить или отключить звук +10\nЕсть регулятор громкости звука при перемещении ползунка которого можно сделать звук громче или тише +10\nКнопка Play/Pause в центре видео +10\nИтого: 60'
);
import {
  openBurger,
  closeHiddenContainer,
  getThemes,
  getEnTranslate,
  getRuTranslate,
  changeTheme,
  uploadPhotoForSeason,
  btn_languages,
  link,
  burger,
  container,
  themes,
  buttons,
  active_season,
} from './assets/common/func.js';
import { playVideo } from './assets/common/video.js';

playVideo();

burger.addEventListener('click', openBurger);
container.addEventListener('click', closeHiddenContainer);
themes.addEventListener('click', getThemes);

btn_languages[0].onclick = getEnTranslate;
btn_languages[1].onclick = getRuTranslate;

// loading the season, languages, theme that the user selected last

window.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'white') {
      themes.classList.add('dark');
      changeTheme();
    } else if (localStorage.getItem('theme') === 'dark') {
      themes.classList.remove('dark');
      link.remove();
    }
  }
  if (localStorage.getItem('season')) {
    buttons.forEach((btn) => {
      if (btn.dataset.season === localStorage.getItem('season')) {
        btn.classList.add('active-season');
        uploadPhotoForSeason(localStorage.getItem('season'));
      } else {
        btn.classList.remove('active-season');
      }
    });
  } else {
    buttons.forEach((btn) => {
      if (btn.dataset.season === active_season) {
        btn.classList.add('active-season');
        uploadPhotoForSeason(active_season);
      } else {
        btn.classList.remove('active-season');
      }
    });
  }
  if (localStorage.getItem('language')) {
    if (localStorage.getItem('language') === 'ru') {
      getRuTranslate();
    } else if (localStorage.getItem('language') === 'en') {
      getEnTranslate();
    }
  } else {
    btn_languages[0].classList.add('active-lang');
  }

  buttons.forEach(
    (button) =>
      (button.onclick = function () {
        if (this.classList.contains('active-season')) {
          uploadPhotoForSeason(this.dataset.season);
        } else {
          buttons.forEach((btn) => {
            if (btn.classList.contains('active-season')) {
              btn.classList.remove('active-season');
            }
          });
          this.classList.add('active-season');
          uploadPhotoForSeason(this.dataset.season);
        }
      })
  );
});
