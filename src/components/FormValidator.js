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
  setButtonState(inputList, buttonElement) {
    if (!this._hasInvalidInput(inputList)) {
      this._makeButtonDisabled(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.every(function (input) {
      return input.validity.valid === true;
    });
  }
  ///блокировка кнопки
  _makeButtonDisabled(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }

  //наложения поиска валидных инпутов на все инпуты
  _checkInputValidity(form) {
    this.setButtonState(this._inputList, this._submitButton);
    this._inputList.forEach((input) => {
      const errorMessage = form.querySelector(`.${input.id}-error`);
      console.log(errorMessage);
      input.addEventListener("input", () => {
        this.setButtonState(this._inputList, this._submitButton);
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