const video = document.querySelector('#video');
const img = document.getElementById('img');
const skipButtons = document.querySelectorAll('[data-skip]');
const inputRanges = document.querySelectorAll('input');
const containerControl = document.querySelector('.container-control');
const containerVideo = document.querySelector('.container-video');
const containerRange = document.querySelector('.container-range');
const rangeBg = document.querySelector('.range');
const currentT = document.querySelector('.current-time');
const endT = document.querySelector('.end-time');
const cursor = document.querySelector('.cursor');
const volumeValue = document.querySelector('.volume-value');
const speedValue = document.querySelector('.speed-value');
const inputRangeVolume = document.querySelector('[name="volume"]');
const audio = document.querySelector('.audio');
const full = document.querySelector('.full');
let isPlay = false;

const updateButtonWhenPlay = () => {
  img.src = `./assets/png/pause.png`;
};

const updateButtonWhenPause = () => {
  img.src = `./assets/png/play.png`;
};

const playVideo = () => {
  if (!isPlay) {
    video.play();
    isPlay = true;
    updateButtonWhenPlay();
  } else {
    video.pause();
    isPlay = false;
    updateButtonWhenPause();
  }
};

const skipTrack = (e) => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};
const changeRange = (e) => {
  video[e.target.name] = e.target.value;
  if (e.target.name === 'volume') {
    volumeValue.innerHTML = video[e.target.name];
  } else if (e.target.name === 'playbackRate') {
    speedValue.innerHTML = video[e.target.name];
  }
};
const changeRangeVideo = (e) => {
  if (video.currentTime === video.duration) {
    video.currentTime = 0;
    playVideo();
  }
  let percent = (Math.round(video.currentTime) / video.duration) * 100;
  rangeBg.style.width = `${percent}%`;
  cursor.style.right =
    containerRange.offsetWidth -
    10 -
    Math.floor((containerRange.offsetWidth / 100) * percent) +
    'px';
  currentT.innerHTML = formatTime(video.currentTime);
};

const changeRangeBg = (e) => {
  let distanse = containerRange.offsetWidth - e.offsetX;
  let percent = (Math.round(video.currentTime) / video.duration) * 100;
  rangeBg.style.width = `${percent}%`;
  let periodOftime =
    (e.offsetX / containerRange.offsetWidth) * Math.round(video.duration);
  video.currentTime = periodOftime;
  currentT.innerHTML = formatTime(video.currentTime);
  cursor.style.right = `${parseFloat(distanse)}px`;
};
const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
};

document
  .querySelector('.box-volume')
  .addEventListener('mouseover', function () {
    this.style.visibility = 'visible';
  });
document
  .querySelector('.box-volume')
  .addEventListener('mouseleave', function () {
    this.style.visibility = 'hidden';
  });

audio.addEventListener('mouseover', function () {
  document.querySelector('.box-volume').style.visibility = 'visible';
});
audio.addEventListener('mouseleave', function () {
  document.querySelector('.box-volume').style.visibility = 'hidden';
});
inputRangeVolume.addEventListener('change', function () {
  video.volume = this.value;
  if (video.volume === 0) {
    audio.src = './assets/png/mute.png';
  } else {
    audio.src = './assets/png/audio.png';
  }
});

audio.addEventListener('click', function () {
  if (video.volume !== 0) {
    video.volume = 0;
    audio.src = './assets/png/mute.png';
  } else {
    let value = document.querySelector('[name="volume"]').value;
    video.volume = +value;
    audio.src = './assets/png/audio.png';
  }
});

video.addEventListener('click', playVideo);
img.addEventListener('click', playVideo);
skipButtons.forEach((btn) => btn.addEventListener('click', skipTrack));
inputRanges.forEach((el) => el.addEventListener('change', changeRange));
inputRanges.forEach((el) => el.addEventListener('input', changeRange));

video.addEventListener('timeupdate', changeRangeVideo);

let mousedown = false;
containerRange.addEventListener('click', changeRangeBg);

containerRange.addEventListener('mousemove', (e) => {
  mousedown && changeRangeBg(e);
});
containerRange.addEventListener('mousedown', () => {
  mousedown = true;
  cursor.style.pointerEvents = 'none';
});
containerRange.addEventListener('mouseup', (e) => {
  mousedown = false;
  cursor.style.pointerEvents = 'auto';
});

window.addEventListener('load', function () {
  document.querySelector('.container-video').style.display = 'block';
  document.querySelector('.container-control').style.display = 'flex';
  document.querySelector('.cursor').style.right = `${
    containerVideo.offsetWidth - 10
  }px`;
  document.querySelector('.volume-value').innerHTML = 1;
  document.querySelector('.speed-value').innerHTML = 1;
});

video.addEventListener('loadeddata', function () {
  document.querySelector('.current-time').innerHTML = formatTime(
    video.currentTime
  );
  document.querySelector('.end-time').innerHTML = formatTime(video.duration);
});
