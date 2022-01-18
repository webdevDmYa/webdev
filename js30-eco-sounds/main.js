let isPlay = false;
let activeMp3 = '';
const mp3 = new Audio();
const smMenu = document.querySelector('a[href="#brds"]');
const downloadMp3 = document.getElementById('downloaMp3');
const span = document.querySelector('.choose');
const birdsBox = document.getElementById('brds');
const birdsDesktop = document.querySelector('.ul').querySelectorAll('.birds');
const birds = document.getElementById('brds').querySelectorAll('.birds');
const playBigBtn = document.querySelector('.big-play');
const logo = document.querySelector('.logo');
const wrapper = document.querySelector('.wrapper');

if (window.innerWidth > 768) {
  wrapper.style.backgroundImage = 'url(./assets/img/drozd.jpg)';
} else {
  wrapper.style.backgroundImage = 'url(./assets/img/img-webp/drozd.webp)';
}
logo.addEventListener('click', function () {
  if (!isPlay) {
    playBird(this.dataset.bird);
    isPlay = true;
    playBigBtn.classList.add('active-button');
    playBigBtn.classList.add('active-svg');
    this.classList.add('active-svg');
    birds.forEach((bird) => bird.classList.remove('active-text'));
    birdsDesktop.forEach((birdDes) => birdDes.classList.remove('active-text'));
  } else {
    stopPlay();
    isPlay = false;
    if (!isPlay) {
      playBird(this.dataset.bird);
      isPlay = true;
      birds.forEach((bird) => bird.classList.remove('active-text'));
      birdsDesktop.forEach((birdDes) =>
        birdDes.classList.remove('active-text')
      );
    }
  }
  if (window.innerWidth > 768) {
    wrapper.style.backgroundImage = 'url(./assets/img/woody.jpg)';
  } else {
    wrapper.style.backgroundImage = 'url(./assets/img/img-webp/woody.webp)';
  }
});
mp3.addEventListener('ended', function () {
  playBigBtn.classList.remove('active-button', 'active-svg');
  logo.classList.remove('active-svg');
  if (window.innerWidth > 768) {
    wrapper.style.backgroundImage = 'url(./assets/img/drozd.jpg)';
  } else {
    wrapper.style.backgroundImage = 'url(./assets/img/img-webp/drozd.webp)';
  }
  mp3.src = '';
});
smMenu.addEventListener('click', function () {
  birdsBox.classList.toggle('visible');
  span.classList.toggle('rotate');
});

playBigBtn.addEventListener('click', function () {
  if (this.classList.contains('active-button')) {
    this.classList.remove('active-button');
    if (isPlay) {
      stopPlay();
      isPlay = false;
    }
  } else if (!this.classList.contains('active-button')) {
    this.classList.add('active-button');
    if (!isPlay) {
      mp3.play();
      isPlay = true;
    }
  }
});
birds.forEach((bird) => {
  bird.addEventListener('click', desktopAudioControls);
});
birdsDesktop.forEach((birdDesktop) => {
  birdDesktop.addEventListener('click', desktopAudioControls);
});

function playBird(param) {
  mp3.src = `./assets/audio/${param}.mp3`;
  mp3.currentTime = 0;
  mp3.play();
  activeMp3 = param;
  downloadMp3.setAttribute('href', `./assets/audio/${param}.mp3`);
}

function stopPlay() {
  mp3.pause();
}

function desktopAudioControls(e) {
  if (e.target.classList.contains('birds')) {
    if (!isPlay) {
      if (!e.target.classList.contains('active-text')) {
        birdsDesktop.forEach((li) => {
          li.classList.remove('active-text');
        });
        playBird(this.dataset.bird);
        isPlay = true;
        e.target.classList.add('active-text');
        playBigBtn.classList.add('active-button', 'active-svg');
      }
    } else {
      stopPlay();
      isPlay = false;
      birdsDesktop.forEach((li) => {
        li.classList.remove('active-text');
      });
      e.target.classList.add('active-text');
      if (!isPlay) {
        playBird(this.dataset.bird);
        isPlay = true;
        e.target.classList.add('active-text');
        playBigBtn.classList.add('active-button', 'active-svg');
      }
    }
  }
  logo.classList.remove('active-svg');

  if (window.innerWidth > 768) {
    wrapper.style.backgroundImage = `url(./assets/img/${e.target.dataset.bird}.jpg)`;
  } else {
    wrapper.style.backgroundImage = `url(./assets/img/img-webp/${e.target.dataset.bird}.webp)`;
  }
}
const imgs = [];
function preloadImg() {
  const image = [
    'drozd',
    ' forest',
    'javoronok',
    'slavka',
    'solovey',
    'zarynka',
    'woody',
  ];

  for (let i = 0; i < image.length; i++) {
    const img2 = new Image();
    const img = new Image();
    img2.src = `./assets/img/img-webp/${image[i]}.webp`;
    img.src = `./assets/img/${image[i]}.jpg`;
    imgs.push(img);
    imgs.push(img2);
  }
}
window.onload = preloadImg();
// console.log(
//   'Вёрстка, дизайн, UI +20\nПри кликах по названиям птиц в навигации меняется фоновое изображение +10\nПри кликах по названиям птиц в навигации проигрываются голоса этих птиц +10\nНазвание птицы, голос которой в данный момент проигрывается, выделяется стилем +10\nКнопка Play/Pause +10\nЕсть кнопка Download при клике по которой можно скачать аудиофайл с голосом птицы +5\nИтого: 65'
// );
