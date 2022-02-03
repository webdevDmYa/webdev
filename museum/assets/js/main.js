let numberDown = document.getElementById('numberDown');
let numberUp = document.getElementById('numberUp');
let numberDown2 = document.getElementById('numberDown2');
let numberUp2 = document.getElementById('numberUp2');
let inputSenior = document.getElementById('senior');
let inputBasik = document.getElementById('basic');
let numberB = document.querySelector('input#basic').value;
let numberS = document.querySelector('input#senior').value;

let resultBuy = document.getElementById('onputTicket');

let permanent = 20;
let temporary = 25;
let combined = 30;
let countB;
let countS;
let result;

let ticketsType;
let radios = document.getElementsByName('ticket-type');

const date = new Date();
const inputTime = document.querySelector('input[type="time"]');
const inputName = document.querySelector('input[type="text"]');
const inputEmail = document.querySelector('input[type="email"]');
const inputTel = document.querySelector('input[type="tel"]');
const options = document.querySelectorAll('option');
const select = document.getElementById('types');
const btnBook = document.querySelector('.btn-book');
const output1 = document.querySelector('.output-1');
const output2 = document.querySelector('.output-2');
const output1Res = document.querySelector('#output-result1');
const output2Res = document.querySelector('#output-result2');
const outputTotalBasik = document.querySelector('.output-total-basik');
const outputTotalSenior = document.querySelector('.output-total-senior');
const outputTotal = document.querySelector('.output-total');
const btnPlusInTickets = document.querySelector('#btn-plus-1');
const btnMinusInTickes = document.querySelector('#btn-min-1');
const btnMinusInTickes2 = document.querySelector('#btn-min-2');
const btnPlusInTickes2 = document.querySelector('#btn-plus-2');

select.addEventListener('change', function () {
  ticketsType = this.value;
  sumOfAmount(ticketsType);
});
let basicOut;
let seniorOut;
btnPlusInTickets.addEventListener('click', function () {
  if (inputBasik.value < 20) {
    inputBasik.value++;
    numberB = +inputBasik.value;
    output1.innerHTML = numberB;
    output1Res.innerHTML = numberB;
  }
  sumOfAmount(ticketsType);
  outputTotalBasik.innerHTML = basicOut + ' €';
});
btnMinusInTickes.addEventListener('click', function () {
  if (inputBasik.value > 0) {
    inputBasik.value--;
    numberB = +inputBasik.value;
    output1.innerHTML = numberB;
    output1Res.innerHTML = numberB;
  }
  sumOfAmount(ticketsType);
  outputTotalBasik.innerHTML = basicOut + ' €';
});
btnMinusInTickes2.addEventListener('click', function (event) {
  if (inputSenior.value > 0) {
    inputSenior.value--;
    numberS = +inputSenior.value;
    output2.innerHTML = numberS;
    output2Res.innerHTML = numberS;
  }
  sumOfAmount(ticketsType);
  outputTotalSenior.innerHTML = seniorOut + ' €';
});
btnPlusInTickes2.addEventListener('click', function (event) {
  if (inputSenior.value < 20) {
    inputSenior.value++;
    numberS = +inputSenior.value;
    output2.innerHTML = numberS;
    output2Res.innerHTML = numberS;
  }
  sumOfAmount(ticketsType);
  outputTotalSenior.innerHTML = seniorOut + ' €';
});
radios.forEach((el) => {
  if (el.checked) {
    ticketsType = el.value;
  }
  el.addEventListener('click', function (e) {
    sumOfAmount(e.target.value);
  });
  el.addEventListener('change', function (e) {
    ticketsType = e.target.value;
  });
});

const sumOfAmount = (ticketsType) => {
  let basic = document.querySelector('input#basic').value;
  let senior = document.querySelector('input#senior').value;
  countB = basic;
  countS = senior;
  let perm;
  if (ticketsType === 'Permanent exhibition') {
    perm = 20;
  } else if (ticketsType === 'Temporary exhibition') {
    perm = 25;
  } else if (ticketsType === 'Combined Admission') {
    perm = 30;
  }
  basic *= 20;
  senior *= 10;
  basicOut = basic;
  seniorOut = senior;
  result = basic + senior + perm;
  resultBuy.innerHTML = `Total: ${result + '€'} `;
  outputTotal.innerHTML = `${result + '€'}`;
};
sumOfAmount(ticketsType);
// TICKETS -- FORM --- MOdal-Window!!!
let dialog = document.getElementById('Form-BuyTicket');
const inputDate = document.querySelector('input[type="date"]');

function showForm() {
  dialog.showModal();
  getDateNow();
  options.forEach((select) => {
    if (select.value === ticketsType) {
      select.selected = true;
    }
  });
  spanTypes.innerHTML = ticketsType;
  output1.innerHTML = countB;
  output2.innerHTML = countS;
  output1Res.innerHTML = countB;
  output2Res.innerHTML = countS;
  outputTotal.innerHTML = result + ' €';
  outputTotalBasik.innerHTML = basicOut + ' €';
  outputTotalSenior.innerHTML = seniorOut + ' €';
}

function closeForm() {
  dialog.close();
}
inputBasik.addEventListener('change', function () {
  sumOfAmount(ticketsType);
});
inputSenior.addEventListener('change', function () {
  sumOfAmount(ticketsType);
});
numberDown.addEventListener('click', function (event) {
  if (inputBasik.value > 0) {
    inputBasik.value--;
    numberB = +inputBasik.value;
  }
  sumOfAmount(ticketsType);
});
numberUp.addEventListener('click', function (event) {
  if (inputBasik.value < 20) {
    inputBasik.value++;
    numberB = +inputBasik.value;
  }
  sumOfAmount(ticketsType);
});
numberDown2.addEventListener('click', function (event) {
  if (inputSenior.value > 0) {
    inputSenior.value--;
    numberS = +inputSenior.value;
  }
  sumOfAmount(ticketsType);
});
numberUp2.addEventListener('click', function (event) {
  if (inputSenior.value < 20) {
    inputSenior.value++;
    numberS = +inputSenior.value;
  }
  sumOfAmount(ticketsType);
});
const spanDate = document.querySelector('#svg-date');
const spanTime = document.querySelector('#svg-time');
const spanTypes = document.querySelector('#svg-types');
//Validate
inputDate.addEventListener('change', function () {
  console.log(this.value);
  let str = this.value.split('-');
  let year = str[0];
  let month = str[1];
  let day = str[2];
  if (month !== '00') {
    month = +month - 1;
  }
  console.log(year, month, day);
  let date = new Date(year, month, day);
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };
  date = date.toLocaleDateString('en-US', options);
  date = date.split(',');
  let res = date[0] + ', ' + date[1];
  spanDate.innerHTML = res;
});
inputTime.addEventListener('change', function () {
  spanTime.innerHTML = this.value;
});
select.addEventListener('change', function () {
  spanTypes.innerHTML = this.value;
});
btnBook.addEventListener('click', function () {
  if (
    inputDate.checkValidity() === false ||
    inputTime.checkValidity() === false ||
    inputName.checkValidity() === false ||
    inputEmail.checkValidity() === false ||
    inputTel.checkValidity() === false
  ) {
    console.log('FALSE');
    this.style.backgroundColor = 'red';
  } else {
    this.style.backgroundColor = 'green';
  }
});

function getDateNow() {
  if (date.getDate() < 10 || date.getMonth() < 10) {
    inputDate.min = `${date.getFullYear()}-${'0' + (date.getMonth() + 1)}-${
      '0' + date.getDate()
    }`;
  } else if (date.getMonth() < 10) {
    inputDate.min = `${date.getFullYear()}-${
      '0' + (date.getMonth() + 1)
    }-${date.getDate()}`;
  } else if (date.getDate() < 10) {
    inputDate.min = `${date.getFullYear()}-${date.getMonth() + 1}-${
      '0' + date.getDate()
    }`;
  } else if (date.getMonth() > 10 && date.getDate() > 10) {
    inputDate.min = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }
}
//SECTION GALLERY
window.addEventListener('DOMContentLoaded', () => {
  let arr = [
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery1.jpg" alt="image1">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery2.jpg" alt="image2">',
    '<img class="gallery-item  slide-in" src="./assets/img/jpg/galery3.jpg" alt="image3">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery4.jpg" alt="image4">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery5.jpg" alt="image5">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery6.jpg" alt="image6">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery7.jpg" alt="image7">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery8.jpg" alt="image8">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery9.jpg" alt="image9">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery10.jpg" alt="image10">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery11.jpg" alt="image11">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery12.jpg" alt="image12">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery13.jpg" alt="image13">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery14.jpg" alt="image14">',
    '<img class="gallery-item slide-in" src="./assets/img/jpg/galery15.jpg" alt="image15">',
  ];
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const pictureInnerContainer = document.querySelector('.gallery-box');
  shuffle(arr);
  for (let i = 0; i < arr.length; i++) {
    pictureInnerContainer.innerHTML += arr[i];
  }

  let galleryImgs = document.querySelectorAll('.gallery-item');
  if (galleryImgs.length > 0) {
    window.addEventListener('scroll', debounce(animaOnScroll));
    function animaOnScroll() {
      for (let i = 0; i < galleryImgs.length; i++) {
        const animItem = galleryImgs[i];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
        if (
          pageYOffset > animItemOffset - animItemPoint &&
          pageYOffset < animItemOffset + animItemHeight
        ) {
          animItem.classList.add('activeAnimate');
        } else {
          animItem.classList.remove('activeAnimate');
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
    animaOnScroll();
    function debounce(func, wait = 10, immediate = true) {
      let timeout;
      return function () {
        let context = this;
        let args = arguments;
        let later = function () {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  }
});

// NAVIGATION BURGER MENU
let burger = document.getElementById('burger');
let navBurger = document.getElementById('hidden-menu');
let menuSecondPath = document.querySelector('.nav-sm');
let titleWelcome = document.querySelector('.welcome-title');
burger.addEventListener('click', function () {
  if (navBurger.style.left === '0px') {
    navBurger.style.left = '-297px';
    menuSecondPath.style.left = '-768px';
  } else {
    navBurger.style.left = '0px';
    menuSecondPath.style.left = '0px';
  }
  titleWelcome.classList.toggle('hidden');
  burger.classList.toggle('transform');
});

// SWIPER - SLIDER SECTION WELCOME
let items = document.querySelectorAll('.img');
let iconsSlider = document.querySelector('.slider-indicator-box');

let currentItem = 0;
let isEnable = true;
function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
  let startNumber = currentItem + 1;
  document.querySelector('.number-left').innerHTML = `0${startNumber}`;
  changeColorItems(startNumber);
}
document.querySelector(`[data-numberItem="1"]`).classList.add('gold');
function changeColorItems(n) {
  let numberItems = document.querySelectorAll('[data-numberItem]');
  console.log(n);
  numberItems.forEach((el) => el.classList.remove('gold'));

  console.log(
    document.querySelector(`[data-numberItem="${n}"]`).classList.add('gold')
  );
}

function hideItem(direction) {
  isEnable = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('active', direction);
  });
}
function showItem(direction) {
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function () {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnable = true;
  });
}
function previousItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
}
function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
}
document.querySelector('.way-left').addEventListener(
  'click',
  function (e) {
    if (isEnable) {
      previousItem(currentItem);
    }
  },
  false
);
document.querySelector('.way-right').addEventListener(
  'click',
  function (e) {
    if (isEnable) {
      nextItem(currentItem);
    }
  },
  false
);
const swipedetect = (el) => {
  let swipe = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let startTime = 0;
  let elapsedTime = 0;
  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;
  swipe.addEventListener(
    'mousedown',
    function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );
  swipe.addEventListener(
    'mouseup',
    function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnable) {
              previousItem(currentItem);
            }
          } else {
            if (isEnable) {
              nextItem(currentItem);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );
  swipe.addEventListener(
    'touchmove',
    function (e) {
      e.preventDefault();
    },
    false
  );
  swipe.addEventListener(
    'touchstart',
    function (e) {
      if (e.target.classList.contains('slider-way-box')) {
        if (e.target.classList.contains('way-left')) {
          if (isEnable) {
            previousItem(currentItem);
          }
        } else if (e.target.classList.contains('way-right')) {
          if (isEnable) {
            nextItem(currentItem);
          }
        }
      }
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );
  swipe.addEventListener(
    'touchend',
    function (e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;
      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnable) {
              previousItem(currentItem);
            }
          } else {
            if (isEnable) {
              nextItem(currentItem);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );
};
let el = document.querySelector('.welcome-img');
setTimeout(() => {
  swipedetect(el);
}, 1500);

//Slider Explore
function sliderExplore() {
  let x, i;
  x = document.getElementsByClassName('img-exp-overlay');
  for (i = 0; i < x.length; i++) {
    compareImage(x[i]);
  }
  function compareImage(img) {
    let slider;
    let w;
    let h;
    let clicked;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = w / 1.7 + 'px';
    slider = document.createElement('div');
    slider.setAttribute('class', 'img-exp-slider');
    img.parentElement.insertBefore(slider, img);
    slider.style.top = h / 2 - slider.offsetHeight / 2 + 'px';
    slider.style.left = w / 1.7 - slider.offsetWidth / 1.7 + 'px';
    slider.addEventListener('mousedown', slideReady, false);
    window.addEventListener('mouseup', slideFinish, false);
    slider.addEventListener('touchstart', slideReady, false);
    window.addEventListener('touchend', slideFinish, false);
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      window.addEventListener('mousemove', slideMove, false);
      window.addEventListener('touchmove', slideMove, false);
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      let pos;
      if (clicked == 0) {
        return false;
      }
      pos = getCursorPos(e);
      if (pos < 0) {
        pos = 0;
      }
      if (pos > w) {
        pos = w;
      }
      e.preventDefault();
      slide(pos);
    }
    function getCursorPos(e) {
      let a = 0;
      let x = 0;
      e = e.changedTouches ? e.changedTouches[0] : e;
      a = img.getBoundingClientRect();
      x = e.pageX - a.left;
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      img.style.width = x + 'px';
      slider.style.left = img.offsetWidth - slider.offsetWidth / 2 + 'px';
    }
  }
}
setTimeout(() => {
  sliderExplore();
}, 2000);

//MAPBOX
setTimeout(() => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoid2ViZGV2ZG15YSIsImEiOiJja3VrYXc1cW0zNWNuMm9tb2N3ZHJvNXR5In0.3Sfx8OPFYzsywXf6agmCRA';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [2.3364, 48.86091],
    zoom: 15.7,
  });
  let nav = new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: true,
  });
  map.addControl(nav, 'top-right');
  const marker1 = new mapboxgl.Marker({ color: 'black' })

    .setLngLat([2.3364, 48.86091])
    .addTo(map);
  const marker2 = new mapboxgl.Marker({ color: 'gray' })
    .setLngLat([2.3333, 48.8602])
    .addTo(map);
  const marker3 = new mapboxgl.Marker({ color: 'gray' })
    .setLngLat([2.3397, 48.8607])
    .addTo(map);
  const marker4 = new mapboxgl.Marker({ color: 'gray' })
    .setLngLat([2.333, 48.8619])
    .addTo(map);
  const marker5 = new mapboxgl.Marker({ color: 'gray' })
    .setLngLat([2.3365, 48.8625])
    .addTo(map);
}, 2500);

let objVideo = document.querySelector('.video-media');

let objRange = document.querySelector('.video-range');

// Buttons
let playButton = document.querySelector('.btn-icon-video');
let playButton2 = document.querySelector('.play');
let imgTitleVideo = document.querySelector('.img-video-title');

function videoAct(e) {
  if (objVideo.paused) {
    objVideo.play();
    document.querySelector('.img-video-title').style.display = 'none';
    playButton.classList.remove('btn-icon-video');
    playButton.classList.add('btn-icon-video2');
  } else {
    objVideo.pause();
    document.querySelector('.img-video-title').style.display = 'block';
    playButton.classList.remove('btn-icon-video2');
    playButton.classList.add('btn-icon-video');
  }
  // e.preventDefault();
}
playButton.addEventListener('click', videoAct);
playButton2.addEventListener('click', videoAct);
objVideo.addEventListener('click', videoAct);
imgTitleVideo.addEventListener('click', videoAct);

function videoProgress() {
  const progress =
    Math.floor(objVideo.currentTime) / (Math.floor(objVideo.duration) / 100);
  objRange.value = progress;

  if (objVideo.currentTime === 47.067) {
    playButton.classList.remove('btn-icon-video2');
    playButton.classList.add('btn-icon-video');
    document.querySelector('.img-video-title').style.display = 'block';
  }
}
function videoChangeTime(e) {
  let mouseX = Math.floor(e.pageX - objRange.offsetLeft);
  let periods = mouseX / (objRange.offsetWidth / 100);
  objVideo.currentTime = objVideo.duration * (periods / 100);

  //eto function ne rabotaet
}

function videoChangeVolume() {
  let volume = volumeInput.value / 100;
  objVideo.volume = volume;
  if (objVideo.volume == 0) {
    buttonVolume.classList.remove('btn-icon-volume');
    buttonVolume.classList.add('btn-icon-volume2');
  } else {
    buttonVolume.classList.remove('btn-icon-volume2');
    buttonVolume.classList.add('btn-icon-volume');
  }
}
function videoMute(e) {
  if (e.target) {
    let audioToggle = new Audio();
    audioToggle.src = './assets/audio/toggle.mp3';
    audioToggle.play();
  }

  if (objVideo.volume == 0) {
    objVideo.volume = volumeInput.value / 100;
    buttonVolume.classList.remove('btn-icon-volume2');
    buttonVolume.classList.add('btn-icon-volume');
  } else {
    objVideo.volume = 0;
    buttonVolume.classList.add('btn-icon-volume2');
    buttonVolume.classList.remove('btn-icon-volume');
  }
}

function fullScreen(e) {
  if (objVideo.requestFullscreen) {
    objVideo.requestFullscreen();
  }
}
let buttonVolume = document.querySelector('.btn-icon-volume');
let volumeInput = document.querySelector('.video-volume');

volumeInput.addEventListener('change', videoChangeVolume);
buttonVolume.addEventListener('click', videoMute);

objRange.addEventListener('click', videoChangeTime);

objVideo.addEventListener('timeupdate', videoProgress);
let buttonFull = document.querySelector('.btn-icon-full');
buttonFull.addEventListener('click', fullScreen);

// console.log(
//   'Слайдер в секции Welcome +20\nесть возможность перелистывания слайдов влево и вправо кликами по стрелкам +4\nесть возможность перелистывания слайдов влево и вправо свайпами (движениями) мышки +4\nслайды перелистываются плавно с анимацией смещения вправо или влево +4\nперелистывание слайдов бесконечное (зацикленное) +4\nпри перелистывании слайдов кликами или свайпами меняется номер активного слайда +2\nдаже при частых кликах или свайпах нет ситуации, когда слайд после перелистывания находится не по центру, нет ситуации, когда видны одновременно два слайда +2\n\nКастомный видеоплеер +22\nпри клике по кнопке "Play" слева внизу на панели видео начинается проигрывание видео, иконка кнопки при этом меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Повторный клик на кнопку останавливает проигрывание видео, иконка меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается +4\nпри клике по большой кнопке "Play" по центру видео, или при клике по самому видео, начинается проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на "Pause", большая кнопка "Play" по центру видео исчезает. Клик на видео, которое проигрывается, останавливает проигрывание видео, иконка кнопки "Play" слева внизу на панели видео меняется на первоначальную, большая кнопка "Play" по центру видео снова отображается +4\nпрогресс-бар отображает прогресс проигрывания видео +2\nперетягивание ползунка прогресс-бара позволяет изменить время с которого проигрывается видео +2\nесли прогресс-бар перетянуть до конца, видео останавливается, соответственно, меняется внешний вид кнопок "Play" +2\nпри клике на иконку динамика происходит toggle звука и самой иконки (звук включается или выключается, соответственно изменяется иконка) +2\nпри перемещении ползунка громкости звука изменяется громкость видео +2\nесли ползунок громкости звука перетянуть до 0, звук выключается, иконка динамика становится зачеркнутой +2\nесли при выключенном динамике перетянуть ползунок громкости звука от 0, звук включается, иконка громкости перестаёт быть зачёркнутой +2\nпри нажатии на кнопку fullscreen видео переходит в полноэкранный режим, при этом видео и панель управления разворачиваются во весь экран. При нажатии на кнопку fullscreen повторно видео выходит из полноэкранного режима. Нажатие на клавишу для выхода из полноэкранного режима Esc не проверяем и не оцениваем +2\n\nСлайдер сравнения изображений в секции Explore +10\nползунок можно перетягивать мышкой по горизонтали +2\nползунок никогда не выходит за границы картины +2\nпри перемещении ползунка справа налево плавно появляется нижняя картина +2\nпри перемещении ползунка слева направо плавно появляется верхняя картина +2\nпри обновлении страницы ползунок возвращается в исходное положение +2\n\nАнимация при прокрутке изображений в секции Galery +8\nпри прокрутке страницы вниз появление картин секции Galery сопровождается анимацией: изображения плавно поднимаются снизу вверх, увеличиваясь и создавая эффект выплывания +4\nесли прокрутить страницу вверх и затем снова прокручивать вниз, анимация появления картин повторяется +2\nпри обновлении страницы, если она к тому моменту была прокручена до секции Galery, анимация картин повторяется +2\n\nИнтерактивная карта в секции Contacts +12\nв секции Contacts добавлена интерактивная карта +4\nна карте отображаются маркеры, расположение и внешний вид маркеров соответствует макету +4\nстиль карты соответствует макету +4\n\nScore 72/150'
// );
