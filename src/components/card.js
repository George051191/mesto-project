import { openPopup, closePopup } from "../components/utils.js";
import { likeAdding, likeRemoving, cardRemoving } from "./api.js";

const linkInput = document.querySelector('.popup__link-name');
const popupImage = document.querySelector('#open-image');
const fullImage = popupImage.querySelector('.popup__image');
const imageText = document.querySelector('.popup__underline');
const confirmPopup = document.querySelector('#delete-card');
const confirmButton = confirmPopup.querySelector('#confirm-button');

///ищем кнопки удаления наших карточек
function searcDeleteButton(someData, button) {
    if (someData.owner._id !== '796f13e264ff2e7b6cb3cdf1') {
        button.classList.add('element__delete_disactive');
    }
}

///удаление карточки после согласия
function deleteCard(element) {
    confirmButton.addEventListener('click', function(evt) {
        cardRemoving(element.id);
    });
}

///ищем лайки текущего пользователя
function searchLikeId(someData, button) {
    someData.likes.forEach(likeArr => {
        if (likeArr._id === '796f13e264ff2e7b6cb3cdf1') {
            button.classList.add('element__group_active');
        }
    })
}
///находим нужное сердечко для отправки запроса на сервер и считаем лайки
function findAndPostHeart(evt) {
    const currentImg = evt.currentTarget.querySelector('.my-image');
    const currentLikeCounter = evt.currentTarget.querySelector('.my-like');
    likeAdding(currentImg.id)
        .then(res => {
            currentLikeCounter.textContent = res.likes.length;
        })
        .catch(err => {
            console.log(err);
        })
}
///удалаяем и пересчитываем лайки
function findAndDeleteHeart(evt) {
    const currentImg = evt.currentTarget.querySelector('.my-image');
    const currentLikeCounter = evt.currentTarget.querySelector('.my-like');
    likeRemoving(currentImg.id)
        .then(res => {
            currentLikeCounter.textContent = res.likes.length;
        })
        .catch(err => {
            console.log(err);
        })
}
///удаление или добавление лайка
function addOrRemoveLikes(evt) {
    evt.target.classList.contains('element__group_active') ? findAndPostHeart(evt) : findAndDeleteHeart(evt);
}

//функция переключения класса для лайков
function toggleLikes(evt) {
    if (evt.target.classList.contains('element__group')) {
        evt.target.classList.toggle('element__group_active');
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
    element.addEventListener('click', toggleLikes);
    element.addEventListener('click', addOrRemoveLikes);
    const cardDeleteButton = element.querySelector('.element__delete');
    cardDeleteButton.setAttribute('id', cardData._id);
    searcDeleteButton(cardData, cardDeleteButton);
    cardDeleteButton.addEventListener('click', function() {
        openPopup(confirmPopup);
    });
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
