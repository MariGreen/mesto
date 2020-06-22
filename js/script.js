const initialCards = [
  {
    name: 'Павловск',
    link: 'https://images.unsplash.com/photo-1571680233390-b0061928cea0',
  },
  {
    name: 'Судак',
    link: 'https://images.unsplash.com/photo-1550399741-599433fae4d1',
  },
  {
    name: 'Тула',
    link: 'https://images.unsplash.com/photo-1545736522-b347030de513',
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6',
  },
  {
    name: 'Микли',
    link: 'https://images.unsplash.com/photo-1555948560-27b32a752ff3',
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc',
  },
];

const elements = document.querySelector('.elements');

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография «${data.name}»`;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.element_template').content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._alt;
    this._element.querySelector('.element__place').textContent = this._name;
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton = this._element.querySelector('.element__like');
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCards();
    });

    this._trashButton.addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._showPopupImage();
    });
  }

  _likeCards() {
    this._likeButton.classList.toggle('element__like_black');
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  elements.append(cardElement);
});

//cnfhjt
//popups
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupPreview = document.querySelector('.popup__preview');

//popups values
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupPlaceLink = document.querySelector('.popup__form-item-field_link');

//forms
const formProfile = document.querySelector('#change-user');
const formPlace = document.querySelector('#change-place');

const editUser = document.querySelector('.profile__edit-button');

//cards
const newCardButton = document.querySelector('.profile__add-button');
// const elements = document.querySelector('.elements');

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function setPlaceAndLink() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

//закрытие форм
//по клику
function closeFormClick(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  removeListeners(popup);
}

//по Escape
function closeFormEscape(evt) {
  let popup;
  switch (evt.target) {
    case editUser:
      popup = popupProfile;
      break;
    case newCardButton:
      popup = popupPlace;
      break;
    default:
      return;
  }
  if (popup.classList.contains('popup_opened') && evt.key == 'Escape') {
    popup.classList.remove('popup_opened');
    removeListeners(popup);
  }
}

//открытие форм
function openForm(evt, popup) {
  popup.classList.add('popup_opened');
  enableValidation(obj);
  makeClear(obj);
  document.addEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closeFormClick);
}

//снятие слушателей
function removeListeners(popup) {
  document.removeEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', closeFormClick);
}

function saveProfile() {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

//закрытие попапа с картинкой
function closeImage() {
  popupPreview.classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', clickListener);
}

function keyHandler(evt) {
  if (evt.key == 'Escape') {
    closeImage();
  }
}

function clickListener(evt) {
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeImage();
  }
}

document.addEventListener('click', (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.stopPropagation();
});

//увеличение картинки
function showPopupImage(evt) {
  popupPreview.classList.toggle('popup__preview_opened');
  const closeButtonImg = popupPreview.querySelector('.popup__close-button');
  closeButtonImg.addEventListener('click', closeImage);
  const element = evt.target.closest('.element');
  const cardPicture = element.querySelector('.element__picture');
  const popupPicture = document.querySelector('.popup__image');
  popupPicture.src = cardPicture.src;
  const popupCaption = document.querySelector('.popup__image-caption');
  popupCaption.textContent = element.textContent;
  popupCaption.alt = element.textContent;
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', clickListener);
}

// //добавление карточки
// function addCard(name, link) {
//   const elementTemplate = document.querySelector('.element_template').content;
//   const element = elementTemplate.cloneNode(true);
//   const newCardPicture = element.querySelector('.element__picture');
//   const newCardPlace = element.querySelector('.element__place');

//   newCardPicture.src = link;
//   newCardPlace.textContent = name;
//   newCardPicture.alt = `Фотография «${name}»`;

//   const likeButton = element.querySelector('.element__like');

//   likeButton.addEventListener('click', () => {
//     likeButton.classList.toggle('element__like_black');
//   });

//   const trashButton = element.querySelector('.element__trash');
//   trashButton.addEventListener('click', (evt) => {
//     evt.target.closest('.element').remove();
//   });

//   newCardPicture.addEventListener('click', showPopupImage);
//   document.addEventListener('click', clickListener);
//   return element;
// }

// //добавление карточек на страницу
// function prependCard(element, elementContainer) {
//   elementContainer.prepend(element);
// }

function appendCard(element, elementContainer) {
  elementContainer.append(element);
}

// //создание начальной странички
// initialCards.forEach((item) => {
//   const element = addCard(item.name, item.link);
//   appendCard(element, elements);
// });

// Обработчики «отправки» формы
function formProlileSubmitHandler(evt) {
  evt.preventDefault();
  saveProfile();
  closeFormClick(evt);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const element = addCard(popupPlaceName.value, popupPlaceLink.value);
  prependCard(element, elements);
  closeFormClick(evt);
}

//редактирование профиля
editUser.addEventListener('click', (evt) => {
  getNameAndVocation();
  openForm(evt, popupProfile);
});

//добавление картинки
newCardButton.addEventListener('click', (evt) => {
  setPlaceAndLink();
  openForm(evt, popupPlace);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formProlileSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
