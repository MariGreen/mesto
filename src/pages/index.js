import './index.css';
import { initialCards } from '../components/inititialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');

const popupProfileName = document.querySelector('.popup__form-item-field_name');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const editUser = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

const newUser = new UserInfo('.profile__name', '.profile__vocation');

//section
const elements = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.element_template', {
        handleCardClick: () => {
          popupImage.open(item);
        },
      });
      const cardElement = card.generateCard();

      return cardElement;
    },
  },
  '.elements'
);

elements.renderItems();

//popup with image
const popupImage = new PopupWithImage('.popup__preview');
popupImage.setEventListeners();

//popup with forms
//place
const popupNewPlace = new PopupWithForm('.popup_place', {
  formSubmitHandler(data) {
    const card = new Card(data, '.element_template', {
      handleCardClick: () => {
        popupImage.open(data);
      },
    });
    const cardElement = card.generateCard();

    elements.addItem(cardElement);
  },
});
popupNewPlace.setEventListeners();

//user
const newPopupProfile = new PopupWithForm('.popup_profile', {
  formSubmitHandler(person) {
    newUser.setUserInfo(person);
  },
});

newPopupProfile.setEventListeners();

//валидация форм
const validatorProfile = new FormValidator(obj, popupProfile);
const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation();
validatorPlace.enableValidation();

//редактирование профиля
editUser.addEventListener('click', () => {
  popupProfileName.value = newUser.getUserInfo().name;
  popupProfileVocation.value = newUser.getUserInfo().vocation;
  validatorProfile.makeClear();
  newPopupProfile.open();
});

//добавление картинки
newCardButton.addEventListener('click', () => {
  validatorPlace.makeClear();
  popupNewPlace.open();
});
