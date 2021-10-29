import { openPopup, closePopup, makeButtonDisabled } from "../components/utils.js";
import { addCard, linkInput } from './Card.js';
import { profileInfoChanging, newCard, avatarRefreshing } from './Api.js';
import { objectForm } from "./validate.js";


const buttonEdit = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupUserForm = document.querySelector('#edit-popup');
const popupPlaceForm = document.querySelector('#create-popup');
const popupList = document.querySelectorAll('.popup');
const userForm = document.querySelector('.popup__user-info');
const placeForm = document.querySelector('.popup__place-info');
const nameInput = document.querySelector('.popup__user-name');
const userName = document.querySelector('.profile__name');
const userWork = document.querySelector('.profile__work-place');
const jobInput = document.querySelector('.popup__user-work');
const placeInput = document.querySelector('.popup__place-name');
const gallery = document.querySelector('.elements');
const elementsContainer = gallery.querySelector('.elements__gallery');
const createButton = document.querySelector('#create-button');
const linkChangingPopup = document.querySelector('#link-for-avatar');
const userAvatar = document.querySelector('.profile__avatar');
const avatarConteiner = document.querySelector('.profile__avatar-conteiner');
const linkSaveForm = document.querySelector('.popup__link-info');
const avatarLinkInput = document.querySelector('.popup__avatar-link');
const userInfoButton = document.querySelector('.popup__save-button');
const avatarFormButton = document.querySelector('.popup__link-post-button');

///функция сохранения ссылки на аватар
function handleLinkFormSubmit(evt) {
    evt.preventDefault();
    loadingDisplaing(true, avatarFormButton);
    avatarRefreshing(avatarLinkInput.value)
        .then(res => {
            userAvatar.setAttribute('src', res.avatar);
            closePopup(linkChangingPopup);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(function() {
            loadingDisplaing(false, avatarFormButton);
        })

}
///слушатель на форму отправки ссылки аватара
linkSaveForm.addEventListener('submit', handleLinkFormSubmit);



//открытие попапа профиля
buttonEdit.addEventListener('click', () => {
    nameInput.value = userName.textContent;
    jobInput.value = userWork.textContent;
    openPopup(popupUserForm);
});

//открытие попапа для добавления карточек
addButton.addEventListener('click', function() {
    openPopup(popupPlaceForm);
    makeButtonDisabled(createButton, objectForm);
});

///открытие попапа для изменения ссылки аватара
avatarConteiner.addEventListener('click', function() {
    openPopup(linkChangingPopup);
});



/// наложения слушателя на оверлей
function closePopupByClickOverlay() {
    popupList.forEach(item => {
        item.addEventListener('click', function(evt) {
            if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
                closePopup(evt.currentTarget);
            }
        });
    })
}
///функция визуализации загрузки
function loadingDisplaing(isLoading, someElement) {
    if (isLoading) {
        someElement.textContent = 'Сохранение...';
    } else {
        someElement.textContent = 'Сохранить';
    }
}

//функция для внесения информации в профиль
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    loadingDisplaing(true, userInfoButton);
    profileInfoChanging(nameInput, jobInput)
        .then(res => {
            console.log(res);
            userName.textContent = nameInput.value;
            userWork.textContent = jobInput.value;
            closePopup(popupUserForm);

        })
        .catch(err => {
            console.log(err);
        })
        .finally(function() {
            loadingDisplaing(false, userInfoButton);
        })


}
//закрытие попап и сохранение информации на странице
userForm.addEventListener('submit', handleProfileFormSubmit);
//функция для сохранения карточек на странице
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    loadingDisplaing(true, createButton);
    newCard(placeInput, linkInput)
        .then(res => {

            addCard(res, elementsContainer);
            closePopup(popupPlaceForm);
            placeForm.reset();
        })
        .catch(err => {
            console.log(err);
        })
        .finally(function() {
            loadingDisplaing(false, createButton);

        })

}
//закрытие попап и сохранение карточки
placeForm.addEventListener('submit', handleCardFormSubmit);

export { closePopupByClickOverlay, popupList, gallery, elementsContainer, userName, userWork, userAvatar };
