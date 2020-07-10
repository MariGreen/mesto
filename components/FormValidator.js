class FormValidator {
  constructor(data, formName) {
    // Конструктор с массивом селекторов и элементом конкретной формы
    this._formName = formName;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._button = this._formName.querySelector(data.submitButtonSelector);
  }

  _handleFormInput() {
    // включаем / выключаем кнопку в зависимости от валидности формы
    const validForm = this._formName.querySelector(this._formSelector);
    const hasErrors = !validForm.checkValidity();
    this._button.disabled = hasErrors;

    // если второй аргумент true -- добавляем, если false -- удаляем класс
    this._button.classList.toggle(this._inactiveButtonClass, hasErrors);
  }

  enableValidation() {
    // находим в форме все поля ввода
    const inputElements = Array.from(this._formName.querySelectorAll(this._inputSelector));

    inputElements.forEach((input) => {
      // в каждом проверяем валидность
      input.addEventListener('input', (e) => this._handleInput(e, this._inputErrorClass, this._errorClass));
    });
    this._handleFormInput();
    this._formName.addEventListener('input', () => this._handleFormInput());
  }

  _hideErrors(input, errorText, errorBorder) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(errorText);
    error.textContent = '';
    input.classList.remove(errorBorder);
  }

  _showErrors(input, errorText, errorBorder) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(errorText);
    error.textContent = input.validationMessage;
    input.classList.add(errorBorder);
  }

  _handleInput(evt, errorText, errorBorder) {
    const input = evt.target;
    if (input.checkValidity()) {
      this._hideErrors(input, errorText, errorBorder);
    } else {
      this._showErrors(input, errorText, errorBorder);
    }
  }
  makeClear() {
    const cleanList = Array.from(this._formName.querySelectorAll(this._inputSelector));
    cleanList.forEach((item) => {
      this._hideErrors(item, this._inputErrorClass, this._errorClass);
    });
    this._handleFormInput();
  }
}

export { FormValidator };
