import { closeImage, keyHandler, clickListener } from './utilits.js';

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография «${data.name}»`;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.element_template').content.querySelector('.element').cloneNode(true);

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
    document.querySelector('.popup__preview').classList.toggle('popup__preview_opened');
    const popupPreview = document.querySelector('.popup__preview');
    const closeButtonImg = popupPreview.querySelector('.popup__close-button');
    closeButtonImg.addEventListener('click', closeImage);
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('click', clickListener);
  }
}

export { Card };
