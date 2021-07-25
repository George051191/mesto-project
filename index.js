let buttonEdit = document.querySelector('.profile__edit-button');
let popupUserForm = document.querySelector('.popup');
let buttonPopupClose = document.querySelector('.popup__close');
let userForm = document.querySelector('.popup__user-info');
let userName = document.querySelector('.profile__name');
let userWork = document.querySelector('.profile__work-place');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-work');

function popupOpen() {
    popupUserForm.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userWork.textContent;
}

function popupClose() {
    popupUserForm.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', popupOpen);
buttonPopupClose.addEventListener('click', popupClose);

function formSubmitHandler(evt) {

    evt.preventDefault();
    userName.textContent = nameInput.value;
    userWork.textContent = jobInput.value;
    popupClose();
}
userForm.addEventListener('submit', formSubmitHandler);
