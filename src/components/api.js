///обьект с данными для идентификации
const config = {
        baseUrl: 'https://nomoreparties.co/v1/plus-cohort-2',
        headers: {
            authorization: '44636783-74cb-4589-8742-e9314e17f901',
            'Content-Type': 'application/json'
        }
    }
    ///запрос на проставление лайка карточке
export const likeAdding = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

///запрос на удаление лайка у карточки
export const likeRemoving = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

///запрос на удаление карточки
export const cardRemoving = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return console.log(res.json());
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}


///запрос информации о карточках с сервера
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};
///запрос информации о пользователе
export const userInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

///отправка измененных данных пользователя
export const profileInfoChanging = (name, work) => {
    fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name.value,
            about: work.value,
            likes: res.likes
        })
    })
};

///отправка новой карточки на сервер
export const newCard = (cardName, linkUrl) => {
    return fetch(`${config.baseUrl}/cards`, {
            method: 'POST',
            headers: config.headers,
            body: JSON.stringify({
                name: cardName.value,
                link: linkUrl.value
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });

};
