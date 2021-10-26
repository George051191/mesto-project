import './index.css';
import { objectForm, enableValidation } from '../components/validate.js'
import { closePopupByClickOverlay, gallery, elementsContainer, userName, userWork, userAvatar } from '../components/modal.js';
import { addCard, Card, clickDeleteButton } from '../components/card.js';
import { getInitialCards, userInfo, likeAdding, likeRemoving } from '../components/api.js';

export let userId = '';

const data = {
    link: 'https://images.unsplash.com/photo-1606787620651-3f8e15e00662?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    name: 'proverka',
    _id: 'fgfgfgf23444',
    likes: [{}, {}, {}]
}
const card = new Card({
    data,
    handleLikeClick: function(item, evt) {
        if (!evt.target.classList.contains('element__group_active')) {
            likeAdding(item._id)
                .then((res) => {
                    evt.target.classList.toggle('element__group_active');
                    card.updateLikesView(res);
                })
        } else {
            likeRemoving(item._id)
                .then((res) => {
                    evt.target.classList.toggle('element__group_active');
                    card.updateLikesView(res);
                })
        }
    },
    deleteWithClick: function(someData) {
        clickDeleteButton(someData);
    },
    openImage: function() {
        console.log('picture');
    }
}, '#card');


console.log(card.generate());
document.querySelector('.elements__gallery').append(card.generate());





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
