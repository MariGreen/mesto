class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    //удаление слушателей??
    // document.removeEventListener('keydown', closebyEscape);
    // const closeButton = popup.querySelector('.popup__close-button');
    // closeButton.removeEventListener('mousedown', closeByCross);
    // popup.removeEventListener('mousedown', closeByOverlayClick);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  _closeByOverlayClick(evt) {
    //const popup = document.querySelector('.popup_opened');
    if (evt.target == this._popupSelector) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._closeButton.addEventListener('mousedown', () => {
      this.close();
    });
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._closeByOverlayClick(evt);
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(newCard) {
    super.open();
    this._popupSelector.querySelector('.popup__image-caption').textContent = newCard.name;
    this._popupSelector.querySelector('.popup__image').src = newCard.link;
    this._popupSelector.querySelector('.popup__image').alt = newCard.name;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitHandler }) {
    // { makeClear }
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    //this._makeClear = makeClear;
    this._formElement = this._popupSelector.querySelector('.popup__form-container');
    this._popupInputs = this._formElement.querySelectorAll('.popup__form-item-field');
  }

  _getInputValues() {
    //собирает данные полей с формы
    //this._inputList = this._popupSelector.querySelector('.popup__form-container').querySelectorAll('.popup__form-item-field');
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

      this.close();
    });
  }

  // open() {
  //   super.open();
  //   this._makeClear();
  // }

  close() {
    super.close();
    //this._popupSelector.classList.remove('popup_opened');
    // document.removeEventListener('keydown', (evt) => {
    //   this._handleEscClose(evt);
    // });
    this._formElement.reset();
  }
}

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
