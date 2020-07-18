import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(newCard) {
    super.open();
    this._popupSelector.querySelector('.popup__image-caption').textContent = newCard.name;
    const popupImage = this._popupSelector.querySelector('.popup__image');
    popupImage.src = newCard.link;
    popupImage.alt = newCard.name;
  }
}
