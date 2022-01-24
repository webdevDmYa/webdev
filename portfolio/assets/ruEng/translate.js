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
  let words = document.querySelectorAll('[data-translate]');
  words.forEach((el) => {
    el.innerHTML = el.innerHTML.replace(
      el.innerHTML,
      param[el.dataset.translate]
    );
  });
  let st = document.querySelector('.skills-title');
  let email = document.querySelector('input[type="email"]');
  let tel = document.querySelector('input[type="tel"]');
  let textArea = document.querySelector('textarea');
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
