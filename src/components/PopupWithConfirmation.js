import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor({ selector, buttonSelector }) {
        super(selector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._buttonSubmit = this._popupElement.querySelector(buttonSelector);
    }

    setSubmitAction(deleteCardCallBack) {
        this._deleteCardCallBack = deleteCardCallBack;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSubmit.addEventListener("click", () => {
            this._deleteCardCallBack();
        });
    }
}
