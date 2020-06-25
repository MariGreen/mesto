//закрытие попапа с картинкой
function closeImage() {
  document.querySelector('.popup__preview').classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', clickListener);
}

function keyHandler(evt) {
  if (evt.key == 'Escape') {
    closeImage();
  }
}

function clickListener(evt) {
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeImage();
  }
}

export { closeImage, keyHandler, clickListener };
