const formContainer = document.querySelector('.popup__form-container');
const formInput = formContainer.querySelector('.popup__form-item-field_name');
console.log(formInput.id); // "email-input"
// Выбираем элемент ошибки на основе id//
//const formError = formContainer.querySelector(`#${formInput.id}-error`);

const formError = formContainer.querySelector('#email-input-error');
// formInput.addEventListener('input', function (evt) {
//   console.log(evt.target.validity.valid); // выведите validity в консоль
//   //console.log(evt.target.validationMessage);
// });

console.log(formError);
console.log(formError.textContent);

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.classList.add('popup__form-item-field_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('popup__form-item-field_error');
  // Скрываем сообщение об ошибке
  formError.classList.remove('form__input-error_active');
  // Очистим ошибку
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};

formContainer.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);
