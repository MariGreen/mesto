import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popupSelector.querySelector('.popup__form-container');
    this._popupInputs = this._formElement.querySelectorAll('.popup__form-item-field');
  }

  _getInputValues() {
    //собирает данные полей с формы
    this._formValues = {};
    this._popupInputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
