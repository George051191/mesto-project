export default class FormValidator {
  constructor(formSetting, formElement) {
    this._inputList = Array.from(
      formElement.querySelectorAll(formSetting.inputSelector)
    );
    this._submitButton = formElement.querySelector(
      formSetting.submitButtonSelector
    );
    this._inactiveButtonClass = formSetting.inactiveButtonClass;
    this.inputErrorClass = formSetting.inputErrorClass;
    this._errorClass = formSetting.errorClass;
    this._formElement = formElement;
  }

  //функция добавления классв ошибки
  _showInputError(input, errorMessage) {
    input.classList.add(this._inputError);
    errorMessage.textContent = input.validationMessage;
  }

  //функция удаления классов ошибки
  _hideInputError(input, errorMessage) {
    input.classList.remove(this._inputError);
    errorMessage.textContent = "";
  }

  //функция определения невалидного инпута
  _isValid(input, errorMessage) {
    if (!input.validity.valid) {
      this._showInputError(input, errorMessage);
    } else {
      this._hideInputError(input, errorMessage);
    }
  }

  /// функция блокировки/разблокировки кнопки
  toggleButtonState() {
      console.log(!this._hasInvalidInput(this._inputList))
    if (!this._hasInvalidInput(this._inputList)) {
        this._submitButton.classList.add(this._inactiveButtonClass);
        this._submitButton.disabled = true;
    } else {
        this._submitButton.classList.remove(this._inactiveButtonClass);
        this._submitButton.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.every(function (input) {
      return input.validity.valid === true;
    });
  } 

  //наложения поиска валидных инпутов на все инпуты
  _checkInputValidity(form) {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      const errorMessage = form.querySelector(`.${input.id}-error`);
      input.addEventListener("input", () => {
        this.toggleButtonState();
        this._isValid(input, errorMessage);
      });
    });
  }

  //наложения слушателя на все формы
  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._checkInputValidity(this._formElement);
  }
}
