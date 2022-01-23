export function playVideo() {
  let isPlay = false;
  let progressRange = document.getElementById('progress');
  let playBtn = document.querySelector('.btn.btn-video');
  let video = document.querySelector('video');
  let figcaption = document.querySelector('figcaption');
  let playMiniBtn = document.querySelector('.btn.btn-video-play');
  let volumeBtn = document.querySelector('.btn.btn-video-mute');
  let volumeRange = document.getElementById('mute-range');
  if (window.innerWidth > 768) {
    video.setAttribute('poster', './assets/img/jpg/video-player.jpg');
  } else {
    video.setAttribute('poster', './assets/img/jpg/video-player2.jpg');
  }
  video.addEventListener('loadeddata', function () {
    progressRange.max = video.duration; //58
    progressRange.value = video.currentTime;
  });

  playBtn.addEventListener('click', function () {
    video.play();
    isPlay = true;
    video.setAttribute('poster', '');
    video.classList.add('height-video');
    this.classList.add('d-none');
    figcaption.classList.add('visible');
    playMiniBtn.classList.remove('svg-play');
    playMiniBtn.classList.add('svg-pause');
    playMiniBtn.classList.add('active-svg');
  });
  playMiniBtn.addEventListener('click', function () {
    if (!playBtn.classList.contains('d-none')) {
      playBtn.classList.add('d-none');
    }
    if (this.classList.contains('svg-play')) {
      this.classList.remove('svg-play');
      this.classList.add('svg-pause');
      this.classList.add('active-svg');
    } else {
      this.classList.remove('svg-pause');
      this.classList.add('svg-play');
      this.classList.remove('active-svg');
    }
    playPause();
  });
  volumeBtn.addEventListener('click', function () {
    if (this.classList.contains('svg-volume')) {
      this.classList.remove('svg-volume');
      this.classList.add('svg-mute');
      this.classList.add('active-svg');
      video.volume = 0;
    } else {
      this.classList.remove('svg-mute');
      this.classList.add('svg-volume');
      this.classList.remove('active-svg');
      video.volume = volumeRange.value;
    }
  });

  function playPause() {
    if (!isPlay) {
      video.play();
      isPlay = true;
      playBtn.classList.add('d-none');
    } else {
      video.pause();
      isPlay = false;
      playBtn.classList.remove('d-none');
    }
  }
  function changeBgPlay() {
    let percent = (video.currentTime * 100) / video.duration;
    progressRange.value = video.currentTime;
    progressRange.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percent}%, #fff ${percent}%, white 100%)`;
  }
  video.addEventListener('click', function () {
    if (this.currentTime === 0) {
      return;
    }
    if (!playBtn.classList.contains('d-none')) {
      playBtn.classList.add('d-none');
    } else {
      playBtn.classList.remove('d-none');
    }
    if (playMiniBtn.classList.contains('svg-play')) {
      playMiniBtn.classList.remove('svg-play');
      playMiniBtn.classList.add('svg-pause');
      playMiniBtn.classList.add('active-svg');
    } else {
      playMiniBtn.classList.remove('svg-pause');
      playMiniBtn.classList.add('svg-play');
      playMiniBtn.classList.remove('active-svg');
    }
    playPause();
  });

  function getVolumeRangeBg() {
    video.volume = volumeRange.value;
    if (volumeRange.value === '0') {
      volumeBtn.classList.remove('svg-volume');
      volumeBtn.classList.add('svg-mute');
      volumeBtn.classList.add('active-svg');
    } else {
      volumeBtn.classList.remove('svg-mute');
      volumeBtn.classList.add('svg-volume');
      volumeBtn.classList.remove('active-svg');
    }
    let value = +volumeRange.value * 100;
    volumeRange.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${value}%, #fff ${value}%, white 100%)`;
  }
  function getCurrentBgPlay() {
    video.currentTime = this.value;
    changeBgPlay();
  }
  getVolumeRangeBg();
  progressRange.addEventListener('input', getCurrentBgPlay);
  volumeRange.addEventListener('change', getVolumeRangeBg);
  volumeRange.addEventListener('input', getVolumeRangeBg);
  video.addEventListener('timeupdate', changeBgPlay);
  video.addEventListener('ended', function () {
    playMiniBtn.classList.remove('svg-pause');
    playMiniBtn.classList.add('svg-play');
    playMiniBtn.classList.remove('active-svg');
    volumeBtn.classList.remove('active-svg');
    volumeBtn.classList.add('svg-volume');
    volumeBtn.classList.remove('svg-mute');
    isPlay = false;
    progressRange.value = 0;
    video.currentTime = 0;
    video.volume = volumeRange.value;
    playBtn.classList.remove('d-none');
  });
}
