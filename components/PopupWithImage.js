import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(newCard) {
    super.open();
    this._popupSelector.querySelector('.popup__image-caption').textContent = newCard.place;
    this._popupSelector.querySelector('.popup__image').src = newCard.link;
    this._popupSelector.querySelector('.popup__image').alt = newCard.place;
  }
}
