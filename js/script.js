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




function profileTemlate () {
  popupProfileName.placeholder = 'Имя';  
  popupProfileVocation.placeholder = 'О себе';
  popupHeader.textContent = 'Редактировать профиль';
  saveButton.textContent = 'Сохранить';
}

function cardTemlate () {
  popupProfileName.value = '';
  popupProfileName.placeholder = 'Название';  
  popupProfileVocation.value = '';
  popupProfileVocation.placeholder = 'Ссылка';
  popupHeader.textContent = 'Новое место';
  saveButton.textContent = 'Создать';
}

function openClose (evt) {
 //console.log(popup.classList);
    if (popup.classList.contains('popup_opened')) { 
      popup.classList.remove('popup_opened');
    } else {
      if (evt.target.classList.contains('profile__edit-button')) {
      // заполняем попап шаблоном профиля
      profileTemlate (); 
      } else if (evt.target.classList.contains('profile__add-button')) {
        // заполняем попап шаблоном карточки
        cardTemlate ();
      }      
      popup.classList.add('popup_opened');
    }
  }

function closeImage(){
  //console.log(popupPreview.classList);  
  popupPreview.classList.remove('popup__preview_opened');
    
  }
  
function saveProfile () {
  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
    // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
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
    console.log(elementPicture.alt);
  })
}
render ();



function addCard () {
  const elementTemplate = document.querySelector('.element_template').content;
  const element = elementTemplate.cloneNode(true);
  elements.prepend(element);
  const newCardPicture = document.querySelector('.element__picture');
  const newCardPlace = document.querySelector('.element__place');
  newCardPicture.src = popupProfileVocation.value;
  newCardPlace.textContent = popupProfileName.value;
  newCardPicture.alt = popupProfileName.value;
  
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
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

  // смотрим какой попап открыт

  if (popupHeader.textContent === 'Редактировать профиль') {
  //функция сохранения профиля
  saveProfile ();

  } else if (popupHeader.textContent === 'Новое место') {
  //функция сохранения карточки
  addCard ();
  }
  openClose (evt);  
  
}

closeButton.addEventListener('click', openClose);



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
formElement.addEventListener('submit', formSubmitHandler);

