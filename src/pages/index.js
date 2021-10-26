import './index.css';
import { objectForm, enableValidation } from '../components/validate.js'
import { closePopupByClickOverlay, gallery, elementsContainer, userName, userWork, userAvatar } from '../components/modal.js';
import { addCard, Card, clickDeleteButton } from '../components/card.js';
import { getInitialCards, userInfo } from '../components/api.js';

export let userId = '';
/*
function likeHandler(cardlikeElement, cardId, likenQuantity) {
  if (!cardlikeElement.classList.contains("element__btn-like_active")) {
    like(cardId)
      .then((result) => {
        cardlikeElement.classList.toggle("element__btn-like_active");
        likenQuantity.textContent = result.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    dislike(cardId)
      .then((result) => {
        cardlikeElement.classList.toggle("element__btn-like_active");
        likenQuantity.textContent = result.likes.length;
      })
      .catch((err) => console.log(err));
  }
}
*/
const data = {
    link: 'https://images.unsplash.com/photo-1606787620651-3f8e15e00662?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    name: 'proverka',
    _id: 'fgfgfgf23444',
    likes: [{}, {}, {}]
}
const card = new Card({
    data,
    handleLikeClick: function(item) {
        if (!likeButton.classList.contains('element__group_active')) {
            likeAdding(item.id)
                .then((res) => {
                    likeButton.classList.toggle('element__group_active');
                    likes.textContent = res.likes.length;
                })
        } else {
            likeRemoving(item.id)
                .then((res) => {
                    likeButton.classList.toggle('element__group_active');
                    likes.textContent = res.likes.length;
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
