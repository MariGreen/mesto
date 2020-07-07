//import { closeByCross } from './utilits.js';
//Popup никак не нужно связывать с index.js, нужно наследующие от него классы PopupWithImage и PopupWithForm. создать их экземпляры и вызывать на них setEventListeners; в конструктор Card передать в качечтве коллбэка () => imagePopup.open(cardData), в обработчики кликов на кнопки — open других попапов...

class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector); //почему не '.popup_opened'?
    //this._popupSelector = popupSelector; или так?
  }

  open(popupOpened) {
    this._popupSelector.classList.add(popupOpened);
    this.setEventListeners();
  }

  close(popupOpened) {
    this._popupSelector.classList.remove(popupOpened);
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

  setEventListeners(popupCloseButton) {
    this._closeButton = this._popupSelector.querySelector(popupCloseButton);
    this._closeButton.addEventListener('mousedown', () => {
      this.close();
    });
    //this._image = this._popupElement.querySelector('.popup__close-button'); а смысл?

    //this._popupSelector.addEventListener('click', () => this.close());
    //this._closeIcon = this._popupSelector.querySelector('.popup__close-icon');
    //this._closeIcon.addEventListener('click', () => this.close());
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector, newCard) {
    super(popupSelector);
    this._cardName = newCard.name;
    this._cardLink = newCard.link;
  }
  open() {
    super.open();
    this._popupSelector.querySelector('.popup__image-caption').textContent = this._cardName;
    this._popupSelector.querySelector('.popup__image').src = this._cardLink;
    this._popupSelector.querySelector('.popup__image').alt = this._cardName;
  }
}

class PopupWithForm extends Popup {
  constructor(popupSelector, { submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._formElement = this._popupElement.querySelector('.popup__form-container');
    this._popupInputs = this._formElement.querySelectorAll('.popup__form-item-field');
  }

  _getInputValues() {
    //собирает данные полей с формы
    this._inputList = this._popupSelector.querySelector('.popup__form').querySelectorAll('.popup__form-input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    this._popupSelector.querySelector(closeButtonSelector).addEventListener('click', () => {
      this.close();
    });
    this._popupSelector.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
    this._popupSelector.addEventListener('submit', (evt) => {
      //ОБРАБОТКА САБМИТА
      evt.preventDefault();
      this._submit(this._getInputValues());
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popupSelector.querySelector('.popup__form').reset(); //СБРОС
  }
}

//Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
//Свяжите класс Card c попапом. Сделайте так, чтобы Card принимал в конструктор функцию handleCardClick. Эта функция должна открывать попап с картинкой при клике на карточку.
