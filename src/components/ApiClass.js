export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  ///запрос на проставление лайка карточке
  likeAdding(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  ///запрос на удаление лайка у карточки
  likeRemoving(id) {
    return fetch(`${this.baseUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  ///запрос на удаление карточки
  cardRemoving(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  ///запрос информации о карточках с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }
  ///запрос информации о пользователе
  userInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  ///отправка измененных данных пользователя
  profileInfoChanging(name, work) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name.value,
        about: work.value,
      }),
    }).then(this._checkResponse);
  }

  ///отправка новой карточки на сервер
  newCard(cardName, linkUrl) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName.value,
        link: linkUrl.value,
      }),
    }).then(this._checkResponse);
  }

  /// запрос на обновление аватарки
  avatarRefreshing(linkData) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: linkData,
      }),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
