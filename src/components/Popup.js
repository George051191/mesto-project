export class Popup {
    constructor(selector) {
            this._popupElement = document.querySelector(selector);

        }
        ///метод открытия попапа
    openPopup() {

        this._popupElement.classList.add('popup_opened');
        // document.addEventListener('keyup', this._handleEscClose);
        this._handleEscClose();
    }

    ///метод закрытия попапов
    closePopup() {
        console.log('lll')
        this._popupElement.classList.remove('popup_opened');
        //document.removeEventListener('keyup', this._handleEscClose);
    }

    ///закрытие попапа нажатием на черный фон
    _closePopupByClickOverlay(evt) {

        if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
            this.closePopup();
        }
    }

    _handleEscClose() {
        document.addEventListener('keyup', (evt) => {
            if (evt.key === 'Escape') {
                this.closePopup();
            }
        })

    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close').addEventListener('click', this.closePopup());
        this._popupElement.addEventListener('click', (evt) => { this._closePopupByClickOverlay(evt) });
    }
}
