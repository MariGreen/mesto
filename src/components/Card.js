class Card {
  constructor(
    data,
    userId,
    cardSelector,
    { handleCardClick },
    { handleCardLike },
    { handleCardDislike } //{ handleCardDelete },
  ) {
    this._place = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.name}»`;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._idCard = data._id;
    this._owner = data.owner;
    this._userId = userId;
    //this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardDislike = handleCardDislike;
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
    this._showLikes();

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
  _showLikes() {
    const elementLikes = this._element.querySelector('.element__likes');
    elementLikes.textContent = this._likes.length;

    const myLike = this._likes.some((like) => {
      return this._likes._id === this._userId;
    });
    if (myLike) {
      this._likeButton.classList.remove('element__like_black');
    }
    console.log(myLike);
    //this._likes.some(this._owner);
    //this._likes.some(myLike(this._owner));
  }

  _likeCards() {
    //console.log(this._idCard);
    this._handleCardLike(this._idCard);
    this._likeButton.classList.add('element__like_black');
  }

  _dislikeCards() {
    this._handleCardDislike(this._idCard);
    this._likeButton.classList.remove('element__like_black');
  }

  //_deleteButtonHandler()

  _deleteElement() {
    this._element.remove();
    this._element = null;

    // const myLike = (owner) => {
    //   return owner._id === this._userId;
    //   //return owner._id === this._userId; //показывает мои карточки
    // };
    // if (myLike(this._owner)) {
    //   this._likeButton.classList.remove('element__like_black');
    // }
    // console.log(this._likes);
  }
}

export { Card };
