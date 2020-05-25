const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');
const formElement = document.querySelector('.popup__form-container');
const editUser = document.querySelector('.profile__edit-button');
const changeMyMind = document.querySelector('.popup__close-button');

const testProfileListener = document.querySelector('.profile');

  //const popupProfilePlace = document.querySelector('.popup__form-item-field_place');
  //const popupProfileLink = document.querySelector('.popup__form-item-field_link');
  const popupHeader = document.querySelector('.popup__edit-profile');
  const saveButton = document.querySelector('.popup__save-button');

  const newCard = document.querySelector('.profile__add-button');
  

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

function getName (evt) {
  
  if (evt.target === editUser) {
    console.log('yey');
    popupProfileName.value = profileName.textContent;
    popupProfileName.placeholder = 'Имя';  
    popupProfileVocation.value = profileVocation.textContent;
    popupProfileVocation.placeholder = 'О себе';
    popupHeader.textContent = 'Редактировать профиль';
    saveButton.textContent = 'Сохранить';
  }
   else if (evt.target === newCard) {
    popupProfileName.value = '';
    popupProfileName.placeholder = 'Название';  
    popupProfileVocation.value = '';
    popupProfileVocation.placeholder = 'Ссылка';
    popupHeader.textContent = 'Новое место';
    saveButton.textContent = 'Создать';
   }
    else {
      console.log('nope');
    }
  

}

    function addCard () {

    }

function openClose (evt) {
  if ((evt.target === editUser) || (evt.target === newCard) || (evt.target === changeMyMind) || (evt.target === saveButton)) {
    if (popup.classList.contains('popup_opened')) { 
      popup.classList.remove('popup_opened');
    } else {
      popup.classList.add('popup_opened');
      getName (evt);
    }
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей из свойства value
  const newName = popupProfileName.value;
  const newJob = popupProfileVocation.value;
  // Вставьте новые значения с помощью textContent
  profileVocation.textContent = newJob;
  profileName.textContent = newName;
  openClose(evt);
}

changeMyMind.addEventListener('click', openClose);
testProfileListener.addEventListener('click', function(evt) {
  openClose(evt);
});

//editUser.addEventListener('click', function(evt) {
//  openClose(evt);
//});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

