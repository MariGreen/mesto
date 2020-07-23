export class UserInfo {
  constructor(name, about, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo(api) {
    const person = {};
    api
      .then((data) => {
        person.name = data.name;
        person.about = data.about;
        person._id = data._id;
        person.avatar = data.avatar;
        return person;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(person) {
    this._name.textContent = person.name;
    this._about.textContent = person.about;
    this._avatar.src = person.avatar;
  }
}
