console.log(
  '\nСмена изображений в секции portfolio +25\n\nПеревод страницы на два языка +25\n\nПереключение светлой и тёмной темы +25\n\nДополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5\nДополнительный функционал: сложные эффекты для кнопок при наведении и/или клике +5\nТемная тема - кнопки в Портфоли\nСветлая тема - + Херо и меседж кнопки\n\nКартинки по умолчанию загружают тот сезон который акутальный на данный момент\n\nИтого 85'
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
