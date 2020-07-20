export class UserInfo {
  constructor(name, vocation, avatar) {
    this._name = document.querySelector(name);
    this._vocation = document.querySelector(vocation);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo(api) {
    const person = {};
    api
      .then((data) => {
        person.name = data.name;
        person.vocation = data.about;
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
    this._vocation.textContent = person.about;
    this._avatar.src = person.avatar;
  }
}
