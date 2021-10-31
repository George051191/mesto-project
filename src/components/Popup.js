export default class Popup {
  constructor(selector) {
    this._popupElement = document.querySelector(selector);
    console.log(this._popupElement);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    console.log(e);
    if (e.key === "Escape") {
      this.close();
    }
  };

  _closePopupOnClickOverlay = (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__close")
    ) {
      this.close();
    }
  };

  setEventListeners() {
    console.log("asd");
    document.addEventListener("keyup", this._handleEscClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._closePopupOnClickOverlay
    );
  }
}
