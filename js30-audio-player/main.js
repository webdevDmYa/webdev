let isPlay = false;
let startNum = 0;
let interval;
let currentTime = 0;
const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const forward = document.querySelector('.forward');
const backward = document.querySelector('.backward');
const endTime = document.querySelector('.end-time');
const startTime = document.querySelector('.start-time');
const author = document.querySelector('.track-author');
const marquee = document.querySelector('.track-name');
const fon = document.querySelector('.background');
const container = document.querySelector('.container');
const footer = document.querySelector('.footer');
const loader = document.querySelector('.loader');
const viewImg = document.querySelector('.view-img');
const wrapperMarguee = document.querySelector('.marguee');
const wrapperMargueeWidth = wrapperMarguee.offsetWidth;
const marqueeWidth = marquee.scrollWidth;
const progress = document.querySelector('.range-progress');

const trackList = [
  [
    './assets/audio/beyonce.mp3',
    'Run the World!',
    'Beyonce',
    './assets/img/beyonce.webp',
  ],
  [
    './assets/audio/Serega.mp3',
    'Черный бумер!',
    'Серёга',
    './assets/img/serega.webp',
  ],
  [
    './assets/audio/Scooter.mp3',
    'How much is the Fish? (Divius Remix)',
    'Scooter',
    './assets/img/scooter.webp',
  ],
];
const yNikulin = [
  './assets/audio/anamvserano.mp3',
  'А Нам Все Равно!',
  'Юлий Никулин',
  './assets/img/Никулин.webp',
];

trackList.push(yNikulin);
console.log(trackList);
const mp3 = new Audio(trackList[0][0]);

window.addEventListener('load', function () {
  fon.style.display = 'block';
  container.style.position = 'static';
  container.style.visibility = 'inherit';
  loader.style.display = 'none';
  footer.style.display = 'flex';
});

play.addEventListener('click', playButton);
function playButton() {
  if (!isPlay) {
    startAudioPlayer();
    play.classList.add('pause', 'active');
    play.classList.remove('play');
    if (!mp3.paused && this.classList.contains('pause')) {
      mp3.currentTime = currentTime;
      mp3.play();
    }
  } else {
    stopAudio();
    currentTime = mp3.currentTime;
    stopTrack(interval);
    play.classList.add('play');
    play.classList.remove('pause', 'active');
  }
}

forward.addEventListener('click', playNext);
function playNext() {
  startNum++;
  if (startNum / trackList.length === 1) {
    startNum = 0;
    getPrevNextAudio();
  } else {
    getPrevNextAudio();
  }
}
backward.addEventListener('click', playPrev);
function playPrev() {
  startNum--;
  if (startNum === -1) {
    startNum = trackList.length - 1;
    getPrevNextAudio();
  } else {
    getPrevNextAudio();
  }
}

function getPrevNextAudio() {
  startAudioPlayer();
  play.classList.add('pause', 'active');
  play.classList.remove('play');
  progress.style.background = '';
}

function startAudioPlayer() {
  playAudio(trackList[`${startNum}`][0]);
  getTrackInfo(trackList, startNum);
  stopTrack(interval);
  startTrack();
}

function startTrack() {
  interval = setInterval(move, 10);
}

function stopTrack(param) {
  clearInterval(param);
}

function playAudio(track) {
  let url = track;
  mp3.src = `${url}`;
  mp3.currentTime = 0;
  mp3.play();
  isPlay = true;
}

function getTrackInfo(arr, number) {
  author.innerHTML = arr[number][2];
  marquee.textContent = arr[number][1];
  fon.src = arr[number][3];
  viewImg.src = arr[number][3];
}

function stopAudio() {
  mp3.pause();
  isPlay = false;
}
function move() {
  let currentTX = getComputedStyle(marquee).transform.split(',');
  if (currentTX[4] === undefined) {
    currentTX = 1;
  } else {
    currentTX = parseFloat(currentTX[4]) + 1;
  }
  if (currentTX >= marqueeWidth) {
    marquee.style.transform = 'translateX(' + -wrapperMargueeWidth + 'px)';
  } else {
    marquee.style.transform = 'translateX(' + currentTX + 'px)';
  }
}

// function preloadImg(arr) {
//   const img = new Image();
//   for (let i = 0; i < arr.length; i++) {
//     img.src = arr[i][3];
//   }
// }
window.addEventListener('DOMContentLoaded', function () {
  getTrackInfo(trackList, startNum);
  // preloadImg(trackList);
});

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

mp3.addEventListener('loadeddata', function () {
  endTime.textContent = calculateTime(mp3.duration);
  startTime.textContent = calculateTime(mp3.currentTime);
  progress.max = Math.floor(mp3.duration);
});

progress.addEventListener('input', function () {
  let percent =
    Math.floor((Math.floor(mp3.currentTime) * 100) / Math.floor(mp3.duration)) +
    1;
  mp3.currentTime = this.value;
  this.style.background = `linear-gradient(to right, rgba(78, 138, 147, 0.9668242296918768) 0%, rgba(78, 138, 147, 0.9668242296918768) ${percent}%, #fff ${percent}%, white 100%)`;
});

mp3.addEventListener('timeupdate', () => {
  let percent =
    Math.floor((Math.floor(mp3.currentTime) * 100) / Math.floor(mp3.duration)) +
    1;
  progress.style.background = `linear-gradient(to right, rgba(78, 138, 147, 0.9668242296918768) 0%, rgba(78, 138, 147, 0.9668242296918768) ${percent}%, #fff ${percent}%, white 100%)`;
  startTime.textContent = calculateTime(progress.value);
  progress.value = Math.floor(mp3.currentTime);
  currentTime = Math.floor(mp3.currentTime);
});

mp3.addEventListener('ended', function () {
  startNum++;
  if (startNum / trackList.length === 1) {
    startNum = 0;
    startAudioPlayer();
  } else {
    startAudioPlayer();
  }
  progress.style.background = '';
});
