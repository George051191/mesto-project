import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(src, name) {
    this._popupElement.querySelector(".popup__image").src = src;
    this._popupElement.querySelector(".popup__image").alt = name;
    this._popupElement.querySelector(".popup__underline").innerText = name;

    super.open();
  }
}
