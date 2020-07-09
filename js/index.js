import { initialCards } from './inititialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
//import { openPopup, closePopup } from './utilits.js';
import { Section } from './Section.js';
import { PopupWithImage, PopupWithForm } from './Popup.js';
import { UserInfo } from './UserInfo.js';

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

const newUser = new UserInfo('.profile__name', '.profile__vocation');

const popupImage = new PopupWithImage('.popup__preview');
popupImage.setEventListeners();

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

//popup with forms
const popupNewPlace = new PopupWithForm('.popup_place', {
  formSubmitHandler() {
    const newCard = this._getInputValues();
    const card = new Card(newCard, '.element_template', {
      handleCardClick: () => {
        popupImage.open(newCard);
      },
    });
    const cardElement = card.generateCard();

    elements.addItem(cardElement);
    return cardElement;
  },
});
popupNewPlace.setEventListeners();

const newPopupProfile = new PopupWithForm('.popup_profile', {
  formSubmitHandler(person) {
    newUser.setUserInfo(person);
    //this.close();
  }, //validatorProfile.makeClear(obj, popupProfile)
});
newPopupProfile.setEventListeners();

//редактирование профиля
editUser.addEventListener('click', () => {
  newPopupProfile.open();
  popupProfileName.value = newUser.getUserInfo().name;
  popupProfileVocation.value = newUser.getUserInfo().vocation;
});

//добавление картинки
newCardButton.addEventListener('click', () => {
  popupNewPlace.open();
});
