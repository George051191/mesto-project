import './index.css';
import { FormValidator } from '../components/FormValidator.js'
import { closePopupByClickOverlay, gallery, elementsContainer, userName, userWork, userAvatar } from '../components/modal.js';
import { /* addCard*/ Card, clickDeleteButton } from '../components/Card.js';
import { getInitialCards, userInfo, likeAdding, likeRemoving, Api } from '../components/Api.js';
import { Section } from '../components/Section.js';
export let userId = '';

const objectForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const userFormValidation = new FormValidator(objectForm, '.popup__user-info')
userFormValidation.enableValidation();

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
        userId = res._id;
    })
    /**
     * функция для создания экземпляров Card
     */

const createCard = (cardData) => {
    const card = new Card({
        data: cardData,
        handleCardClick: () => {},
        handleLikeClick: (cardData, evt) => {
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
        handleDeleteIconClick: (cardData) => {
            confirmButton.setAttribute('id', cardData._id);
            openPopup(confirmPopup);
            confirmButton.addEventListener('click', function(evt) {
                api.cardRemoving(evt.target.id)
                    .then(() => {
                        document.getElementById(evt.target.id).closest('.element').remove();
                        closeConfirmPopup();
                    })
                    .catch(err => {
                        console.log(err)
                    })
            });
        },
    }, '#card');

    return card.generate();
}

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




closePopupByClickOverlay();

//enableValidation(objectForm)









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
loadData();

closePopupByClickOverlay();

enableValidation(objectForm);

function newFunction() {
    cardGallery.renderItems();
}
*/
