import { setButtonState } from '../components/utils.js';
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