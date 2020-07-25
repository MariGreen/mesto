export class UserInfo {
  constructor(name, about, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const person = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
    return person;
  }

  setUserInfo(person) {
    this._name.textContent = person.name;
    this._about.textContent = person.about;
    this._avatar.src = person.avatar;
  }
}
