import { openPopup, closePopup } from "../components/utils.js";

const linkInput = document.querySelector('.popup__link-name');
const popupImage = document.querySelector('#open-image');
const fullImage = popupImage.querySelector('.popup__image');
const imageText = document.querySelector('.popup__underline');

//функция переключения класса для лайков
function toggleLikes(evt) {
    evt.target.classList.toggle('element__group_active');
}

//функция создания одной карточки
function createCard(cardData) {
    const cardElement = document.querySelector('#card').content;
    const element = cardElement.querySelector('.element').cloneNode(true);
    const cardImage = element.querySelector('.element__image');
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);
    const cardName = element.querySelector('.element__title');
    cardName.textContent = cardData.name;
    const likeButton = element.querySelector('.element__group');
    likeButton.addEventListener('click', toggleLikes);
    const cardDeleteButton = element.querySelector('.element__delete');
    cardDeleteButton.addEventListener('click', function() {
        element.remove();
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