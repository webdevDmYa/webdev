import { playList } from './playList.js';

const listAudio = document.querySelector('.play-list');
function createElementAudio() {
  const l1items = playList.map((item) => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = item.title;
    listAudio.append(li);
  });
}
createElementAudio();
const playItems = document.getElementsByClassName('play-item');
const buttonPlay = document.querySelector('.play');
const buttonPrev = document.querySelector('.play-prev');
const buttonNext = document.querySelector('.play-next');
const audioTitle = document.querySelector('.title-audio');
const inputRange = document.getElementById('range-audio');
const inputVolume = document.getElementById('range-volume');
const buttonVolume = document.getElementById('button-volume');
const timeDOMcurrent = document.querySelector('.time-current');
const timeDOMend = document.querySelector('.time-end');
const useSvg = document.querySelector('use');

buttonPlay.addEventListener('click', playAudio);
buttonPrev.addEventListener('click', playMusicPrev);
buttonNext.addEventListener('click', playMusicNext);
const audio = new Audio();
audio.src = './assets/sounds/play-0.mp3';
let isPlayMusic = false;
let positionFirstAudio = 0;
window.addEventListener('load', function (e) {
  audioTitle.textContent = playItems[positionFirstAudio].textContent;
  playItems[positionFirstAudio].classList.add('item-active');
  let liItems = document.querySelectorAll('.play-item');
  liItems.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      if (!isPlayMusic) {
        liItems.forEach((el) => {
          if (el.classList.contains('item-active')) {
            el.classList.remove('item-active');
          }
        });
        buttonPlay.classList.add('pause');
        playItems[index].classList.toggle('item-active');
        audio.src = `../assets/sounds/play-${index}.mp3`;
        audioTitle.innerHTML = playItems[index].textContent;
        audio.currentTime = inputRange.value;
        audio.play();
        isPlayMusic = true;
        positionFirstAudio = index;
      } else if (isPlayMusic && this.classList.contains('item-active')) {
        buttonPlay.classList.toggle('pause');
        audio.pause();
        isPlayMusic = false;
        positionFirstAudio = index;
      } else {
        liItems.forEach((el) => {
          if (el.classList.contains('item-active')) {
            el.classList.remove('item-active');
          }
        });
        playItems[index].classList.toggle('item-active');
        audio.src = `../assets/sounds/play-${index}.mp3`;
        audioTitle.innerHTML = playItems[index].textContent;
        audio.play();
        isPlayMusic = true;
        positionFirstAudio = index;
      }
    });
  });
});

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

audio.addEventListener('loadeddata', function () {
  timeDOMcurrent.innerHTML = formatTime(Math.floor(audio.currentTime));
  timeDOMend.innerHTML = formatTime(Math.floor(audio.duration));
  inputRange.max = Math.floor(audio.duration);
  inputRange.value = audio.currentTime;
});

function changeProgress() {
  audio.currentTime = inputRange.value;
  let percent = Math.round(
    Math.round(audio.currentTime * 100) / Math.round(audio.duration)
  );
  timeDOMcurrent.innerHTML = formatTime(Math.floor(audio.currentTime));
  inputRange.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, #fff ${percent}%, white 100%)`;
}

inputRange.addEventListener('input', changeProgress);

audio.addEventListener('timeupdate', function () {
  let percent = Math.round(
    Math.round(audio.currentTime * 100) / Math.round(audio.duration)
  );
  inputRange.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, #fff ${percent}%, white 100%)`;

  inputRange.value = Math.round(audio.currentTime);
  timeDOMcurrent.innerHTML = formatTime(Math.floor(audio.currentTime));
});

function changeVolumeIcon() {
  if (audio.volume !== 0) {
    useSvg.setAttribute('xlink:href', '#mute');
    audio.volume = 0;
  } else {
    useSvg.setAttribute('xlink:href', '#volume');
    audio.volume = inputVolume.value / 100;
  }
}
buttonVolume.addEventListener('click', changeVolumeIcon);
function inputChangeVolume() {
  let volume = inputVolume.value / 100;
  audio.volume = volume;
  if (audio.volume == 0) {
    useSvg.setAttribute('xlink:href', '#mute');
    console.log('volume 0', volume, audio.volume);
  } else {
    useSvg.setAttribute('xlink:href', '#volume');
  }
  let percent = volume * 100;
  inputVolume.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, #fff ${percent}%, white 100%)`;
}
inputChangeVolume();
inputVolume.addEventListener('change', inputChangeVolume);
inputVolume.addEventListener('input', inputChangeVolume);
function playAudio(e) {
  if (e) {
    if (e.target.classList.contains('play')) {
      if (!isPlayMusic) {
        playItems[positionFirstAudio].classList.add('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audio.currentTime = inputRange.value;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        audio.play();
        isPlayMusic = true;
        this.classList.toggle('pause');
      } else {
        this.classList.toggle('pause');
        isPlayMusic = false;
        audio.pause();
      }
    }
  }
}
function playMusicNext(e) {
  if (e.target.classList.contains('play-next')) {
    if (isPlayMusic && buttonPlay.classList.contains('pause')) {
      if (positionFirstAudio < playItems.length - 1) {
        positionFirstAudio++;
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        isPlayMusic = true;
        audio.play();
        playItems[positionFirstAudio].classList.add('item-active');
        playItems[positionFirstAudio - 1].classList.remove('item-active');
      } else if (positionFirstAudio === playItems.length - 1) {
        playItems[positionFirstAudio].classList.remove('item-active');
        positionFirstAudio = 0;
        playItems[positionFirstAudio].classList.add('item-active');
        audio.src = `..//assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        isPlayMusic = true;
        audio.play();
      }
    } else if (!isPlayMusic && !buttonPlay.classList.contains('pause')) {
      if (positionFirstAudio < playItems.length - 1) {
        positionFirstAudio++;
        playItems[positionFirstAudio].classList.add('item-active');
        playItems[positionFirstAudio - 1].classList.remove('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        if (e.target.classList.contains('play')) {
          audio.play();
          isPlayMusic = true;
        }
      } else if (positionFirstAudio === playItems.length - 1) {
        playItems[positionFirstAudio].classList.remove('item-active');
        positionFirstAudio = 0;
        playItems[positionFirstAudio].classList.add('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        if (e.target.classList.contains('play')) {
          audio.play();
          isPlayMusic = true;
        }
      }
    }
  }
}
function playMusicPrev(e) {
  if (e.target.classList.contains('play-prev')) {
    if (isPlayMusic && buttonPlay.classList.contains('pause')) {
      if (positionFirstAudio > 0) {
        positionFirstAudio--;
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        audio.play();
        isPlayMusic = true;
        playItems[positionFirstAudio].classList.add('item-active');
        playItems[positionFirstAudio + 1].classList.remove('item-active');
      } else if (positionFirstAudio === 0) {
        playItems[positionFirstAudio].classList.remove('item-active');
        positionFirstAudio = playItems.length - 1;
        playItems[positionFirstAudio].classList.add('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        audio.play();
        isPlayMusic = true;
      }
    } else if (!isPlayMusic && !buttonPlay.classList.contains('pause')) {
      if (positionFirstAudio > 0) {
        positionFirstAudio--;
        playItems[positionFirstAudio].classList.add('item-active');
        playItems[positionFirstAudio + 1].classList.remove('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        if (e.target.classList.contains('play')) {
          audio.play();
          isPlayMusic = true;
        }
      } else if (positionFirstAudio === 0) {
        playItems[positionFirstAudio].classList.remove('item-active');
        positionFirstAudio = playItems.length - 1;
        playItems[positionFirstAudio].classList.add('item-active');
        audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
        audioTitle.innerHTML = playItems[positionFirstAudio].textContent;
        if (e.target.classList.contains('play')) {
          audio.play();
          isPlayMusic = true;
        }
      }
    }
  }
}

audio.addEventListener('ended', function () {
  if (positionFirstAudio === playItems.length - 1) {
    playItems[positionFirstAudio].classList.remove('item-active');
    positionFirstAudio = 0;
    playItems[positionFirstAudio].classList.add('item-active');
    audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
    audio.play();
    isPlayMusic = true;
  } else {
    positionFirstAudio++;
    playItems[positionFirstAudio].classList.add('item-active');
    playItems[positionFirstAudio - 1].classList.remove('item-active');
    audio.src = `../assets/sounds/play-${positionFirstAudio}.mp3`;
    audio.play();
    isPlayMusic = true;
  }
});
