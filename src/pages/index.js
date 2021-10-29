import './index.css';
import { objectForm, enableValidation } from '../components/validate.js'
import { closePopupByClickOverlay, gallery, elementsContainer, userName, userWork, userAvatar } from '../components/modal.js';
import { addCard, Card, clickDeleteButton } from '../components/Card.js';
import { getInitialCards, userInfo, likeAdding, likeRemoving, Api } from '../components/Api.js';
import { Section } from '../components/Section.js';
export let userId = '';

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

/**
 * функция для создания экземпляров Card
 */

const createCard = (cardData) => {
    const card = new Card({
        data: { cardData, currentUserId: userId },
        handleCardClick: () => {},
        handleLikeClick: (card, evt) => {
            if (!evt.target.classList.contains('element__group_active')) {
                api.likeAdding(item._id)
                    .then((res) => {
                        evt.target.classList.toggle('element__group_active');
                        card.updateLikesView(res);
                    })
            } else {
                api.likeRemoving(item._id)
                    .then((res) => {
                        evt.target.classList.toggle('element__group_active');
                        card.updateLikesView(res);
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

}

function loadData() {
    return api.getInitialCards()
        .then((res) => {

        })
}


///////////////////////////////
/**
 * создаем экземмпляр класса Section и пробуев с помощью его методов добавить нашу карточку тестовую
 */

const cardGallery = new Section({
    items: [],
    renderer: (item) => {
        cardGallery.addItem(createCard(item));

    }
}, '.elements__gallery')


cardGallery.renderItems();












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
