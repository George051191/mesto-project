import { openPopup, closePopup } from "../components/utils.js";
import { likeAdding, likeRemoving, cardRemoving } from "./api.js";
import { elementsContainer } from "./modal.js";
import { userId } from "../pages/index.js";

const linkInput = document.querySelector('.popup__link-name');
const popupImage = document.querySelector('#open-image');
const fullImage = popupImage.querySelector('.popup__image');
const imageText = document.querySelector('.popup__underline');
const confirmPopup = document.querySelector('#delete-card');
const confirmButton = document.querySelector('.popup__confirm-button');



///передаем нужный id элементу попапа подтверждения и удаляем карточку
function clickDeleteButton(data, card, evt) {
    confirmButton.setAttribute('id', data);
    openPopup(confirmPopup);
    ///слушатель с колбеком удаления карточки
    confirmButton.addEventListener('click', deleteCurrentCard);
}
///колбек удаления карточки
function deleteCurrentCard(evt) {
    cardRemoving(evt.target.id)
        .then(res => {
            if (res.ok) {
                const allImages = document.querySelectorAll('.element__image');
                const currentElement = Array.from(allImages).find(image => {
                    return image.hasAttribute('src', res.url);
                })
                currentElement.closest('.element').remove();
                closePopup(confirmPopup);
            }
        })
        .catch(err => {
            console.log(err)
        })
        .finally(function() {
            confirmButton.removeEventListener('click', deleteCurrentCard);
        })
}


///ищем кнопки удаления наших карточек
function searchDeleteButton(someData, button) {
    if (someData.owner._id !== userId) {
        button.classList.add('element__delete_disactive');
    }
}

///ищем лайки текущего пользователя
function searchLikeId(someData, button) {
    someData.likes.forEach(likeArr => {
        if (likeArr._id === userId) {
            button.classList.add('element__group_active');
        }
    })
}


///находим нужное сердечко для отправки запроса на сервер и считаем лайки
function findAndPostHeart(evt) {
    const currentImg = evt.currentTarget.querySelector('.my-image');
    const currentLikeCounter = evt.currentTarget.querySelector('.my-like');
    const currentLike = evt.currentTarget.querySelector('.element__group');
    console.log(currentLike);
    likeAdding(currentImg.id)
        .then(res => {
            currentLikeCounter.textContent = res.likes.length;
            /// сердечко сделать черным
            currentLike.classList.add('element__group_active');
        })
        .catch(err => {
            console.log(err);
        })
}
///удалаяем и пересчитываем лайки
function findAndDeleteHeart(evt) {
    const currentImg = evt.currentTarget.querySelector('.my-image');
    const currentLikeCounter = evt.currentTarget.querySelector('.my-like');
    const currentLike = evt.currentTarget.querySelector('.element__group');
    likeRemoving(currentImg.id)
        .then(res => {
            console.log(res);
            currentLikeCounter.textContent = res.likes.length;
            ///сердечко сделать белыm
            currentLike.classList.remove('element__group_active');
        })
        .catch(err => {
            console.log(err);
        })
}
///удаление или добавление лайка
function addOrRemoveLikes(evt) {
    if (evt.target.classList.contains('element__group')) {
        evt.target.classList.contains('element__group_active') ? findAndDeleteHeart(evt) : findAndPostHeart(evt);
    }
}



//функция создания одной карточки
function createCard(cardData) {
    const cardElement = document.querySelector('#card').content;
    const element = cardElement.querySelector('.element').cloneNode(true);
    const cardImage = element.querySelector('.element__image');
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    cardImage.setAttribute('id', cardData._id);
    const cardName = element.querySelector('.element__title');
    cardName.textContent = cardData.name;
    const likes = element.querySelector('.element__likes');
    const likeButton = element.querySelector('.element__group');
    searchLikeId(cardData, likeButton);
    likes.textContent = cardData.likes.length;
    element.addEventListener('click', addOrRemoveLikes);
    element.setAttribute('id', cardData._id);
    const cardDeleteButton = element.querySelector('.element__delete');
    cardDeleteButton.setAttribute('id', cardData._id);
    cardDeleteButton.addEventListener('click', function(evt) {
        clickDeleteButton(element.id, element, evt);
    })
    searchDeleteButton(cardData, cardDeleteButton);

    cardImage.addEventListener('click', function() {
        openPopup(popupImage);
        fullImage.setAttribute('src', cardData.link);
        fullImage.setAttribute('alt', cardData.name);
        imageText.textContent = cardData.name;
    });
    return element;
}

//функция добавления карточки на страницу
function addCard(cardData, container) {
    const card = createCard(cardData);
    if (cardData.link === linkInput.value) {
        container.prepend(card);
    } else {
        container.append(card);
    }
}

export { addCard, linkInput };
