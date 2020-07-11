export class UserInfo {
  constructor(name, vocation) {
    this._name = document.querySelector(name);
    this._vocation = document.querySelector(vocation);
  }

  getUserInfo() {
    const person = {};
    person.name = this._name.textContent;
    person.vocation = this._vocation.textContent;
    return person;
  }

  setUserInfo(person) {
    this._name.textContent = person.name;
    this._vocation.textContent = person.vocation;
  }
}
