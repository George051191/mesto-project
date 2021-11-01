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
    likeAdding(id) {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                    method: 'PUT',
                    headers: this._headers
                })
                .then(this._checkResponse);
        }
        ///запрос на удаление лайка у карточки
    likeRemoving = (id) => {
            return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                    method: 'DELETE',
                    headers: this._headers
                })
                .then(this._checkResponse);
        }
        ///запрос на удаление карточки
    cardRemoving(id) {
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
    userInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
                    headers: this._headers
                })
                .then(this._checkResponse);
        }
        ///отправка измененных данных пользователя
    profileInfoChanging(name, work) {
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
    newCard(cardName, linkUrl) {
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardName.value,
                    link: linkUrl.value
                })
            })
            .then(this._checkResponse);
    }

    /// запрос на обновление аватарки
    avatarRefreshing(linkData) {
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





















///обьект с данными для идентификации
const config = {
        baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
        headers: {
            authorization: '44636783-74cb-4589-8742-e9314e17f901',
            'Content-Type': 'application/json'
        }
    }
    ///////
    ///функция проверки ответа
function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

///запрос на проставление лайка карточке
const likeAdding = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: config.headers
        })
        .then(checkResponse);
};

///запрос на удаление лайка у карточки
const likeRemoving = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(checkResponse);
};

///запрос на удаление карточки
const cardRemoving = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(checkResponse);
};


///запрос информации о карточках с сервера
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        })
        .then(checkResponse);
};
///запрос информации о пользователе
const userInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
        .then(checkResponse);
};

///отправка измененных данных пользователя
const profileInfoChanging = (name, work) => {
    return fetch(`${config.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                name: name.value,
                about: work.value,
            })
        })
        .then(checkResponse);
};

///отправка новой карточки на сервер
const newCard = (cardName, linkUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: cardName.value,
                link: linkUrl.value
            })
        })
        .then(checkResponse);

};

/// запрос на обновление аватарки
const avatarRefreshing = (linkData) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: config.headers,
            body: JSON.stringify({
                avatar: linkData
            })
        })
        .then(checkResponse);
};

export { avatarRefreshing, newCard, profileInfoChanging, userInfo, getInitialCards, cardRemoving, likeRemoving, likeAdding, }
