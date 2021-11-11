export class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
    }

    ///метод открытия попапа
    openPopup() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keyup", this._handleEscClose);
    }

    ///метод закрытия попапов
    closePopup() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keyup", this._handleEscClose);
    }

    ///закрытие попапа нажатием на черный фон
    _closePopupByClickOverlay(evt) {
        if (
            evt.target.classList.contains("popup__close") ||
            evt.target.classList.contains("popup")
        ) {
            this.closePopup();
        }
    }

    ///метод наложения слушателя для закрытия через escape
    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    };

    setEventListeners() {
        this._popupElement.addEventListener("mousedown", (evt) => {
            this._closePopupByClickOverlay(evt);
        });
    }
}
