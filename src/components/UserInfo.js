export class UserInfo {
    constructor({ object, getUserData }) {
        this._userNameElement = document.querySelector(object.userNameSelector);
        this._userAboutElement = document.querySelector(object.userWorkSelector);
        this._userProfileAvatar = document.querySelector(object.userAvatarSelector);
        this._getUserData = getUserData;

    }
    getUserInfo() {
        return this._getUserData();
    }


    setUserInfo({ userName, userDescription, userAvatar }) {
        this._userNameElement.textContent = userName ?? this._userNameElement.textContent;
        this._userAboutElement.textContent = userDescription ?? this._userAboutElement.textContent;
        this._userProfileAvatar.src = userAvatar ?? this._userProfileAvatart.src;
    }
}
