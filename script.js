document.querySelector('.popup__closeButton').addEventListener('click', function() {
  let finish = document.querySelector('.popup');
  finish.classList.remove('popup_opened');

  })

document.querySelector('.profile__editButton').addEventListener('click', function() {
  let start = document.querySelector('.popup');
  start.classList.add('popup_opened');
  const profileName = document.querySelector('.profile__name');
  let popupProfileName = document.querySelector('.popup__nameField');
  popupProfileName.value = profileName.textContent;

  const profileVocation = document.querySelector('.profile__vocation');
  let popupProfileVocation = document.querySelector('.popup__vocationField');
  popupProfileVocation.value = profileVocation.textContent;
  
  })

  // Находим форму в DOM
let formElement = document.querySelector('.popup__form-container');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    const nameInput = document.querySelector('.popup__nameField');
    const jobInput = document.querySelector('.popup__vocationField');

    // Получите значение полей из свойства value
    const newName = nameInput.value;
    const newJob = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileVocation = document.querySelector('.profile__vocation');
    // Вставьте новые значения с помощью textContent
    profileVocation.textContent = newJob;
    profileName.textContent = newName;

    let finish = document.querySelector('.popup');
    finish.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener ("keypress", function (e) {
  if (e.keyCode === 13); 
  formSubmitHandler;
});
