class UserInfo {
  constructor({ profileName, profileInfo }) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
  }

  getUserInfo() {
    this.profileInfoObj = {};
    this.profileInfoObj.name = this._profileName.textContent;
    this.profileInfoObj.info = this._profileInfo.textContent;
    return this.profileInfoObj;
  }

  setUserInfo(obj) {
    this._profileName.textContent = obj.name;
    this._profileInfo.textContent = obj.about;
  }
}

// ---------------------Редактирование профиля------------------------
const popupOpenButton = document.querySelector('.profile__edit-button');
const name = document.querySelector('.profile__author');
const job = document.querySelector('.profile__description');
const nameInput = document.querySelector('#name-input');
const jobInput = document.querySelector('#job-input');
const profileForm = document.querySelector('.popup__form_profile');

const userInfo = new UserInfo('.profile__author', '.profile__description'); //деструктуризация?
const profileSubmit = new PopupWithForm('.popup_type_profile', (values) => {
  userInfo.setUserInfo(values);
  profileSubmit.close();
});

profileSubmit.setEventListeners('.popup__close-icon_profile');

popupOpenButton.addEventListener('click', () => {
  profileSubmit.open();
});
