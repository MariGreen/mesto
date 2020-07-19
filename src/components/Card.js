class Card {
  constructor(data, cardSelector, { handleCardClick }, { handleCardDelete }, { handleCardLike }) {
    this._place = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.name}»`;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._idCard = data._id;
    this._owner = data.owner;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
    const elementLikes = this._element.querySelector('.element__likes');
    elementLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCards();
    });
    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete();
    });
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _likeCards() {
    //console.log(this._idCard);
    this._handleCardLike(this._idCard);
    this._likeButton.classList.toggle('element__like_black');
  }

  //_deleteButtonHandler()

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }
}

export { Card };
