export class UserInfo {
    constructor({ object, getUserData, setUserData }) {
        this._userNameElement = document.querySelector(object.userNameSelector);
        this._userAboutElement = document.querySelector(object.userWorkSelector);
        this._userProfileAvatar = document.querySelector(object.userAvatarSelector);
        this._getUserData = getUserData;
        this._setUserData = setUserData;
    }
    getUserInfo() {
        return this._getUserData();
    }
    setUserInfo(name, about) {
        return this._setUserData(name, about);

    }
    setObjectUserData(name, work) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = work;
    }
    setUserAvatarImage(link) {
        this._userProfileAvatar.setAttribute('src', link);
    }
}
