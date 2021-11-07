export class FormValidator {
    constructor(formObject, element) {
        this._inputList = Array.from(document.querySelector(element).querySelectorAll(formObject.inputSelector));
        this._submitButton = document.querySelector(element).querySelector(formObject.submitButtonSelector);
        this._inputSelector = formObject.inputSelector;
        this._submitButtonSelector = formObject.submitButtonSelector;
        this._inactiveButtonClass = formObject.inactiveButtonClass;
        this._inputErrorClass = formObject.inputErrorClass;
        this._errorClass = formObject.errorClass;
        this._element = element;
    }

    ///метод добавления класса ошибки
    _showInputError(input, errorMessage) {
        input.classList.add(this._inputErrorClass);
        errorMessage.textContent = input.validationMessage;
    }

    ///метод удаления класса ошибки
    _hideInputError(input, errorMessage) {
        input.classList.remove(this._inputErrorClass);
        errorMessage.textContent = '';

    }

    ///метод оперделения невалидного поля
    _isValid(input, errorMessage) {
        if (!input.validity.valid) {
            this._showInputError(input, errorMessage);
        } else {
            this._hideInputError(input, errorMessage)
        }
    }

    /// поверка на невалидный инпут
    _hasInvalidInput(inputList) {
        return inputList.every(function(input) {
            return input.validity.valid === true;
        })
    }

    /// функция блокировки/разблокировки кнопки
    setButtonState() {
        if (!this._hasInvalidInput(this._inputList)) {
            this._submitButton.classList.add(this._inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    //наложение поиска валидных инпутов на все инпуты формы
    _checkInputValidity(form) {
        const inputList = Array.from(form.querySelectorAll(this._inputSelector));
        const buttonElement = form.querySelector(this._submitButtonSelector);
        this.setButtonState();
        inputList.forEach((input) => {
            const errorMessage = form.querySelector(`.${input.id}-error`);
            input.addEventListener('input', () => {
                this.setButtonState();
                this._isValid(input, errorMessage);
            });
        })
    }

    ///наложения слушателя для валидации инпутов конкретной формы
    enableValidation() {
        const form = document.querySelector(this._element);
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        this._checkInputValidity(form);
    }

}
