/**
 * создаем класс Api
 */
export class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    //проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    ///запрос на проставление лайка карточке
    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    ///запрос на удаление лайка у карточки
    removeLike = (id) => {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    ///запрос на удаление карточки
    removeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    ///запрос информации о карточках с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    ///запрос информации о пользователе
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }

    ///отправка измененных данных пользователя
    changeProfileInfo(name, work) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: work,
                })
            })
            .then(this._checkResponse);
    }

    ///отправка новой карточки на сервер
    pushNewCard(cardName, linkUrl) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardName,
                    link: linkUrl
                })
            })
            .then(this._checkResponse);
    }

    /// запрос на обновление аватарки
    refreshAvatar(linkData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: linkData
                })
            })
            .then(this._checkResponse);
    };
};
