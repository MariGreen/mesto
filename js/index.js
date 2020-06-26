import { initialCards } from './inititialCards.js';
//import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.name}»`;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._alt;
    this._element.querySelector('.element__place').textContent = this._name;
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton = this._element.querySelector('.element__like');
    const popupPreview = document.querySelector('.popup__preview');
    this._closeButton = popupPreview.closest('.popup__close-button');
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

  _showPopupImage() {
    document.querySelector('.popup__image-caption').textContent = this._element.closest('.element').textContent;
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._alt;
    document.querySelector('.popup__preview').classList.toggle('popup__preview_opened');
    const popupPreview = document.querySelector('.popup__preview');
    const closeButtonImg = popupPreview.querySelector('.popup__close-button');
    closeButtonImg.addEventListener('click', closeImage);
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('click', clickListener);
  }
}

const elements = document.querySelector('.elements');
const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupPlaceLink = document.querySelector('.popup__form-item-field_link');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const validatorProfile = new FormValidator(obj, popupProfile);
const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation(obj, popupProfile);
validatorPlace.enableValidation(obj, popupPlace);

initialCards.forEach((item) => {
  const card = new Card(item, '.element_template');
  const cardElement = card.generateCard();
  elements.append(cardElement);
});

//popups values
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

//forms
const formProfile = document.querySelector('#change-user');
const formPlace = document.querySelector('#change-place');

const editUser = document.querySelector('.profile__edit-button');

//cards
const newCardButton = document.querySelector('.profile__add-button');

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function setPlaceAndLink() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

// закрытие форм
// по клику
function closeFormClick(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  removeListeners(popup);
}

function closeByOverlayClick(evt) {
  const popup = evt.target.closest('.popup');
  console.log(popup.classList);
  if (popup.classList.contains('popup__preview_opened')) {
    popup.classList.remove('popup__preview_opened');
  } else if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }

  console.log(popup.classList);
  evt.stopPropagation();
  removeListeners(popup);
}

//по Escape
function closeFormEscape(evt) {
  let popup;
  let popupOpened;
  switch (evt.target) {
    case editUser:
      popup = popupProfile;
      popupOpened = 'popup_opened';
      break;
    case newCardButton:
      popup = popupPlace;
      popupOpened = 'popup_opened';
      break;
    default:
      popup = document.querySelector('.popup__preview');
      popupOpened = 'popup__preview_opened';
      break;
  }
  console.log(popup);
  console.log(popupOpened);
  if (popup.classList.contains(popupOpened) && evt.key == 'Escape') {
    popup.classList.remove(popupOpened);
    removeListeners(popup);
  }
}

//закрытие попапа с картинкой
function closeImage(evt) {
  console.log(evt.target);
  document.querySelector('.popup__preview').classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', clickListener);
}

function keyHandler(evt) {
  if (evt.key == 'Escape') {
    //closeImage(evt);
    closeFormEscape(evt);
  }
}

function clickListener(evt) {
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeByOverlayClick(evt);
  }
}

//открытие форм
function openForm(evt, popup) {
  switch (popup) {
    case popupProfile:
      validatorProfile.makeClear(obj, popupProfile);
      validatorProfile.enableValidation(obj, popupProfile);
      break;
    case popupPlace:
      validatorPlace.makeClear(obj, popupPlace);
      validatorPlace.enableValidation(obj, popupPlace);
  }
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closeByOverlayClick);
  document.addEventListener('click', closeByOverlayClick);
}

//снятие слушателей
function removeListeners(popup) {
  document.removeEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', closeByOverlayClick);
  document.removeEventListener('click', closeByOverlayClick);
}

function saveProfile() {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

document.addEventListener('click', (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.stopPropagation();
});

// Обработчики «отправки» формы
function formProlileSubmitHandler(evt) {
  evt.preventDefault();
  saveProfile();
  closeFormClick(evt);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value,
  };
  const card = new Card(newCard, '.element_template');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
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

export { closeFormEscape, closeByOverlayClick };
