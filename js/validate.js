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

function handleInput(evt, errCls, errBrd) {
  const input = evt.target;
  const error = document.querySelector(`#${input.id}-error`);

  if (input.checkValidity()) {
    input.classList.remove(errCls);
    error.textContent = '';
    input.classList.remove(errBrd);
  } else {
    input.classList.add(errCls);
    error.textContent = input.validationMessage;
    input.classList.add(errBrd);

    if (error.textContent.length > 40) {
      error.style.fontSize = '8px';
    } else {
      error.style.fontSize = '12px';
    }
  }
}

function makeClear(options) {
  const clean = Array.from(document.querySelectorAll(options.inputSelector));
  clean.forEach((item) => {
    item.classList.remove(options.inputErrorClass);
    const error = document.querySelector(`#${item.id}-error`);
    error.textContent = '';
    item.classList.remove(options.errorClass);
  });
}
