import './index.css';
import { objectForm, enableValidation } from '../components/validate.js'
import { closePopupByClickOverlay, gallery, elementsContainer } from '../components/modal.js';
import { addCard } from '../components/card.js';
import { initialCards } from '../components/initial.js';

//выгрузка карточек из массива при загрузке страницы
initialCards.forEach(function(item) {
    addCard(item, elementsContainer);
});

closePopupByClickOverlay();

enableValidation(objectForm);
