const popup = document.querySelector('.popup'); 
const profileName = document.querySelector('.profile__name'); 
const popupProfileName = document.querySelector('.popup__form-item-field_name'); 
const profileVocation = document.querySelector('.profile__vocation'); 
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation'); 
const formElement = document.querySelector('.popup__form-container'); 
const editUser = document.querySelector('.profile__edit-button'); 
const changeMyMind = document.querySelector('.popup__close-button'); //изменить на closeButton

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

const elements = document.querySelector('.elements');

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

const creatCardPicture = document.querySelector('.popup__form-item-field_link');
const creatCardPlace = document.querySelector('.popup__form-item-field_place');

function addCard (){
  const elementTemplate = document.querySelector('.element_template').content;
  const element = elementTemplate.cloneNode(true);
  elements.prepend(element);
  const newCardPicture = document.querySelector('.element__picture');
  const newCardPlace = document.querySelector('.element__place');
  newCardPicture.src = creatCardPicture.value;
  newCardPlace.textContent = creatCardPlace.value;  
}


//function getName () { 
  //popupProfileName.value = profileName.textContent;   
  //popupProfileVocation.value = profileVocation.textContent;   
//} 
 
function openClose () { //глагол + к чему относится
  if (popup.classList.contains('popup_opened')) {  
    popup.classList.remove('popup_opened'); 
  } else { 
    popup.classList.add('popup_opened'); 
    //getName (); 
    //addCard ()
  } 
} 







// Обработчик «отправки» формы, хотя пока 
// она никуда отправляться не будет 
function formSubmitHandler (evt) { 
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
                                              // Так мы можем определить свою логику отправки. 
                                              // О том, как это делать, расскажем позже. 
 
  // Получите значение полей из свойства value 
  //const newName = popupProfileName.value; 
  //const newJob = popupProfileVocation.value;
  const newName = creatCardPlace.value; 
  const newJob = creatCardPicture.value;
  
  // Вставьте новые значения с помощью textContent 
  //profileVocation.textContent = newJob; 
  //profileName.textContent = newName;
  addCard(); 
  openClose(); 
} 
 
changeMyMind.addEventListener('click', openClose); 
editUser.addEventListener('click', openClose); 
 
// Прикрепляем обработчик к форме: 
// он будет следить за событием “submit” - «отправка» 
formElement.addEventListener('submit', formSubmitHandler); 