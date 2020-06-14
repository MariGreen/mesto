function handleFormInput(formElement, submitButton, inactiveButtonClass) {
  // включаем / выключаем кнопку в зависимости от валидности формы
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(
    inactiveButtonClass,
    // если второй аргумент true -- добавляем, если false -- удаляем класс
    hasErrors
  );
}

function isValid(input, errorText, errorBorder) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.remove(errorText);
  error.textContent = '';
  input.classList.remove(errorBorder);
}

function notValid(input, errorText, errorBorder) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.add(errorText);
  error.textContent = input.validationMessage;
  input.classList.add(errorBorder);
  if (error.textContent.length > 40) {
    error.style.fontSize = '8px';
  } else {
    error.style.fontSize = '12px';
  }
}

function handleInput(evt, errorText, errorBorder) {
  const input = evt.target;
  if (input.checkValidity()) {
    isValid(input, errorText, errorBorder);
  } else {
    notValid(input, errorText, errorBorder);
  }
}

function enableValidation(options) {
  const formElements = Array.from(document.querySelectorAll(options.formSelector));
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector('.popup__save-button');
    inputElements.forEach((input) => {
      input.addEventListener('input', (e) => handleInput(e, options.inputErrorClass, options.errorClass));
    });
    handleFormInput(formElement, submitButton, options.inactiveButtonClass);
    formElement.addEventListener('input', () =>
      handleFormInput(formElement, submitButton, options.inactiveButtonClass)
    );
  });
}

function makeClear(options) {
  const cleanList = Array.from(document.querySelectorAll(options.inputSelector));
  cleanList.forEach((item) => {
    item.classList.remove(options.inputErrorClass);
    const error = document.querySelector(`#${item.id}-error`);
    error.textContent = '';
    item.classList.remove(options.errorClass);
  });
}
