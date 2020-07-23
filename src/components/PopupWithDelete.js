import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._closeButton = this._popupSelector.querySelector('.popup__delete-button');

    this.card = {};
  }

  open(card) {
    super.open();
    this.card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandler(this.card);

      this.close();
    });
  }
}
