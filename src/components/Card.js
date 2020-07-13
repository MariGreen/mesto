class Card {
  constructor(data, cardSelector, { handleCardClick }) {
    this._place = data.place;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.place}»`;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    const elementPicture = this._element.querySelector('.element__picture');
    elementPicture.src = this._link;
    elementPicture.alt = this._alt;
    this._element.querySelector('.element__place').textContent = this._place;
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
      this._handleCardClick();
    });
  }

  _likeCards() {
    this._likeButton.classList.toggle('element__like_black');
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
