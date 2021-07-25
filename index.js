let buttonEdit = document.querySelector('.profile__edit-button');
let popupUserForm = document.querySelector('.popup');
let buttonPopupClose = document.querySelector('.popup__close');

function popupOpen() {
    popupUserForm.classList.add('popup_opened');
}

function popupClose() {
    popupUserForm.classList.remove('popup_opened');
}



buttonEdit.addEventListener('click', popupOpen);
buttonPopupClose.addEventListener('click', popupClose);
