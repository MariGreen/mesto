class Card {
  constructor(data, userId, cardSelector, { handleCardClick }, { handleCard }) {
    this._place = data.name;
    this._link = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._alt = `Фотография «${data.name}»`;
    this._handleCardClick = handleCardClick;

    this._likes = data.likes;
    this._idCard = data._id;
    this._owner = data.owner;
    this._userId = userId;

    this._handleCardDelete = handleCard.handleCardDelete;
    this._handleCardLike = handleCard.handleCardLike;
    this._handleCardDislike = handleCard.handleCardDislike;
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
    this._myCards();
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeCards();
    });
    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
  _showLikes() {
    const elementLikes = this._element.querySelector('.element__likes');
    elementLikes.textContent = this._likes.length;

    const myLike = this._likes.some((element) => {
      return element._id === this._userId;
    });

    if (myLike) {
      this._likeButton.classList.remove('element__like_black');
    }
  }

  _likeCards() {
    const elementLikes = this._element.querySelector('.element__likes');

    if (this._likeButton.classList.contains('element__like_black')) {
      this._handleCardLike(this._idCard);

      this._likeButton.classList.remove('element__like_black');

      elementLikes.textContent++;
    } else {
      this._handleCardDislike(this._idCard);
      this._likeButton.classList.add('element__like_black');
      elementLikes.textContent--;
    }
  }

  _deleteElement() {
    this._likeButton.removeEventListener('click', () => {
      this._likeCards();
    });
    this._trashButton.removeEventListener('click', () => {
      this._handleCardDelete(this);
    });
    this._element.querySelector('.element__picture').removeEventListener('click', () => {
      this._handleCardClick();
    });
    this._element.remove();
    this._element = null;
  }

  _myCards = () => {
    if (this._owner._id !== this._userId) {
      this._trashButton.style.display = 'none';
    }
  };
}

export { Card };
