//import { closeFormEscape, closeByOverlayClick } from './index.js';

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

function openPopup(popup, popupOpened) {
  popup.classList.add(popupOpened);
  document.addEventListener('keyup', closeByEsc);
  document.addEventListener('mousedown', closeByOverlayClick);
}

function closePopup(popup, popupOpened) {
  popup.classList.remove(popupOpened);
  document.removeEventListener('keyup', closeByEsc);
  document.removeEventListener('mousedown', closeByOverlayClick);
}

function closeByEsc(evt) {
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

// function closeByOverlayClick(evt) {
//   popup = evt.target.closest('.popup');
//   popup.classList.remove('popup_opened' || 'popup__preview_opened');
//   removeListeners(popup);
// }

// //старое
// //закрытие форм
// //по клику
// function closeFormClick(evt) {
//   const popup = evt.target.closest('.popup');
//   popup.classList.remove('popup_opened');
//   removeListeners(popup);
// }

// //по Escape
// function closeFormEscape(evt) {
//   let popup;
//   switch (evt.target) {
//     case editUser:
//       popup = popupProfile;
//       break;
//     case newCardButton:
//       popup = popupPlace;
//       break;
//     default:
//       return;
//   }
//   if (popup.classList.contains('popup_opened') && evt.key == 'Escape') {
//     popup.classList.remove('popup_opened');
//     removeListeners(popup);
//   }
// }

// //снятие слушателей
// function removeListeners(popup) {
//   document.removeEventListener('keydown', closeFormEscape);
//   const closeButton = popup.querySelector('.popup__close-button');
//   closeButton.removeEventListener('click', closeFormClick);
// }

//export { closeImage, keyHandler, clickListener };
