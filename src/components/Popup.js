export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  _closeByOverlayClick = (evt) => {
    if (evt.target === this._popupSelector) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    this._closeButton.addEventListener('mousedown', () => {
      this.close();
    });

    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._closeByOverlayClick(evt);
    });
  }
}
