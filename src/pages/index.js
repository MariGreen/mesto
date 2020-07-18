import './index.css';
import { Api } from '../components/Api.js';
import { initialCards } from '../components/data/inititialCards.js';
import { popupProfile, popupPlace, popupProfileName, popupProfileVocation, obj } from '../components/data/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';

const editUser = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');

//

const defaultUser = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/users/me',
  method: 'GET',
  headers: {
    authorization: 'f6237ee0-2461-4ab8-bf1b-c4683cc19aa7',
    'Content-Type': 'application/json',
  },
};
const apiDefaultUser = new Api(defaultUser);

const newUser = new UserInfo('.profile__name', '.profile__vocation');
const name = document.querySelector('.profile__name');
const vocation = document.querySelector('.profile__vocation');

apiDefaultUser
  .getDefaultUserInfo()
  .then((result) => {
    name.textContent = result.name;

    vocation.textContent = result.about;
    const avatar = document.querySelector('.profile__avatar');
    avatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// const userInfo = newUser.getUserInfo(apiDefaultUser.getDefaultUserInfo());
// console.log(userInfo);

const defaultCards = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/cards',
  method: 'GET',
  headers: {
    authorization: 'f6237ee0-2461-4ab8-bf1b-c4683cc19aa7',
    'Content-Type': 'application/json',
  },
};

const apiDefaultCards = new Api(defaultCards);
const elements = new Section(
  {
    //items: data,
    renderer: (item) => {
      const card = new Card(item, '.element_template', {
        handleCardClick: () => {
          popupImage.open(item);
        },
      });
      const cardElement = card.generateCard();

      return cardElement;
    },
  },
  '.elements'
);

elements.renderItems(apiDefaultCards.getInitialCards());

// api.getInitialCards().then((data) => {
//   console.log(data);
//   const elements = new Section(
//     {
//       items: data,
//       renderer: (item) => {
//         const card = new Card(item, '.element_template', {
//           handleCardClick: () => {
//             popupImage.open(item);
//           },
//         });
//         const cardElement = card.generateCard();

//         return cardElement;
//       },
//     },
//     '.elements'
//   );
//   elements.renderItems();
// });

//section
// const elements = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       const card = new Card(item, '.element_template', {
//         handleCardClick: () => {
//           popupImage.open(item);
//         },
//       });
//       const cardElement = card.generateCard();

//       return cardElement;
//     },
//   },
//   '.elements'
// );
// elements.renderItems();
//popup with image
const popupImage = new PopupWithImage('.popup__preview');
popupImage.setEventListeners();

//popup with forms
//place
const popupNewPlace = new PopupWithForm('.popup_place', {
  formSubmitHandler(data) {
    const card = new Card(data, '.element_template', {
      handleCardClick: () => {
        popupImage.open(data);
      },
    });
    const cardElement = card.generateCard();

    elements.addItem(cardElement);
  },
});
popupNewPlace.setEventListeners();

//user
const newPopupProfile = new PopupWithForm('.popup_profile', {
  formSubmitHandler(person) {
    newUser.setUserInfo(person);
    apiDefaultUser.editUser(person);
  },
});

newPopupProfile.setEventListeners();

//валидация форм
const validatorProfile = new FormValidator(obj, popupProfile);
const validatorPlace = new FormValidator(obj, popupPlace);
validatorProfile.enableValidation();
validatorPlace.enableValidation();

//редактирование профиля
editUser.addEventListener('click', () => {
  popupProfileName.value = name.textContent;
  popupProfileVocation.value = vocation.textContent;
  validatorProfile.makeClear();
  newPopupProfile.open();
});

//добавление картинки
newCardButton.addEventListener('click', () => {
  validatorPlace.makeClear();
  popupNewPlace.open();
});

// новое

const changeAvatar = new PopupWithForm('.popup_avatar', {
  formSubmitHandler(avatar) {
    document.querySelector('.profile__avatar').src = avatar.avatar;
  },
});

changeAvatar.setEventListeners();
const editAvatar = document.querySelector('.profile__avatar-edit');
editAvatar.addEventListener('click', () => {
  changeAvatar.open();
});
