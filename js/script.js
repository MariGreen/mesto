const popup = document.querySelector('.popup');
const popupPreview = document.querySelector('.popup__preview');
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');
const formElement = document.querySelector('.popup__form-container');
const editUser = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');

const popupHeader = document.querySelector('.popup__edit-profile');
const saveButton = document.querySelector('.popup__save-button');

const newCardButton = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');

function getNameAndVocation() {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}

function fillProfileTemlate() {
  popupProfileName.placeholder = 'Имя';
  popupProfileVocation.placeholder = 'О себе';
  popupHeader.textContent = 'Редактировать профиль';
  saveButton.textContent = 'Сохранить';
}

function fillCardTemlate() {
  popupProfileName.value = '';
  popupProfileName.placeholder = 'Название';
  popupProfileVocation.value = '';
  popupProfileVocation.placeholder = 'Ссылка';
  popupHeader.textContent = 'Новое место';
  saveButton.textContent = 'Создать';
}

function openClose(evt) {
  if (popup.classList.contains('popup_opened') && (evt.keyCode == '27') | (evt.type == 'click')) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', openClose);
  } else {
    if (evt.target.classList.contains('profile__edit-button')) {
      // заполняем попап шаблоном профиля
      fillProfileTemlate();
    } else if (evt.target.classList.contains('profile__add-button')) {
      // заполняем попап шаблоном карточки
      fillCardTemlate();
    }
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', openClose);
  }
}

function closeImage() {
  popupPreview.classList.remove('popup__preview_opened');
  document.removeEventListener('keydown', keyHandler);
}

function saveProfile() {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

function addCard(name, link) {
  const elementTemplate = document.querySelector('.element_template').content;
  const element = elementTemplate.cloneNode(true);
  const newCardPicture = element.querySelector('.element__picture');
  const newCardPlace = element.querySelector('.element__place');
  newCardPicture.src = link;
  newCardPlace.textContent = name;
  newCardPicture.alt = 'Фотография «' + name + '»';
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

function keyHandler(evt) {
  console.log(evt.target);
  if (evt.keyCode == '27') {
    closeImage();
  }
}

function clickListener(evt) {
  console.log(evt.target.classList);
  if (evt.target.classList.contains('popup__preview_opened')) {
    closeImage();
  } else if (evt.target.classList.contains('popup_opened')) {
    openClose();
  }
  return;
}

function prependCard(element, elementContainer) {
  elementContainer.prepend(element);
}

function appendCard(element, elementContainer) {
  elementContainer.append(element);
}

initialCards.forEach(function (item) {
  const element = addCard(item.name, item.link);
  appendCard(element, elements);
  element.addEventListener('click', (evt) => {
    console.log(evt.target);
    console.log(element);
    addCardListeners(evt, element);
  });
});

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы.
  // смотрим какой попап открыт
  if (popupHeader.textContent === 'Редактировать профиль') {
    //функция сохранения профиля
    saveProfile();
  } else if (popupHeader.textContent === 'Новое место') {
    //функция сохранения карточки
    const element = addCard(popupProfileName.value, popupProfileVocation.value);
    prependCard(element, elements);
  }
  openClose(evt);
}

closeButton.addEventListener('click', openClose);

//редактирование профиля
editUser.addEventListener('click', function (evt) {
  getNameAndVocation();
  openClose(evt);
});

//добавление картинки
newCardButton.addEventListener('click', function (evt) {
  openClose(evt);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
