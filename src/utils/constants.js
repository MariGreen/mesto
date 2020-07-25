const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupAvatar = document.querySelector('.popup_avatar');

const popupProfileName = document.querySelector('.popup__form-item-field_name');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const saveButtonProfile = document.querySelector('.popup_profile').querySelector('.popup__save-button');
const confirmButton = document.querySelector('.popup_confirm').querySelector('.popup__delete-button');
const saveButtonAvatar = document.querySelector('.popup_avatar').querySelector('.popup__save-button');
const saveButtonPlace = document.querySelector('.popup_place').querySelector('.popup__save-button');

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

export {
  popupProfile,
  popupPlace,
  popupAvatar,
  popupProfileName,
  popupProfileVocation,
  saveButtonProfile,
  confirmButton,
  saveButtonAvatar,
  saveButtonPlace,
  obj,
};
