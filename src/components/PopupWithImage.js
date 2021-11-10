import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }
    openPopup(src, name) {
        super.openPopup();
        this._popupElement.querySelector(".popup__image").setAttribute("src", src);
        this._popupElement.querySelector(".popup__image").setAttribute("alt", name);
        this._popupElement.querySelector(".popup__underline").textContent = name;
    }
}
