import { openPopup, closePopup } from "./utils.js";
import { likeAdding, likeRemoving, cardRemoving } from "./Api.js";
import { elementsContainer } from "./modal.js";
import { userId } from "../pages/index.js";

const linkInput = document.querySelector('.popup__link-name');
const popupImage = document.querySelector('#open-image');
const fullImage = popupImage.querySelector('.popup__image');
const imageText = document.querySelector('.popup__underline');
const confirmPopup = document.querySelector('#delete-card');
const confirmButton = document.querySelector('.popup__confirm-button');

/*

///передаем нужный id элементу попапа подтверждения и удаляем карточку
export function clickDeleteButton(data) {
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
*/
export { /*addCard,*/ linkInput };

export class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, selector) {
            this._selector = selector;
            this._link = data.link;
            this._name = data.name;
            this._id = data._id;
            this._owner = data.owner._id;
            this._likes = data.likes;
            this._handleLikeClick = handleLikeClick;
            this._handleDeleteIconClick = handleDeleteIconClick;
            this._handleCardClick = handleCardClick;
        }
        ///берем разметку карточки
    _getElement() {
            const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
            return cardElement;
        }
        ///создаем и возвращаем полностью заполненную данными и слушателями карточку
    generate() {
            this.element = this._getElement();
            this.element.id = this._id;
            const cardImage = this.element.querySelector('.element__image');
            cardImage.setAttribute('src', this._link);
            cardImage.setAttribute('alt', this._name);
            cardImage.setAttribute('id', this._id);
            const cardName = this.element.querySelector('.element__title');
            cardName.textContent = this._name;
            const likes = this.element.querySelector('.element__likes');
            likes.textContent = this._likes.length;
            const cardDeleteButton = this.element.querySelector('.element__delete')
            cardDeleteButton.setAttribute('id', this._id);
            const likeButton = this.element.querySelector('.element__group');
            this._searchLikeId(this._likes, likeButton);
            this._searchDeleteButton(this._owner, cardDeleteButton);
            this._setEventListeners(likeButton, cardDeleteButton, cardImage);
            return this.element;
        }
        ///здесь проверяем есть ли наш лайк на сердце
    _searchLikeId(someData, button) {
            someData.forEach(likeArr => {
                if (likeArr._id === userId) {
                    button.classList.add('element__group_active');
                }
            })
        }
        ///здесь находим кнопки удаления только наших карточек
    _searchDeleteButton(someData, button) {
            // console.log(data.owner._id);
            if (someData !== userId) {
                button.classList.add('element__delete_disactive');
            }
        }
        ///здесь все слушатели для элементов карточки
    _setEventListeners(buttonForLike, elementButton, elementImage) {
            buttonForLike.addEventListener('click', (evt) => {
                this._handleLikeClick(evt);
            })
            elementButton.addEventListener('click', () => {
                this._handleDeleteIconClick();
            })
            elementImage.addEventListener('click', (evt) => {
                this._handleCardClick(evt);
            })
        }
        ///меняем количество лайков в разметке
    updateLikesView(someData, evt) {
        evt.target.classList.toggle('element__group_active');
        evt.target.closest('.element').querySelector('.element__likes').textContent = someData.likes.length;
    }
}
