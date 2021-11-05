import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._buttonSubmit = this._popupElement.querySelector(".popup__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", (e) => {
      this._handleFormSubmit(e);
    });
  }

  close() {
    super.close();
  }

  open(cardId) {
    super.open();
    this._buttonSubmit.setAttribute('id', cardId);
  }
}
