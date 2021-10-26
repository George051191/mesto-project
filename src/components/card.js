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
export function clickDeleteButton(data, card, evt) {
    confirmButton.setAttribute('id', data);
    openPopup(confirmPopup);
    ///слушатель с колбеком удаления карточки
    confirmButton.addEventListener('click', deleteCurrentCard);
}
///функция закрытия попапа подтверждения удаления
function closeConfirmPopup() {
    closePopup(confirmPopup);
    confirmButton.removeEventListener('click', deleteCurrentCard);
}
///колбек удаления карточки
function deleteCurrentCard(evt) {
    cardRemoving(evt.target.id)
        .then(() => {
            document.getElementById(evt.target.id).closest('.element').remove();
            closeConfirmPopup();
        })
        .catch(err => {
            console.log(err)
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
//////создаем класс для карточек
////застопорился на моментне где у меня обработчик событий берет инфу из api
///я делаю сердечки черными и наоборот не пролайкаными из информации которая приходит  с сервера.
///и функция addOrRemoveLikes эта в которой есть запрос api у меня накладывается через слушатель добавляется
///элементу сердечка при создании каждой карточки.Я вот и не пойму может ли у меня в классе быть ссылка на другой класс?-
export class Card {
    constructor({ data, handleLikeClick, deleteWithClick, openImage }, selector) {
        this.selector = selector;
        this.link = data.link;
        this.name = data.name;
        this.id = data._id;
        this.likes = data.likes;
        this.handleLikeClick = handleLikeClick;
        this.deleteWithClick = deleteWithClick;
        this.openImage = openImage;
    }
    _getElement() {
        const cardElement = document.querySelector(this.selector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    generate() {
        this.element = this._getElement();
        console.log(this.element);
        this.element.id = this.id;
        const cardImage = this.element.querySelector('.element__image');
        cardImage.setAttribute('src', this.link);
        cardImage.setAttribute('alt', this.name);
        cardImage.setAttribute('id', this.id);
        const cardName = this.element.querySelector('.element__title');
        cardName.textContent = this.name;
        const likes = this.element.querySelector('.element__likes');
        likes.textContent = this.likes.length;
        const cardDeleteButton = this.element.querySelector('.element__delete')
        cardDeleteButton.setAttribute('id', this.id);
        const likeButton = this.element.querySelector('.element__group');
        this._searchLikeId(this.likes, likeButton);
        this._searchDeleteButton(this.id, cardDeleteButton);
        this._setEventListeners(cardDeleteButton, cardImage);
        return this.element;
    }
    _searchLikeId(someData, button) {
        someData.forEach(likeArr => {
            if (likeArr._id === userId) {
                button.classList.add('element__group_active');
            }
        })
    }
    _searchDeleteButton(someData, button) {
        if (someData !== userId) {
            button.classList.add('element__delete_disactive');
        }
    }
    _setEventListeners(elementButton, elementImage) {
        this.element.addEventListener('click', function() {
            this.handleLikeClick(this);
        })
        elementButton.addEventListener('click', function() {
            this.deleteWithClick(this);
        })
        elementImage.addEventListener('click', function() {
            this.openImage(this);
        })
    }
}
