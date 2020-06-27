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
    closeButtonImg.addEventListener('mousedown', closeByCross);
    document.addEventListener('keydown', closebyEscape);
    popupPreview.addEventListener('mousedown', closeByOverlayClick);
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
const popupPreview = document.querySelector('.popup__preview');

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

//выбор попапа и класса
function defineTargetForOpennEsc(evt) {
  let popupActive = {};
  switch (evt.target) {
    case editUser:
      popupActive.popup = popupProfile;
      popupActive.popupOpened = 'popup_opened';
      break;
    case newCardButton:
      popupActive.popup = popupPlace;
      popupActive.popupOpened = 'popup_opened';
      break;
    default:
      popupActive.popup = popupPreview;
      popupActive.popupOpened = 'popup__preview_opened';
      break;
  }
  return popupActive;
}

function buttonClick(evt) {
  const popupActive = defineTargetForOpennEsc(evt);
  openPopup(popupActive.popup, popupActive.popupOpened);
}

//закрытие по оверлею
function closeByOverlayClick(evt) {
  const popupActive = defineTargetForClicknCross(evt);
  if (evt.target == popupActive.popup) {
    closePopup(popupActive.popup, popupActive.popupOpened);
  }
}

//закрытие по ескейпу
function closebyEscape(evt) {
  if (evt.key == 'Escape') {
    let popupActive = {};
    if (evt.target.classList.contains('popup__form-item-field')) {
      popupActive = defineTargetForClicknCross(evt);
    } else {
      popupActive = defineTargetForOpennEsc(evt);
    }
    closePopup(popupActive.popup, popupActive.popupOpened);
  }
}

function defineTargetForClicknCross(evt) {
  let popupActive = {};

  popupActive.popup = evt.target.closest('.popup');
  switch (popupActive.popup) {
    case popupProfile:
      popupActive.popupOpened = 'popup_opened';
      break;
    case popupPlace:
      popupActive.popupOpened = 'popup_opened';
      break;
    default:
      popupActive.popupOpened = 'popup__preview_opened';
      break;
  }
  return popupActive;
}

//закрытие по крестику
function closeByCross(evt) {
  const popupActive = defineTargetForClicknCross(evt);
  closePopup(popupActive.popup, popupActive.popupOpened);
}

//закрытие попапа и снятие слушателей
function closePopup(popup, popupOpened) {
  popup.classList.remove(popupOpened);
  document.removeEventListener('keydown', closebyEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener('mousedown', closeByCross);
  popup.removeEventListener('mousedown', closeByOverlayClick);
}

//очистка ошибок
function makeClear(popup) {
  const cleanList = Array.from(popup.querySelectorAll(obj.inputSelector));

  if (popup.classList.contains('popup_profile')) {
    cleanList.forEach((input) => {
      validatorProfile.hideErrors(input, obj.inputErrorClass, obj.errorClass);
    });
  } else if (popup.classList.contains('popup_place')) {
    cleanList.forEach((input) => {
      validatorPlace.hideErrors(input, obj.inputErrorClass, obj.errorClass);
    });
  }
}

//открытие попапа и навешивание слушателей
function openPopup(popup, popupOpened) {
  popup.classList.add(popupOpened);
  document.addEventListener('keydown', closebyEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('mousedown', closeByCross);
  const input = popup.querySelectorAll(obj.inputSelector);
  input.forEach((element) => {
    element.addEventListener('keydown', closebyEscape);
  });
  popup.addEventListener('mousedown', closeByOverlayClick);
  makeClear(popup);
}

function saveProfile() {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

// Обработчики «отправки» формы
function formProlileSubmitHandler(evt) {
  evt.preventDefault();
  saveProfile();
  closePopup(popupProfile, 'popup_opened');
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
  closePopup(popupPlace, 'popup_opened');
}

//редактирование профиля
editUser.addEventListener('click', (evt) => {
  getNameAndVocation();
  buttonClick(evt);
});

//добавление картинки
newCardButton.addEventListener('click', (evt) => {
  setPlaceAndLink();
  buttonClick(evt);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formProlileSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);

//export { closeFormEscape, closeByOverlayClick };
