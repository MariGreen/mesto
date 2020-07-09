export class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor(name, vocation) {
    this._name = document.querySelector(name);
    this._vocation = document.querySelector(vocation);
  }

  getUserInfo() {
    //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const person = {};
    person.name = this._name.textContent;
    person.vocation = this._vocation.textContent;
    return person;
  }

  setUserInfo(person) {
    //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

    this._name.textContent = person.name;
    this._vocation.textContent = person.vocation;
  }
}
//то есть при сабмите формы мы должны передавать данные из инпутов в метод setUserInfo?
//при сабмите формы редактирования профиля - да, коллбэком будет setUserInfo
