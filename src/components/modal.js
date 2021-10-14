import { openPopup, closePopup } from "../components/utils.js";
import { addCard, linkInput } from '../components/card.js';
import { profileInfoChanging, newCard, avatarRefreshing } from '../components/api.js';

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


///функция сохранения ссылки на аватар
function handleLinkFormSubmit(evt) {
    evt.preventDefault();
    avatarRefreshing(avatarLinkInput.value)
        .then(res => {
            userAvatar.setAttribute('src', res.avatar);
        })
        .catch(err => {
            console.log(err);
        })
    closePopup(linkChangingPopup);
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
    createButton.classList.add('popup__button_disabled');
    createButton.setAttribute('disabled', true);
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
//функция для внесения информации в профиль
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileInfoChanging(nameInput, jobInput);
    userName.textContent = nameInput.value;
    userWork.textContent = jobInput.value;
    closePopup(popupUserForm);
}
//закрытие попап и сохранение информации на странице
userForm.addEventListener('submit', handleProfileFormSubmit);
//функция для сохранения карточек на странице
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    newCard(placeInput, linkInput)
        .then(res => {
            addCard({
                name: placeInput.value,
                link: linkInput.value,
                likes: res.likes,
                owner: res.owner
            }, elementsContainer);
        })
        .catch(err => {
            console.log(err);
        })
    closePopup(popupPlaceForm);
    placeForm.reset();
}
//закрытие попап и сохранение карточки
placeForm.addEventListener('submit', handleCardFormSubmit);

export { closePopupByClickOverlay, popupList, gallery, elementsContainer, userName, userWork, userAvatar };
