import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._closeButton = this._popupSelector.querySelector('.popup__delete-button');
  }

  //_deleteButtonHandler()

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      //this._formSubmitHandler(this._getInputValues());
      this._formSubmitHandler();

      this.close();
    });
  }
}
