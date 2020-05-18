const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');
const formElement = document.querySelector('.popup__form-container');
const editUser = document.querySelector('.profile__edit-button');
const changeMyMind = document.querySelector('.popup__close-button');

function getName () {
  popupProfileName.value = profileName.textContent;  
  popupProfileVocation.value = profileVocation.textContent;  
}

function openClose () {
  if (popup.classList.contains('popup_opened')) { 
    popup.classList.remove('popup_opened');
  } else {
    popup.classList.add('popup_opened');
    getName ();
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
  openClose();
}

changeMyMind.addEventListener('click', openClose);
editUser.addEventListener('click', openClose);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

