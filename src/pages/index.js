import './index.css';
import { objectForm, enableValidation } from '../components/validate.js'
import { closePopupByClickOverlay, gallery, elementsContainer, userName, userWork, userAvatar } from '../components/modal.js';
import { addCard } from '../components/card.js';
import { getInitialCards, userInfo } from '../components/api.js';




///загружаем всю инфу о пользователе с сервера
function loadUser() {
    userInfo()
        .then(res => {
            userAvatar.setAttribute('src', res.avatar);
            userName.textContent = res.name;
            userWork.textContent = res.about;
        })
        .catch(err => {
            console.log(err);
        })
}
loadUser();


//выгрузка карточек из массива при загрузке страницы
getInitialCards()
    .then(res => {
        res.forEach(object => {
            addCard(object, elementsContainer);
        })
    })
    .catch(err => {
        console.log(err);
    });


closePopupByClickOverlay();

enableValidation(objectForm);
