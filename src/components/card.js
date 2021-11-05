export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick },
    selector,
    userId
  ) {
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
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  ///создаем и возвращаем полностью заполненную данными и слушателями карточку
  generate() {
    this.element = this._getElement();
    this.element.id = this._id;
    const cardImage = this.element.querySelector(".element__image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", this._name);
    cardImage.setAttribute("id", this._id);
    const cardName = this.element.querySelector(".element__title");
    cardName.textContent = this._name;
    const likes = this.element.querySelector(".element__likes");
    likes.textContent = this._likes.length;
    const cardDeleteButton = this.element.querySelector(".element__delete");
    cardDeleteButton.setAttribute("id", this._id);
    const likeButton = this.element.querySelector(".element__group");
    this._searchLikeId(this._likes, likeButton);
    this._searchDeleteButton(this._owner, cardDeleteButton);
    this._setEventListeners(likeButton, cardDeleteButton, cardImage);
    return this.element;
  }
  ///здесь проверяем есть ли наш лайк на сердце
  _searchLikeId(likes, button) {
    likes.forEach((like) => {
      if (like._id === this._userId) {
        button.classList.add("element__group_active");
      }
    });
  }
  ///здесь находим кнопки удаления только наших карточек
  _searchDeleteButton(owner, button) {
    // console.log(data.owner._id);
    if (owner !== this._userId) {
      button.classList.add("element__delete_disactive");
    }
  }
  ///здесь все слушатели для элементов карточки
  _setEventListeners(buttonForLike, elementButton, elementImage) {
    buttonForLike.addEventListener("click", (evt) => {
      this._handleLikeClick(evt);
    });
    elementButton.addEventListener("click", () => {
      this._handleDeleteIconClick();
    });
    elementImage.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }
  ///меняем количество лайков в разметке
  updateLikesView(likesList, evt) {
    evt.target.classList.toggle("element__group_active");
    evt.target
      .closest(".element")
      .querySelector(".element__likes").textContent = likesList.likes.length;
  }
}
