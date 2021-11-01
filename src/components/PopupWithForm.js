import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor({ selector, buttonSelector, handleFormSubmit }) {
        super(selector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
        this._buttonElement = document.querySelector(buttonSelector);
    }
    _getInputValues() {
        this._inputsArray = this._formElement.querySelectorAll('.popup__input');
        this._inputsValues = {};
        this._inputsArray.forEach((input) => {
            this._inputsValues[input.name] = input.value;
        })
        return this._inputsValues;
    }
    loadingDisplaing(isLoading) {
        if (isLoading) {
            this._buttonElement.textContent = 'Сохранение...';
        } else {
            this._buttonElement.textContent = 'Сохранить';
        }
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());

        })
    }
    closePopup() {
        super.closePopup();
        this._formElement.reset();
    }

}
