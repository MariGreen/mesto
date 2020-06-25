class FormValidator {
  constructor(data, formName) {
    // Конструктор с массивом селекторов и элементом конкретной формы
    this._formSelector = formName;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._button = this._formSelector.querySelector(data.submitButtonSelector);
  }

  _handleFormInput() {
    // включаем / выключаем кнопку в зависимости от валидности формы
    const validForm = this._formSelector.querySelector('.popup__form-container');
    const hasErrors = !validForm.checkValidity();
    this._button.disabled = hasErrors;
    // если второй аргумент true -- добавляем, если false -- удаляем класс
    this._button.classList.toggle(this._inactiveButtonClass, hasErrors);
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

  _isValid(input, errorText, errorBorder) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.remove(errorText);
    error.textContent = '';
    input.classList.remove(errorBorder);
  }

  _notValid(input, errorText, errorBorder) {
    const error = document.querySelector(`#${input.id}-error`);
    input.classList.add(errorText);
    error.textContent = input.validationMessage;
    input.classList.add(errorBorder);
  }

  _handleInput(evt, errorText, errorBorder) {
    const input = evt.target;
    if (input.checkValidity()) {
      this._isValid(input, errorText, errorBorder);
    } else {
      this._notValid(input, errorText, errorBorder);
    }
  }
  makeClear() {
    const cleanList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    cleanList.forEach((item) => {
      item.classList.remove(this._inputErrorClass);
      const error = document.querySelector(`#${item.id}-error`);
      error.textContent = '';
      item.classList.remove(this._errorClass);
    });
  }
}
