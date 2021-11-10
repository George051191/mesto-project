export class Card {
    constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, selector, userId) {
        this._selector = selector;
        this._link = data.link;
        this._name = data.name;
        this._id = data._id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
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
        this._cardImageElement = this.element.querySelector('.element__image');
        this._cardImageElement.setAttribute('src', this._link);
        this._cardImageElement.setAttribute('alt', this._name);
        this._cardImageElement.setAttribute('id', this._id);
        this._cardNameElement = this.element.querySelector('.element__title');
        this._cardNameElement.textContent = this._name;
        this._likesElement = this.element.querySelector('.element__likes');
        this._likesElement.textContent = this._likes.length;
        this._cardDeleteButton = this.element.querySelector('.element__delete')
        this._cardDeleteButton.setAttribute('id', this._id);
        this._likeButton = this.element.querySelector('.element__group');
        this._searchLikeId();
        this._searchDeleteButton();
        this._setEventListeners();
        return this.element;
    }

    ///здесь проверяем есть ли наш лайк на сердце
    _searchLikeId() {
        this._likes.forEach(likeArr => {
            if (likeArr._id === this._userId) {
                this._likeButton.classList.add('element__group_active');
            }
        })
    }

    ///здесь находим кнопки удаления только наших карточек
    _searchDeleteButton() {
        // console.log(data.owner._id);
        if (this._owner !== this._userId) {
            this._cardDeleteButton.classList.add('element__delete_disactive');
        }
    }

    ///здесь все слушатели для элементов карточки
    _setEventListeners() {
        this._likeButton.addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        })
        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();
        })
        this._cardImageElement.addEventListener('click', (evt) => {
            this._handleCardClick(evt);
        })
    }

    ///меняем количество лайков в разметке
    updateLikesView(arrayLikes) {
        this._likeButton.classList.toggle('element__group_active');
        this._likesElement.textContent = arrayLikes.likes.length;
    }
}
