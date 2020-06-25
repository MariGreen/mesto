import { initialCards } from './inititialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

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
  const card = new Card(item);
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
  const card = new Card(newCard);
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
