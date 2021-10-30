export class FormValidator {
    constructor(formObject, element) {
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
    _isValid(errorMessage) {
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
        ///блокировка кнопки
    _makeButtonDisabled(buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    }

    /// функция блокировки/разблокировки кнопки
    _setButtonState(inputList, buttonElement) {
            if (!this._hasInvalidInput(inputList)) {
                this._makeButtonDisabled(buttonElement);
            } else {
                buttonElement.classList.remove(this._inactiveButtonClass);
                buttonElement.removeAttribute('disabled', false);
            }
        }
        //наложение поиска валидных инпутов на все инпуты формы
    _checkInputValidity(form) {
            const inputList = Array.from(form.querySelectorAll(this._inputSelector));
            const buttonElement = form.querySelector(this._submitButtonSelector);
            this._setButtonState(inputList, buttonElement);
            inputList.forEach(function(input) {
                const errorMessage = form.querySelector(`.${input.id}-error`);
                input.addEventListener('input', function() {
                    this._setButtonState(inputList, buttonElement);
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














/*

//обьект со значениями классов для элементов формы
const objectForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//функция добавления классв ошибки
function showInputError(obj, input, errorMessage) {
    input.classList.add(obj.inputErrorClass);
    errorMessage.textContent = input.validationMessage;
}
//функция удаления классов ошибки
function hideInputError(obj, input, errorMessage) {
    input.classList.remove(obj.inputErrorClass);
    errorMessage.textContent = '';
}
//функция определения невалидного инпута
function isValid(obj, input, errorMessage) {
    if (!input.validity.valid) {
        showInputError(obj, input, errorMessage);
    } else {
        hideInputError(obj, input, errorMessage)
    }
}
//наложения поиска валидных инпутов на все инпуты
function checkInputValidity(obj, form) {
    const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
    const buttonElement = form.querySelector(obj.submitButtonSelector);
    setButtonState(inputList, obj, buttonElement);
    inputList.forEach(function(input) {
        const errorMessage = form.querySelector(`.${input.id}-error`);
        input.addEventListener('input', function() {
            setButtonState(inputList, obj, buttonElement);
            isValid(obj, input, errorMessage);
        });
    })
}
//наложения слушателя на все формы
function enableValidation(obj) {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach(function(form) {
        form.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        checkInputValidity(obj, form);

    })
}

export { objectForm, enableValidation };
*/
