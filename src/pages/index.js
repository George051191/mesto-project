import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js';
import { Api } from '../components/Api.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { avatarConteiner, buttonEdit, addButton, nameInput, jobInput, objectForm, profileObject } from '../components/constants.js';
import LazyLoad from "vanilla-lazyload";

let userId = '';
let cardGallery = null;

const lazyContent = new LazyLoad({
    elements_selector: "[loading=lazy]",
    use_native: true
})

lazyContent.update()
console.log(lazyContent)

// экземпляр класса Api

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
        api.refreshAvatar(objectInput.linkname)
            .then((res) => {
                userData.setUserAvatar({ avatar: res.avatar });
                popupLinkAvatar.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { popupLinkAvatar.loadingDisplaing(false) });
    }
})
popupLinkAvatar.setEventListeners();
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
        api.pushNewCard(objectInput.placename, objectInput.placelink)
            .then((res) => {
                const userCard = createCard(res);
                cardGallery.addItem(userCard);
                imageDataPopup.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { imageDataPopup.loadingDisplaing(false); });
    }
})
imageDataPopup.setEventListeners();
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
        api.changeProfileInfo(objectInput.username, objectInput.userwork)
            .then((res) => {
                userData.setUserInfo({ name: res.name, about: res.about });
                userDataPopup.closePopup();

            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => { userDataPopup.loadingDisplaing(false) });
    }

})
userDataPopup.setEventListeners();
buttonEdit.addEventListener('click', () => {
    userDataPopup.openPopup();
    nameInput.value = userData.getUserInfo().userName;
    jobInput.value = userData.getUserInfo().userDescription;
    userFormValidation.setButtonState();

})

///экземпляр класса для попапа подтверждения удаления картинки
const confirmPopup = new PopupWithConfirmation({
    selector: '#delete-card',
    buttonSelector: '.popup__confirm-button'
})
confirmPopup.setEventListeners();

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
        handleCardClick: () => {
            popupWithImage.openPopup(cardData.link, cardData.name);
        },
        handleLikeClick: (evt) => {
            if (!evt.target.classList.contains('element__group_active')) {
                api.addLike(cardData._id)
                    .then((res) => {
                        console.log(res);
                        card.updateLikesView(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                api.removeLike(cardData._id)
                    .then((res) => {
                        card.updateLikesView(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        },
        handleDeleteIconClick: () => {
            confirmPopup.setSubmitAction(() => {
                api.removeCard(cardData._id)
                    .then(() => {
                        card.removeElement();
                        confirmPopup.closePopup();
                    })
            })
            confirmPopup.openPopup();
        }
    }, '#card', '.element__loader', userId);

    return card.generate();
}

///начальная загрузка информации с сервера
const loadData = () => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userObject, cardArray]) => {
            userData.setUserInfo({
                name: userObject.name,
                about: userObject.about
            });
            userData.setUserAvatar({ avatar: userObject.avatar })
            userId = userObject._id;
            cardGallery = new Section({
                    items: cardArray.reverse(),
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
