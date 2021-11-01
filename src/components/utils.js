/*/// поверка на невалидный инпут
function hasInvalidInput(inputList) {
    return inputList.every(function(input) {
        return input.validity.valid === true;

    })
}
///блокировка кнопки
function makeButtonDisabled(buttonElement, obj) {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
}
/// функция блокировки/разблокировки кнопки
function setButtonState(inputList, obj, buttonElement) {
    if (!hasInvalidInput(inputList)) {
        makeButtonDisabled(buttonElement, obj);

    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', false);

    }
*/
/*
/// добавления слушателя для Esc
const closePopupByEsc = function(evt) {
    if (evt.key === 'Escape') {
        const currentOpenPopup = document.querySelector('.popup_opened');
        closePopup(currentOpenPopup);
    }
};

//общая функция для открытия всех попап
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupByEsc);
}
//общая функция закрытия всех попап
function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupByEsc);
}



export { openPopup, closePopup, };
*/
