import "./index.css";
import { objectForm, enableValidation } from "../components/validate.js";
import {
  gallery,
  elementsContainer,
  userName,
  userWork,
  userAvatar,
} from "../components/modal.js";
import { addCard, Card, clickDeleteButton } from "../components/card.js";
import {
  getInitialCards,
  likeAdding,
  likeRemoving,
} from "../components/api.js";
import Section from "../components/Section.js";
import ApiClass from "../components/ApiClass.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserIfno.js";
import FormValidator from "../components/FormValidator.js";
import {
  buttonEdit,
  nameInput,
  jobInput,
  addButton,
  linkForm,
  avatarConteiner,
  userForm,
  cardForm,
} from "../components/constant";

export let userId = "";

export const api = new ApiClass({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
  headers: {
    authorization: "44636783-74cb-4589-8742-e9314e17f901",
    "Content-Type": "application/json",
  },
});

const cardArray = [
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
    name: "Local Test ARRAY",
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

const cardObj = {
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
  name: "Local Test OBJ",
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
};

const cardList = new Section(
  {
    items: cardArray,
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
      cardList.addItem(cardElement);
    },
  },
  ".elements__gallery"
);

cardList.renderItem();

const cardObject = new Card(
  {
    data: cardObj,
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
    openImage: function (link, image) {
      console.log(link, image);
      popupImage.open(link, image);
    },
  },
  "#card"
);

const userInfo = new UserInfo({
  userNameSelector: "profile__name",
  userDescriptionSelector: "profile__work-place",
  userAvatarSelector: "profile__avatar",
  getUserData: () => {
    return api.userInfo();
  },
});

cardList.addItem(cardObject.generate());
//загрузка данных о пользователе и о карточках
const loadData = () => {
  Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardArray]) => {
      userInfo.setUserInfo({
        userName: userData.name,
        userDescription: userData.about,
        userAvatar: userData.avatar,
      });
      userId = userData._id;
      cardArray.forEach((object) => {
        addCard(object, elementsContainer);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
loadData();

// Попап - данные пользователя
const popupFormUser = new PopupWithForm("#edit-popup", (inputList) => {
  popupFormUser.loadingDisplaing(true);
  api
    .profileInfoChanging(inputList.username, inputList.userwork)
    .then((res) => {
      userInfo.setUserInfo({
        userName: inputList.username,
        userDescription: inputList.userwork,
      });
      popupFormUser.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormUser.loadingDisplaing(false);
    });
});
popupFormUser.setEventListeners();


// Попап - работа с карточками
const popupFormCard = new PopupWithForm("#create-popup", (inputList) => {
  popupFormCard.loadingDisplaing(true);
  api
    .newCard(inputList.placename, inputList.placelink)
    .then((res) => {
      addCard(res, elementsContainer);
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(function () {
      popupFormCard.loadingDisplaing(false);
    });
});
popupFormCard.setEventListeners();


//Попап для аватарки
const popupFormAvatar = new PopupWithForm("#link-for-avatar", (inputList) => {
  popupFormAvatar.loadingDisplaing(true);
  api
    .avatarRefreshing(inputList.linkname)
    .then((res) => {
      userInfo.setUserInfo({ userAvatar: inputList.linkname });
      popupFormAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupFormAvatar.loadingDisplaing(false);
    });
});

popupFormAvatar.setEventListeners();

//Попап для просмотр карточек
const popupImage = new PopupWithImage("#open-image");
popupImage.setEventListeners();

//Открытие попапа для изменения аватарки
avatarConteiner.addEventListener("click", function () {
  popupFormAvatar.open();
});

//Открытие попапа профиля
buttonEdit.addEventListener("click", () => {
  userInfo
    .getUserInfo()
    .then((res) => {
      nameInput.value = res.name;
      jobInput.value = res.about;
    })
    .catch((err) => {
      console.log(err);
    });
    
  popupFormUser.open();
});

//Открытие попапа для добавления карточек
addButton.addEventListener("click", function () {
  popupFormCard.open();
});

//Валидация данных пользователя
const userFormValidator = new FormValidator(objectForm, userForm);
userFormValidator.enableValidation();

//Валидация аватарки
const avatarFormValidator = new FormValidator(objectForm, linkForm);
avatarFormValidator.enableValidation();

//Валидация карт
const cardFormValidator = new FormValidator(objectForm, cardForm);
cardFormValidator.enableValidation();