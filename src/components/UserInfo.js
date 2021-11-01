export class UserInfo {
    constructor({ userNameSelector, userWorkSelector }, getUserData) {
        this._userNameElement = document.querySelector(`${userNameSelector}`);
        this._userAboutElement = document.querySelector(`${userWorkSelector}`);
        this._getUserData = getUserData;
    }
    getUserInfo() {
        return this._getUserData;
    }

}
