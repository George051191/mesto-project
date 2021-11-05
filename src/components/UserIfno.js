export default class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
    getUserData,
  }) {
    this._userNameElement = document.querySelector(`.${userNameSelector}`);
    this._userDescriptionElement = document.querySelector(
      `.${userDescriptionSelector}`
    );
    this._userAvatarElement = document.querySelector(`.${userAvatarSelector}`);
    this._getUserData = getUserData;
  }

  getUserInfo() {
    return this._getUserData();
  }

  setUserInfo({ userName, userDescription, userAvatar }) {
    this._userNameElement.textContent =
      userName ?? this._userNameElement.textContent;
    this._userDescriptionElement.textContent =
      userDescription ?? this._userDescriptionElement.textContent;
    this._userAvatarElement.src = userAvatar ?? this._userAvatarElement.src;
  }
}
