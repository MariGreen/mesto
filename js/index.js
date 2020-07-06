import { initialCards } from './inititialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utilits.js';
import { Section } from './Section.js';

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

//const elements = document.querySelector('.elements');
const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupPlaceLink = document.querySelector('.popup__form-item-field_link');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');

const validatorProfile = new FormValidator(obj, popupProfile);
const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation(obj, popupProfile);
validatorPlace.enableValidation(obj, popupPlace);

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

//section
const elements = new Section(
  {
    items: initialCards, //массив с карточками
    renderer: (item) => {
      const card = new Card(item, '.element_template');
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  '.elements'
);

elements.renderItems();

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function setPlaceAndLink() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
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
  closePopup(popupProfile);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value,
  };

  const card = new Card(newCard, '.element_template');
  const cardElement = card.generateCard();
  elements.addItem(cardElement);
  closePopup(popupPlace);
}

//редактирование профиля
editUser.addEventListener('click', () => {
  getNameAndVocation();
  validatorProfile.makeClear(obj, popupProfile);
  openPopup(popupProfile);
});

//добавление картинки
newCardButton.addEventListener('click', () => {
  setPlaceAndLink();
  validatorPlace.makeClear(obj, popupPlace);
  openPopup(popupPlace);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formProlileSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
