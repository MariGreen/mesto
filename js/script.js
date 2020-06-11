//popups
const popupProfile = document.querySelector('.popup_profile');
const popupPlace = document.querySelector('.popup_place');
const popupPreview = document.querySelector('.popup__preview');
const popupHeader = document.querySelector('.popup__edit-profile');
const saveButton = document.querySelector('.popup__save-button');

//popups values
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupPlaceLink = document.querySelector('.popup__form-item-field_link');

//forms
const formProfile = document.querySelector('#change-user');
const formPlace = document.querySelector('#change-place');

const editUser = document.querySelector('.profile__edit-button');

//cards
const newCardButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');

const obj = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item-field',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactiv',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function setPlaceAndLink() {
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

function openForm(evt, popup) {
  popup.classList.add('popup_opened');
  enableValidation(obj);
  document.addEventListener('keydown', closeFormEscape);
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener('click', closeFormClick);
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

//добавление карточки
function addCard(name, link) {
  const elementTemplate = document.querySelector('.element_template').content;
  const element = elementTemplate.cloneNode(true);
  const newCardPicture = element.querySelector('.element__picture');
  const newCardPlace = element.querySelector('.element__place');

  newCardPicture.src = link;
  newCardPlace.textContent = name;
  newCardPicture.alt = `Фотография «${name}»`;

  const likeButton = element.querySelector('.element__like');

  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like_black');
  });

  const trashButton = element.querySelector('.element__trash');
  trashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  newCardPicture.addEventListener('click', showPopupImage);
  document.addEventListener('click', clickListener);
  return element;
}

//увеличение картинки
function showPopupImage(evt) {
  popupPreview.classList.toggle('popup__preview_opened');
  const closeButtonImg = popupPreview.querySelector('.popup__close-button');
  closeButtonImg.addEventListener('click', closeImage);
  const element = evt.target.closest('.element');
  const cardPicture = element.querySelector('.element__picture');
  const popupPicture = document.querySelector('.popup__image');
  popupPicture.src = cardPicture.src;
  const popupCaption = document.querySelector('.popup__image-caption');
  popupCaption.textContent = element.textContent;
  popupCaption.alt = element.textContent;
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', clickListener);
}

//закрытие попапа с картинкой
function keyHandler(evt) {
  if (evt.key == 'Escape') {
    closeImage();
  }
}

function clickListener(evt) {
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeImage();
  }
  return;
}

function closeImage() {
  popupPreview.classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', clickListener);
}

document.addEventListener('click', function (evt) {
  evt.target.classList.remove('popup_opened');
  console.log(evt.target);
  evt.stopPropagation();
});

//добавление карточек на страницу
function prependCard(element, elementContainer) {
  elementContainer.prepend(element);
}

function appendCard(element, elementContainer) {
  elementContainer.append(element);
}

//создание начальной странички
initialCards.forEach(function (item) {
  const element = addCard(item.name, item.link);
  appendCard(element, elements);
  element.addEventListener('click', (evt) => {
    addCardListeners(evt, element);
  });
});

// Обработчики «отправки» формы
function formProlileSubmitHandler(evt) {
  evt.preventDefault();
  saveProfile();
  closeFormClick(evt);
}

function formPlaceSubmitHandler(evt) {
  evt.preventDefault();
  const element = addCard(popupPlaceName.value, popupPlaceLink.value);
  prependCard(element, elements);
  closeFormClick(evt);
}

//редактирование профиля
editUser.addEventListener('click', function (evt) {
  getNameAndVocation();
  openForm(evt, popupProfile);
});

//добавление картинки
newCardButton.addEventListener('click', function (evt) {
  setPlaceAndLink();
  openForm(evt, popupPlace);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formProlileSubmitHandler);
formPlace.addEventListener('submit', formPlaceSubmitHandler);
