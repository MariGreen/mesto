import { popupProfile, popupPlace, editUser, newCardButton, obj, validatorProfile, validatorPlace } from './index.js';

const popupPreview = document.querySelector('.popup__preview');

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

function setTarget(evt) {
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

export {
  closeByOverlayClick,
  closebyEscape,
  defineTargetForOpennEsc,
  defineTargetForClicknCross,
  setTarget,
  closeByCross,
  closePopup,
  makeClear,
};

//из-за того, что попапы с формой и превью картинки отличаются коэффициентом прозрачности фона,
//не удалось всё свести к простому toggle popup_opened
//поэтому так)
