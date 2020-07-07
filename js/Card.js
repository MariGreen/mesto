import { closeByCross, closebyEscape, closeByOverlayClick } from './utilits.js';

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.name}»`;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._alt;
    this._element.querySelector('.element__place').textContent = this._name;
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton = this._element.querySelector('.element__like');
    const popupPreview = document.querySelector('.popup__preview');
    this._closeButton = popupPreview.closest('.popup__close-button');
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCards();
    });
    this._trashButton.addEventListener('click', () => {
      this._deleteElement();
    });
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._showPopupImage();
    });
  }

  _likeCards() {
    this._likeButton.classList.toggle('element__like_black');
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _showPopupImage() {
    document.querySelector('.popup__image-caption').textContent = this._element.closest('.element').textContent;
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._alt;
    document.querySelector('.popup__preview').classList.toggle('popup_opened');
    const popupPreview = document.querySelector('.popup__preview');
    const closeButtonImg = popupPreview.querySelector('.popup__close-button');
    closeButtonImg.addEventListener('mousedown', closeByCross);
    document.addEventListener('keydown', closebyEscape);
    popupPreview.addEventListener('mousedown', closeByOverlayClick);
  }
}

export { Card };
//использовать для закрытия карточек метод из  класса Popup.
