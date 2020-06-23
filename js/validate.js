// const obj = {
//   formSelector: '.popup__form-container',
//   inputSelector: '.popup__form-item-field',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_inactiv',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__form-item-field_error',
// };

class FormValidator {
  constructor(data, formName) {
    // Конструктор с массивом селекторов и элементом конкретной формы
    this._formSelector = formName;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    // this._button = this._form.querySelector(data.submitButtonSelector);
  }

  _handleFormInput() {
    // включаем / выключаем кнопку в зависимости от валидности формы
    console.log(typeof this._inputSelector);
    const hasErrors = !this._inputSelector.checkValidity();
    this._submitButtonSelector.disabled = hasErrors;
    // если второй аргумент true -- добавляем, если false -- удаляем класс
    submitButton.classList.toggle(inactiveButtonClass, hasErrors);
  }

  enableValidation() {
    // находим в форме все поля ввода
    const inputElements = Array.from(this._formSelector.querySelectorAll(this._inputSelector));

    inputElements.forEach((input) => {
      // в каждом проверяем валидность
      input.addEventListener('input', (e) => this._handleInput(e, this._inputErrorClass, this._errorClass));
    });
    this._handleFormInput();
    this._formSelector.addEventListener('input', () => this._handleFormInput());
  }

  // _isValid(input, errorText, errorBorder) {
  //   const error = document.querySelector(`#${input.id}-error`);
  //   input.classList.remove(errorText);
  //   error.textContent = '';
  //   input.classList.remove(errorBorder);
  // }

  // _notValid(input, errorText, errorBorder) {
  //   const error = document.querySelector(`#${input.id}-error`);
  //   input.classList.add(errorText);
  //   error.textContent = input.validationMessage;
  //   input.classList.add(errorBorder);
  // }

  // _handleInput(evt, errorText, errorBorder) {
  //   const input = evt.target;
  //   if (input.checkValidity()) {
  //     _isValid(input, errorText, errorBorder);
  //   } else {
  //     _notValid(input, errorText, errorBorder);
  //   }
  // }
}

// function handleFormInput(formElement, submitButton, inactiveButtonClass) {
//   // включаем / выключаем кнопку в зависимости от валидности формы
//   const hasErrors = !formElement.checkValidity();
//   submitButton.disabled = hasErrors;
//   submitButton.classList.toggle(
//     inactiveButtonClass,
//     // если второй аргумент true -- добавляем, если false -- удаляем класс
//     hasErrors
//   );
// }

// function isValid(input, errorText, errorBorder) {
//   const error = document.querySelector(`#${input.id}-error`);
//   input.classList.remove(errorText);
//   error.textContent = '';
//   input.classList.remove(errorBorder);
// }

// function notValid(input, errorText, errorBorder) {
//   const error = document.querySelector(`#${input.id}-error`);
//   input.classList.add(errorText);
//   error.textContent = input.validationMessage;
//   input.classList.add(errorBorder);
// }

// function handleInput(evt, errorText, errorBorder) {
//   const input = evt.target;
//   if (input.checkValidity()) {
//     isValid(input, errorText, errorBorder);
//   } else {
//     notValid(input, errorText, errorBorder);
//   }

// function enableValidation(options) {
//   const formElements = Array.from(document.querySelectorAll(options.formSelector));
//   formElements.forEach((formElement) => {
//     const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
//     const submitButton = formElement.querySelector('.popup__save-button');
//     inputElements.forEach((input) => {
//       input.addEventListener('input', (e) => handleInput(e, options.inputErrorClass, options.errorClass));
//     });
//     handleFormInput(formElement, submitButton, options.inactiveButtonClass);
//     formElement.addEventListener('input', () =>
//       handleFormInput(formElement, submitButton, options.inactiveButtonClass)
//     );
//   });
// }

function makeClear(options) {
  const cleanList = Array.from(document.querySelectorAll(options.inputSelector));
  cleanList.forEach((item) => {
    item.classList.remove(options.inputErrorClass);
    const error = document.querySelector(`#${item.id}-error`);
    error.textContent = '';
    item.classList.remove(options.errorClass);
  });
}
