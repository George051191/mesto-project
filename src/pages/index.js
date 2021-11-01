import './index.css';
import { FormValidator } from '../components/FormValidator.js'

import { /* addCard*/ Card, clickDeleteButton } from '../components/Card.js';
import { getInitialCards, userInfo, likeAdding, likeRemoving, Api } from '../components/Api.js';
import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
export let userId = '';

const avatarConteiner = document.querySelector('.profile__avatar-conteiner');
const confirmButton = document.querySelector('.popup__confirm-button');
const buttonEdit = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const userName = document.querySelector('.profile__name');
const userWork = document.querySelector('.profile__work-place');
const UserDataForm = document.querySelector('.popup__user-info');
const cardDataForm = document.querySelector('.popup__place-info');
const linkDataForm = document.querySelector('.popup__link-info');
///создаем экземпляр класса для попапа с картинкой и вызываем все его слушатели
const popupWithImage = new PopupWithImage('#open-image');
popupWithImage.setEventListeners();

///создаем экземпляр класса для попапа с изменением аватарки
const popupLinkAvatar = new PopupWithForm({
    selector: '#link-for-avatar',
    buttonSelector: '.popup__link-post-button',
    handleFormSubmit: (objectInput) => {
        popupLinkAvatar.loadingDisplaing(true);
        api.avatarRefreshing(objectInput.linkname)
            .then((res) => {
                document.querySelector('.profile__avatar').setAttribute('src', res.avatar);
                popupLinkAvatar.loadingDisplaing(false);
                popupLinkAvatar.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
popupLinkAvatar.setEventListeners(linkDataForm);
avatarConteiner.addEventListener('click', () => {
        popupLinkAvatar.openPopup();
    })
    ///создаем экземпляр класса для попапа создания новой карточки
const imageDataPopup = new PopupWithForm({
    selector: '#create-popup',
    buttonSelector: '.popup__create-button',
    handleFormSubmit: (objectInput) => {
        imageDataPopup.loadingDisplaing(true);
        api.newCard(objectInput.placename, objectInput.placelink)
            .then((res) => {
                const userCard = createCard(res);
                document.querySelector('.elements__gallery').prepend(userCard);
                imageDataPopup.closePopup();
                imageDataPopup.loadingDisplaing(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
imageDataPopup.setEventListeners(cardDataForm);
addButton.addEventListener('click', () => {
    imageDataPopup.openPopup();
})

///создаем экземпляр класса для попапа с инфо
const userDataPopup = new PopupWithForm({
    selector: '#edit-popup',
    buttonSelector: '.popup__save-button',
    handleFormSubmit: (objectInput) => {
        userDataPopup.loadingDisplaing(true);
        api.profileInfoChanging(objectInput.username, objectInput.userwork)
            .then((res) => {
                userName.textContent = res.name;
                userWork.textContent = res.about;
                userDataPopup.closePopup();
                userDataPopup.loadingDisplaing(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
userDataPopup.setEventListeners(UserDataForm);
buttonEdit.addEventListener('click', () => {
    userDataPopup.openPopup();
})

///экземпляр класса для попапа подтверждения удаления картинки
const confirmPopup = new PopupWithForm({
    selector: '#delete-card',
    buttonSelector: '.popup__confirm-button',
    handleFormSubmit: (evt) => {
        api.cardRemoving(evt.target.id)
            .then(() => {
                document.getElementById(evt.target.id).closest('.element').remove();
                confirmPopup.closePopup();
            })
    }
})
confirmPopup.setEventListeners(confirmButton);

const objectForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

///запускаем валидацию формы userInfo
const userFormValidation = new FormValidator(objectForm, '.popup__user-info');
userFormValidation.enableValidation();

///запускаем валидацию формы place__info
const placeFormValidation = new FormValidator(objectForm, '.popup__place-info');
placeFormValidation.enableValidation();

//запускаем валидацию формы popup__link-info
const linkFormValidation = new FormValidator(objectForm, '.popup__link-info');
linkFormValidation.enableValidation();

/**
 * экземпляр класса Api
 */
const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
    headers: {
        authorization: '44636783-74cb-4589-8742-e9314e17f901',
        'Content-Type': 'application/json'
    }
})

api.userInfo()
    .then((res) => {
        userName.textContent = res.name;
        userWork.textContent = res.about;
        userId = res._id;
    })
    .catch((err) => {
        console.log(err);
    })

///функция создания карточки
const createCard = (cardData) => {
        const card = new Card({
            data: cardData,
            handleCardClick: (evt) => {
                popupWithImage.openPopup(evt.target.src, evt.target.alt);
            },
            handleLikeClick: (evt) => {
                if (!evt.target.classList.contains('element__group_active')) {
                    api.likeAdding(cardData._id)
                        .then((res) => {
                            card.updateLikesView(res, evt);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    api.likeRemoving(cardData._id)
                        .then((res) => {
                            card.updateLikesView(res, evt);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            },
            handleDeleteIconClick: () => {
                confirmPopup.openPopup();
                confirmButton.setAttribute('id', cardData._id);
            }
        }, '#card');

        return card.generate();
    }
    ///////////////////
    /*const cardArray = [{
        likes: [{
            name: "Geo",
            about: "TransserferforForLIfe",
            avatar: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
            _id: "796f13e264ff2e7b6cb3cdf1",
            cohort: "plus-cohort-2",
        }, ],
        _id: "61798da892d51f0012c230d6",
        name: "Local Test ARRAY",
        link: "https://sevenbuy.ru/wp-content/uploads/1/f/c/1fc498d6301d185ed5041787fc789354.jpeg",
        owner: {
            name: "Даррелл",
            about: "Любитель животных",
            avatar: "https://upload.wikimedia.org/wikipedia/ru/thumb/0/03/Gerald_Durrell_in_Russia_1986.jpg/200px-Gerald_Durrell_in_Russia_1986.jpg",
            _id: "b83992c0161886588f5668dc",
            cohort: "plus-cohort-2",
        },
        createdAt: "2021-10-27T17:34:32.299Z",
    }, ];*/
    /////////////////////////////////
    ///начальная загрузка всех данных с сервера
function loadData() {
    api.getInitialCards()
        .then((res) => {
            const cardGallery = new Section({
                items: res,
                renderer: (item) => {

                    cardGallery.addItem(createCard(item));

                }
            }, '.elements__gallery')


            cardGallery.renderItems();
        })
}
loadData();












/*
///загрузка данных о пользователе и о карточках
const loadData = () => {
    Promise.all([userInfo(), getInitialCards()])
        .then(res => {
            userAvatar.setAttribute('src', res[0].avatar);
            userName.textContent = res[0].name;
            userWork.textContent = res[0].about;
            userId = res[0]._id;
            res[1].forEach(object => {
                addCard(object, elementsContainer);
            })
        })
        .catch(err => {
            console.log(err);
        })
}
*/
