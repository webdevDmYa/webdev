export const i18Obj = {
  en: {
    skills: 'Skills',
    portfolio: 'Portfolio',
    video: 'Video',
    price: 'Price',
    contacts: 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text':
      'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    hire: 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Retouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4':
      'Professional sounds recording for video, advertising, portfolio',
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    'price-standart': 'Standart',
    'price-premium': 'Premium',
    'price-gold': 'Gold',
    'price-descripton-1-span-1':
      'One location<br>120 photos in color<br>12 photos in retouch<br>Readiness 2-3 weeks<br>Make up, visage',

    'price-descripton-2-span-2':
      'One or two locations<br>200 photos in color<br>20 photos in retouch<br>Readiness 1-2 weeks<br>Make up, visage',
    'price-descripton-3-span-3':
      'Three locations or more<br>300 photos in color<br>50 photos in retouch<br>Readiness 1 week<br>Make up, visage, hairstyle',
    order: 'Order shooting',
    'contact-me': 'Contact me',
    'send-message': 'Send message',
  },
  ru: {
    skills: 'Навыки',
    portfolio: 'Портфолио',
    video: 'Видео',
    price: 'Цены',
    contacts: 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text':
      'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    hire: 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2':
      'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3':
      'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4':
      'Профессиональная запись звука для видео, рекламы, портфолио',
    winter: 'Зима',
    spring: 'Весна',
    summer: 'Лето',
    autumn: 'Осень',
    'price-standart': 'Стандарт',
    'price-premium': 'Премиум',
    'price-gold': 'Люкс',
    'price-descripton-1-span-1':
      'Одна локация<br>120 цветных фото<br>12 отретушированных фото<br>Готовность через 2-3 недели<br>Макияж, визаж',
    'price-descripton-2-span-2':
      'Одна-две локации<br>200 цветных фото<br>20 отретушированных фото<br>Готовность через 1-2 недели<br>Макияж, визаж',

    'price-descripton-3-span-3':
      'Три локации и больше<br>300 цветных фото<br>50 отретушированных фото<br>Готовность через 1 неделю<br>Макияж, визаж, прическа',
    order: 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    'send-message': 'Отправить',
  },
};

export function translateTo(param) {
  let hr = document.querySelector('.hero-title');
  let ht = document.querySelector('.hero-about');
  let hb = document.querySelector('.btn.btn-hero');
  let st = document.querySelector('.skills-title');
  let pt = document.querySelector('.portfolio-title');
  let vt = document.querySelector('.video-title');
  let prt = document.querySelector('.price-title');
  let ct = document.querySelector('.contacts-title');
  let btnm = document.querySelector('.btn.btn-message');
  let email = document.querySelector('input[type="email"]');
  let tel = document.querySelector('input[type="tel"]');
  let textArea = document.querySelector('textarea');
  let btnPrice = document.querySelectorAll('.btn.btn-price');
  let titlePrice = document.querySelectorAll('.price-box .item-title');
  let aboutPrice = document.querySelectorAll('.price-box .item-about');
  let btnSeason = document.querySelectorAll('.btn.btn-season');
  let skillsTitle = document.querySelectorAll('.item-main');
  let skillsAbout = document.querySelectorAll('.item-second');
  let nav_li_s = document.querySelectorAll('header > nav > ul > li > a');
  let nav_li_hidden = document.querySelectorAll('.li-hidden');

  hr.innerHTML = hr.innerHTML.replace(hr.innerHTML, param['hero-title']);
  ht.innerHTML = ht.innerHTML.replace(ht.innerHTML, param['hero-text']);
  hb.innerHTML = hb.innerHTML.replace(hb.innerHTML, param.hire);
  st.innerHTML = st.innerHTML.replace(st.innerHTML, param.skills);
  pt.innerHTML = pt.innerHTML.replace(pt.innerHTML, param.portfolio);
  vt.innerHTML = vt.innerHTML.replace(vt.innerHTML, param.video);
  prt.innerHTML = prt.innerHTML.replace(prt.innerHTML, param.price);
  ct.innerHTML = ct.innerHTML.replace(ct.innerHTML, param['contact-me']);

  btnm.innerHTML = btnm.innerHTML.replace(
    btnm.innerHTML,
    param['send-message']
  );
  btnPrice.forEach((btn) => {
    btn.innerHTML = btn.innerHTML.replace(btn.innerHTML, param.order);
  });

  titlePrice[0].innerHTML = titlePrice[0].innerHTML.replace(
    titlePrice[0].innerHTML,
    param['price-standart']
  );
  titlePrice[1].innerHTML = titlePrice[1].innerHTML.replace(
    titlePrice[1].innerHTML,
    param['price-premium']
  );
  titlePrice[2].innerHTML = titlePrice[2].innerHTML.replace(
    titlePrice[2].innerHTML,
    param['price-gold']
  );

  aboutPrice[0].innerHTML = aboutPrice[0].innerHTML.replace(
    aboutPrice[0].innerHTML,
    param['price-descripton-1-span-1']
  );
  aboutPrice[1].innerHTML = aboutPrice[1].innerHTML.replace(
    aboutPrice[1].innerHTML,
    param['price-descripton-2-span-2']
  );
  aboutPrice[2].innerHTML = aboutPrice[2].innerHTML.replace(
    aboutPrice[2].innerHTML,
    param['price-descripton-3-span-3']
  );

  btnSeason[0].innerHTML = btnSeason[0].innerHTML.replace(
    btnSeason[0].innerHTML,
    param.winter
  );
  btnSeason[1].innerHTML = btnSeason[1].innerHTML.replace(
    btnSeason[1].innerHTML,
    param.spring
  );
  btnSeason[2].innerHTML = btnSeason[2].innerHTML.replace(
    btnSeason[2].innerHTML,
    param.summer
  );
  btnSeason[3].innerHTML = btnSeason[3].innerHTML.replace(
    btnSeason[3].innerHTML,
    param.autumn
  );

  skillsTitle[0].innerHTML = skillsTitle[0].innerHTML.replace(
    skillsTitle[0].innerHTML,
    param['skill-title-1']
  );
  skillsTitle[1].innerHTML = skillsTitle[1].innerHTML.replace(
    skillsTitle[1].innerHTML,
    param['skill-title-2']
  );
  skillsTitle[2].innerHTML = skillsTitle[2].innerHTML.replace(
    skillsTitle[2].innerHTML,
    param['skill-title-3']
  );
  skillsTitle[3].innerHTML = skillsTitle[3].innerHTML.replace(
    skillsTitle[3].innerHTML,
    param['skill-title-4']
  );

  skillsAbout[0].innerHTML = skillsAbout[0].innerHTML.replace(
    skillsAbout[0].innerHTML,
    param['skill-text-1']
  );
  skillsAbout[1].innerHTML = skillsAbout[1].innerHTML.replace(
    skillsAbout[1].innerHTML,
    param['skill-text-2']
  );
  skillsAbout[2].innerHTML = skillsAbout[2].innerHTML.replace(
    skillsAbout[2].innerHTML,
    param['skill-text-3']
  );
  skillsAbout[3].innerHTML = skillsAbout[3].innerHTML.replace(
    skillsAbout[3].innerHTML,
    param['skill-text-4']
  );

  nav_li_s[0].innerHTML = nav_li_s[0].innerHTML.replace(
    nav_li_s[0].innerHTML,
    param.skills
  );
  nav_li_s[1].innerHTML = nav_li_s[1].innerHTML.replace(
    nav_li_s[1].innerHTML,
    param.portfolio
  );
  nav_li_s[2].innerHTML = nav_li_s[2].innerHTML.replace(
    nav_li_s[2].innerHTML,
    param.video
  );
  nav_li_s[3].innerHTML = nav_li_s[3].innerHTML.replace(
    nav_li_s[3].innerHTML,
    param.price
  );
  nav_li_s[4].innerHTML = nav_li_s[4].innerHTML.replace(
    nav_li_s[4].innerHTML,
    param.contacts
  );

  nav_li_hidden[0].innerHTML = nav_li_hidden[0].innerHTML.replace(
    nav_li_hidden[0].innerHTML,
    param.skills
  );
  nav_li_hidden[1].innerHTML = nav_li_hidden[1].innerHTML.replace(
    nav_li_hidden[1].innerHTML,
    param.portfolio
  );
  nav_li_hidden[2].innerHTML = nav_li_hidden[2].innerHTML.replace(
    nav_li_hidden[2].innerHTML,
    param.video
  );
  nav_li_hidden[3].innerHTML = nav_li_hidden[3].innerHTML.replace(
    nav_li_hidden[3].innerHTML,
    param.price
  );
  nav_li_hidden[4].innerHTML = nav_li_hidden[4].innerHTML.replace(
    nav_li_hidden[4].innerHTML,
    param.contacts
  );

  if (param === i18Obj.ru) {
    st.style.marginRight = '9.5%';

    email.setAttribute('placeholder', 'Е-мейл');
    tel.setAttribute('placeholder', 'Тел');
    textArea.setAttribute('placeholder', 'Сообщение');
  } else {
    st.style.marginRight = '2.5%';

    email.setAttribute('placeholder', 'E-mail');
    tel.setAttribute('placeholder', 'Phone');
    textArea.setAttribute('placeholder', 'Message');
  }
}
