export class UserInfo {
    constructor({ data }) {
        this._userNameElement = document.querySelector(data.userNameSelector);
        this._userAboutElement = document.querySelector(data.userWorkSelector);
        this._userProfileAvatar = document.querySelector(data.userAvatarSelector);
    }
    getUserInfo() {
        return {
            userName: this._userNameElement.textContent,
            userDescription: this._userAboutElement.textContent
        }
    }


    setUserInfo({ name, about, avatar }) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = about;
        this._userProfileAvatar.setAttribute('src', avatar);
    }
}
