// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible',
// });

// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form-container');
const formInput = formElement.querySelector('.popup__form-item-field');

console.log(formInput.id); // "name-input"

const formError = formElement.querySelector(`#${formInput.id}-error`);

console.log(formError.textContent);

// // Слушатель события input
// formInput.addEventListener('input', function (evt) {
//   // Выведем в консоль значение свойства validity.valid поля ввода,
//   // на котором слушаем событие input
//   console.log(evt.target.validity.valid);
// });

// Функция, которая добавляет класс с ошибкой
// Передадим текст ошибки вторым параметром
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
// Функция isValid теперь принимает formElement и inputElement,
// а не берёт их из внешней области видимости

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
};

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__save-button_inactiv');
    //buttonElement.setAttribute('disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__save-button_inactiv');
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-item-field'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// formElement.addEventListener('submit', function (evt) {
//   // Отменим стандартное поведение по сабмиту
//   evt.preventDefault();
// });

// // Вызовем функцию isValid на каждый ввод символа
// formInput.addEventListener('input', isValid);

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form-container'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    //     const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-item'));

    //     fieldsetList.forEach((fieldSet) => {
    //       setEventListeners(fieldSet);
    //     });
    //   });
    // };                                             тут не разобралась 6.4/4

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

// // Функция принимает массив полей
// const hasInvalidInput = (inputList) => {
//   // проходим по этому массиву методом some
//   return inputList.some((inputElement) => {
//     // Если поле не валидно, колбэк вернёт true
//     // Обход массива прекратится и вся фунцкция
//     // hasInvalidInput вернёт true

//     return !inputElement.validity.valid;
//   });
// };

// // Функция принимает массив полей ввода
// // и элемент кнопки, состояние которой нужно менять
// const toggleButtonState = (inputList, buttonElement) => {
//   // Если есть хотя бы один невалидный инпут
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.classList.add('form__submit_inactive');
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.classList.remove('form__submit_inactive');
//   }
// };
