import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { avatarConteiner, confirmButton, buttonEdit, addButton, UserDataForm, cardDataForm, linkDataForm, nameInput, jobInput, objectForm, profileObject } from '../components/constants.js';

let userId = '';
let cardGallery = null;



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


///экземпляр класса UserInfo
const userData = new UserInfo({
    data: profileObject
})

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
                console.log(res);
                userData.setUserAvatar({ avatar: res.avatar });
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
    linkFormValidation.setButtonState();
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
                cardGallery.addItem(userCard);
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
    placeFormValidation.setButtonState();
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
                userData.setUserInfo({ name: res.name, about: res.about });
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
    nameInput.value = userData.getUserInfo().userName;
    jobInput.value = userData.getUserInfo().userDescription;
    userFormValidation.setButtonState();

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



///запускаем валидацию формы userInfo
const userFormValidation = new FormValidator(objectForm, '.popup__user-info');
userFormValidation.enableValidation();

///запускаем валидацию формы place__info
const placeFormValidation = new FormValidator(objectForm, '.popup__place-info');
placeFormValidation.enableValidation();

//запускаем валидацию формы popup__link-info
const linkFormValidation = new FormValidator(objectForm, '.popup__link-info');
linkFormValidation.enableValidation();


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
    }, '#card', userId);

    return card.generate();
}

///начальная загрузка информации с сервера
const loadData = () => {
    Promise.all([api.userInfo(), api.getInitialCards()])
        .then(([userObject, cardArray]) => {
            userData.setUserInfo({
                name: userObject.name,
                about: userObject.about
            });
            userData.setUserAvatar({ avatar: userObject.avatar })
            userId = userObject._id;
            cardGallery = new Section({
                    items: cardArray,
                    renderer: (item) => {
                        cardGallery.addItem(createCard(item));
                    },
                },
                ".elements__gallery"
            );
            cardGallery.renderItems();
        })
        .catch((err) => {
            console.log(err);
        });
};
loadData();
