const popup = document.querySelector('.popup');
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
 //if ((evt.target === editUser) || (evt.target === newCard) || (evt.target === changeMyMind) || (evt.target === saveButton)) {
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
    elements.append(element);
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
}

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

//testProfileListener.addEventListener('click', function(evt) {
//  openClose(evt);
//});

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

