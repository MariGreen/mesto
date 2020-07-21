const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupAvatar = document.querySelector('.popup_avatar');

const popupProfileName = document.querySelector('.popup__form-item-field_name');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

export { popupProfile, popupPlace, popupAvatar, popupProfileName, popupProfileVocation, obj };
