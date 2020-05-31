const popupChangeUser = document.querySelector('.popup_change-user');
const popupAddPlace = document.querySelector('.popup_add-place');
const popupPreview = document.querySelector('.popup__preview');

const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');

const popupPlaceName = document.querySelector('.popup__form-item-field_place');
const popupImageLink = document.querySelector('.popup__form-item-field_link');

//const formElement = document.querySelector('.popup__form-container');
const editUser = document.querySelector('.profile__edit-button');

const popupHeader = document.querySelector('.popup__edit-profile');
const saveButton = document.querySelector('.popup__save-button');

const newCard = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');

  

  const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function getName () {
  popupProfileName.value = profileName.textContent;
  popupProfileVocation.value = profileVocation.textContent;
}



function openClose (evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    popupChangeUser.classList.add('popup_opened');
    const userForm = document.querySelector('.popup_change-user');
    const closeButtonUserForm = userForm.querySelector('.popup__close-button');
    
    const formElementUser = userForm.querySelector('.popup__form-container');
    formElementUser.addEventListener('submit', function(evt){
      formSubmitHandler (userForm, evt);
      });

    closeButtonUserForm.addEventListener('click', function(){
      closeForm (userForm);
      });
  }
  else if (evt.target.classList.contains('profile__add-button')) {
    popupAddPlace.classList.add('popup_opened');
    const placeForm = document.querySelector('.popup_add-place');
    const closeButtonPlaceForm = placeForm.querySelector('.popup__close-button');
    const formElementPlace = placeForm.querySelector('.popup__form-container');
    formElementPlace.addEventListener('submit', function(evt){
      formSubmitHandler (placeForm, evt);
      });
    closeButtonPlaceForm.addEventListener('click', function(){
      closeForm (placeForm);
      });
  }
}

function closeImage(){
  popupPreview.classList.remove('popup__preview_opened');    
}

function closeForm (smth) {
  smth.classList.remove('popup_opened');
}  
  
function saveProfile () {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
    // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
}

function savePlace () {
  const newCardPicture = document.querySelector('.element__picture');
  const newCardPlace = document.querySelector('.element__place');

  newCardPicture.src = popupImageLink.value;
  newCardPlace.textContent = popupPlaceName.value;
  newCardPicture.alt = popupPlaceName.value;
}





function render () {
  initialCards.forEach(function(item) {
    const elementTemplate = document.querySelector('.element_template').content;
    const element = elementTemplate.cloneNode(true);
    const elementPicture = element.querySelector('.element__picture');
    const elementPlace = element.querySelector('.element__place');
    elementPicture.src = item.link;
    elementPlace.textContent = item.name;
    elementPicture.alt = item.name;
    elements.append(element);
    //console.log(elementPicture.alt);
  })
}
render ();

function addCard () {
  const elementTemplate = document.querySelector('.element_template').content;
  const element = elementTemplate.cloneNode(true);
  elements.prepend(element);
  savePlace ();  
}

//обработка клика по карточке!

elements.addEventListener("click", (evt) => {
  const list_item = evt.target.closest(".element");
  const likeButton = list_item.querySelector('.element__like');
  if (evt.target.classList.contains('element__trash')) {
      list_item.remove();  
  } else if (evt.target.classList.contains('element__like')) {
    likeButton.classList.toggle('element__like_black');
  } else if (evt.target.classList.contains('element__picture')) {
    //вызов превью
    popupPreview.classList.toggle('popup__preview_opened');
    const closeButtonImg = popupPreview.querySelector('.popup__close-button');

    closeButtonImg.addEventListener('click', closeImage);
    const cardPicture = list_item.querySelector('.element__picture');
    const popupPicture = document.querySelector('.popup__image');
    popupPicture.src = cardPicture.src;
    //const cardCaption = list_item.textContent;
    const popupCaption = document.querySelector('.popup__image-caption');
    popupCaption.textContent = list_item.textContent;
    popupCaption.alt = list_item.textContent;


    console.log(popupCaption.alt);
  }  
});


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (smth, evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // смотрим какой попап открыт
  console.log(smth.classList);
  if (smth.classList.contains('popup_change-user')) {
  //функция сохранения профиля
  saveProfile ();

  } else if (smth.classList.contains('popup_add-place')) {
  //функция сохранения карточки
  addCard ();
  }
  closeForm(smth);
}

//редактирование профиля
editUser.addEventListener('click', function(evt) {
  getName();
  openClose(evt);
});

//добавление картинки
newCard.addEventListener('click', function(evt) {
  openClose(evt);
});



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//formElement.addEventListener('submit', formSubmitHandler);

