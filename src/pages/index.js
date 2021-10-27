import "./index.css";
import { objectForm, enableValidation } from "../components/validate.js";
import {
  closePopupByClickOverlay,
  gallery,
  elementsContainer,
  userName,
  userWork,
  userAvatar,
} from "../components/modal.js";
import { addCard, Card, clickDeleteButton } from "../components/card.js";
import {
  getInitialCards,
  userInfo,
  likeAdding,
  likeRemoving,
} from "../components/api.js";
import Section from "../components/Section.js";

export let userId = "";

const cardList = [
  {
    likes: [
      {
        name: "Geo",
        about: "TransserferforForLIfe",
        avatar:
          "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
        _id: "796f13e264ff2e7b6cb3cdf1",
        cohort: "plus-cohort-2",
      },
    ],
    _id: "61798da892d51f0012c230d6",
    name: "Local Test",
    link: "https://sevenbuy.ru/wp-content/uploads/1/f/c/1fc498d6301d185ed5041787fc789354.jpeg",
    owner: {
      name: "Даррелл",
      about: "Любитель животных",
      avatar:
        "https://upload.wikimedia.org/wikipedia/ru/thumb/0/03/Gerald_Durrell_in_Russia_1986.jpg/200px-Gerald_Durrell_in_Russia_1986.jpg",
      _id: "b83992c0161886588f5668dc",
      cohort: "plus-cohort-2",
    },
    createdAt: "2021-10-27T17:34:32.299Z",
  },
];

const sectionCard = new Section(
  {
    data: cardList,
    render: (item) => {
      const card = new Card(
        {
          data: item,
          handleLikeClick: function (item, evt) {
            if (!evt.target.classList.contains("element__group_active")) {
              likeAdding(item._id).then((res) => {
                evt.target.classList.toggle("element__group_active");
                card.updateLikesView(res);
              });
            } else {
              likeRemoving(item._id).then((res) => {
                evt.target.classList.toggle("element__group_active");
                card.updateLikesView(res);
              });
            }
          },
          deleteWithClick: function (someData) {
            clickDeleteButton(someData);
          },
          openImage: function () {
            console.log("picture");
          },
        },
        "#card"
      );
      const cardElement = card.generate();
      console.log(cardElement);
      sectionCard.setItem(cardElement);
    },
  },
  ".elements__gallery"
);

sectionCard.renderItem();

///загрузка данных о пользователе и о карточках
const loadData = () => {
  Promise.all([userInfo(), getInitialCards()])
    .then((res) => {
      userAvatar.setAttribute("src", res[0].avatar);
      userName.textContent = res[0].name;
      userWork.textContent = res[0].about;
      userId = res[0]._id;
      res[1].forEach((object) => {
        addCard(object, elementsContainer);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadData();

closePopupByClickOverlay();

enableValidation(objectForm);
