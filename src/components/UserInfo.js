export class UserInfo {
  constructor(name, vocation) {
    this._name = document.querySelector(name);
    this._vocation = document.querySelector(vocation);
  }

  getUserInfo(api) {
    const person = {};
    // person.name = this._name.textContent;
    // person.vocation = this._vocation.textContent;
    // return person;
    api
      .then((data) => {
        person.name = data.name;
        person.vocation = data.about;
        person._id = data._id;
        return person;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setUserInfo(person) {
    this._name.textContent = person.name;
    this._vocation.textContent = person.vocation;
  }
}
