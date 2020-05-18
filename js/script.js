const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const popupProfileName = document.querySelector('.popup__form-item-field_name');
const profileVocation = document.querySelector('.profile__vocation');
const popupProfileVocation = document.querySelector('.popup__form-item-field_vocation');
const formElement = document.querySelector('.popup__form-container');


function popupVisible () {
  popup.classList.add('popup_opened');  
}

function popupUnseen () {
  popup.classList.remove('popup_opened');  
}


function getName () {
  popupProfileName.value = profileName.textContent;  
  popupProfileVocation.value = profileVocation.textContent;
  popupVisible();
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
  popupUnseen();
}

document.querySelector('.popup__close-button').addEventListener('click', popupUnseen);
document.querySelector('.profile__edit-button').addEventListener('click', getName);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

