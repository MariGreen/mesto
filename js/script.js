const initialCards = [
  {
    name: 'Павловск',
    link: 'https://images.unsplash.com/photo-1571680233390-b0061928cea0',
  },
  {
    name: 'Судак',
    link: 'https://images.unsplash.com/photo-1550399741-599433fae4d1',
  },
  {
    name: 'Тула',
    link: 'https://images.unsplash.com/photo-1545736522-b347030de513',
  },
  {
    name: 'Выборг',
    link: 'https://images.unsplash.com/photo-1536012354193-8bb300dc3ce6',
  },
  {
    name: 'Микли',
    link: 'https://images.unsplash.com/photo-1555948560-27b32a752ff3',
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc',
  },
];
const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-item-field_error',
};

const elements = document.querySelector('.elements');
const popupPreview = document.querySelector('.popup__preview');
const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupPlaceLink = document.querySelector('.popup__form-item-field_link');
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const validatorProfile = new FormValidator(obj, popupProfile);
const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation(obj, popupProfile);
validatorPlace.enableValidation(obj, popupPlace);

class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = `Фотография «${data.name}»`;
  }

  _getTemplate() {
    const cardElement = document.querySelector('.element_template').content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.element__picture').src = this._link;
    this._element.querySelector('.element__picture').alt = this._alt;
    this._element.querySelector('.element__place').textContent = this._name;
    this._trashButton = this._element.querySelector('.element__trash');
    this._likeButton = this._element.querySelector('.element__like');
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
      this._showPopupImage();
    });
  }

  _likeCards() {
    this._likeButton.classList.toggle('element__like_black');
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _showPopupImage() {
    document.querySelector('.popup__image-caption').textContent = this._element.closest('.element').textContent;
    document.querySelector('.popup__image').src = this._link;
    document.querySelector('.popup__image').alt = this._alt;
    document.querySelector('.popup__preview').classList.toggle('popup__preview_opened');
    const closeButtonImg = popupPreview.querySelector('.popup__close-button');
    closeButtonImg.addEventListener('click', closeImage);
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('click', clickListener);
  }
}

initialCards.forEach((item) => {
  const card = new Card(item);
  const cardElement = card.generateCard();

  elements.append(cardElement);
});

//popups values
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

//forms
const formProfile = document.querySelector('#change-user');
const formPlace = document.querySelector('#change-place');

const editUser = document.querySelector('.profile__edit-button');

//cards
const newCardButton = document.querySelector('.profile__add-button');

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function setPlaceAndLink() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

//закрытие форм
//по клику
function closeFormClick(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  removeListeners(popup);
}

//по Escape
function closeFormEscape(evt) {
  let popup;
  switch (evt.target) {
    case editUser:
      popup = popupProfile;
      break;
    case newCardButton:
      popup = popupPlace;
      break;
    default:
      return;
  }
  if (popup.classList.contains('popup_opened') && evt.key == 'Escape') {
    popup.classList.remove('popup_opened');
    removeListeners(popup);
  }
}

//открытие форм
function openForm(evt, popup) {
  switch (popup) {
    case popupProfile:
      console.log(popupProfile, popup);
      validatorProfile.makeClear(obj, popupProfile);
      validatorProfile.enableValidation(obj, popupProfile);
      break;
    case popupPlace:
      validatorPlace.makeClear(obj, popupPlace);
      validatorPlace.enableValidation(obj, popupPlace);
  }
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closeFormClick);
}

//снятие слушателей
function removeListeners(popup) {
  document.removeEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener('click', closeFormClick);
}

function saveProfile() {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

//закрытие попапа с картинкой
function closeImage() {
  document.querySelector('.popup__preview').classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', clickListener);
}

function keyHandler(evt) {
  if (evt.key == 'Escape') {
    closeImage();
  }
}

function clickListener(evt) {
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeImage();
  }
}

document.addEventListener('click', (evt) => {
  evt.target.classList.remove('popup_opened');
  evt.stopPropagation();
});

// Обработчики «отправки» формы
function formProlileSubmitHandler(evt) {
  evt.preventDefault();
  saveProfile();
  closeFormClick(evt);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value,
  };
  const card = new Card(newCard);
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  closeFormClick(evt);
}

//редактирование профиля
editUser.addEventListener('click', (evt) => {
  getNameAndVocation();
  openForm(evt, popupProfile);
});

//добавление картинки
newCardButton.addEventListener('click', (evt) => {
  setPlaceAndLink();
  openForm(evt, popupPlace);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formProlileSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
