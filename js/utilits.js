//закрытие по оверлею
function closeByOverlayClick(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target == popup) {
    closePopup(popup);
  }
}

//закрытие по ескейпу
function closebyEscape(evt) {
  if (evt.key == 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//закрытие по крестику
function closeByCross() {
  const popup = document.querySelector('.popup_opened');
  closePopup(popup);
}

//закрытие попапа и снятие слушателей
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closebyEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener('mousedown', closeByCross);
  popup.removeEventListener('mousedown', closeByOverlayClick);
}

//открытие попапа и навешивание слушателей
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closebyEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('mousedown', closeByCross);
  popup.addEventListener('mousedown', closeByOverlayClick);
}

export { closeByOverlayClick, closebyEscape, openPopup, closeByCross, closePopup };
